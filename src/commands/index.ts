import { buildIndexes } from "../index/build.js";

export async function indexCommand(rootDir: string): Promise<void> {
  const indexes = await buildIndexes(rootDir);
  const registry = indexes.registry as {
    counts: { objects: number; skills: number; mcp_servers: number; agent_packages: number; cli_tools: number; workflows: number };
  };
  const workflowLabel = registry.counts.workflows === 1 ? "workflow" : "workflows";
  console.log(
    `Indexes generated: ${registry.counts.objects} objects, ${registry.counts.skills} skills, ${registry.counts.mcp_servers} MCP servers, ${registry.counts.agent_packages} agent packages, ${registry.counts.cli_tools} CLI tools, ${registry.counts.workflows} ${workflowLabel}.`,
  );
}
