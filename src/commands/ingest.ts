import { createAdapter } from "../adapters/index.js";
import { loadConfig } from "../config.js";
import { buildIndexes } from "../index/build.js";
import { loadLockfile, persistRegistryObject, writeLockfile, type PersistResult } from "../registry.js";
import type { SourceConfig } from "../types.js";

interface IngestOptions {
  source?: string;
}

export async function ingestCommand(rootDir: string, options: IngestOptions): Promise<void> {
  const config = await loadConfig(rootDir);
  const lockfile = await loadLockfile(rootDir);
  const sources = config.sources.filter((source) => shouldIngestSource(source, options.source));

  if (sources.length === 0) {
    console.log(options.source ? `No enabled source found for '${options.source}'.` : "No enabled sources configured.");
    return;
  }

  const results: PersistResult[] = [];

  for (const source of sources) {
    const adapter = createAdapter(rootDir, config, source);
    const rawObjects = await adapter.fetch();
    const sourceResults: PersistResult[] = [];

    for (const rawObject of rawObjects) {
      const normalizedObjects = await adapter.normalize(rawObject);
      for (const object of normalizedObjects) {
        sourceResults.push(await persistRegistryObject(rootDir, object));
      }
    }

    lockfile.sources[source.id] = {
      type: source.type,
      repo: source.repo,
      ref: source.ref,
      path: source.path,
      last_ingested_at: new Date().toISOString(),
      objects: sourceResults
        .filter((result) => result.action !== "review")
        .map((result) => ({
          id: result.object.id,
          kind: result.object.kind,
          path: result.path,
          hash: result.hash,
        })),
    };

    results.push(...sourceResults);
  }

  await writeLockfile(rootDir, lockfile);
  await buildIndexes(rootDir);

  console.log(
    `Ingest complete: ${count(results, "written")} written, ${count(results, "skipped")} skipped, ${count(results, "review")} conflicts sent to review.`,
  );
}

function shouldIngestSource(source: SourceConfig, requestedSource?: string): boolean {
  if (requestedSource) return source.id === requestedSource && source.enabled;
  return source.enabled;
}

function count(results: PersistResult[], action: PersistResult["action"]): number {
  return results.filter((result) => result.action === action).length;
}
