import type { NormalizedRegistryObject, RawIngestedObject, SourceAdapter, SourceConfig } from "../types.js";

export class NotionAdapter implements SourceAdapter {
  id: string;
  type = "notion" as const;

  constructor(private readonly source: SourceConfig) {
    this.id = source.id;
  }

  async fetch(): Promise<RawIngestedObject[]> {
    throw new Error(`Notion adapter '${this.source.id}' is a placeholder until the registry format stabilizes.`);
  }

  async normalize(): Promise<NormalizedRegistryObject[]> {
    return [];
  }
}
