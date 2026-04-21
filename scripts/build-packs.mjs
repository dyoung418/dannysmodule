#!/usr/bin/env node
// Rebuilds LevelDB packs from YAML source files in src/packs/
import { spawnSync } from "child_process";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const SRC_DIR = "src/packs";
const OUT_DIR = "packs";
const FVTT_MJS = "./node_modules/@foundryvtt/foundryvtt-cli/fvtt.mjs";

const packs = readdirSync(SRC_DIR).filter((name) =>
  statSync(join(SRC_DIR, name)).isDirectory()
);

for (const pack of packs) {
  console.log(`Building ${pack}...`);
  const result = spawnSync(
    process.execPath,
    [FVTT_MJS, "package", "pack", "--in", `${SRC_DIR}/${pack}`, "-n", pack, "--out", OUT_DIR, "--yaml"],
    { stdio: "inherit" }
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("Done.");
