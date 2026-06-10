# xiaobai-review-skill

`xiaobai-review` is a backend architecture acceptance Skill for non-technical users who build products with AI coding tools.

It helps users review AI-built or vibe-coded backends with a beginner-friendly explanation, while still requiring engineering evidence for every important claim.

## What It Does

This Skill turns vague backend claims like "the system is done" into a structured acceptance report:

- Reviews backend architecture from 14 directions
- Checks feature modules, APIs, database design, permissions, deployment, and production risks
- Uses P0-P3 risk levels
- Uses L0-L6 engineering evidence levels
- Produces a non-technical report that explains what can go wrong and what to fix
- Generates copy-ready repair prompts for Codex, Cursor, Claude Code, ChatGPT, or other AI coding agents

## Who It Is For

Use this Skill when:

- You are not a backend engineer but need to verify AI-generated backend work
- You are using Codex, Cursor, Claude Code, ChatGPT, Gemini, Windsurf, or similar tools
- You want to know whether a backend is ready for MVP testing, launch, or further development
- You need the AI agent to provide evidence instead of only saying "completed"

## Review Framework

The Skill reviews 14 directions:

1. Business flow coverage
2. Domain model and business rules
3. State machine, transaction, concurrency, and idempotency
4. Database design
5. API design
6. API contract and version stability
7. Feature module boundaries
8. Permission and security
9. Data ownership and isolation
10. Error handling
11. External dependencies, degradation, and compensation
12. Logs, monitoring, and observability
13. Deployment, migration, backup, and recovery
14. Performance, capacity, async jobs, and test evidence

Each direction is reviewed with:

- Direction
- Specific checks
- Check method
- Acceptance criteria
- Passing criteria
- Output content

## Evidence Levels

Every conclusion must include an evidence level:

| Level | Meaning |
|---|---|
| L0 | Unverified: only a guess, claim, or no evidence |
| L1 | Architecture explanation exists, but code was not checked |
| L2 | Code evidence exists: file, function, route, schema, or config |
| L3 | Automated test evidence exists and passes |
| L4 | Local API/runtime verification succeeds |
| L5 | Frontend or end-to-end user flow succeeds |
| L6 | Deployment or production-like environment verification succeeds |

## Risk Levels

| Level | Meaning |
|---|---|
| P0 | Blocks use or may cause data leak, money loss, irreversible data damage, or core flow failure |
| P1 | Must fix before launch; major business flow, security, or data integrity risk |
| P2 | Should fix soon; maintainability, edge case, or user experience risk |
| P3 | Improvement suggestion; does not block current MVP |

## Repository Structure

```text
xiaobai-review-skill/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── agent-adapters.md
    ├── audit-framework.md
    ├── intake-template.md
    ├── prompt-bank.md
    └── report-template.md
```

## Install

Default install for Codex:

```bash
npx github:kquuen/xiaobai-review-skill
```

Universal command:

```bash
npx github:kquuen/xiaobai-review-skill -- --target <target> --project <project-path>
```

Targets:

| Target | What it creates |
|---|---|
| `codex` | `~/.codex/skills/xiaobai-review/` |
| `cursor` | `.cursor/rules/xiaobai-review.mdc` |
| `claude` | Adds a managed block to `CLAUDE.md` |
| `agents` | Adds a managed block to `AGENTS.md` |
| `gemini` | Adds a managed block to `GEMINI.md` |
| `windsurf` | `.windsurf/rules/xiaobai-review.md` |
| `chatgpt` | `xiaobai-review-chatgpt-instructions.md` |
| `all` | Installs every supported local format |

Examples:

```bash
npx github:kquuen/xiaobai-review-skill -- --target cursor --project .
npx github:kquuen/xiaobai-review-skill -- --target all --project .
```

Notes:

- `--target codex` is the default and installs to `~/.codex/skills/xiaobai-review`.
- `--project .` means the current project folder.
- Use `--target all` to generate every supported local format.
- For ChatGPT Custom GPT, paste the generated `xiaobai-review-chatgpt-instructions.md` into the instruction field or upload it as a reference file.

If you use a custom Codex home, set `CODEX_HOME` first:

```bash
CODEX_HOME=/path/to/.codex npx github:kquuen/xiaobai-review-skill
```

PowerShell:

```powershell
$env:CODEX_HOME="C:\path\to\.codex"
npx github:kquuen/xiaobai-review-skill
```

After installation, ask your AI coding tool:

```text
使用 xiaobai-review 帮我验收这个后端。
```

Or in English:

```text
Use xiaobai-review to review this backend architecture.
```

### Manual Install

Copy this repository folder into your Codex skills directory:

```text
C:\Users\Administrator\.codex\skills\xiaobai-review
```

The final structure should look like:

```text
C:\Users\Administrator\.codex\skills\xiaobai-review\SKILL.md
C:\Users\Administrator\.codex\skills\xiaobai-review\agents\openai.yaml
C:\Users\Administrator\.codex\skills\xiaobai-review\references\...
```

## Use With Other AI Coding Tools

For tools that do not support Codex Skill folders, use the matching `--target` installer:

- Claude Code: `--target claude`
- Cursor: `--target cursor`
- ChatGPT Custom GPT: `--target chatgpt`
- Gemini CLI: `--target gemini`
- Windsurf: `--target windsurf`
- Generic agents: `--target agents`

See `references/agent-adapters.md` for more details.

## Example Prompt

```text
请使用 xiaobai-review 验收我的后端。
项目路径是：C:\path\to\backend
这个产品是给非技术用户用 AI 生成商业尽调报告的。
我想确认它是否达到 MVP 可测试标准。
请按 14 个方向输出验收报告，并标注 P0-P3 风险等级和 L0-L6 证据等级。
```

## Important Principle

The core rule of this Skill:

```text
Do not mark backend work as passed unless there is evidence.
If evidence is missing, mark it as Unverified.
```

This keeps non-technical users from being misled by confident but unsupported AI answers.
