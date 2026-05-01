import { join } from "node:path";
import { loadConfig } from "../config.js";
import { pathExists, resolveFromRoot } from "../utils/fs.js";

export async function doctorCommand(rootDir: string): Promise<void> {
  const config = await loadConfig(rootDir);
  const checks: string[] = [];

  for (const dir of ["skills", "mcp/servers", "mcp/profiles", "sources", "dist"]) {
    checks.push(`${(await pathExists(join(rootDir, dir))) ? "ok" : "missing"} ${dir}`);
  }

  for (const source of config.sources.filter((candidate) => candidate.enabled && candidate.path)) {
    const sourcePath = resolveFromRoot(rootDir, source.path as string);
    checks.push(`${(await pathExists(sourcePath)) ? "ok" : "missing"} source ${source.id}: ${source.path}`);
  }

  console.log(checks.join("\n"));
}
