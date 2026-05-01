import { join } from "node:path";
import { writeDefaultConfig } from "../config.js";
import { ensureDir, pathExists, writeJsonFile } from "../utils/fs.js";

const REGISTRY_DIRS = [
  "src/cli",
  "src/adapters",
  "src/normalize",
  "src/validate",
  "src/index",
  "src/commands",
  "sources/github",
  "sources/notion",
  "sources/local",
  "sources/generated",
  "skills/global",
  "skills/app-specific",
  "skills/imported",
  "mcp/servers",
  "mcp/profiles",
  "cli-tools",
  "templates",
  "policies",
  "workflows",
  "agent-packages",
  "dist/agent-packages",
];

export async function initCommand(rootDir: string): Promise<void> {
  await Promise.all(REGISTRY_DIRS.map((dir) => ensureDir(join(rootDir, dir))));
  await writeDefaultConfig(rootDir);

  const lockfilePath = join(rootDir, "registry.lock.json");
  if (!(await pathExists(lockfilePath))) {
    await writeJsonFile(lockfilePath, { version: 1, sources: {} });
  }

  console.log("Initialized Agentic Seamless Registry workspace.");
}
