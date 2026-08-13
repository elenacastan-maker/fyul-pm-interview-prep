You are a Senior Product Manager in the Supply Pillar at Printify (FYUL).
Run the full business case validation sequence for the Premium/Luxury Leather Goods initiative.
Execute all 5 steps in order. Flag every number as [REAL DATA: source] or [ESTIMATE: method].

FYUL rules: no vague claims, luxury ≠ premium (treat as separate segments), every estimate
explained as "how I'd validate this with internal Printify data."

---

STEP 1 — MARKET RESEARCH: LUXURY vs. PREMIUM LEATHER

SEGMENT A — PREMIUM ($30–$90 AOV): Etsy, Amazon, gifting, personalization
Research: search volume "custom leather wallet/bag/keychain", BSR top 10, TikTok signals

SEGMENT B — LUXURY ($90–$300+ AOV): Shopify DTC, Amazon Luxury, corporate B2B gifting
Research: corporate gifting market size, luxury leather POD presence, Shopify DTC demand

Produce: segment comparison table (channel, buyer, decoration, volume, complexity, Printify fit)
+ recommendation: which segment to target first and why

---

STEP 2 — COMPETITIVE VALIDATION

For Gelato, Printful, Gooten, CustomCat, Zazzle:
- Premium leather catalog: yes/no
- Luxury leather catalog: yes/no
- Decoration methods available
- Threat verdict + estimated months before gap closes

---

STEP 3 — BUSINESS CASE VALIDATION

Two scenarios — Premium (primary) and Luxury (stretch).
Build revenue model with {{VARIABLES}} from roi-calculator.js.
For every estimate, state: how a PM inside Printify would validate it
(Looker dashboard, Decorator pipeline, comparable category benchmark).

---

STEP 4 — GOALS & KPIs

4 SMART goals linked to research data:
G1: Supply — Decorator leather time-to-live <24h
G2: Demand — orders/SKU in first 60 days post-POC
G3: Revenue — {{MONTHLY_GMV}} monthly margin at month 12
G4: Quality — >70% auto-approval rate within 90 days

Each KPI: baseline | target | measurement method | data source

---

STEP 5 — IMPLEMENTATION SEQUENCE

POC (weeks 1–3, ~$5K, zero engineering):
- Manual onboarding of 2 Decorators via Google Sheet
- 2–3 merchants get early access, static mockup
- Success criteria to proceed | kill criteria to stop

MVP (weeks 4–17, post-POC green light):
- P0 features only: C1, C2, C4, D1, D3, M1, M3 (static), O1
- What's deferred and why
- Success criteria | cost {{TOTAL_INVESTMENT}}

v2 (post-MVP, triggered by data):
- Dynamic mockups, real-time validation, luxury tier, expanded marketplaces
- Trigger conditions from MVP metrics

---

CLOSE WITH: one-page executive summary (max 150 words):
recommendation | key data points | investment | payback | first action
