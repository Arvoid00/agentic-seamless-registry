import { join } from "node:path";
import { readAllRegistryObjects } from "../index/build.js";
import { mcpProfileRegistryObjectSchema, mcpServerRegistryObjectSchema, type McpServerRegistryObject } from "../types.js";
import { writeJsonFile } from "../utils/fs.js";

interface CursorExportOptions {
  profile?: string;
}

export async function exportCursorMcp(rootDir: string, options: CursorExportOptions): Promise<string> {
  const objects = await readAllRegistryObjects(rootDir);
  const servers = objects
    .map((object) => mcpServerRegistryObjectSchema.safeParse(object))
    .filter((result): result is { success: true; data: McpServerRegistryObject } => result.success)
    .map((result) => result.data);

  const profile = options.profile
    ? objects
        .map((object) => mcpProfileRegistryObjectSchema.safeParse(object))
        .filter((result) => result.success)
        .map((result) => result.data)
        .find((candidate) => candidate.id === `profile.${options.profile}` || candidate.id === options.profile)
    : undefined;

  const includedIds = new Set(profile?.servers.include ?? []);
  const excludedIds = new Set(profile?.servers.exclude ?? []);
  const selectedServers = servers.filter((server) => {
    if (excludedIds.has(server.id)) return false;
    if (includedIds.size === 0) return true;
    return includedIds.has(server.id);
  });

  const output = {
    mcpServers: Object.fromEntries(selectedServers.map((server) => [server.id.replace(/^mcp\./, ""), toCursorServer(server)])),
  };

  const outputPath = join(rootDir, "dist", "agent-packages", "cursor", "mcp.json");
  await writeJsonFile(outputPath, output);
  return outputPath;
}

function toCursorServer(server: McpServerRegistryObject): Record<string, unknown> {
  const env = Object.fromEntries([...server.env.required, ...server.env.optional].map((name) => [name, `\${${name}}`]));
  const base =
    server.server.transport === "stdio"
      ? {
          command: server.server.command,
          args: server.server.args,
        }
      : {
          url: server.server.url,
        };

  return {
    ...base,
    ...(server.server.cwd ? { cwd: server.server.cwd } : {}),
    ...(Object.keys(env).length > 0 ? { env } : {}),
  };
}
