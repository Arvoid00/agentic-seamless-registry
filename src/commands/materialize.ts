import { cp, lstat, readdir, realpath, rename, rm, stat } from "node:fs/promises";
import { dirname, extname, isAbsolute, join, relative, resolve } from "node:path";
import { loadConfig } from "../config.js";
import { buildIndexes, readAllRegistryObjects } from "../index/build.js";
import { objectPath, relativePath } from "../paths.js";
import type { NormalizedRegistryObject, RegistryConfig } from "../types.js";
import { pathExists, resolveFromRoot, writeYamlFile } from "../utils/fs.js";

interface MaterializeOptions {
  source?: string;
}

interface MaterializeResult {
  id: string;
  copiedFiles: number;
}

export async function materializeCommand(rootDir: string, options: MaterializeOptions): Promise<void> {
  const config = await loadConfig(rootDir);
  const objects = await readAllRegistryObjects(rootDir);
  const importedSkills = objects.filter((object) => isMaterializableSkill(object, options.source));
  const results: MaterializeResult[] = [];

  for (const skill of importedSkills) {
    results.push(await materializeSkill(rootDir, config, skill));
  }

  await buildIndexes(rootDir);

  if (results.length === 0) {
    console.log(options.source ? `No imported skills found for source '${options.source}'.` : "No imported skills found to materialize.");
    return;
  }

  const copied = results.reduce((sum, result) => sum + result.copiedFiles, 0);
  console.log(`Materialized ${results.length} imported skills with ${copied} copied files.`);
}

function isMaterializableSkill(object: NormalizedRegistryObject, source?: string): boolean {
  if (object.kind !== "skill") return false;
  if (object.source.origin !== "imported") return false;
  if (source && object.source.source_id !== source) return false;
  return Boolean(object.source.source_path);
}

async function materializeSkill(rootDir: string, config: RegistryConfig, skill: NormalizedRegistryObject): Promise<MaterializeResult> {
  const sourcePath = resolveFromRoot(rootDir, skill.source.source_path as string);
  if (!(await pathExists(sourcePath))) {
    throw new Error(`Cannot materialize ${skill.id}: missing source file ${skill.source.source_path}`);
  }

  const sourceDir = dirname(sourcePath);
  await assertAllowedSourceDir(rootDir, config, skill.source.source_id, sourceDir);

  const skillYamlPath = objectPath(rootDir, skill);
  const skillDir = dirname(skillYamlPath);
  const contentDir = join(skillDir, "content");
  const tmpContentDir = join(skillDir, ".content.tmp");
  const backupContentDir = join(skillDir, ".content.old");

  await rm(tmpContentDir, { recursive: true, force: true });
  await rm(backupContentDir, { recursive: true, force: true });
  await cp(sourceDir, tmpContentDir, {
    recursive: true,
    dereference: false,
    filter: shouldCopyCollateral,
  });

  const tmpPromptPath = join(tmpContentDir, "SKILL.md");
  if (!(await pathExists(tmpPromptPath))) {
    await rm(tmpContentDir, { recursive: true, force: true });
    throw new Error(`Cannot materialize ${skill.id}: copied content does not contain SKILL.md`);
  }

  if (await pathExists(contentDir)) {
    await rename(contentDir, backupContentDir);
  }
  await rename(tmpContentDir, contentDir);
  await rm(backupContentDir, { recursive: true, force: true });

  const copiedFiles = await countFiles(contentDir);
  const promptPath = relativePath(rootDir, join(contentDir, "SKILL.md"));
  const updatedSkill: NormalizedRegistryObject = {
    ...skill,
    entrypoints: {
      ...(skill.entrypoints ?? {}),
      prompt: promptPath,
    },
    metadata: {
      ...(skill.metadata ?? {}),
      materialized: true,
      materialized_from: skill.source.source_path,
      materialized_dir: relativePath(rootDir, contentDir),
    },
  };

  await writeYamlFile(skillYamlPath, updatedSkill);
  return { id: skill.id, copiedFiles };
}

async function assertAllowedSourceDir(rootDir: string, config: RegistryConfig, sourceId: string, sourceDir: string): Promise<void> {
  const sourceConfig = config.sources.find((source) => source.id === sourceId);
  if (!sourceConfig?.path) {
    throw new Error(`Cannot materialize source '${sourceId}': source path is not configured.`);
  }

  const configuredRoot = resolveFromRoot(rootDir, sourceConfig.path);
  const [realSourceDir, realConfiguredRoot] = await Promise.all([realpath(sourceDir), realpath(configuredRoot)]);
  if (!isPathInside(realSourceDir, realConfiguredRoot)) {
    throw new Error(`Cannot materialize source '${sourceId}': ${sourceDir} is outside configured root ${sourceConfig.path}.`);
  }
}

function isPathInside(childPath: string, parentPath: string): boolean {
  const child = resolve(childPath);
  const parent = resolve(parentPath);
  const childRelativeToParent = relative(parent, child);
  return childRelativeToParent === "" || (!childRelativeToParent.startsWith("..") && !isAbsolute(childRelativeToParent));
}

async function shouldCopyCollateral(source: string): Promise<boolean> {
  const name = source.split(/[\\/]/).at(-1) ?? source;
  if (name === ".DS_Store" || name === ".git" || name === "node_modules") return false;
  if (name === ".env" || name.startsWith(".env.")) return false;
  if (SENSITIVE_FILE_NAMES.has(name)) return false;
  if (SENSITIVE_EXTENSIONS.has(extname(name).toLowerCase())) return false;
  if (BINARY_EXTENSIONS.has(extname(name).toLowerCase())) return false;

  const stats = await lstat(source);
  return !stats.isSymbolicLink();
}

async function countFiles(path: string): Promise<number> {
  const stats = await stat(path);
  if (stats.isFile()) return 1;
  if (!stats.isDirectory()) return 0;

  const entries = await readdir(path, { withFileTypes: true });
  const counts = await Promise.all(entries.map((entry) => countFiles(join(path, entry.name))));
  return counts.reduce((sum, count) => sum + count, 0);
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
  ".dylib",
  ".so",
  ".sqlite",
  ".tar",
  ".tgz",
  ".wasm",
  ".webp",
  ".zip",
]);
