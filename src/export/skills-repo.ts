import { cp, readFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parse as parseYaml } from "yaml";
import { shouldCopySkillFile } from "../commands/skills-add.js";
import { readAllRegistryObjects } from "../index/build.js";
import { objectPath, relativePath } from "../paths.js";
import { ensureDir, pathExists, writeTextFile } from "../utils/fs.js";

const PUBLISH_REPO = "Seamless-Agency/skills";

const SCOPE_SECTIONS = [
  { scope: "global", heading: "Global skills" },
  { scope: "app-specific", heading: "App-specific skills" },
] as const;

interface ExportedSkill {
  scope: string;
  name: string;
  description: string;
}

export interface SkillsRepoExportResult {
  outputDir: string;
  skills: ExportedSkill[];
}

export async function exportSkillsRepo(rootDir: string): Promise<SkillsRepoExportResult> {
  const objects = await readAllRegistryObjects(rootDir);
  const skillObjects = objects.filter(
    (object) =>
      object.kind === "skill" &&
      object.status === "active" &&
      object.source.origin === "local" &&
      (object.scope === "global" || object.scope === "app-specific"),
  );

  const outputDir = join(rootDir, "dist", "export", "skills-repo");
  await rm(outputDir, { recursive: true, force: true });
  await ensureDir(outputDir);

  const seen = new Set<string>();
  const skills: ExportedSkill[] = [];

  for (const object of skillObjects) {
    const contentDir = join(dirname(objectPath(rootDir, object)), "content");
    const skillPath = join(contentDir, "SKILL.md");
    if (!(await pathExists(skillPath))) {
      throw new Error(`Skill '${object.id}' is missing ${relativePath(rootDir, skillPath)}`);
    }

    const { name, description } = parseSkillFrontmatter(
      await readFile(skillPath, "utf8"),
      relativePath(rootDir, skillPath),
    );
    if (seen.has(name)) {
      throw new Error(`Duplicate skill name '${name}' from ${relativePath(rootDir, contentDir)}`);
    }
    seen.add(name);

    // skill.yaml lives next to content/, so copying content/ alone keeps registry metadata out.
    await cp(contentDir, join(outputDir, "skills", object.scope, name), {
      recursive: true,
      dereference: false,
      filter: shouldCopySkillFile,
    });
    const exportedSkillPath = join(outputDir, "skills", object.scope, name, "SKILL.md");
    if (!(await pathExists(exportedSkillPath))) {
      throw new Error(
        `Export of '${name}' produced no SKILL.md at ${relativePath(rootDir, exportedSkillPath)} — source is a symlink or excluded file`,
      );
    }
    skills.push({ scope: object.scope, name, description });
  }

  skills.sort((left, right) => left.name.localeCompare(right.name));
  await writeTextFile(join(outputDir, "README.md"), renderReadme(skills));
  return { outputDir, skills };
}

function parseSkillFrontmatter(markdown: string, skillPath: string): { name: string; description: string } {
  const match = markdown.replace(/^\uFEFF/, "").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`Missing frontmatter block in ${skillPath}`);
  }

  let frontmatter: unknown;
  try {
    frontmatter = parseYaml(match[1] ?? "");
  } catch (error) {
    throw new Error(`Invalid frontmatter YAML in ${skillPath}: ${error instanceof Error ? error.message : error}`);
  }

  const record = typeof frontmatter === "object" && frontmatter !== null ? (frontmatter as Record<string, unknown>) : {};
  const name = typeof record.name === "string" ? record.name.trim() : undefined;
  const description = typeof record.description === "string" ? record.description.trim() : "";

  if (!name || !/^[a-z0-9-]{1,64}$/.test(name)) {
    throw new Error(`Invalid or missing skill name in ${skillPath}`);
  }

  return { name, description };
}

function renderReadme(skills: ExportedSkill[]): string {
  const sections = SCOPE_SECTIONS.filter((section) => skills.some((skill) => skill.scope === section.scope)).map(
    (section) => {
      const rows = skills
        .filter((skill) => skill.scope === section.scope)
        .map((skill) => `| \`${skill.name}\` | ${skill.description.replace(/\s*\r?\n\s*/g, " ").replaceAll("|", "\\|")} |`);
      return `## ${section.heading}\n\n| Skill | Description |\n| --- | --- |\n${rows.join("\n")}\n`;
    },
  );

  return `# Seamless Skills

Canonical Seamless agent skills, published from the agentic-seamless-registry pipeline.

## Install

Install all skills with the skills.sh CLI:

\`\`\`sh
npx skills add ${PUBLISH_REPO}
\`\`\`

Install a single skill:

\`\`\`sh
npx skills add ${PUBLISH_REPO} --skill <name>
\`\`\`

${sections.join("\n")}`;
}
