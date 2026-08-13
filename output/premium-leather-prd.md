# PRD: Expanding into Premium Leather Goods
**Printify — Supply Tech | Product Leadership Document**
*Author: Supply PM, Supplier Management Team | Date: August 2025*

---

## 1. Problem Statement

Decorators are actively sourcing premium leather blanks but have no Printify channel to list and sell them. They are routing their catalog to Printful or independent channels. Merchants selling personalized gifts, corporate swag, and premium accessories cannot fulfill leather orders through Printify today.

**Root cause:** No leather-specific blueprint schema, no mockup engine support for leather texture, and no decoration method config for laser engraving or debossing.

---

## 2. Objective

Enable Decorators to self-onboard leather SKUs in <24h and allow merchants to list custom leather goods (wallets, tote bags, belts, keychains) on Etsy, Amazon, and Shopify via Printify — capturing a category with AOV 3–5× higher than standard apparel.

**Recommendation: Prioritize in Q1 2026 planning cycle.**

---

## 3. Success Metrics

| Metric | Baseline | Target (12m post-launch) |
|--------|----------|--------------------------|
| Active leather Decorators | 0 | 10–15 |
| Leather SKUs live in catalog | 0 | 1,500+ |
| Leather goods GMV (monthly) | $0 | $300K–$500K |
| Decorator time-to-live (leather) | N/A | <24h |
| Merchant NPS for leather category | N/A | >7 |

---

## 4. Scope

### In scope — v1
- Catalog schema extension: leather-specific attributes (leather_type, finish, hardware, closure, decoration method)
- Mockup engine: leather texture rendering (embossing/engraving preview)
- Decoration method config: laser engraving and debossing
- Marketplace attribute mapping: Etsy, Amazon, Shopify (v1 channels)
- Decorator portal: error reporting for invalid leather submissions

### Out of scope — v1
- Exotic leathers (crocodile, ostrich)
- Custom hardware/zipper options
- Full automation of Decorator onboarding — manual-assisted for first cohort, automate in v2
- Marketplace mapping beyond Etsy, Amazon, Shopify

---

## 5. Engineering Requirements

| Workstream | Owner | Estimate | Dependency |
|------------|-------|----------|------------|
| Backend — blueprint schema + decoration method config | Backend team | 3 weeks × 2 engineers | None |
| Mockup engine — leather texture rendering | Mockup team | 4 weeks × 1 engineer | Blocks merchant-facing preview |
| Frontend — Decorator portal leather onboarding | Frontend team | 2 weeks × 1 engineer | Backend schema complete |
| **Total elapsed** | | **~12–14 weeks** | Mockup engine is critical path |

**Decoupling strategy:** Launch v1 with static mockups. Upgrade to dynamic leather texture renders in v2 to avoid blocking on mockup engine dependency.

---

## 6. Operational Requirements

- 1 Ops specialist × 10h/week for 12 weeks — manual Decorator onboarding exceptions (pilot: 8–12 Decorators)
- Commercial team: 2 weeks for GTM brief, pricing guidelines, and merchant communication
- Steady state: operational overhead drops to <2h/week once validation automation is live

---

## 7. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Mockup quality insufficient for leather texture | Medium | High | Pilot with 2 Decorators before full rollout; gate launch on merchant NPS >7 |
| Decorator data quality (inconsistent SKU attributes) | High | Medium | Build per-SKU validation with error codes; Decorator self-corrects in portal |
| Low merchant adoption in first 90 days | Medium | Medium | Co-marketing with 3 anchor merchants pre-launch |
| Engineering timeline slips (mockup engine dependency) | High | High | Decouple: static mockups for v1, dynamic renders in v2 |
| Material misrepresentation (PU labeled as genuine leather) | Medium | High | Auto-reject rule (MAT-001) in ingestion layer |

---

## 8. Business Case

- **Revenue opportunity:** $300K–$500K incremental monthly GMV at 12-month run rate (see `roi-calculator.js` for full model)
- **Total investment:** ~$47K–$60K (engineering + ops + GTM)
- **Payback period:** 6–9 months
- **Competitive window:** ~18 months before Printful or Gelato closes the genuine leather POD gap

---

## 9. Decision Requested

Approve inclusion in Q1 2026 roadmap with 2 backend engineers + 1 mockup engineer + 1 frontend engineer allocated for 12–14 weeks starting January 2026.
