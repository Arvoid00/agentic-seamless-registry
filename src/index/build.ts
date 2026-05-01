import { join } from "node:path";
import { objectPath, relativePath } from "../paths.js";
import {
  mcpProfileRegistryObjectSchema,
  mcpServerRegistryObjectSchema,
  type McpProfileRegistryObject,
  type McpServerRegistryObject,
  type NormalizedRegistryObject,
} from "../types.js";
import { pathExists, readYamlFile, walkFiles, writeJsonFile } from "../utils/fs.js";
import { registryObjectSchema } from "../types.js";

export interface RegistryIndexes {
  registry: unknown;
  skills: unknown;
  mcp: unknown;
}

export async function readAllRegistryObjects(rootDir: string): Promise<NormalizedRegistryObject[]> {
  const roots = ["skills", "mcp", "cli-tools", "workflows", "templates", "policies"].map((path) => join(rootDir, path));
  const files = (await Promise.all(roots.map((root) => walkFiles(root)))).flat();
  const canonicalFiles = files.filter((file) => /\.(ya?ml)$/.test(file) && !isMaterializedContentPath(file));
  const objects: NormalizedRegistryObject[] = [];

  for (const file of canonicalFiles) {
    const raw = await readYamlFile(file);
    const parsed = registryObjectSchema.safeParse(raw);
    if (parsed.success) objects.push(parsed.data);
  }

  return objects.sort((left, right) => left.id.localeCompare(right.id));
}

export async function buildIndexes(rootDir: string): Promise<RegistryIndexes> {
  const objects = await readAllRegistryObjects(rootDir);
  const skills = objects.filter((object) => object.kind === "skill");
  const mcpServers = objects
    .map((object) => mcpServerRegistryObjectSchema.safeParse(object))
    .filter((result): result is { success: true; data: McpServerRegistryObject } => result.success)
    .map((result) => result.data);
  const mcpProfiles = objects
    .map((object) => mcpProfileRegistryObjectSchema.safeParse(object))
    .filter((result): result is { success: true; data: McpProfileRegistryObject } => result.success)
    .map((result) => result.data);

  const registry = {
    generated_at: new Date().toISOString(),
    counts: {
      objects: objects.length,
      skills: skills.length,
      mcp_servers: mcpServers.length,
      mcp_profiles: mcpProfiles.length,
    },
    objects: objects.map((object) => ({
      id: object.id,
      kind: object.kind,
      name: object.name,
      status: object.status,
      source: object.source,
      path: relativePath(rootDir, objectPath(rootDir, object)),
    })),
  };

  const skillsIndex = {
    generated_at: registry.generated_at,
    skills: skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      tags: skill.tags ?? [],
      capabilities: skill.capabilities ?? [],
      requires: skill.requires ?? {},
      entrypoint: skill.entrypoints?.prompt,
    })),
  };

  const mcpIndex = {
    generated_at: registry.generated_at,
    servers: mcpServers.map((server) => ({
      id: server.id,
      name: server.name,
      transport: server.server.transport,
      command: server.server.command,
      capabilities: server.capabilities ?? [],
      env: server.env,
      review_required: server.security?.review_required ?? false,
    })),
    profiles: mcpProfiles.map((profile) => ({
      id: profile.id,
      name: profile.name,
      servers: profile.servers,
      export_targets: profile.export_targets,
    })),
  };

  await writeJsonFile(join(rootDir, "dist", "registry.index.json"), registry);
  await writeJsonFile(join(rootDir, "dist", "skills.index.json"), skillsIndex);
  await writeJsonFile(join(rootDir, "dist", "mcp.index.json"), mcpIndex);

  if (!(await pathExists(join(rootDir, "dist", "agent-packages")))) {
    await writeJsonFile(join(rootDir, "dist", "agent-packages", ".keep.json"), {});
  }

  return { registry, skills: skillsIndex, mcp: mcpIndex };
}

function isMaterializedContentPath(file: string): boolean {
  const segments = file.split(/[\\/]/);
  return segments.some(
    (segment, index) =>
      segment === "skills" && segments[index + 1] === "imported" && segments[index + 2]?.startsWith("imported.") && segments[index + 3] === "content",
  );
}
