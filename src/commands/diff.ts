interface DiffOptions {
  source?: string;
}

export async function diffCommand(_rootDir: string, options: DiffOptions): Promise<void> {
  const suffix = options.source ? ` for source '${options.source}'` : "";
  console.log(`Diff review is scaffolded${suffix}. Run ingest to generate conflict review files under dist/reviews/conflicts.`);
}
