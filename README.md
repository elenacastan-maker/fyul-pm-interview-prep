# FYUL Supply PM — Interview Prep with Claude Code

A multi-agent project built with [Claude Code](https://claude.ai/code) to prepare for a Supply Product Manager interview at **FYUL** (the merged entity of Printify, Printful, and Snow Commerce).

---

## What's inside

| Folder | Contents |
|--------|----------|
| [`agents/`](agents/) | Prompts used for each Claude agent |
| [`output/`](output/) | Final deliverables |
| [`docs/`](docs/) | Source context and exercise brief |

### Deliverables

- **[`output/prep-fyul.html`](output/prep-fyul.html)** — Interactive single-file study tool with 20 Q&A flashcards, communication style guide, and questions to ask the interviewer. Open in any browser.
- **[`output/premium-leather-prd.md`](output/premium-leather-prd.md)** — Two-page PRD for the PM take-home exercise: expand into premium leather goods or not?
- **[`docs/FYcontext.md`](docs/FYcontext.md)** — Full interview prep guide (Spanish): role context, AI/tech concepts, 20 interview answers, 20 questions to ask Marcel.

---

## Agent architecture

```
01-research-agent      →  Company/role research + market context
02-interview-prep-agent →  Structured Q&A guide (FYUL communication style)
03-pm-exercise-agent   →  PM take-home: PRD for leather goods initiative
04-html-study-tool-agent → Converts guide to interactive HTML
```

Each agent's prompt is documented in [`agents/`](agents/).

---

## How to use

1. Open [`output/prep-fyul.html`](output/prep-fyul.html) in a browser to study
2. Read [`output/premium-leather-prd.md`](output/premium-leather-prd.md) to review the exercise solution
3. See [`CLAUDE.md`](CLAUDE.md) for full project context

---

## Built with

- [Claude Code](https://claude.ai/code) — CLI for Claude
- Claude Sonnet 4.6
- No frameworks — outputs are standalone Markdown + HTML
