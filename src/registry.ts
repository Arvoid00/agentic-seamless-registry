import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parse } from "yaml";
import { objectPath, relativePath } from "./paths.js";
import { lockfileSchema, registryObjectSchema, type NormalizedRegistryObject, type RegistryLockfile } from "./types.js";
import { ensureDir, pathExists, readJsonFile, writeJsonFile, writeTextFile, writeYamlFile } from "./utils/fs.js";
import { hashObject } from "./utils/hash.js";

export interface PersistResult {
  object: NormalizedRegistryObject;
  path: string;
  hash: string;
  action: "written" | "skipped" | "review";
}

export async function loadLockfile(rootDir: string): Promise<RegistryLockfile> {
  const path = join(rootDir, "registry.lock.json");
  if (!(await pathExists(path))) return { version: 1, sources: {} };
  return lockfileSchema.parse(await readJsonFile(path));
}

export async function writeLockfile(rootDir: string, lockfile: RegistryLockfile): Promise<void> {
  await writeJsonFile(join(rootDir, "registry.lock.json"), lockfile);
}

export async function readRegistryObjectFile(path: string): Promise<NormalizedRegistryObject> {
  const raw = parse(await readFile(path, "utf8"));
  return registryObjectSchema.parse(raw);
}

export async function persistRegistryObject(rootDir: string, object: NormalizedRegistryObject): Promise<PersistResult> {
  const destination = objectPath(rootDir, object);
  const objectHash = hashObject(object);

  if (await pathExists(destination)) {
    const existing = await readRegistryObjectFile(destination);
    const existingHash = hashObject(existing);

    if (existingHash === objectHash) {
      return { object, path: relativePath(rootDir, destination), hash: objectHash, action: "skipped" };
    }

    const externalOverwriteLocal = existing.source.origin === "local" && object.source.origin !== "local";
    await writeConflictReview(rootDir, existing, object, externalOverwriteLocal);
    return { object, path: relativePath(rootDir, destination), hash: objectHash, action: "review" };
  }

  await writeYamlFile(destination, object);
  return { object, path: relativePath(rootDir, destination), hash: objectHash, action: "written" };
}

async function writeConflictReview(
  rootDir: string,
  existing: NormalizedRegistryObject,
  incoming: NormalizedRegistryObject,
  blocked: boolean,
): Promise<void> {
  const date = new Date().toISOString().slice(0, 10);
  const reviewPath = join(rootDir, "dist", "reviews", "conflicts", `${date}-${incoming.source.source_id}.md`);
  const recommendation = blocked
    ? "Keep the local object as canonical. Imported sources may not overwrite local registry objects."
    : "Review both objects and either merge manually or namespace the imported object.";

  const contents = `# Registry conflict review

## Conflict: ${incoming.id}

Existing:
- path: ${relativePath(rootDir, objectPath(rootDir, existing))}
- version: ${existing.version}
- source: ${existing.source.source_id}
- origin: ${existing.source.origin}

Incoming:
- source: ${incoming.source.source_id}
- origin: ${incoming.source.origin}
- source path: ${incoming.source.source_path ?? "unknown"}
- version: ${incoming.version}

Recommendation:
${recommendation}
`;

  await ensureDir(dirname(reviewPath));
  await writeTextFile(reviewPath, contents);
}
