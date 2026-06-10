#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const skillName = "xiaobai-review";
const packageRoot = path.resolve(__dirname, "..");
const sourceEntries = ["SKILL.md", "agents", "references"];
const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
const skillsDir = path.join(codexHome, "skills");
const targetDir = path.join(skillsDir, skillName);

function copyRecursive(source, target) {
  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function removeExistingSkill(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

fs.mkdirSync(skillsDir, { recursive: true });
removeExistingSkill(targetDir);

for (const entry of sourceEntries) {
  copyRecursive(path.join(packageRoot, entry), path.join(targetDir, entry));
}

console.log(`Installed ${skillName} to:`);
console.log(targetDir);
console.log("");
console.log("Try it in Codex:");
console.log("Use xiaobai-review to review this backend architecture.");
