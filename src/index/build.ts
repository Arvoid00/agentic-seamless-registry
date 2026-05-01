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
  agentPackages: unknown;
}

export const REGISTRY_OBJECT_ROOTS = ["skills", "mcp", "cli-tools", "workflows", "templates", "policies", "agent-packages"];

export async function readAllRegistryObjects(rootDir: string): Promise<NormalizedRegistryObject[]> {
  const roots = REGISTRY_OBJECT_ROOTS.map((path) => join(rootDir, path));
  const files = (await Promise.all(roots.map((root) => walkFiles(root)))).flat();
  const canonicalFiles = files.filter((file) => /\.(ya?ml)$/.test(file) && !isMaterializedContentPath(file));
  const objects: NormalizedRegistryObject[] = [];

  for (const file of canonicalFiles) {
    const raw = await readYamlFile(file);
    const parsed = registryObjectSchema.safeParse(raw);
    if (!parsed.success) {
      const relativeFile = relativePath(rootDir, file);
      throw new Error(`${relativeFile}: ${parsed.error.issues.map((issue) => issue.message).join("; ")}`);
    }

    objects.push(parsed.data);
  }

  return objects.sort((left, right) => left.id.localeCompare(right.id));
}

export async function buildIndexes(rootDir: string): Promise<RegistryIndexes> {
  const objects = await readAllRegistryObjects(rootDir);
  const skills = objects.filter((object) => object.kind === "skill");
  const agentPackages = objects.filter((object) => object.kind === "agent-package");
  const cliTools = objects.filter((object) => object.kind === "cli-tool");
  const workflows = objects.filter((object) => object.kind === "workflow");
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
      agent_packages: agentPackages.length,
      cli_tools: cliTools.length,
      workflows: workflows.length,
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
      args: server.server.args,
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

  const agentPackagesIndex = {
    generated_at: registry.generated_at,
    agent_packages: agentPackages.map((agentPackage) => ({
      id: agentPackage.id,
      name: agentPackage.name,
      description: agentPackage.description,
      tags: agentPackage.tags ?? [],
      capabilities: agentPackage.capabilities ?? [],
      requires: agentPackage.requires ?? {},
      entrypoint: agentPackage.entrypoints?.prompt,
      composition: agentPackage.metadata?.composition,
      risk: agentPackage.risk,
    })),
  };

  await writeJsonFile(join(rootDir, "dist", "registry.index.json"), registry);
  await writeJsonFile(join(rootDir, "dist", "skills.index.json"), skillsIndex);
  await writeJsonFile(join(rootDir, "dist", "mcp.index.json"), mcpIndex);
  await writeJsonFile(join(rootDir, "dist", "agent-packages.index.json"), agentPackagesIndex);

  if (!(await pathExists(join(rootDir, "dist", "agent-packages")))) {
    await writeJsonFile(join(rootDir, "dist", "agent-packages", ".keep.json"), {});
  }

  return { registry, skills: skillsIndex, mcp: mcpIndex, agentPackages: agentPackagesIndex };
}

export function isMaterializedContentPath(file: string): boolean {
  const segments = file.split(/[\\/]/);
  return segments.some((segment, index) => segment === "skills" && segments.slice(index + 1).includes("content"));
}
