import { join } from "node:path";
import type { RegistryConfig, SourceAdapter, SourceConfig } from "../types.js";
import { ClaudeDesktopMcpAdapter } from "./claude-desktop.js";
import { CursorMcpAdapter } from "./cursor.js";
import { FilesystemAdapter } from "./filesystem.js";
import { GithubAdapter } from "./github.js";
import { NotionAdapter } from "./notion.js";

export function createAdapter(rootDir: string, config: RegistryConfig, source: SourceConfig): SourceAdapter {
  const rawSourcesDir = join(rootDir, config.output.raw_sources_dir);

  if (source.type === "filesystem") return new FilesystemAdapter(rootDir, source);
  if (source.type === "cursor") return new CursorMcpAdapter(rootDir, source, rawSourcesDir);
  if (source.type === "claude-desktop") return new ClaudeDesktopMcpAdapter(rootDir, source, rawSourcesDir);
  if (source.type === "github") return new GithubAdapter(source);
  if (source.type === "notion") return new NotionAdapter(source);

  throw new Error(`Unsupported source type: ${source.type}`);
}
