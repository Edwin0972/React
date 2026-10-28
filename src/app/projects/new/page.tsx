import type { Metadata } from "next";
import { createProject } from "@/lib/actions";

export const metadata: Metadata = { title: "Nouveau projet · TaskFlow" };

export default function NewProjectPage() {
  return (
    <section>
      <h1>Créer un nouveau projet</h1>
      <form action={createProject} className="project-form">
        <label>
          Nom du projet
          <input name="name" required maxLength={60} />
        </label>
        <label>
          Description du projet
          <textarea name="description" rows={3} />
        </label>
        <button type="submit" className="primary">
          Créer le projet
        </button>
      </form>
    </section>
  );
}
