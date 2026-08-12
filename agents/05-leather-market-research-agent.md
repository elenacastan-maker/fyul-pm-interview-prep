# Agent 5 — Leather Goods Market Research Agent

## Purpose
Analyze the business opportunity for expanding Printify into premium leather goods. Focused on USA market (2025), competitor landscape, and leather product attributes across major marketplaces.

## Scope
- Market: USA only
- Year: 2025
- Competitors: Gelato (https://dashboard.gelato.com/docs/) vs Printify (https://developers.printify.com/#catalog)
- Marketplaces analyzed: Etsy, Shopify, TikTok Shop, Amazon, eBay, PrestaShop, BigCommerce, Wix, WooCommerce, Squarespace

## Prompt used

```
You are a senior product analyst at Printify. I need a market research report to support a PM decision
on whether to expand into premium leather goods (wallets, bags, belts, keychains, notebooks).

Scope: USA market, 2025 data only.

Research and synthesize the following — flag all estimates vs. real data:

### 1. Business Opportunity
- USA custom leather goods market size and CAGR (2025)
- Key segments: wallets, bags, keychains, phone cases, corporate gifts
- Why 2025 is a relevant inflection point (trends, gifting shifts, TikTok influence)

### 2. Search & Sales Signals (USA)
- Top search terms on Amazon USA for custom/personalized leather goods (volume estimates)
- Top search terms on Etsy USA for leather goods (monthly search volume)
- Average price points and AOV vs. standard apparel on each platform
- Best Seller Rank (BSR) data for Amazon leather accessories

### 3. Marketplace Leather Attributes
For each marketplace below, list the exact product fields and attributes used for leather goods listings:
- Amazon
- Etsy
- Shopify
- TikTok Shop
- eBay
- PrestaShop
- BigCommerce
- Wix
- WooCommerce
- Squarespace

Focus on: material type fields, color/finish, personalization/engraving fields,
hardware attributes, closure types, dimensions, decoration method fields.

### 4. Competitor Analysis
- Does Gelato (gelato.com) offer leather products? What decoration methods do they support?
- Does Printful offer genuine leather goods (not just PU/sublimation)?
- Other POD competitors with leather catalogs?
- Identify whitespace: what no major POD platform offers today.

### 5. Master Attribute Schema
Synthesize a recommended JSON schema for Printify's leather blueprint,
covering all attributes needed to list correctly across all 10 marketplaces.
Include: leather_type, tanning, finish, color, hardware, closure, decoration_methods,
personalization object, dimensions, RFID, card_slots.

Output format: structured Markdown with tables and a JSON code block for the schema.
Cite sources and flag estimates clearly.
```

## Output
→ See [output/leather-goods-market-research-2025.md](../output/leather-goods-market-research-2025.md)

## Key findings summary

| Signal | Finding |
|--------|---------|
| Gelato leather catalog | Zero products — first-mover window open |
| Printful genuine leather | Not offered (only PU sublimation) |
| Etsy "custom leather wallet" | ~95K searches/month USA |
| Amazon leather AOV | 2–4× higher than apparel |
| POD leather whitespace | No major platform well-positioned |
| Top decoration method for POD | Laser engraving + debossing |
| Personalization impact | +40–60% Etsy conversion lift |
