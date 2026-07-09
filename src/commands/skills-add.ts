import { cp, lstat, readdir, readFile, realpath, rm } from "node:fs/promises";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { z } from "zod";
import { ensureDir, pathExists, resolveFromRoot } from "../utils/fs.js";

export interface SkillsAddOptions {
  target: string;
  skillsDir?: string;
  dryRun?: boolean;
  scope?: string[];
}

export const SKILLS_MANIFEST_FILE = "skills-manifest.json";

export const skillsManifestSchema = z.object({
  version: z.literal(1),
  include: z.array(z.string().min(1)).default([]),
  exclude: z.array(z.string().min(1)).default([]),
});

export type SkillsManifest = z.infer<typeof skillsManifestSchema>;

interface RegistrySkill {
  category: string;
  contentDir: string;
  name: string;
  relativeContentDir: string;
}

interface SkillsAddResult {
  copied: string[];
  skipped: string[];
  filteredOut: string[];
  filterSources: string[];
  registrySkills: number;
  targetSkillsDir: string;
}

export async function skillsAddCommand(rootDir: string, options: SkillsAddOptions): Promise<void> {
  if (!options.target) {
    throw new Error("--target is required.");
  }

  const result = await addSkillsToTarget(rootDir, options);
  console.log(`Registry skills: ${result.registrySkills}`);
  console.log(`Target skills dir: ${relative(rootDir, result.targetSkillsDir)}`);
  if (result.filterSources.length === 0) {
    console.log(`No ${SKILLS_MANIFEST_FILE} in target; installing all registry skills. Add one to filter per-target skills.`);
  } else {
    console.log(
      `Filtered out: ${result.filteredOut.length} via ${result.filterSources.join(" + ")}${
        options.dryRun && result.filteredOut.length ? ` (${result.filteredOut.join(", ")})` : ""
      }`,
    );
  }
  console.log(
    `Copied or refreshed: ${result.copied.length}${result.copied.length ? ` (${result.copied.join(", ")})` : ""}`,
  );
  console.log(
    `Already available: ${result.skipped.length}${result.skipped.length ? ` (${result.skipped.join(", ")})` : ""}`,
  );
}

async function addSkillsToTarget(rootDir: string, options: SkillsAddOptions): Promise<SkillsAddResult> {
  const targetRoot = resolveFromRoot(rootDir, options.target);
  if (!(await pathExists(targetRoot))) {
    throw new Error(`Target repository does not exist: ${targetRoot}`);
  }

  const realTargetRoot = await realpath(targetRoot);
  const skillsRoot = resolve(realTargetRoot, options.skillsDir ?? ".agents/skills");
  assertPathInside(skillsRoot, realTargetRoot, "--skills-dir must stay inside the target repository.");
  const lockedSkillNames = await readLockedSkillNames(join(targetRoot, "skills-lock.json"));
  const registrySkills = await readRegistrySkills(rootDir);
  const manifest = await readSkillsManifest(join(targetRoot, SKILLS_MANIFEST_FILE));
  const scopes = parseScopes(options.scope, registrySkills);
  const filterSources: string[] = [];
  if (manifest) filterSources.push(SKILLS_MANIFEST_FILE);
  if (scopes) filterSources.push(`--scope ${[...scopes].join(",")}`);

  const selected: RegistrySkill[] = [];
  const filteredOut: string[] = [];
  for (const skill of registrySkills) {
    const skillId = `${skill.category}/${skill.name}`;
    const allowedByManifest = !manifest || manifestAllows(manifest, skillId);
    const allowedByScope = !scopes || scopes.has(skill.category);
    if (allowedByManifest && allowedByScope) {
      selected.push(skill);
    } else {
      filteredOut.push(skillId);
    }
  }

  if (selected.length === 0) {
    console.warn(
      `Warning: 0 of ${registrySkills.length} registry skills selected (${filterSources.join(" + ") || "no filters"}); nothing will be installed. Note that '*' does not cross '/', so a bare '*' matches nothing — use 'global/*'.`,
    );
  }

  const seen = new Set<string>();
  const copied: string[] = [];
  const skipped: string[] = [];

  if (!options.dryRun) {
    await ensureDir(skillsRoot);
  }

  for (const skill of selected) {
    if (seen.has(skill.name)) {
      throw new Error(`Duplicate registry skill name '${skill.name}' from ${skill.relativeContentDir}`);
    }
    seen.add(skill.name);

    const destination = join(skillsRoot, skill.name);
    const destinationSkill = join(destination, "SKILL.md");
    const destinationExists = await pathExists(destinationSkill);

    if (lockedSkillNames.has(skill.name)) {
      if (!destinationExists) {
        throw new Error(`Locked skill '${skill.name}' is missing from ${relative(targetRoot, destinationSkill)}`);
      }
      skipped.push(`${skill.name} (locked)`);
      continue;
    }

    if (skill.category === "imported" && destinationExists) {
      skipped.push(`${skill.name} (imported)`);
      continue;
    }

    if (!options.dryRun) {
      await rm(destination, { recursive: true, force: true });
      await cp(skill.contentDir, destination, {
        recursive: true,
        dereference: false,
        filter: shouldCopySkillFile,
      });
    }
    copied.push(skill.name);
  }

  if (!options.dryRun) {
    const missing = [];
    for (const skill of selected) {
      if (!(await pathExists(join(skillsRoot, skill.name, "SKILL.md")))) {
        missing.push(skill.name);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing synced skills: ${missing.join(", ")}`);
    }
  }

  return {
    copied,
    skipped,
    filteredOut,
    filterSources,
    registrySkills: registrySkills.length,
    targetSkillsDir: skillsRoot,
  };
}

async function readSkillsManifest(manifestPath: string): Promise<SkillsManifest | undefined> {
  if (!(await pathExists(manifestPath))) return undefined;

  let raw: unknown;
  try {
    raw = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    throw new Error(`Malformed ${SKILLS_MANIFEST_FILE} (invalid JSON): ${error instanceof Error ? error.message : error}`);
  }

  const parsed = skillsManifestSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`);
    throw new Error(`Invalid ${SKILLS_MANIFEST_FILE}: ${issues.join("; ")}`);
  }

  return parsed.data;
}

function manifestAllows(manifest: SkillsManifest, skillId: string): boolean {
  if (manifest.exclude.some((pattern) => patternToRegExp(pattern).test(skillId))) return false;
  if (manifest.include.length === 0) return true;
  return manifest.include.some((pattern) => patternToRegExp(pattern).test(skillId));
}

function patternToRegExp(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*");
  return new RegExp(`^${escaped}$`);
}

function parseScopes(scopeOptions: string[] | undefined, registrySkills: RegistrySkill[]): Set<string> | undefined {
  const scopes = (scopeOptions ?? [])
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
  if (scopes.length === 0) {
    if ((scopeOptions ?? []).length > 0) {
      throw new Error("Empty --scope value. Pass a scope name, e.g. --scope global");
    }
    return undefined;
  }

  const knownScopes = new Set(registrySkills.map((skill) => skill.category));
  const unknown = scopes.filter((scope) => !knownScopes.has(scope));
  if (unknown.length > 0) {
    throw new Error(`Unknown --scope value(s): ${unknown.join(", ")}. Known scopes: ${[...knownScopes].sort().join(", ")}`);
  }

  return new Set(scopes);
}

async function readRegistrySkills(rootDir: string): Promise<RegistrySkill[]> {
  const skillsSourceRoot = join(rootDir, "skills");
  const realSkillsSourceRoot = await realpath(skillsSourceRoot);
  const categories = (await readDirIfExists(skillsSourceRoot))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const skills: RegistrySkill[] = [];

  for (const category of categories) {
    const categoryRoot = join(skillsSourceRoot, category);
    for (const entry of await readDirIfExists(categoryRoot)) {
      if (!entry.isDirectory()) continue;
      const contentDir = join(categoryRoot, entry.name, "content");
      assertPathInside(
        await realpath(contentDir).catch(() => contentDir),
        realSkillsSourceRoot,
        `Skill content path escaped registry skills root: ${contentDir}`,
      );
      const skillPath = join(contentDir, "SKILL.md");
      if (!(await pathExists(skillPath))) continue;

      const skillMarkdown = await readFile(skillPath, "utf8");
      skills.push({
        category,
        contentDir,
        name: parseSkillName(skillMarkdown, skillPath),
        relativeContentDir: relative(rootDir, contentDir),
      });
    }
  }

  return skills.sort((left, right) => left.name.localeCompare(right.name));
}

function parseSkillName(markdown: string, skillPath: string): string {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = match?.[1] ?? "";
  const nameLine = frontmatter
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith("name:"));
  const name = nameLine
    ?.slice("name:".length)
    .trim()
    .replace(/^['"]|['"]$/g, "");

  if (!name || !/^[a-z0-9-]{1,64}$/.test(name)) {
    throw new Error(`Invalid or missing skill name in ${skillPath}`);
  }

  return name;
}

async function readLockedSkillNames(lockfilePath: string): Promise<Set<string>> {
  if (!(await pathExists(lockfilePath))) return new Set();
  const raw = JSON.parse(await readFile(lockfilePath, "utf8")) as unknown;
  if (!isRecord(raw) || !isRecord(raw.skills)) return new Set();
  return new Set(Object.keys(raw.skills));
}

async function readDirIfExists(path: string) {
  try {
    return await readdir(path, { withFileTypes: true });
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") return [];
    throw error;
  }
}

export async function shouldCopySkillFile(source: string): Promise<boolean> {
  const name = source.split(/[\\/]/).at(-1) ?? source;
  if (name === ".DS_Store" || name === ".git" || name === "node_modules") return false;
  if (name === ".env" || name.startsWith(".env.")) return false;
  if (SENSITIVE_FILE_NAMES.has(name)) return false;
  if (SENSITIVE_EXTENSIONS.has(extname(name).toLowerCase())) return false;
  if (BINARY_EXTENSIONS.has(extname(name).toLowerCase())) return false;

  const stats = await lstat(source);
  return !stats.isSymbolicLink();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

function assertPathInside(childPath: string, parentPath: string, message: string): void {
  const child = resolve(childPath);
  const parent = resolve(parentPath);
  const childRelativeToParent = relative(parent, child);
  if (childRelativeToParent === "" || (!childRelativeToParent.startsWith("..") && !isAbsolute(childRelativeToParent))) {
    return;
  }

  throw new Error(message);
}

const SENSITIVE_FILE_NAMES = new Set([".envrc", ".netrc", ".npmrc", ".pypirc", "id_ecdsa", "id_ed25519", "id_rsa"]);

const SENSITIVE_EXTENSIONS = new Set([".crt", ".key", ".p12", ".pem", ".pfx"]);

const BINARY_EXTENSIONS = new Set([
  ".7z",
  ".avif",
  ".bin",
  ".db",
  ".dll",
  ".dmg",
  ".dylib",
  ".exe",
  ".gif",
  ".gz",
  ".ico",
  ".jpeg",
  ".jpg",
  ".mov",
  ".mp4",
  ".pdf",
  ".png",
  ".so",
  ".sqlite",
  ".tar",
  ".tgz",
  ".wasm",
  ".webp",
  ".zip",
]);
