#!/usr/bin/env node
import { Command } from "commander";
import { diffCommand } from "../commands/diff.js";
import { doctorCommand } from "../commands/doctor.js";
import { exportCommand } from "../commands/export.js";
import { indexCommand } from "../commands/index.js";
import { ingestCommand } from "../commands/ingest.js";
import { initCommand } from "../commands/init.js";
import { listCommand } from "../commands/list.js";
import { validateCommand } from "../commands/validate.js";

const rootDir = process.cwd();
const program = new Command();

program.name("seamless-registry").description("Composable registry workspace for agent skills, MCP servers, and agent packages.").version("0.1.0");

program.command("init").description("Initialize the registry workspace structure.").action(() => run(() => initCommand(rootDir)));

program
  .command("ingest")
  .description("Ingest enabled sources or one source by id.")
  .option("--source <id>", "Source id to ingest")
  .action((options: { source?: string }) => run(() => ingestCommand(rootDir, options)));

program.command("validate").description("Validate canonical registry objects.").action(() => run(() => validateCommand(rootDir)));

program.command("index").description("Generate agent-facing registry indexes.").action(() => run(() => indexCommand(rootDir)));

program.command("list").description("List registry objects by kind.").argument("<kind>", "skills | mcp").action((kind: string) => run(() => listCommand(rootDir, kind)));

program.command("diff").description("Show scaffolded source diff guidance.").option("--source <id>", "Source id to diff").action((options: { source?: string }) => run(() => diffCommand(rootDir, options)));

program
  .command("export")
  .description("Export generated agent package configs.")
  .option("--target <target>", "Export target", "cursor")
  .option("--profile <profile>", "MCP profile id or short name")
  .action((options: { target?: string; profile?: string }) => run(() => exportCommand(rootDir, options)));

program.command("doctor").description("Check registry workspace health.").action(() => run(() => doctorCommand(rootDir)));

await program.parseAsync();

async function run(action: () => Promise<void>): Promise<void> {
  try {
    await action();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
