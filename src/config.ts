import { join } from "node:path";
import { registryConfigSchema, type RegistryConfig } from "./types.js";
import { pathExists, readYamlFile, writeYamlFile } from "./utils/fs.js";

export const CONFIG_FILE = "registry.config.yaml";

export async function loadConfig(rootDir: string): Promise<RegistryConfig> {
  const configPath = join(rootDir, CONFIG_FILE);
  if (!(await pathExists(configPath))) {
    throw new Error(`Missing ${CONFIG_FILE}. Run seamless-registry init first.`);
  }

  return registryConfigSchema.parse(await readYamlFile(configPath));
}

export async function writeDefaultConfig(rootDir: string): Promise<void> {
  const configPath = join(rootDir, CONFIG_FILE);
  if (await pathExists(configPath)) return;

  await writeYamlFile(configPath, {
    name: "agentic-seamless-registry",
    version: "0.1.0",
    defaults: {
      owner: "seamless",
      license: "internal",
      visibility: "private",
      target_format_version: 1,
    },
    sources: [
      {
        id: "seamless-local-skills",
        type: "filesystem",
        enabled: true,
        path: "./skills",
        mode: "canonical",
        ingest: { skills: true },
      },
      {
        id: "cursor-mcp-config",
        type: "cursor",
        enabled: true,
        path: "~/.cursor/mcp.json",
        ingest: { mcp: true },
      },
    ],
    output: {
      normalized_dir: ".",
      raw_sources_dir: "./sources",
      index_dir: "./dist",
    },
    conflicts: {
      strategy: "prefer-local",
      external_prefix: "imported",
      identity_fields: ["id", "kind"],
    },
    security: {
      require_review_for: ["mcp.servers", "executable.commands", "env.vars"],
      block_secret_values: true,
      allowed_mcp_command_roots: ["npx", "uvx", "node", "bunx"],
    },
  });
}
