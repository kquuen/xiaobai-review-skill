#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const skillName = "xiaobai-review";
const packageRoot = path.resolve(__dirname, "..");
const sourceEntries = ["SKILL.md", "agents", "references"];
const allowedTargets = new Set([
  "codex",
  "cursor",
  "claude",
  "agents",
  "gemini",
  "windsurf",
  "chatgpt",
  "all",
]);

function parseArgs(argv) {
  const options = {
    target: "codex",
    project: process.cwd(),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--target" || arg === "-t") {
      options.target = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === "--project" || arg === "-p") {
      options.project = path.resolve(argv[i + 1]);
      i += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!allowedTargets.has(options.target)) {
    throw new Error(`Unknown target "${options.target}". Use one of: ${Array.from(allowedTargets).join(", ")}`);
  }

  return options;
}

function printHelp() {
  console.log(`Install ${skillName} for Codex and other AI coding tools.

Usage:
  npx github:kquuen/xiaobai-review-skill
  npx github:kquuen/xiaobai-review-skill -- --target cursor --project .
  npx github:kquuen/xiaobai-review-skill -- --target claude --project .
  npx github:kquuen/xiaobai-review-skill -- --target all --project .

Targets:
  codex      Install Codex Skill folder to ~/.codex/skills/xiaobai-review
  cursor     Create .cursor/rules/xiaobai-review.mdc
  claude     Upsert a block into CLAUDE.md
  agents     Upsert a block into AGENTS.md
  gemini     Upsert a block into GEMINI.md
  windsurf   Create .windsurf/rules/xiaobai-review.md
  chatgpt    Export xiaobai-review-chatgpt-instructions.md
  all        Install Codex plus all project rule files
`);
}

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

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(packageRoot, relativePath), "utf8").trim();
}

function buildRuleBody() {
  const skill = readProjectFile("SKILL.md").replace(/^---[\s\S]*?---\s*/, "").trim();
  const framework = readProjectFile("references/audit-framework.md");
  const template = readProjectFile("references/report-template.md");

  return `# xiaobai-review

Use this rule when reviewing AI-built or vibe-coded backend architecture for a non-technical user.

Core rule: do not mark backend work as passed unless there is evidence. If evidence is missing, mark it as Unverified.

${skill}

${framework}

## Required Report Shape

${template}
`;
}

function buildCursorRule() {
  return `---
description: Beginner-friendly backend architecture acceptance review with engineering evidence levels
globs:
  - "**/*.py"
  - "**/*.ts"
  - "**/*.js"
  - "**/*.go"
  - "**/*.java"
  - "**/*.sql"
alwaysApply: false
---

${buildRuleBody()}
`;
}

function buildWindsurfRule() {
  return `# xiaobai-review

Activation Mode: Manual

${buildRuleBody()}
`;
}

function buildChatGptInstructions() {
  const prompts = readProjectFile("references/prompt-bank.md");
  return `${buildRuleBody()}

## Prompt Bank

${prompts}
`;
}

function upsertBlock(filePath, blockName, content) {
  const start = `<!-- ${blockName}:start -->`;
  const end = `<!-- ${blockName}:end -->`;
  const block = `${start}\n${content.trim()}\n${end}`;
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  const pattern = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`);
  const next = pattern.test(existing)
    ? existing.replace(pattern, block)
    : `${existing.trimEnd()}${existing.trim() ? "\n\n" : ""}${block}\n`;

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, next, "utf8");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function installCodex() {
  const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
  const skillsDir = path.join(codexHome, "skills");
  const targetDir = path.join(skillsDir, skillName);

  fs.mkdirSync(skillsDir, { recursive: true });
  removeExistingSkill(targetDir);

  for (const entry of sourceEntries) {
    copyRecursive(path.join(packageRoot, entry), path.join(targetDir, entry));
  }

  console.log(`Installed Codex Skill to: ${targetDir}`);
}

function installCursor(projectDir) {
  const target = path.join(projectDir, ".cursor", "rules", "xiaobai-review.mdc");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, buildCursorRule(), "utf8");
  console.log(`Installed Cursor rule to: ${target}`);
}

function installClaude(projectDir) {
  const target = path.join(projectDir, "CLAUDE.md");
  upsertBlock(target, "xiaobai-review", buildRuleBody());
  console.log(`Installed Claude Code instructions to: ${target}`);
}

function installAgents(projectDir) {
  const target = path.join(projectDir, "AGENTS.md");
  upsertBlock(target, "xiaobai-review", buildRuleBody());
  console.log(`Installed AGENTS.md instructions to: ${target}`);
}

function installGemini(projectDir) {
  const target = path.join(projectDir, "GEMINI.md");
  upsertBlock(target, "xiaobai-review", buildRuleBody());
  console.log(`Installed Gemini CLI context to: ${target}`);
}

function installWindsurf(projectDir) {
  const target = path.join(projectDir, ".windsurf", "rules", "xiaobai-review.md");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, buildWindsurfRule(), "utf8");
  console.log(`Installed Windsurf rule to: ${target}`);
}

function installChatGpt(projectDir) {
  const target = path.join(projectDir, "xiaobai-review-chatgpt-instructions.md");
  fs.writeFileSync(target, buildChatGptInstructions(), "utf8");
  console.log(`Exported ChatGPT instructions to: ${target}`);
}

function installTarget(target, projectDir) {
  switch (target) {
    case "codex":
      installCodex();
      break;
    case "cursor":
      installCursor(projectDir);
      break;
    case "claude":
      installClaude(projectDir);
      break;
    case "agents":
      installAgents(projectDir);
      break;
    case "gemini":
      installGemini(projectDir);
      break;
    case "windsurf":
      installWindsurf(projectDir);
      break;
    case "chatgpt":
      installChatGpt(projectDir);
      break;
    case "all":
      installCodex();
      installCursor(projectDir);
      installClaude(projectDir);
      installAgents(projectDir);
      installGemini(projectDir);
      installWindsurf(projectDir);
      installChatGpt(projectDir);
      break;
    default:
      throw new Error(`Unsupported target: ${target}`);
  }
}

try {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  installTarget(options.target, options.project);
  console.log("");
  console.log("Try it:");
  console.log("Use xiaobai-review to review this backend architecture.");
} catch (error) {
  console.error(error.message);
  console.error("");
  printHelp();
  process.exit(1);
}
