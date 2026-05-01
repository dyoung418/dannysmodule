# Danny's Module

A private module for Foundry VTT containing scenes, macros, actors, journals, items, playlists, and more. Meant to be portable across worlds and Foundry installations.

## Installing

Go to **Install Module** and enter the manifest URL:

```
https://github.com/dyoung418/dannysmodule/releases/latest/download/module.json
```

## Development Setup

Requires [Node.js](https://nodejs.org/) (v16.7+) and npm. Then install dependencies (this includes `@foundryvtt/foundryvtt-cli`, which is used to convert between LevelDB packs and YAML source files):

```bash
npm install
```

## Compendium Pack Workflow

Compendium packs are stored in git as **YAML source files** under `src/packs/`. The `packs/` directory holds the LevelDB runtime files that Foundry uses — these are built from the YAML and are excluded from git.

### After editing content in Foundry

When you add or change entries in any compendium pack, run:

```bash
npm run unpack
```

This converts the live LevelDB packs (`packs/`) → human-readable YAML (`src/packs/`). Then commit the YAML changes:

```bash
git add src/packs/
git commit -m "feat: describe what changed"
```

### On a fresh install or after git pull (rebuilding packs from source)

After cloning the repo, or pulling new content, build the LevelDB packs that Foundry needs:

```bash
npm install
npm run build
```

This converts `src/packs/` → `packs/`. Do this once after cloning, and again any time you pull changes that include YAML updates.

### Why YAML instead of committing LevelDB directly?

LevelDB files are binary runtime artifacts that Foundry rewrites on every launch. Committing them fills the git history with meaningless binary diffs. YAML files are diffable, reviewable, and don't change unless content actually changes.

## Publishing Updates

1. Commit all changes following [Conventional Commits](https://www.conventionalcommits.org/) format (`fix:`, `feat:`, etc.)
2. Push to GitHub
3. Create a new GitHub Release with a tag in the format `v1.0.5`
4. The GitHub Actions workflow runs automatically on release — check the **Actions** tab to confirm it succeeded
