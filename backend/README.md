# Backend Rusty Learn

## Prérequis
- Bun
- PostgreSQL (en ligne, cf. DATABASE_URL)

## Installation
```sh
bun install
```

## Variables d'environnement
Créer un fichier `.env` à la racine du dossier backend :

```
DATABASE_URL=postgres://rusty:<akirawgfb>@localhost:5432/rusty_learn2```

## Lancer le serveur
```sh
bun run src/index.ts
```

## Migrations Drizzle
- Générer une migration :
  ```sh
  bunx drizzle-kit generate:pg --out ./drizzle --schema ./src/schema.ts
  ```
- Appliquer une migration :
  ```sh
  bunx drizzle-kit push:pg --schema ./src/schema.ts
  ```

## Structure
- `src/schema.ts` : schéma Drizzle (tables)
- `src/db.ts` : connexion à la base
- `src/index.ts` : point d'entrée du serveur (à créer)
