# TaskFlow - TP3

Projet du module React + Next.js, M2 Informatique, ESIEE-IT.
Auteur : Edwin Molinier

TaskFlow v2 est une application à plusieurs pages, connectée à une API.
Les projets et les tâches sont stockés par json-server.

## Fonctionnalités

- liste des projets chargée depuis l'API
- une page par projet avec ses tâches (ajout, statut, suppression, filtre)
- création d'un projet avec un formulaire validé
- page 404 pour une adresse ou un projet inexistant
- navigation avec React Router, thème clair / sombre

## Lancer le projet

```
npm install
npm run dev
```

Cette commande démarre l'API (http://localhost:3001) et le site (http://localhost:5173).
Pour remettre les données de départ : `npm run reset-db`

## Démo en ligne

- Site : https://react-sigma-black.vercel.app
- API : https://taskflow-api-tonnom.onrender.com/projects

L'API est sur Render (offre gratuite) : elle s'endort après un moment sans visite,
le premier chargement peut donc prendre environ une minute.
