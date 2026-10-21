"use client"; // composant interactif : il est envoyé au navigateur

import { useState, type FormEvent } from "react";
import { addTask, cycleTask, removeTask } from "@/lib/actions";
import {
  STATUS_LABEL,
  type Priority,
  type Status,
  type Task,
} from "@/lib/types";

type Filter = "all" | Status;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "todo", label: "À faire" },
  { value: "doing", label: "En cours" },
  { value: "done", label: "Terminées" },
];

export function TaskBoard({
  projectId,
  tasks,
}: {
  projectId: string;
  tasks: Task[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>(2);
  const visible =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask(projectId, title.trim(), priority);
    setTitle("");
  }

  return (
    <article className="card">
      <header className="card__header">
        <h2>Tâches</h2>
        <div className="filters" role="group">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={title}
          placeholder="Nouvelle tâche"
          aria-label="Nouvelle tâche"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          aria-label="Priorité"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value) as Priority)}
        >
          <option value={1}>Haute</option>
          <option value={2}>Moyenne</option>
          <option value={3}>Basse</option>
        </select>
        <button disabled={!title.trim()}>Ajouter</button>
      </form>
      {visible.length === 0 && <p className="empty">Aucune tâche à afficher.</p>}
      <ul className="tasks">
        {visible.map((t) => (
          <li key={t.id} className={`task task--${t.status}`}>
            <button
              type="button"
              className="task__status"
              onClick={() => cycleTask(projectId, t.id)}
              title="Passer au statut suivant"
            >
              {STATUS_LABEL[t.status]}
            </button>
            <span className="task__title">{t.title}</span>
            <span className={`prio prio--${t.priority}`}>
              P{t.priority}
            </span>
            <button
              type="button"
              onClick={() => removeTask(projectId, t.id)}
              aria-label={`Supprimer « ${t.title} »`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
