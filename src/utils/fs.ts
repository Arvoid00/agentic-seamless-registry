import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { homedir } from "node:os";
import { parse, stringify } from "yaml";

export function expandHome(input: string): string {
  if (input === "~") return homedir();
  if (input.startsWith("~/")) return join(homedir(), input.slice(2));
  return input;
}

export function resolveFromRoot(rootDir: string, input: string): string {
  const expanded = expandHome(input);
  return resolve(expanded.startsWith("/") ? expanded : join(rootDir, expanded));
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

export async function writeTextFile(path: string, contents: string): Promise<void> {
  await ensureDir(dirname(path));
  await writeFile(path, contents, "utf8");
}

export async function readJsonFile<T = unknown>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

export async function writeJsonFile(path: string, value: unknown): Promise<void> {
  await writeTextFile(path, `${JSON.stringify(value, null, 2)}\n`);
}

export async function readYamlFile<T = unknown>(path: string): Promise<T> {
  return parse(await readFile(path, "utf8")) as T;
}

export async function writeYamlFile(path: string, value: unknown): Promise<void> {
  await writeTextFile(path, stringify(value, { lineWidth: 100 }));
}

export async function walkFiles(root: string): Promise<string[]> {
  if (!(await pathExists(root))) return [];

  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(root, entry.name);
      if (entry.isDirectory()) return walkFiles(entryPath);
      if (entry.isFile()) return [entryPath];
      return [];
    }),
  );

  return files.flat().sort();
}
