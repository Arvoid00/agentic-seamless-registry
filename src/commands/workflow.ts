import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { readAllRegistryObjects } from "../index/build.js";
import type { NormalizedRegistryObject } from "../types.js";

interface WorkflowOptions {
  var?: string[];
  nonInteractive?: boolean;
}

interface WorkflowInput {
  id: string;
  label: string;
  required: boolean;
  defaultValue?: string;
}

interface WorkflowStage {
  id: string;
  name: string;
  type?: string;
  dependsOn: string[];
}

export async function workflowCommand(rootDir: string, workflowId: string, options: WorkflowOptions): Promise<void> {
  const workflow = await findWorkflow(rootDir, workflowId);
  const inputs = getWorkflowInputs(workflow);
  const variables = parseVariables(options.var ?? []);

  await collectMissingVariables(inputs, variables, options.nonInteractive === true);

  console.log(renderKickoffPrompt(workflow, inputs, variables));
}

async function findWorkflow(rootDir: string, workflowId: string): Promise<NormalizedRegistryObject> {
  const workflows = (await readAllRegistryObjects(rootDir)).filter((object) => object.kind === "workflow");
  const matches = workflows.filter((workflow) => workflowMatches(workflow, workflowId));

  if (matches.length === 0) {
    const available = workflows.map((workflow) => workflow.id).join(", ");
    throw new Error(`Workflow '${workflowId}' not found.${available ? ` Available workflows: ${available}.` : ""}`);
  }

  if (matches.length > 1) {
    throw new Error(`Workflow '${workflowId}' matched multiple workflows: ${matches.map((workflow) => workflow.id).join(", ")}.`);
  }

  const workflow = matches[0];
  if (!workflow) throw new Error(`Workflow '${workflowId}' not found.`);
  return workflow;
}

function workflowMatches(workflow: NormalizedRegistryObject, workflowId: string): boolean {
  if (workflow.id === workflowId) return true;
  if (workflow.id === `workflow.${workflowId}`) return true;
  return workflow.source.source_path === `workflows/${workflowId}/object.yaml`;
}

function parseVariables(entries: string[]): Map<string, string> {
  const variables = new Map<string, string>();

  for (const entry of entries) {
    const separatorIndex = entry.indexOf("=");
    if (separatorIndex <= 0) {
      throw new Error(`Invalid --var '${entry}'. Use --var key=value.`);
    }

    const key = entry.slice(0, separatorIndex).trim();
    const value = entry.slice(separatorIndex + 1).trim();
    if (!key) throw new Error(`Invalid --var '${entry}'. Variable name cannot be empty.`);
    variables.set(key, value);
  }

  return variables;
}

async function collectMissingVariables(inputs: WorkflowInput[], variables: Map<string, string>, nonInteractive: boolean): Promise<void> {
  if (inputs.length === 0) return;

  if (nonInteractive) {
    for (const item of inputs) {
      if (!variables.has(item.id) && item.defaultValue !== undefined) {
        variables.set(item.id, item.defaultValue);
      }
    }

    const missing = inputs.filter((item) => item.required && !variables.has(item.id)).map((item) => item.id);
    if (missing.length > 0) {
      throw new Error(`Missing required workflow variables: ${missing.join(", ")}.`);
    }
    return;
  }

  const rl = createInterface({ input, output });
  try {
    for (const item of inputs) {
      if (variables.has(item.id)) continue;

      const answer = await promptForInput(rl, item);

      variables.set(item.id, answer);
    }
  } finally {
    rl.close();
  }
}

async function promptForInput(rl: ReturnType<typeof createInterface>, item: WorkflowInput): Promise<string> {
  const prompt = `${item.label}${item.defaultValue ? ` [${item.defaultValue}]` : ""}: `;

  while (true) {
    const answer = normalizeAnswer(await rl.question(prompt), item.defaultValue);
    if (answer || !item.required) return answer;
  }
}

function normalizeAnswer(answer: string, defaultValue: string | undefined): string {
  const trimmed = answer.trim();
  return trimmed || defaultValue || "";
}

function getWorkflowInputs(workflow: NormalizedRegistryObject): WorkflowInput[] {
  const metadata = workflow.metadata;
  if (!isRecord(metadata)) return [];

  const inputs = metadata["inputs"];
  if (inputs === undefined) return [];
  if (!Array.isArray(inputs)) throw new Error(`Workflow '${workflow.id}' metadata.inputs must be a list.`);

  return inputs.map((item, index) => parseWorkflowInput(workflow.id, item, index));
}

function parseWorkflowInput(workflowId: string, item: unknown, index: number): WorkflowInput {
  if (!isRecord(item)) {
    throw new Error(`Workflow '${workflowId}' metadata.inputs[${index}] must be an object.`);
  }

  const id = item["id"];
  const label = item["label"];
  if (typeof id !== "string" || !id) {
    throw new Error(`Workflow '${workflowId}' metadata.inputs[${index}].id must be a non-empty string.`);
  }
  if (typeof label !== "string" || !label) {
    throw new Error(`Workflow '${workflowId}' metadata.inputs[${index}].label must be a non-empty string.`);
  }

  const required = typeof item["required"] === "boolean" ? item["required"] : false;
  const defaultValue = typeof item["default"] === "string" ? item["default"] : undefined;

  return defaultValue === undefined ? { id, label, required } : { id, label, required, defaultValue };
}

function getWorkflowStages(workflow: NormalizedRegistryObject): WorkflowStage[] {
  const metadata = workflow.metadata;
  if (!isRecord(metadata)) return [];

  const stages = metadata["stages"];
  if (!Array.isArray(stages)) return [];

  return stages.map((stage, index) => parseWorkflowStage(workflow.id, stage, index));
}

function parseWorkflowStage(workflowId: string, stage: unknown, index: number): WorkflowStage {
  if (!isRecord(stage)) {
    throw new Error(`Workflow '${workflowId}' metadata.stages[${index}] must be an object.`);
  }

  const id = stage["id"];
  const name = stage["name"];
  if (typeof id !== "string" || !id) {
    throw new Error(`Workflow '${workflowId}' metadata.stages[${index}].id must be a non-empty string.`);
  }
  if (typeof name !== "string" || !name) {
    throw new Error(`Workflow '${workflowId}' metadata.stages[${index}].name must be a non-empty string.`);
  }

  const type = typeof stage["type"] === "string" ? stage["type"] : undefined;
  const dependsOn = Array.isArray(stage["depends_on"]) ? stage["depends_on"].filter((value): value is string => typeof value === "string") : [];

  return type === undefined ? { id, name, dependsOn } : { id, name, type, dependsOn };
}

function renderKickoffPrompt(workflow: NormalizedRegistryObject, inputs: WorkflowInput[], variables: Map<string, string>): string {
  const stages = getWorkflowStages(workflow);
  const lines = [
    `# Kickoff Prompt: ${workflow.name}`,
    "",
    `Use the registry workflow \`${workflow.id}\`.`,
    "",
    "## Supplied Variables",
    ...renderVariables(inputs, variables),
    "",
    "## Required Registry Assets",
    ...renderList("Tools", workflow.requires?.tools ?? []),
    ...renderList("Skills", workflow.requires?.skills ?? []),
    ...renderList("Environment", workflow.requires?.env ?? []),
    "",
    "## Workflow Stages",
    ...renderStages(stages),
    "",
    "## Agent Instructions",
    "Start at the first workflow stage and proceed in order, using the referenced registry skills and tools.",
    "Stop for human approval before authenticated CLI/MCP calls, external service provisioning, deployments, or irreversible changes.",
    "Treat unmapped services in workflow metadata as manual handoff points until dedicated registry objects exist.",
  ];

  return `${lines.join("\n")}\n`;
}

function renderVariables(inputs: WorkflowInput[], variables: Map<string, string>): string[] {
  const rendered = inputs.map((item) => `- ${item.label} (\`${item.id}\`): ${formatVariableValue(variables.get(item.id))}`);
  const declaredInputIds = new Set(inputs.map((item) => item.id));
  const extraVariables = [...variables.entries()]
    .filter(([key]) => !declaredInputIds.has(key))
    .map(([key, value]) => `- Extra variable (\`${key}\`): ${formatVariableValue(value)}`);

  if (rendered.length === 0 && extraVariables.length === 0) return ["- No workflow inputs declared."];
  return [...rendered, ...extraVariables];
}

function formatVariableValue(value: string | undefined): string {
  return value ?? "(not provided)";
}

function renderList(label: string, values: string[]): string[] {
  if (values.length === 0) return [`- ${label}: none`];
  return [`- ${label}: ${values.join(", ")}`];
}

function renderStages(stages: WorkflowStage[]): string[] {
  if (stages.length === 0) return ["1. No workflow stages declared."];
  return stages.map((stage, index) => {
    const type = stage.type ? ` [${stage.type}]` : "";
    const dependencies = stage.dependsOn.length > 0 ? ` after ${stage.dependsOn.join(", ")}` : "";
    return `${index + 1}. ${stage.name} (\`${stage.id}\`)${type}${dependencies}`;
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
