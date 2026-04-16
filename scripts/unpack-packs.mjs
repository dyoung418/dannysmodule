#!/usr/bin/env node
// Unpacks all LevelDB packs → YAML source files in src/packs/
import { execa } from "execa";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const PACKS_DIR = "packs";
const OUT_DIR = "src/packs";
const FVTT = "./node_modules/.bin/fvtt";

const packs = readdirSync(PACKS_DIR).filter((name) =>
  statSync(join(PACKS_DIR, name)).isDirectory()
);

for (const pack of packs) {
  console.log(`Unpacking ${pack}...`);
  await execa(
    FVTT,
    ["package", "unpack", "--in", PACKS_DIR, "-n", pack, "--out", `${OUT_DIR}/${pack}`, "--yaml"],
    { stdio: "inherit" }
  );
}

console.log("Done.");
