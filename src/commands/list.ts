import { readAllRegistryObjects } from "../index/build.js";

export async function listCommand(rootDir: string, kind: string): Promise<void> {
  const kindMap: Record<string, string> = {
    skills: "skill",
    skill: "skill",
    mcp: "mcp-server",
    "mcp-servers": "mcp-server",
  };
  const targetKind = kindMap[kind] ?? kind;
  const objects = (await readAllRegistryObjects(rootDir)).filter((object) => object.kind === targetKind);

  if (objects.length === 0) {
    console.log(`No ${kind} found.`);
    return;
  }

  for (const object of objects) {
    console.log(`${object.id}\t${object.status}\t${object.name}`);
  }
}
