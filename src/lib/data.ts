import fs from "node:fs";
import path from "node:path";
import type { Project, ProjectWithTasks, Task } from "./types";

// Ce fichier n'est utilisé QUE par des composants serveur :
// les données ne passent jamais par une API publique.
// Dans un vrai projet : une base de données (PostgreSQL…).
const file = path.join(/*turbopackIgnore: true*/ process.cwd(), "db.json");

type Db = { projects: Project[]; tasks: Task[] };

export function readDb(): Db {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function writeDb(db: Db) {
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
}

// Simule le temps de réponse d'une base de données
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getProjects(): Promise<ProjectWithTasks[]> {
  await wait(600);
  const db = readDb();
  return db.projects.map((p) => ({
    ...p,
    tasks: db.tasks.filter((t) => t.projectId === p.id),
  }));
}

export async function getProject(
  id: string,
): Promise<ProjectWithTasks | null> {
  await wait(600);
  const db = readDb();
  const project = db.projects.find((p) => p.id === id);
  if (!project) return null;
  return { ...project, tasks: db.tasks.filter((t) => t.projectId === id) };
}
