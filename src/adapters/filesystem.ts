import { readFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import { parse } from "yaml";
import type { NormalizedRegistryObject, RawIngestedObject, SourceAdapter, SourceConfig } from "../types.js";
import { registryObjectSchema } from "../types.js";
import { pathExists, readJsonFile, readYamlFile, resolveFromRoot, walkFiles } from "../utils/fs.js";

interface SkillLockEntry {
  source?: string;
  sourceType?: string;
  computedHash?: string;
}

interface SkillMarkdownRaw {
  format: "skill-md";
  slug: string;
  frontmatter: Record<string, unknown>;
  body: string;
  lockEntry?: SkillLockEntry;
}

interface CanonicalYamlRaw {
  format: "canonical-yaml";
  object: unknown;
}

type FilesystemRaw = SkillMarkdownRaw | CanonicalYamlRaw;

export class FilesystemAdapter implements SourceAdapter {
  id: string;
  type = "filesystem" as const;

  constructor(
    private readonly rootDir: string,
    private readonly source: SourceConfig,
  ) {
    this.id = source.id;
  }

  async fetch(): Promise<RawIngestedObject[]> {
    const sourcePath = resolveFromRoot(this.rootDir, this.source.path ?? ".");
    const files = await walkFiles(sourcePath);
    const canonicalFiles = this.shouldIngestCanonicalYaml() ? files.filter((file) => /(?:skill|server|object)\.ya?ml$/.test(file)) : [];
    const skillMarkdownFiles = this.shouldIngestSkillMarkdown()
      ? files.filter((file) => basename(file) === "SKILL.md" && !this.isExcluded(file, sourcePath))
      : [];
    const skillLock = await this.readSkillLock(sourcePath);

    const canonicalObjects = await Promise.all(
      canonicalFiles.map(async (file) => ({
        sourceId: this.source.id,
        sourceType: this.source.type,
        sourcePath: relative(this.rootDir, file).replaceAll("\\", "/"),
        raw: {
          format: "canonical-yaml",
          object: await readYamlFile(file),
        } satisfies CanonicalYamlRaw,
      })),
    );

    const skillObjects = await Promise.all(
      skillMarkdownFiles.map(async (file) => {
        const slug = basename(dirname(file));
        const parsed = parseSkillMarkdown(await readFile(file, "utf8"), relative(this.rootDir, file).replaceAll("\\", "/"));
        const lockEntry = skillLock[slug];
        return {
          sourceId: this.source.id,
          sourceType: this.source.type,
          sourcePath: relative(this.rootDir, file).replaceAll("\\", "/"),
          raw: {
            format: "skill-md",
            slug,
            ...parsed,
            ...(lockEntry ? { lockEntry } : {}),
          } satisfies SkillMarkdownRaw,
        };
      }),
    );

    return [...canonicalObjects, ...skillObjects];
  }

  async normalize(raw: RawIngestedObject): Promise<NormalizedRegistryObject[]> {
    const filesystemRaw = raw.raw as FilesystemRaw;
    if (filesystemRaw.format === "canonical-yaml") {
      return [registryObjectSchema.parse(filesystemRaw.object)];
    }

    if (filesystemRaw.format === "skill-md") {
      return [registryObjectSchema.parse(this.normalizeSkillMarkdown(raw, filesystemRaw))];
    }

    return [registryObjectSchema.parse(raw.raw)];
  }

  private normalizeSkillMarkdown(raw: RawIngestedObject, skill: SkillMarkdownRaw): NormalizedRegistryObject {
    const name = stringFromUnknown(skill.frontmatter.name) ?? skill.slug;
    const metadata = recordFromUnknown(skill.frontmatter.metadata);
    const version = stringFromUnknown(metadata.version) ?? "0.1.0";
    const allowedTools = stringArrayFromUnknown(skill.frontmatter["allowed-tools"]);
    const upstreamUrl = skill.lockEntry?.sourceType === "github" && skill.lockEntry.source ? `https://github.com/${skill.lockEntry.source}` : undefined;

    return {
      id: `imported.${skill.slug}`,
      kind: "skill",
      name,
      scope: "external",
      version,
      status: "active",
      source: {
        origin: "imported",
        source_id: raw.sourceId,
        source_path: raw.sourcePath,
        upstream_url: upstreamUrl,
        imported_at: null,
      },
      description: stringFromUnknown(skill.frontmatter.description),
      tags: tagsForSkill(skill, upstreamUrl),
      capabilities: [],
      requires: allowedTools.length > 0 ? { tools: allowedTools } : undefined,
      entrypoints: {
        prompt: raw.sourcePath,
      },
      metadata: {
        source_format: "SKILL.md",
        user_invocable: skill.frontmatter["user-invocable"],
        upstream_source: skill.lockEntry?.source,
        upstream_source_type: skill.lockEntry?.sourceType,
        upstream_hash: skill.lockEntry?.computedHash,
        frontmatter_metadata: metadata,
      },
    };
  }

  private shouldIngestSkillMarkdown(): boolean {
    return this.source.mode === "vercel-skills" || this.source.ingest?.skills_md === true;
  }

  private shouldIngestCanonicalYaml(): boolean {
    return this.source.mode !== "vercel-skills";
  }

  private isExcluded(file: string, sourcePath: string): boolean {
    const relativePath = relative(sourcePath, file).replaceAll("\\", "/");
    return relativePath.startsWith(".claude/worktrees/") || relativePath.startsWith("external/") || relativePath.includes("/node_modules/");
  }

  private async readSkillLock(sourcePath: string): Promise<Record<string, SkillLockEntry>> {
    if (!this.source.ingest?.skills_lock) return {};

    const lockPath = join(sourcePath, "skills-lock.json");
    if (!(await pathExists(lockPath))) return {};

    const lock = await readJsonFile<{ skills?: Record<string, SkillLockEntry> }>(lockPath);
    return lock.skills ?? {};
  }
}

function parseSkillMarkdown(contents: string, sourcePath: string): Pick<SkillMarkdownRaw, "frontmatter" | "body"> {
  const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: contents };

  try {
    return {
      frontmatter: recordFromUnknown(parse(match[1] ?? "")),
      body: match[2] ?? "",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid SKILL.md frontmatter in ${sourcePath}: ${message}`);
  }
}

function stringFromUnknown(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function recordFromUnknown(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function stringArrayFromUnknown(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function tagsForSkill(skill: SkillMarkdownRaw, upstreamUrl?: string): string[] {
  const tags = new Set<string>(["imported", "skill-md"]);
  if (upstreamUrl) tags.add("github");
  for (const part of skill.slug.split(/[-_.]+/).filter(Boolean)) tags.add(part);
  return [...tags].sort();
}
