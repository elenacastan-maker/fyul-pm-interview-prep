// ─────────────────────────────────────────────────────────────────────────────
// PRINTIFY — Premium Leather Goods Initiative
// ROI Business Calculator
// Edit the INPUT VARIABLES section, then run: node roi-calculator.js
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════
// INPUT VARIABLES — edit these with real data before running
// ═══════════════════════════════════════════════════════════════════════════

const inputs = {

  // ── MARKET / AOV ──────────────────────────────────────────────────────────
  leather_aov_low:             35,    // $ — avg order value leather goods (low)
  leather_aov_high:            80,    // $ — avg order value leather goods (high)
  apparel_aov:                 22,    // $ — avg order value apparel (baseline)
  tiktok_price_sweetspot:      40,    // $ — impulse gifting ceiling on TikTok Shop

  // ── REVENUE MODEL ─────────────────────────────────────────────────────────
  roi_time_horizon_months:     12,    // months — projection window
  decorators_count:            10,    // number of active Decorators at steady state
  skus_per_decorator:          150,   // avg SKUs per Decorator
  orders_per_sku_month:        50,    // avg orders per SKU per month
  platform_margin_per_order:   5,     // $ — Printify margin per order (spread)

  // ── ENGINEERING COST ──────────────────────────────────────────────────────
  eng_weekly_cost_per_person:  3000,  // $ — fully-loaded weekly cost per engineer [ESTIMATE]
  eng_backend_weeks:           3,
  eng_backend_team:            2,
  eng_mockup_weeks:            4,
  eng_mockup_team:             1,
  eng_frontend_weeks:          2,
  eng_frontend_team:           1,

  // ── OPERATIONAL COST ──────────────────────────────────────────────────────
  ops_hourly_rate:             50,    // $ — Ops specialist hourly cost [ESTIMATE]
  ops_hours_per_week:          10,
  ops_pilot_weeks:             12,
  gtm_weeks:                   2,
  gtm_weekly_cost:             2500,  // $ — commercial team cost per week [ESTIMATE]

  // ── COMPETITIVE WINDOW ────────────────────────────────────────────────────
  competitive_window_months:   18,    // months before Printful/Gelato closes the gap [ESTIMATE]
};

// ═══════════════════════════════════════════════════════════════════════════
// CALCULATIONS — do not edit below this line
// ═══════════════════════════════════════════════════════════════════════════

// Revenue
const monthly_gmv = inputs.decorators_count * inputs.skus_per_decorator * inputs.orders_per_sku_month * inputs.platform_margin_per_order;
const annual_gmv  = monthly_gmv * inputs.roi_time_horizon_months;

// Engineering cost per workstream
const eng_backend_cost  = inputs.eng_backend_weeks  * inputs.eng_backend_team  * inputs.eng_weekly_cost_per_person;
const eng_mockup_cost   = inputs.eng_mockup_weeks   * inputs.eng_mockup_team   * inputs.eng_weekly_cost_per_person;
const eng_frontend_cost = inputs.eng_frontend_weeks * inputs.eng_frontend_team * inputs.eng_weekly_cost_per_person;
const eng_total_weeks   = Math.max(inputs.eng_backend_weeks + inputs.eng_mockup_weeks, inputs.eng_frontend_weeks + inputs.eng_mockup_weeks); // parallel tracks
const eng_total_cost    = eng_backend_cost + eng_mockup_cost + eng_frontend_cost;

// Operational cost
const ops_total_hours = inputs.ops_hours_per_week * inputs.ops_pilot_weeks;
const ops_cost        = ops_total_hours * inputs.ops_hourly_rate;
const gtm_cost        = inputs.gtm_weeks * inputs.gtm_weekly_cost;
const ops_total_cost  = ops_cost + gtm_cost;

// Total investment & payback
const total_investment  = eng_total_cost + ops_total_cost;
const monthly_margin    = monthly_gmv; // margin already baked into platform_margin_per_order
const payback_months    = Math.ceil(total_investment / monthly_margin);

// ═══════════════════════════════════════════════════════════════════════════
// OUTPUT — variables ready to inject into Agent 08 prompt
// ═══════════════════════════════════════════════════════════════════════════

const fmt = (n) => `$${n.toLocaleString('en-US')}`;

const output = {
  LEATHER_AOV_RANGE:          `${fmt(inputs.leather_aov_low)}–${fmt(inputs.leather_aov_high)}`,
  APPAREL_AOV_RANGE:          fmt(inputs.apparel_aov),
  AMAZON_LEATHER_AOV:         fmt(inputs.leather_aov_high),
  AMAZON_APPAREL_AOV:         fmt(inputs.apparel_aov),
  TIKTOK_PRICE_SWEETSPOT:     fmt(inputs.tiktok_price_sweetspot),
  ROI_TIME_HORIZON:           `${inputs.roi_time_horizon_months}-month`,
  DECORATORS_COUNT:           inputs.decorators_count,
  SKUS_PER_DECORATOR:         inputs.skus_per_decorator,
  ORDERS_PER_SKU_MONTH:       inputs.orders_per_sku_month,
  PLATFORM_MARGIN_PER_ORDER:  fmt(inputs.platform_margin_per_order),
  MONTHLY_GMV:                fmt(monthly_gmv),
  ANNUAL_GMV:                 fmt(annual_gmv),
  ENG_BACKEND_WEEKS:          inputs.eng_backend_weeks,
  ENG_BACKEND_TEAM:           inputs.eng_backend_team,
  ENG_BACKEND_COST:           fmt(eng_backend_cost),
  ENG_MOCKUP_WEEKS:           inputs.eng_mockup_weeks,
  ENG_MOCKUP_TEAM:            inputs.eng_mockup_team,
  ENG_MOCKUP_COST:            fmt(eng_mockup_cost),
  ENG_FRONTEND_WEEKS:         inputs.eng_frontend_weeks,
  ENG_FRONTEND_TEAM:          inputs.eng_frontend_team,
  ENG_FRONTEND_COST:          fmt(eng_frontend_cost),
  ENG_TOTAL_WEEKS:            eng_total_weeks,
  ENG_TOTAL_COST:             fmt(eng_total_cost),
  OPS_HOURS:                  `${ops_total_hours}h`,
  OPS_COST:                   fmt(ops_cost),
  GTM_WEEKS:                  inputs.gtm_weeks,
  GTM_COST:                   fmt(gtm_cost),
  OPS_TOTAL_COST:             fmt(ops_total_cost),
  TOTAL_INVESTMENT:           fmt(total_investment),
  MONTHLY_MARGIN:             fmt(monthly_margin),
  PAYBACK_MONTHS:             payback_months,
  COMPETITIVE_WINDOW_MONTHS:  inputs.competitive_window_months,
};

console.log('\n════════════════════════════════════════════════════════');
console.log('  PRINTIFY — Leather Goods ROI Calculator');
console.log('════════════════════════════════════════════════════════\n');

console.log('── REVENUE ──────────────────────────────────────────────');
console.log(`  Monthly GMV (margin):       ${output.MONTHLY_GMV}`);
console.log(`  Annual GMV (${inputs.roi_time_horizon_months}m horizon):    ${output.ANNUAL_GMV}`);
console.log(`  Leather AOV range:          ${output.LEATHER_AOV_RANGE}`);
console.log(`  vs. Apparel AOV:            ${output.APPAREL_AOV_RANGE}\n`);

console.log('── INVESTMENT ───────────────────────────────────────────');
console.log(`  Engineering — Backend:      ${output.ENG_BACKEND_COST} (${output.ENG_BACKEND_WEEKS}w × ${output.ENG_BACKEND_TEAM} eng)`);
console.log(`  Engineering — Mockup:       ${output.ENG_MOCKUP_COST} (${output.ENG_MOCKUP_WEEKS}w × ${output.ENG_MOCKUP_TEAM} eng)`);
console.log(`  Engineering — Frontend:     ${output.ENG_FRONTEND_COST} (${output.ENG_FRONTEND_WEEKS}w × ${output.ENG_FRONTEND_TEAM} eng)`);
console.log(`  Engineering total:          ${output.ENG_TOTAL_COST} (~${output.ENG_TOTAL_WEEKS}w elapsed)`);
console.log(`  Ops (pilot support):        ${output.OPS_COST} (${output.OPS_HOURS})`);
console.log(`  GTM (commercial team):      ${output.GTM_COST}`);
console.log(`  TOTAL INVESTMENT:           ${output.TOTAL_INVESTMENT}\n`);

console.log('── PAYBACK ──────────────────────────────────────────────');
console.log(`  Monthly margin:             ${output.MONTHLY_MARGIN}`);
console.log(`  Payback period:             ${output.PAYBACK_MONTHS} months\n`);

console.log('── COMPETITIVE WINDOW ───────────────────────────────────');
console.log(`  Estimated gap before competitors close in: ${output.COMPETITIVE_WINDOW_MONTHS} months\n`);

console.log('── AGENT 08 VARIABLES (copy → paste into prompt) ────────');
console.log(JSON.stringify(output, null, 2));
console.log('\n════════════════════════════════════════════════════════\n');
