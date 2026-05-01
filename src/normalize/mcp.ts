import type { McpServerRegistryObject, RawIngestedObject, SourceConfig } from "../types.js";

interface RawMcpServerConfig {
  command?: string;
  args?: string[];
  env?: Record<string, unknown>;
  cwd?: string;
  url?: string;
}

function titleFromId(id: string): string {
  return id
    .split(/[-_.\s]+/)
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function normalizeServerId(name: string): string {
  return `mcp.${name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase()}`;
}

export function redactMcpConfig(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return raw;
  const candidate = raw as { mcpServers?: Record<string, RawMcpServerConfig> };
  if (!candidate.mcpServers) return raw;

  return {
    ...candidate,
    mcpServers: Object.fromEntries(
      Object.entries(candidate.mcpServers).map(([name, server]) => [
        name,
        {
          ...server,
          env: server.env ? Object.fromEntries(Object.keys(server.env).map((key) => [key, "<redacted>"])) : undefined,
        },
      ]),
    ),
  };
}

export function normalizeMcpServers(raw: RawIngestedObject, source: SourceConfig): McpServerRegistryObject[] {
  const candidate = raw.raw as { mcpServers?: Record<string, RawMcpServerConfig> };
  const servers = candidate.mcpServers ?? {};

  return Object.entries(servers).map(([name, server]) => {
    const envNames = Object.keys(server.env ?? {}).sort();
    const transport = server.url ? "sse" : "stdio";

    return {
      id: normalizeServerId(name),
      kind: "mcp-server",
      name: titleFromId(name),
      scope: "global",
      version: "0.1.0",
      status: "active",
      source: {
        origin: "imported",
        source_id: source.id,
        source_path: raw.sourcePath,
        imported_at: null,
      },
      description: `Imported MCP server from ${source.id}.`,
      capabilities: [],
      requires: envNames.length > 0 ? { env: envNames } : undefined,
      server: {
        transport,
        command: server.command,
        args: Array.isArray(server.args) ? server.args : [],
        url: server.url,
        cwd: server.cwd,
      },
      env: {
        required: envNames,
        optional: [],
      },
      security: {
        review_required: true,
        reason: "Imported executable MCP server requires review before activation.",
      },
      risk: {
        level: "medium",
        reasons: ["MCP servers can execute commands or expose external tool capabilities."],
        requires_human_review: true,
      },
    };
  });
}
