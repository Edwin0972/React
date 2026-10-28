"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { readDb, writeDb } from "./data";
import type { Priority, Status } from "./types";

export async function createProject(formData: FormData) {
  const name = String(formData.get("name")).trim();
  const description = String(formData.get("description")).trim();
  if (!name) return;
  const db = readDb();
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
  db.projects.push({ id, name, description });
  writeDb(db);
  revalidatePath("/");
  redirect(`/projects/${id}`);
}

export async function addTask(
  projectId: string,
  title: string,
  priority: Priority,
) {
  const db = readDb();
  db.tasks.push({
    id: crypto.randomUUID(),
    projectId,
    title,
    status: "todo",
    priority,
  });
  writeDb(db);
  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/");
}

const NEXT: Record<Status, Status> = { todo: "doing", doing: "done", done: "todo" };

export async function cycleTask(projectId: string, taskId: string) {
  const db = readDb();
  const task = db.tasks.find((t) => t.id === taskId);
  if (!task) return;
  task.status = NEXT[task.status];
  writeDb(db);
  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/");
}

export async function removeTask(projectId: string, taskId: string) {
  const db = readDb();
  db.tasks = db.tasks.filter((t) => t.id !== taskId);
  writeDb(db);
  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/");
}
