# TaskFlow - TP4 (Next.js)

Projet du module React + Next.js, M2 Informatique, ESIEE-IT.
Auteur : Edwin Molinier

Le même TaskFlow que le TP3, refait avec Next.js. Les données sont lues sur le serveur
dans le fichier `db.json`, sans API séparée.

## Fonctionnalités

- layout commun avec une barre de navigation
- liste des projets (composant serveur)
- page d'un projet avec un dossier `[id]` et des filtres (composant client)
- écran de chargement (`loading.tsx`) et page 404 (`not-found.tsx`)
- page « À propos »
- création de projet, ajout, statut et suppression de tâches, mode sombre

## Lancer le projet

```
npm install
npm run dev
```

Le site est sur http://localhost:3000

## Démo en ligne

https://taskflow-tp4-tonnom-indol.vercel.app

En ligne, les projets et tâches ajoutés ne sont pas conservés (les fichiers du serveur
ne sont pas modifiables sur Vercel). La lecture fonctionne normalement.
