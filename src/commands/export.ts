import { exportCursorMcp } from "../export/cursor.js";

interface ExportOptions {
  target?: string;
  profile?: string;
}

export async function exportCommand(rootDir: string, options: ExportOptions): Promise<void> {
  const target = options.target ?? "cursor";

  if (target !== "cursor") {
    throw new Error(`Export target '${target}' is scaffolded but not implemented yet.`);
  }

  const outputPath = await exportCursorMcp(rootDir, options.profile ? { profile: options.profile } : {});
  console.log(`Exported Cursor MCP config to ${outputPath.replace(`${rootDir}/`, "")}.`);
}
