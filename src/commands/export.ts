import { exportCursorMcp } from "../export/cursor.js";
import { exportSkillsRepo } from "../export/skills-repo.js";

interface ExportOptions {
  target?: string;
  profile?: string;
}

export async function exportCommand(rootDir: string, options: ExportOptions): Promise<void> {
  const target = options.target ?? "cursor";

  switch (target) {
    case "cursor": {
      const outputPath = await exportCursorMcp(rootDir, options.profile ? { profile: options.profile } : {});
      console.log(`Exported Cursor MCP config to ${outputPath.replace(`${rootDir}/`, "")}.`);
      return;
    }
    case "skills-repo": {
      const result = await exportSkillsRepo(rootDir);
      console.log(`Exported ${result.skills.length} skills to ${result.outputDir.replace(`${rootDir}/`, "")}.`);
      return;
    }
    default:
      throw new Error(`Export target '${target}' is not supported. Available targets: cursor, skills-repo.`);
  }
}
