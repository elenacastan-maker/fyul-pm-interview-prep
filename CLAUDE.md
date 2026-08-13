# FYUL PM Interview Prep — Claude Code Project

## Project Overview

This project uses Claude Code (with multi-agent orchestration) to help a Product Manager candidate prepare for a Supply PM role at FYUL (merged entity of Printify, Printful, and Snow Commerce).

## What was built

1. **Interview preparation guide** — Deep research on FYUL's Supply Tech team, 20 likely interview questions with structured answers, and 20 questions to ask the interviewer.
2. **PM Exercise: Premium Leather Goods** — A two-page leadership document (PRD format) to convince Product Leadership to prioritize or deprioritize the initiative of expanding into premium leather goods.
3. **Interactive HTML study guide** — A fully self-contained web app (`output/prep-fyul.html`) with progress tracking, flashcard-style Q&A review, and dark/light mode.

## How agents were used

- A **research agent** gathered market context on premium leather goods, print-on-demand trends, and Printify/Printful capabilities.
- A **writing agent** drafted the PRD document and the interview answer guide following FYUL's direct, data-backed communication style.
- A **frontend agent** built the interactive HTML study tool from the content above.

## File structure

```
agents/          # Prompts used to instruct each Claude agent
output/          # Final deliverables
docs/            # Source documents and context files
CLAUDE.md        # This file
```

## Stack

- Claude Code CLI (claude.ai/code)
- Claude Sonnet 4.6 (primary model)
- No external dependencies — outputs are standalone HTML/Markdown
