import { join, relative } from "node:path";
import type { NormalizedRegistryObject } from "./types.js";

function safeSegment(value: string): string {
  return value
    .replace(/^mcp\./, "")
    .replace(/^global\./, "")
    .replace(/^app-specific\./, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function objectPath(rootDir: string, object: NormalizedRegistryObject): string {
  const idSegment = safeSegment(object.id);

  if (object.kind === "skill") {
    const scope = object.scope === "app-specific" ? "app-specific" : object.scope === "external" ? "imported" : "global";
    return join(rootDir, "skills", scope, idSegment, "skill.yaml");
  }

  if (object.kind === "mcp-server") {
    return join(rootDir, "mcp", "servers", idSegment, "server.yaml");
  }

  if (object.kind === "mcp-profile") {
    return join(rootDir, "mcp", "profiles", `${idSegment}.yaml`);
  }

  const directories: Record<string, string> = {
    "cli-tool": "cli-tools",
    workflow: "workflows",
    prompt: "templates",
    template: "templates",
    policy: "policies",
    "agent-package": "agent-packages",
  };

  return join(rootDir, directories[object.kind] ?? "templates", idSegment, "object.yaml");
}

export function relativePath(rootDir: string, path: string): string {
  return relative(rootDir, path).replaceAll("\\", "/");
}
