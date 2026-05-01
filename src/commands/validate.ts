import { join } from "node:path";
import { loadConfig } from "../config.js";
import { readAllRegistryObjects } from "../index/build.js";
import { registryObjectSchema } from "../types.js";
import { readYamlFile, walkFiles } from "../utils/fs.js";

export async function validateCommand(rootDir: string): Promise<void> {
  await loadConfig(rootDir);

  const roots = ["skills", "mcp", "cli-tools", "workflows", "templates", "policies"].map((path) => join(rootDir, path));
  const files = (await Promise.all(roots.map((root) => walkFiles(root)))).flat().filter((file) => /\.(ya?ml)$/.test(file));
  const errors: string[] = [];

  for (const file of files) {
    const parsed = registryObjectSchema.safeParse(await readYamlFile(file));
    if (!parsed.success) {
      errors.push(`${file.replace(`${rootDir}/`, "")}: ${parsed.error.issues.map((issue) => issue.message).join("; ")}`);
    }
  }

  const objects = await readAllRegistryObjects(rootDir);
  const duplicateIds = findDuplicates(objects.map((object) => `${object.kind}:${object.id}`));
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate registry identities: ${duplicateIds.join(", ")}`);
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  }

  console.log(`Validation passed for ${objects.length} registry objects.`);
}

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates].sort();
}
