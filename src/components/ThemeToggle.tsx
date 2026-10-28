"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Au premier affichage : relire le thème enregistré
  useEffect(() => {
    const saved = localStorage.getItem("taskflow-theme") ?? "light";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("taskflow-theme", next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <button type="button" onClick={toggle}>
      {theme === "light" ? "Mode sombre" : "Mode clair"}
    </button>
  );
}
