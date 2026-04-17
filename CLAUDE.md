# Danny's Module — Claude Code Guide

## Repo Structure

```
dannysmodule/
├── src/packs/<pack-name>/   # YAML source — what gets committed to git
├── packs/<pack-name>/       # LevelDB runtime files — gitignored, built from src/packs
├── assets/                  # Images, audio, tiles
├── scripts/                 # JS module code + build/unpack scripts
├── styles/                  # CSS
├── templates/               # Handlebars templates
├── module.json              # Foundry module manifest
└── package.json             # npm scripts and devDependencies
```

## Pack Workflow

Packs are stored as YAML in `src/packs/` and built into LevelDB (`packs/`) for Foundry to use. Never commit `packs/` — it's in `.gitignore`.

| Task | Command |
|------|---------|
| After editing content in Foundry | `npm run unpack` then commit `src/packs/` |
| After cloning or pulling YAML changes | `npm run build` |

The scripts live in `scripts/unpack-packs.mjs` and `scripts/build-packs.mjs`. They loop over all 13 packs and call `fvtt-cli` for each.

## Pack Names

`day-actors-dnd5e`, `day-actors-pf2e`, `day-adventures-dnd5e`, `day-adventures-pf2e`, `day-character-dnd5e`, `day-character-pf2e`, `day-items-dnd5e`, `day-items-pf2e`, `day-journals`, `day-macros`, `day-playlists`, `day-rolltables`, `day-scenes`

## Commit Conventions

Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`. Releases are tagged `v1.0.x` and published via GitHub Releases, which triggers the CI workflow to build and publish the module zip.

## What Not to Do

- Do not commit anything inside `packs/` — those are LevelDB runtime files
- Do not commit `node_modules/`
- Do not manually edit files inside `src/packs/` — edit content in Foundry, then `npm run unpack`
- Do not do anything in scripts that are OS dependent.
