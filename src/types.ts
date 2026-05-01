import { z } from "zod";

export const registryKindSchema = z.enum([
  "skill",
  "mcp-server",
  "cli-tool",
  "workflow",
  "prompt",
  "template",
  "policy",
  "agent-package",
  "mcp-profile",
]);

export const scopeSchema = z.enum(["global", "app-specific", "local", "external"]);
export const statusSchema = z.enum(["draft", "active", "deprecated"]);

export const sourceMetadataSchema = z.object({
  origin: z.enum(["local", "imported", "generated"]),
  source_id: z.string().min(1),
  source_path: z.string().optional(),
  upstream_url: z.string().optional(),
  upstream_ref: z.string().optional(),
  imported_at: z.string().nullable().optional(),
});

export const baseRegistryObjectSchema = z.object({
  id: z.string().min(1),
  kind: registryKindSchema,
  name: z.string().min(1),
  scope: scopeSchema,
  version: z.string().min(1),
  status: statusSchema,
  source: sourceMetadataSchema,
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  capabilities: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  requires: z
    .object({
      tools: z.array(z.string()).optional(),
      skills: z.array(z.string()).optional(),
      env: z.array(z.string()).optional(),
    })
    .optional(),
  entrypoints: z.record(z.string(), z.string()).optional(),
  risk: z
    .object({
      level: z.enum(["low", "medium", "high"]),
      reasons: z.array(z.string()).optional(),
      requires_human_review: z.boolean().optional(),
    })
    .optional(),
});

export const genericRegistryObjectSchema = baseRegistryObjectSchema.extend({
  kind: z.enum(["skill", "cli-tool", "workflow", "prompt", "template", "policy", "agent-package"]),
});

export const mcpServerRegistryObjectSchema = baseRegistryObjectSchema.extend({
  kind: z.literal("mcp-server"),
  server: z.object({
    transport: z.enum(["stdio", "sse", "http"]).default("stdio"),
    command: z.string().optional(),
    args: z.array(z.string()).default([]),
    url: z.string().optional(),
    cwd: z.string().optional(),
  }),
  env: z
    .object({
      required: z.array(z.string()).default([]),
      optional: z.array(z.string()).default([]),
    })
    .default({ required: [], optional: [] }),
  used_by: z
    .object({
      skills: z.array(z.string()).optional(),
      profiles: z.array(z.string()).optional(),
    })
    .optional(),
  security: z
    .object({
      review_required: z.boolean(),
      reason: z.string().optional(),
    })
    .optional(),
});

export const mcpProfileRegistryObjectSchema = baseRegistryObjectSchema.extend({
  kind: z.literal("mcp-profile"),
  servers: z.object({
    include: z.array(z.string()).default([]),
    exclude: z.array(z.string()).default([]),
  }),
  env_policy: z
    .object({
      require_explicit_env_mapping: z.boolean().default(true),
      block_inline_secret_values: z.boolean().default(true),
    })
    .optional(),
  export_targets: z.array(z.string()).default([]),
});

export const registryObjectSchema = z.union([
  mcpServerRegistryObjectSchema,
  mcpProfileRegistryObjectSchema,
  genericRegistryObjectSchema,
]);

export const sourceConfigSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(["filesystem", "cursor", "claude-desktop", "github", "notion"]),
    enabled: z.boolean().default(true),
    path: z.string().optional(),
    mode: z.string().optional(),
    repo: z.string().optional(),
    ref: z.string().optional(),
    paths: z.array(z.string()).optional(),
    database_id: z.string().optional(),
    ingest: z.record(z.string(), z.boolean()).optional(),
  })
  .passthrough();

export const registryConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  defaults: z.record(z.string(), z.unknown()).default({}),
  sources: z.array(sourceConfigSchema).default([]),
  output: z
    .object({
      normalized_dir: z.string().default("."),
      raw_sources_dir: z.string().default("./sources"),
      index_dir: z.string().default("./dist"),
    })
    .default({ normalized_dir: ".", raw_sources_dir: "./sources", index_dir: "./dist" }),
  conflicts: z
    .object({
      strategy: z.enum(["prefer-local", "prefer-newer", "fail", "namespace-external"]).default("prefer-local"),
      external_prefix: z.string().default("imported"),
      identity_fields: z.array(z.string()).default(["id", "kind"]),
    })
    .default({ strategy: "prefer-local", external_prefix: "imported", identity_fields: ["id", "kind"] }),
  security: z
    .object({
      require_review_for: z.array(z.string()).default([]),
      block_secret_values: z.boolean().default(true),
      allowed_mcp_command_roots: z.array(z.string()).default(["npx", "uvx", "node", "bunx"]),
    })
    .default({ require_review_for: [], block_secret_values: true, allowed_mcp_command_roots: ["npx", "uvx", "node", "bunx"] }),
});

export const lockfileSchema = z.object({
  version: z.literal(1),
  sources: z.record(
    z.string(),
    z.object({
      type: z.string(),
      repo: z.string().optional(),
      ref: z.string().optional(),
      resolved_ref: z.string().optional(),
      path: z.string().optional(),
      last_ingested_at: z.string(),
      objects: z.array(
        z.object({
          id: z.string(),
          kind: registryKindSchema,
          path: z.string(),
          hash: z.string(),
        }),
      ),
    }),
  ),
});

export type RegistryKind = z.infer<typeof registryKindSchema>;
export type RegistryConfig = z.infer<typeof registryConfigSchema>;
export type SourceConfig = z.infer<typeof sourceConfigSchema>;
export type NormalizedRegistryObject = z.infer<typeof registryObjectSchema>;
export type McpServerRegistryObject = z.infer<typeof mcpServerRegistryObjectSchema>;
export type McpProfileRegistryObject = z.infer<typeof mcpProfileRegistryObjectSchema>;
export type RegistryLockfile = z.infer<typeof lockfileSchema>;

export interface RawIngestedObject {
  sourceId: string;
  sourceType: string;
  sourcePath: string;
  raw: unknown;
}

export interface SourceAdapter {
  id: string;
  type: SourceConfig["type"];
  fetch(): Promise<RawIngestedObject[]>;
  normalize(raw: RawIngestedObject): Promise<NormalizedRegistryObject[]>;
}
