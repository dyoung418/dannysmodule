#!/usr/bin/env node
// Unpacks all LevelDB packs → YAML source files in src/packs/
import { spawnSync } from "child_process";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const PACKS_DIR = "packs";
const OUT_DIR = "src/packs";
const FVTT_MJS = "./node_modules/@foundryvtt/foundryvtt-cli/fvtt.mjs";

const packs = readdirSync(PACKS_DIR).filter((name) =>
  statSync(join(PACKS_DIR, name)).isDirectory()
);

for (const pack of packs) {
  console.log(`Unpacking ${pack}...`);
  const result = spawnSync(
    process.execPath,
    [FVTT_MJS, "package", "unpack", "--in", PACKS_DIR, "-n", pack, "--out", `${OUT_DIR}/${pack}`, "--yaml"],
    { stdio: "inherit" }
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("Done.");
