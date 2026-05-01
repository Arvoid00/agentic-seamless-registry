import type { NormalizedRegistryObject, RawIngestedObject, SourceAdapter, SourceConfig } from "../types.js";

export class GithubAdapter implements SourceAdapter {
  id: string;
  type = "github" as const;

  constructor(private readonly source: SourceConfig) {
    this.id = source.id;
  }

  async fetch(): Promise<RawIngestedObject[]> {
    throw new Error(`GitHub adapter '${this.source.id}' is scaffolded but not implemented yet.`);
  }

  async normalize(): Promise<NormalizedRegistryObject[]> {
    return [];
  }
}
