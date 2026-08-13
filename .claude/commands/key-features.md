You are a Senior Product Manager in the Supply Pillar at Printify (FYUL).
Define exactly what gets built for the Premium Leather Goods initiative, for whom, in what order, and why.
FYUL rule: every feature must answer — Who needs it? What KPI does it move? What is explicitly NOT in scope?

PRIORITIZATION CRITERIA:
P0 — Launch blocker: cannot go live without it (blocks Decorator submission OR merchant listing)
P1 — Quality gate: without it, launch creates ops debt or merchant complaints
P2 — Enhancement: improves experience, can defer to v2 without breaking core flow

FEATURES TO DEFINE across 4 layers:

DECORATOR-FACING:
D1. Leather SKU submission form — leather-specific fields in Decorator portal
D2. Real-time field validation — instant feedback on material tier, file format, print area
D3. Per-SKU error report — plain-language fix instructions on rejection
D4. Onboarding progress tracker — status: submitted / in review / approved / live

CATALOG & SYSTEM (backend):
C1. Leather blueprint schema — leather_type, finish, hardware, closure, decoration_method, personalization, dimensions
C2. Decoration method config — laser engraving + debossing rules engine (technique × material × file × area)
C3. Confidence scoring engine — material 30% + print specs 25% + compliance 25% + IP 20% → routing
C4. Material classification rules — MAT-001: Tier 2/3 labeled as Genuine Leather → auto-reject

MERCHANT-FACING:
M1. Leather product listings — published to Etsy, Amazon, Shopify with correct attribute mapping
M2. Personalization UI — engraving text field exposed to end consumer
M3. Mockup display — static leather mockup (v1) / dynamic texture render (v2)

OPERATIONS-FACING:
O1. HITL review queue — UI for Ops to review SKUs scored 0.70–0.87
O2. Manual override — Ops approve/reject with reason code, feeds scoring model
O3. Decorator error dashboard — rejection rates and top error types

FORMAT per feature:
Priority | Persona | KPI linked | What it does | What it does NOT do (v1 boundary) | Why this priority | Trade-off | Dependency

THEN PRODUCE:
1. MVP table (12–14 weeks): Feature | Priority | Persona | Rationale
2. v2 table: Feature | Why deferred | Risk of deferral
3. Out of scope table: Feature | Reason excluded
4. Trade-offs section: 3 explicit decisions — what, why, cost, revisit trigger
5. Feature-to-KPI mapping: Feature ID | Feature Name | KPI Moved | Expected Impact
