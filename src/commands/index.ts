import { buildIndexes } from "../index/build.js";

export async function indexCommand(rootDir: string): Promise<void> {
  const indexes = await buildIndexes(rootDir);
  const registry = indexes.registry as { counts: { objects: number; skills: number; mcp_servers: number } };
  console.log(
    `Indexes generated: ${registry.counts.objects} objects, ${registry.counts.skills} skills, ${registry.counts.mcp_servers} MCP servers.`,
  );
}
