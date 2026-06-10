# Agent Adapter Notes

Use this reference only when the user asks to install or adapt `xiaobai-review` in another agent tool.

## Codex / OpenAI Agents

Install with:

```bash
npx github:kquuen/xiaobai-review-skill
```

This installs the whole folder at:

```text
C:\Users\Administrator\.codex\skills\xiaobai-review
```

Required files:

- `SKILL.md`
- `agents/openai.yaml`
- `references/audit-framework.md`
- `references/intake-template.md`
- `references/prompt-bank.md`
- `references/report-template.md`
- `references/agent-adapters.md`

## Claude Code

Install with:

```bash
npx github:kquuen/xiaobai-review-skill -- --target claude --project .
```

This creates or updates a managed block in `CLAUDE.md`.

Use this short header:

```markdown
# xiaobai-review

When reviewing an AI-built backend, use a beginner-friendly acceptance report with 14 directions, P0-P3 risk levels, and L0-L6 evidence levels. Mark unsupported claims as Unverified. Always output direction, specific checks, check method, acceptance criteria, passing criteria, and output content.
```

## Cursor

Install with:

```bash
npx github:kquuen/xiaobai-review-skill -- --target cursor --project .
```

This creates `.cursor/rules/xiaobai-review.mdc`.

Suggested rule frontmatter:

```markdown
---
description: Beginner-friendly backend architecture acceptance with engineering evidence levels
globs:
  - "**/*.py"
  - "**/*.ts"
  - "**/*.js"
  - "**/*.go"
  - "**/*.java"
  - "**/*.sql"
alwaysApply: false
---
```

## ChatGPT Custom GPT or Generic Agent

Export a ChatGPT instruction file with:

```bash
npx github:kquuen/xiaobai-review-skill -- --target chatgpt --project .
```

Paste `SKILL.md` into instructions. Upload or paste these references:

- `audit-framework.md`
- `prompt-bank.md`
- `report-template.md`

Tell the agent: `Never mark a backend item passed unless it has an evidence level.`

## Gemini CLI / Windsurf / Other Rule-Based Agents

Gemini:

```bash
npx github:kquuen/xiaobai-review-skill -- --target gemini --project .
```

This creates or updates `GEMINI.md`.

Windsurf:

```bash
npx github:kquuen/xiaobai-review-skill -- --target windsurf --project .
```

This creates `.windsurf/rules/xiaobai-review.md`.

Generic agents:

```bash
npx github:kquuen/xiaobai-review-skill -- --target agents --project .
```

This creates or updates `AGENTS.md`.

Create a project instruction file supported by that tool, then paste:

- The purpose and operating rules from `SKILL.md`
- The 14-direction table from `audit-framework.md`
- The evidence and risk levels from `SKILL.md`
- The report shape from `report-template.md`

Keep the prompt bank as a separate reusable snippet if the tool supports memories, rules, or reusable prompts.
