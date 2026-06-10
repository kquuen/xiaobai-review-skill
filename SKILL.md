---
name: xiaobai-review
description: Non-technical backend acceptance review for AI-built or vibe-coded systems. Use when the user wants to validate backend architecture, feature modules, APIs, database design, permissions, security, deployment readiness, or production risk with a beginner-friendly report plus engineering evidence levels. Especially useful for Codex, Cursor, Claude Code, ChatGPT, or other agents reviewing backend work made by AI.
---

# Xiaobai Review

## Purpose

Review an AI-built backend for a non-technical user while preserving engineering rigor. Convert vague claims like "the backend is done" into a structured acceptance report with 14 review directions, risk levels, evidence levels, and copy-ready repair prompts.

## Operating Rules

- Do not assume the backend is complete. Mark unsupported claims as `Unverified`.
- Prefer evidence over explanation. A passing item needs code paths, tests, API calls, browser flow, or deployment proof.
- Keep language beginner-friendly. Explain why an issue matters in business terms before technical details.
- Match the user's language. If the user writes Chinese, produce the acceptance report in Chinese.
- Separate `implemented`, `partially implemented`, `missing`, and `unverified`.
- Ask only for missing essentials when blocked: project path, product purpose, target module, and acceptance goal.
- Do not redesign the product unless the review finds a blocker. Focus on acceptance and repair guidance.

## Evidence Levels

Use these levels for every conclusion:

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

## Review Workflow

1. Gather context with `references/intake-template.md`: product goal, target users, backend path, tech stack, database, implemented modules, front end or deployment status, and acceptance goal.
2. Inspect available artifacts: routes/controllers, services, models/schemas/migrations, auth middleware, config, tests, docs, and deployment files.
3. Review the backend across the 14 directions in `references/audit-framework.md`.
4. For each direction, fill six fields: `Direction`, `Specific checks`, `Check method`, `Acceptance criteria`, `Passing criteria`, `Output content`.
5. Assign a risk level and evidence level to every important conclusion.
6. Produce a non-technical acceptance report using `references/report-template.md`.
7. End with copy-ready repair prompts from `references/prompt-bank.md` for P0/P1 issues.

## The 14 Directions

Use the full checklist in `references/audit-framework.md`.

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

## Output Requirements

Always include:

- One-sentence overall verdict: `Pass`, `Pass with fixes`, `Do not launch`, or `Cannot verify`.
- A 14-row acceptance table with the six user-required fields.
- P0/P1 blockers first, with plain-language impact.
- Evidence level for each conclusion.
- Minimum fix list for the next AI coding session.
- Copy-ready prompts the user can paste into Codex/Cursor/Claude Code.

If the user asks for installation in other agents, use `references/agent-adapters.md`.
