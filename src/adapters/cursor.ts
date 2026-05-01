import type { NormalizedRegistryObject, RawIngestedObject, SourceAdapter, SourceConfig } from "../types.js";
import { normalizeMcpServers, redactMcpConfig } from "../normalize/mcp.js";
import { pathExists, readJsonFile, resolveFromRoot, writeJsonFile } from "../utils/fs.js";

export class CursorMcpAdapter implements SourceAdapter {
  id: string;
  type = "cursor" as const;

  constructor(
    private readonly rootDir: string,
    private readonly source: SourceConfig,
    private readonly rawSourcesDir: string,
  ) {
    this.id = source.id;
  }

  async fetch(): Promise<RawIngestedObject[]> {
    const configPath = resolveFromRoot(this.rootDir, this.source.path ?? "~/.cursor/mcp.json");
    if (!(await pathExists(configPath))) return [];

    const raw = await readJsonFile(configPath);
    await writeJsonFile(`${this.rawSourcesDir}/${this.source.id}/mcp.raw.json`, redactMcpConfig(raw));

    return [
      {
        sourceId: this.source.id,
        sourceType: this.source.type,
        sourcePath: this.source.path ?? "~/.cursor/mcp.json",
        raw,
      },
    ];
  }

  async normalize(raw: RawIngestedObject): Promise<NormalizedRegistryObject[]> {
    return normalizeMcpServers(raw, this.source);
  }
}
