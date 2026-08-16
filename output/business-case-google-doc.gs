/**
 * PRINTIFY — Premium Leather Goods · PRD Google Doc
 *
 * HOW TO USE (dentro del Google Doc que ya tienes abierto):
 * 1. Extensions → Apps Script
 * 2. Pega ESTE archivo completo, guarda (Ctrl+S)
 * 3. Selecciona la función "buildPRD" en el menú desplegable
 * 4. Clic en ▶ Run
 * 5. Autoriza cuando te pida permisos (es tu propio doc)
 *
 * El script borra el contenido actual del doc y escribe la PRD completa.
 * Para reejecutarlo limpiamente vuelve a hacer Run.
 */

var COPPER   = '#B87333';
var DARK     = '#16110C';
var MUTED    = '#7A6A58';
var GO       = '#2E7D52';
var WARN     = '#9A6B1A';
var GRAY_BG  = '#F2EDE6';
var TH_BG    = '#E0D8CE';
var WHITE    = '#FFFFFF';
var LIGHT    = '#FAF8F5';

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
function buildPRD() {
  var doc  = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  body.clear();

  // Page margins (narrow for density)
  var style = {};
  style[DocumentApp.Attribute.MARGIN_TOP]    = 36;
  style[DocumentApp.Attribute.MARGIN_BOTTOM] = 36;
  style[DocumentApp.Attribute.MARGIN_LEFT]   = 54;
  style[DocumentApp.Attribute.MARGIN_RIGHT]  = 54;
  body.setAttributes(style);

  buildDocTitle(body);
  buildMeta(body);
  buildSection1(body);   // Problem Statement + Market Opportunity
  buildSection2(body);   // Objectives & KPIs
  buildSection3(body);   // Key Features
  buildSection4(body);   // Engineering Requirements
  buildSection5(body);   // Lean MVP — Launch Option
  buildSection6(body);   // ROI Model
  buildSection7(body);   // Go-to-Market Plan
  buildSection8(body);   // Risk & Decision

  doc.saveAndClose();
  DocumentApp.getUi().alert('✅ PRD construida.\n\nRevisa las secciones y edita los valores marcados con [EDITAR].');
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function sectionHead(body, num, title) {
  var p = body.appendParagraph(num + '  ' + title);
  p.setSpacingBefore(14).setSpacingAfter(4);
  p.getChild(0).asText()
    .setFontSize(11)
    .setBold(true)
    .setForegroundColor(WHITE)
    .setBackgroundColor(COPPER);
  p.setBackgroundColor(COPPER);
  return p;
}

function subHead(body, text) {
  var p = body.appendParagraph(text);
  p.setSpacingBefore(6).setSpacingAfter(3);
  p.getChild(0).asText().setFontSize(10).setBold(true).setForegroundColor(DARK);
  return p;
}

function labelText(body, label, text, textColor) {
  var p = body.appendParagraph('');
  p.setSpacingBefore(2).setSpacingAfter(2);
  var t = p.editAsText();
  t.insertText(0, label + ': ');
  t.setFontSize(0, label.length + 1, 9.5);
  t.setBold(0, label.length + 1, true);
  t.setForegroundColor(0, label.length + 1, MUTED);
  var start = label.length + 2;
  t.insertText(start, text);
  t.setFontSize(start, start + text.length - 1, 9.5);
  t.setBold(start, start + text.length - 1, false);
  t.setForegroundColor(start, start + text.length - 1, textColor || DARK);
  return p;
}

function noteText(body, text, color) {
  var p = body.appendParagraph(text);
  p.setSpacingBefore(3).setSpacingAfter(3);
  p.getChild(0).asText().setFontSize(9).setItalic(true).setForegroundColor(color || MUTED);
  return p;
}

function spacer(body) {
  var p = body.appendParagraph('');
  p.setSpacingBefore(2).setSpacingAfter(2);
}

function buildTable(body, headers, rows, options) {
  options = options || {};
  var numCols = headers.length;
  var tableData = [headers].concat(rows);
  var table = body.appendTable(tableData);
  table.setBorderWidth(0.5);

  // Header row
  var hdrRow = table.getRow(0);
  for (var c = 0; c < numCols; c++) {
    var cell = hdrRow.getCell(c);
    cell.setBackgroundColor(TH_BG);
    cell.getChild(0).asParagraph().getChild(0).asText()
      .setFontSize(8.5).setBold(true).setForegroundColor(MUTED);
    cell.setPaddingTop(3).setPaddingBottom(3).setPaddingLeft(5).setPaddingRight(5);
  }

  // Data rows
  for (var r = 0; r < rows.length; r++) {
    var row = table.getRow(r + 1);
    var isHighlight = (options.highlightRow !== undefined && r === options.highlightRow);
    for (var c2 = 0; c2 < numCols; c2++) {
      var cell2 = row.getCell(c2);
      if (isHighlight) {
        cell2.setBackgroundColor('#EBF5EF');
        cell2.getChild(0).asParagraph().getChild(0).asText()
          .setFontSize(9).setBold(true).setForegroundColor(GO);
      } else {
        cell2.getChild(0).asParagraph().getChild(0).asText()
          .setFontSize(9).setBold(false).setForegroundColor(DARK);
      }
      cell2.setPaddingTop(3).setPaddingBottom(3).setPaddingLeft(5).setPaddingRight(5);
    }
  }
  return table;
}

// ═══════════════════════════════════════════════════════════════
// DOC TITLE
// ═══════════════════════════════════════════════════════════════
function buildDocTitle(body) {
  var t1 = body.appendParagraph('PRODUCT REQUIREMENTS DOCUMENT');
  t1.setSpacingBefore(0).setSpacingAfter(2);
  t1.getChild(0).asText()
    .setFontSize(16).setBold(true)
    .setForegroundColor(WHITE).setBackgroundColor(DARK);
  t1.setBackgroundColor(DARK);

  var t2 = body.appendParagraph('Expanding into Premium Leather Goods · Printify Supply Pillar');
  t2.setSpacingBefore(0).setSpacingAfter(4);
  t2.getChild(0).asText()
    .setFontSize(11).setBold(false)
    .setForegroundColor(COPPER).setBackgroundColor(DARK);
  t2.setBackgroundColor(DARK);
}

// ═══════════════════════════════════════════════════════════════
// META
// ═══════════════════════════════════════════════════════════════
function buildMeta(body) {
  var metaTable = body.appendTable([
    ['Owner', 'Supply PM · Supplier Management', 'Target', 'Q1 2026', 'Status', 'Draft', 'Market', 'USA · 2025'],
  ]);
  var row = metaTable.getRow(0);
  var keys = [0, 2, 4, 6];
  var vals = [1, 3, 5, 7];
  keys.forEach(function(c) {
    row.getCell(c).setBackgroundColor('#2E2218')
      .getChild(0).asParagraph().getChild(0).asText()
      .setFontSize(8.5).setBold(true).setForegroundColor(MUTED);
  });
  vals.forEach(function(c) {
    row.getCell(c).setBackgroundColor('#2E2218')
      .getChild(0).asParagraph().getChild(0).asText()
      .setFontSize(8.5).setBold(false).setForegroundColor(WHITE);
  });
  metaTable.setBorderWidth(0.5);
  spacer(body);
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1 — PROBLEM STATEMENT + MARKET OPPORTUNITY
// ═══════════════════════════════════════════════════════════════
function buildSection1(body) {
  sectionHead(body, '01', 'PROBLEM STATEMENT & MARKET OPPORTUNITY');

  subHead(body, 'Problem Statement');
  labelText(body, 'Current state',
    'Decorators purchase premium leather blanks but have no Printify channel to list them — they route to Printful or independent channels. Merchants selling personalized gifts and corporate accessories cannot fulfill leather orders through Printify.');
  labelText(body, 'Root cause',
    'No leather blueprint schema · No mockup engine support for leather texture · No decoration method config for laser engraving or debossing.');
  labelText(body, 'Desired state',
    'Decorators self-onboard leather SKUs in <24h · Merchants list custom leather goods on Etsy, Amazon, Shopify via Printify · AOV premium captured: leather $35–80 vs apparel $18–25.');

  spacer(body);
  subHead(body, 'Market Opportunity (USA 2025)');

  buildTable(body,
    ['Channel', 'Search Term', 'Avg Price', 'Signal', 'Source (real data)'],
    [
      ['Etsy USA',    '"custom leather wallet"',        '$35–70',  '★★★ HIGH', 'eRank 2025 — #215 top keyword, 125%+ CTR'],
      ['Etsy USA',    '"personalized leather bag"',     '$55–120', '★★★ HIGH', 'ShelfTrend 2025 — $130K–270K weekly GMV'],
      ['Etsy USA',    '"engraved leather keychain"',    '$15–35',  '★★★ HIGH', 'eRank 2025 — Nov-Dec +57% search growth'],
      ['Amazon USA',  '"custom leather wallet"',        '$30–65',  '★★★ HIGH', 'accio.com — top SKU 8,365 units/month'],
      ['Amazon USA',  '"personalized leather gifts"',   '$22–65',  '★★★ HIGH', 'AmzChart — 1.5–3.5× AOV vs apparel'],
      ['TikTok Shop', '"laser engraved leather"',       '$25–45',  '★★★ HIGH', 'TikTok Shop category — 60–80% gross margin on $5 blank'],
    ]
  );

  spacer(body);
  buildTable(body,
    ['Market metric', 'Value', 'Market metric', 'Value'],
    [
      ['USA leather goods market',       '$54B (2024)',     'Leather wallet CAGR 2023–2030', '9.5%'],
      ['Custom/personalized leather TAM','$2–3B [EST]',     'POD-compatible segment',        '$600M–1.2B [EST]'],
      ['AOV premium vs apparel',         '1.5–3.5×',        'Personalized gifts USA',        '$9.7B · +7% CAGR'],
      ['Consumers paying engraving prem.','42% (AmzChart)', 'First-mover window',            '~18 months [EST]'],
    ]
  );

  spacer(body);
  labelText(body, 'Competitive gap',
    'Gelato: 0 leather products (verified Aug 2025) · Printful: PU/faux-leather patches only — no genuine leather (verified Aug 2025). No major POD platform offers genuine leather + personalization at scale.',
    GO);
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2 — OBJECTIVES & KPIs
// ═══════════════════════════════════════════════════════════════
function buildSection2(body) {
  sectionHead(body, '02', 'OBJECTIVES & SUCCESS METRICS');

  buildTable(body,
    ['Metric', 'Baseline', 'Target (12m post-launch)', 'Measurement'],
    [
      ['Decorator leather time-to-live',  'N/A', '<24 hours',  'Pipeline timestamp delta'],
      ['Active leather Decorators',       '0',   '10',         'Printify dashboard'],
      ['Leather SKUs live in catalog',    '0',   '1,500',      'Catalog tag filter'],
      ['Monthly GMV (platform margin)',   '$0',  '$375K',      'GMV dashboard — leather tag'],
      ['Decorator auto-approval rate',    'N/A', '>70%',       'Ingestion layer logs'],
      ['Merchant NPS — leather category', 'N/A', '>7',         'Post-launch survey'],
    ]
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3 — KEY FEATURES (Agent 12 — 4 layers)
// ═══════════════════════════════════════════════════════════════
function buildSection3(body) {
  sectionHead(body, '03', 'KEY FEATURES & FUNCTIONALITY');

  noteText(body,
    'Prioritization: P0 = launch blocker (Decorator cannot submit OR Merchant cannot list) · P1 = quality gate (requires manual Ops workaround or measurable UX degradation) · P2 = enhancement, safe to defer to v2.',
    MUTED);

  // ── LAYER 1: DECORATOR-FACING ──────────────────────────────
  spacer(body);
  subHead(body, 'Layer 1 — Decorator-facing');
  buildTable(body,
    ['ID', 'Feature', 'What it does', 'What is NOT in v1', 'Persona', 'KPI linked', 'Priority'],
    [
      ['D1', 'Leather SKU submission form',
       'Leather-specific fields in Decorator portal: material_tier (1/2/3), material_name, decoration_method (enum), dimensions, tannery_cert toggle. Supports both form and CSV upload.',
       'Bulk API upload (v2). Analytics on submission volume.',
       'Decorator', 'Time-to-live <24h', 'P0'],
      ['D2', 'Real-time field validation',
       'Instant inline feedback on: material tier vs. display label (MAT-001), file format vs. decoration method, print area vs. product dimensions. Errors shown field-by-field before submit.',
       'ML-based suggestion for corrections (v2). Cross-SKU duplicate detection.',
       'Decorator', 'Decorator auto-approval rate >70%', 'P1'],
      ['D3', 'Per-SKU error report',
       'On rejection: structured error response with error_code (MAT-001, DIM-002…), affected field, human-readable fix instructions, and a link to the correction guide in the portal.',
       'Automated re-submission after correction (v2). Error history log.',
       'Decorator', 'Decorator auto-approval rate >70%', 'P1'],
      ['D4', 'Onboarding progress tracker',
       'Decorator sees real-time status per SKU: submitted → in review → approved → live. Timestamp at each stage. Email notification on status change.',
       'Bulk status export. ETA prediction.',
       'Decorator', 'Time-to-live <24h', 'P1'],
    ]
  );

  // ── LAYER 2: CATALOG & SYSTEM ──────────────────────────────
  spacer(body);
  subHead(body, 'Layer 2 — Catalog & System (backend)');
  buildTable(body,
    ['ID', 'Feature', 'What it does', 'What is NOT in v1', 'Persona', 'KPI linked', 'Priority'],
    [
      ['C1', 'Leather blueprint schema',
       'New product_type = "leather" with sub-fields: material_tier (1|2|3), material_name (string), decoration_methods (array enum), tannery_cert (bool), thickness_mm (float), hardware_type, closure_type, dimensions. Extends existing Printify catalog ingestion pipeline.',
       'Supplier certification API integration. Dynamic field rules per product sub-type.',
       'System', 'Time-to-live <24h · SKUs live 1,500', 'P0'],
      ['C2', 'Decoration method config',
       'Rules engine for 4 methods: laser_engraving | debossing | uv_printing | hot_foil. Each stores: max_area_mm², min_dpi, color_limit, compatible material tiers. Validates Decorator input against method constraints before ingestion.',
       'AI-assisted method recommendation. Real-time print preview on Decorator side.',
       'System', 'Time-to-live <24h · Auto-approval >70%', 'P0'],
      ['C3', 'Confidence scoring engine (v1, rule-based)',
       'Composite score: material completeness (30%) + print spec validity (25%) + FTC compliance (25%) + IP scan flag (20%). Score ≥0.88 → auto-approve · 0.70–0.87 → ops queue · <0.70 → auto-reject with error report.',
       'ML model trained on rejection patterns (v2). Feedback loop from Ops overrides.',
       'System', 'Auto-approval rate >70%', 'P1'],
      ['C4', 'Material classification rules',
       'MAT-001: Tier 2 (Split/Bonded) or Tier 3 (PU/Vegan) SKUs with display label "Genuine Leather" → auto-reject. Error surfaced in portal with correction option. FTC Green Guides compliance built in at schema level.',
       'Full FTC label audit across existing catalog. Third-party tannery verification API.',
       'System', 'Auto-approval rate >70%', 'P0'],
    ]
  );

  // ── LAYER 3: MERCHANT-FACING ───────────────────────────────
  spacer(body);
  subHead(body, 'Layer 3 — Merchant-facing');
  buildTable(body,
    ['ID', 'Feature', 'What it does', 'What is NOT in v1', 'Persona', 'KPI linked', 'Priority'],
    [
      ['M1', 'Leather product listings',
       'Leather blueprint published to Etsy (listing_type=handmade, materials field auto-filled), Amazon (browse_node mapped to leather accessories), Shopify (product_type="Leather Goods"). Channel-specific attribute mapping auto-populated from blueprint.',
       'TikTok Shop and Walmart Marketplace channels (v2). Bulk listing tools.',
       'Merchant', 'Monthly GMV $375K', 'P0'],
      ['M2', 'Personalization UI (text engraving)',
       'Merchant can expose a text input field to end consumer for engraving content. Field passed to Decorator at order time. Validation: max character count per method, font constraint flag.',
       'Logo upload personalization. Consumer preview of engraved result (dynamic mockup, v2).',
       'Merchant', 'Merchant NPS >7 · GMV', 'P1'],
      ['M3', 'Static leather mockup (v1)',
       'Pre-rendered composite image: product photography on leather texture at min 1200×1200px. 3 base textures per tier (Full-Grain brown/black/tan, Top-Grain 2 colours, PU 2 colours). No real-time render in v1.',
       'Dynamic real-time texture render (v2). Consumer-facing personalization preview.',
       'Merchant', 'Merchant NPS >7', 'P0'],
    ]
  );

  // ── LAYER 4: OPS-FACING ────────────────────────────────────
  spacer(body);
  subHead(body, 'Layer 4 — Operations-facing');
  buildTable(body,
    ['ID', 'Feature', 'What it does', 'What is NOT in v1', 'Persona', 'KPI linked', 'Priority'],
    [
      ['O1', 'HITL review queue',
       'UI for Ops to review SKUs with confidence score 0.70–0.87. Shows SKU data, score breakdown by component, and suggested action. SLA target: <4h review time per SKU.',
       'Automated prioritisation by Decorator tier or GMV potential. Mobile-friendly queue (v2).',
       'Ops', 'Auto-approval rate >70% (via queue clearing)', 'P1'],
      ['O2', 'Manual override',
       'Ops can approve or reject any queued SKU with a required reason_code. Override decision feeds back into scoring calibration dataset for v2 ML model. Audit log retained 90 days.',
       'Automated scoring model retraining (v2). Override analytics dashboard.',
       'Ops', 'Auto-approval rate >70%', 'P1'],
      ['O3', 'Decorator error dashboard',
       'Ops visibility into: rejection rate by error_code, top 10 rejection reasons by volume, Decorator-level error frequency. Used to prioritise which error types to add inline guidance for.',
       'Decorator-facing equivalent (v2). Export to Looker/BI tool.',
       'Ops', 'Time-to-live <24h (by reducing error loops)', 'P1'],
    ]
  );

  // ── MVP vs v2 SPLIT ────────────────────────────────────────
  spacer(body);
  subHead(body, 'MVP (12–14 weeks) vs v2 split');
  buildTable(body,
    ['Feature', 'Priority', 'Persona', 'Rationale for MVP inclusion'],
    [
      ['C1 Leather blueprint schema',       'P0', 'System',    'Without this, no leather SKU can exist in catalog. Hard launch blocker.'],
      ['C2 Decoration method config',       'P0', 'System',    'Laser engraving and debossing are the primary consumer differentiation. Needed for channel listing.'],
      ['C4 Material classification rules',  'P0', 'System',    'FTC compliance — legal risk without this. Auto-reject wrong labels at ingestion.'],
      ['D1 Leather SKU submission form',    'P0', 'Decorator', 'Without a portal, Decorator onboarding is 100% manual (Ops bottleneck). Blocks self-service.'],
      ['M1 Leather product listings',       'P0', 'Merchant',  'Channel mapping is what generates GMV. No channel = no revenue signal.'],
      ['M3 Static leather mockup (v1)',     'P0', 'Merchant',  'Merchant cannot list without a product image. Static v1 derisks mockup engine timeline.'],
      ['D2 Real-time field validation',     'P1', 'Decorator', 'Without this, Decorator iterates with Ops manually — high Ops load pre-scale.'],
      ['D3 Per-SKU error report',           'P1', 'Decorator', 'Structured error codes reduce Decorator support tickets from day 1.'],
      ['D4 Onboarding progress tracker',   'P1', 'Decorator', 'Without visibility, Decorators contact Ops for status — adds queue noise.'],
      ['C3 Confidence scoring (rule-based)','P1', 'System',    'Manual review at scale is not sustainable. Rule-based v1 enables auto-approval >70%.'],
      ['O1 HITL review queue',             'P1', 'Ops',        'Ops needs a UI to manage the 0.70–0.87 queue at launch without spreadsheets.'],
      ['O2 Manual override',               'P1', 'Ops',        'No override = Ops cannot unblock stuck SKUs. Audit trail required for compliance.'],
      ['O3 Decorator error dashboard',     'P1', 'Ops',        'Error visibility prevents systematic rejection loops from going unnoticed.'],
    ]
  );

  spacer(body);
  buildTable(body,
    ['Feature', 'Why deferred to v2', 'Risk of deferral'],
    [
      ['M2 Personalization UI (logo upload)',   'Logo IP scanning adds 2–3 weeks. Text-only engraving covers 80% of demand.',      'Lower conversion on logo-engraving merchants — addressable in v2.'],
      ['M3 Dynamic mockup / real-time render',  'Mockup engine at 4w is already critical path. Dynamic render would add 4–6w.',     'Consumer cannot preview personalisation. Mitigated by static mockup + post-launch NPS gate.'],
      ['C3 ML-based confidence scoring',        'Needs labelled rejection data from v1 operation. Cannot train before launch.',     'Higher manual Ops load in first 60 days. Rule-based v1 covers it.'],
      ['M1 TikTok Shop / Walmart channel',      'Etsy + Amazon + Shopify cover primary demand signal. TikTok adds complexity.',    'Miss impulse-gifting segment ($25–45). Addressable when pilot validates order volume.'],
      ['L1 Luxury tier (Full-Grain only)',       'Requires supplier vetting program not yet in place.',                             'Premium price point untapped. Not blocking core GMV.'],
    ]
  );

  // ── TRADE-OFFS ─────────────────────────────────────────────
  spacer(body);
  subHead(body, 'Key trade-offs made');
  buildTable(body,
    ['Trade-off', 'Decision', 'Why', 'Cost', 'Revisit trigger'],
    [
      ['Dynamic mockup vs. static mockup',
       'Ship static v1 on launch · dynamic render in v2',
       'Mockup engine is 4w on critical path — adding dynamic render extends to 8–10w and risks the 14w deadline.',
       'Merchant cannot show consumer a live engraving preview at purchase. Returns risk if product ≠ expectation.',
       'Merchant NPS <7 at 60 days post-launch OR return rate >5% citing mockup mismatch.'],
      ['ML confidence scoring vs. rule-based',
       'Rule-based in v1 · ML model in v2 after 60 days of labelled data',
       'ML model needs ≥1,000 labelled SKU decisions to train reliably. Cannot label before launch exists.',
       'Higher Ops HITL load in first 60 days. Ops team must absorb 0.70–0.87 queue manually.',
       'HITL queue > 100 SKUs/day at steady state OR auto-approval rate <60% after 30 days.'],
      ['Broad channel launch vs. Etsy + Amazon + Shopify first',
       'Launch on 3 channels only · TikTok Shop + Walmart in v2',
       'TikTok Shop requires additional compliance (content policy, UGC rights) and different listing format. Adds 3–4w.',
       'Miss the TikTok impulse-gifting segment ($25–45, 60–80% GM). Estimated ~15% of TAM foregone in Q1.',
       'TikTok Shop leather GMV in competitor catalog exceeds $500K/month OR merchant request rate >20/quarter.'],
    ]
  );

  // ── FEATURE-TO-KPI MAPPING ─────────────────────────────────
  spacer(body);
  subHead(body, 'Feature → KPI mapping');
  buildTable(body,
    ['Feature ID', 'Feature name', 'KPI moved', 'Expected impact'],
    [
      ['C1', 'Leather blueprint schema',        'Time-to-live <24h',           'Enables ingestion pipeline — baseline blocker, 0→live'],
      ['C2', 'Decoration method config',        'Time-to-live <24h',           'Reduces validation errors on method fields — primary rejection source'],
      ['C4', 'Material classification rules',   'Auto-approval rate >70%',     'Eliminates MAT-001 rejections (estimated 30–40% of v1 rejects)'],
      ['D1', 'SKU submission form',             'Time-to-live <24h',           'Self-service removes Ops bottleneck — unlocks Decorator scale'],
      ['D2', 'Real-time validation',            'Auto-approval rate >70%',     'Catches errors before submission — reduces ops_queue volume'],
      ['D3', 'Per-SKU error report',            'Auto-approval rate >70%',     'Structured errors → faster Decorator correction → fewer re-review cycles'],
      ['C3', 'Confidence scoring',              'Auto-approval rate >70%',     'Automates >70% of SKU decisions — Ops only touches 0.70–0.87 band'],
      ['M1', 'Leather product listings',        'Monthly GMV $375K',           'Channel presence is the revenue driver — direct GMV unlock'],
      ['M2', 'Personalization UI',              'Merchant NPS >7 · GMV',       'Engraving is the #1 consumer value driver (42% pay premium)'],
      ['M3', 'Static mockup',                   'Merchant NPS >7',             'Listing quality — baseline merchant satisfaction signal'],
      ['O1+O2', 'HITL queue + override',        'Auto-approval rate >70%',     'Keeps ops_queue from becoming Ops bottleneck at launch'],
    ]
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4 — ENGINEERING REQUIREMENTS
// ═══════════════════════════════════════════════════════════════
function buildSection4(body) {
  sectionHead(body, '04', 'ENGINEERING REQUIREMENTS');

  // ── LEATHER PREMIUM FIELDS ─────────────────────────────────
  subHead(body, '4.1 — Premium Leather Product Schema (all required fields)');
  noteText(body, 'Fields marked ★ are mandatory for P0 launch. Fields marked ◉ are required for eco-certification display on marketplace listing.', MUTED);

  buildTable(body,
    ['Field', 'Type', 'Values / Constraints', 'Required', 'Notes'],
    [
      // Core identity
      ['product_type',       'string (enum)', '"leather"',                                                      '★ P0', 'New product type in catalog'],
      ['material_tier',      'int (1|2|3)',   '1=Full-Grain/Top-Grain · 2=Split/Bonded · 3=PU/Vegan',          '★ P0', 'Drives FTC label & price tier'],
      ['material_name',      'string',        'e.g. "Full-Grain Vegetable-Tanned", "Top-Grain Nappa"',          '★ P0', 'Must match tier — MAT-001 validates'],
      ['tannage_method',     'string (enum)', 'vegetable_tanned | chrome_tanned | aldehyde_tanned | combination','★ P0', 'Impacts eco cert eligibility'],
      ['country_of_origin',  'string (ISO)',  'ISO 3166 country code (e.g. "US", "IT", "MX")',                  '★ P0', 'Required for Customs & CITES'],
      ['tannery_name',       'string',        'Free text — tannery legal name',                                  '★ P0', 'Displayed to Merchant on certificate view'],
      // Dimensions
      ['thickness_mm',       'float',         '≥0.8mm (wallets) · ≥1.2mm (bags) · ≥0.5mm (keychains)',        '★ P0', 'DIM-001 validation rule'],
      ['weight_gsm',         'int',           'Grams per square metre — optional but recommended for Tier 1',   'P1',   'Improves quality signal'],
      // Decoration
      ['decoration_methods', 'array (enum)',  'laser_engraving | debossing | uv_printing | hot_foil',           '★ P0', 'Must match Decorator capability flags'],
      ['max_print_area_mm2', 'int',           'Per method; validated against product dimensions',                '★ P0', 'DEC-001 validation rule'],
      ['personalization',    'bool',          'true = consumer text input at order time',                       '★ P0', 'Enables M2 (Personalization UI)'],
      // Mockup
      ['base_texture_id',    'string (enum)', 'fullgrain_brown | fullgrain_black | topgrain_tan | pu_navy …',   '★ P0', 'References static mockup asset library'],
      ['hardware_finish',    'string (enum)', 'gold | silver | antique_brass | gunmetal | none',                'P1',   'For bags/wallets with hardware'],
      ['closure_type',       'string (enum)', 'zipper | snap | magnetic | buckle | none',                       'P1',   'For bags/folios'],
    ]
  );

  // ── ECO CERTIFICATIONS ─────────────────────────────────────
  spacer(body);
  subHead(body, '4.2 — ECO Certifications (USA market requirements)');
  noteText(body, 'All fields below map to a structured certification object: { cert_id, issuer, certificate_number, valid_until, grade }. Certificate files uploaded by Decorator and verified by Ops pre-approval.', MUTED);

  buildTable(body,
    ['Certification', 'Field', 'Issuer', 'Required for', 'USA relevance', 'Tier eligible'],
    [
      ['Leather Working Group (LWG)',
       'lwg_certification',
       'Leather Working Group',
       'Tier 1 premium display badge on listing',
       '★ Most widely recognised leather eco standard in US retail (Target, Nordstrom, REI require it from suppliers)',
       'Tier 1 & 2'],
      ['OEKO-TEX Standard 100',
       'oeko_tex_standard100',
       'OEKO-TEX Association',
       'Safety compliance display ("tested for harmful substances")',
       '★ Required by major US marketplace policies. Tests 100+ substances incl. heavy metals, formaldehyde, azo dyes.',
       'Tier 1, 2 & 3'],
      ['California Prop 65 compliant',
       'prop65_compliant',
       'OEHHA (CA state) / self-declaration',
       'Mandatory warning or compliant label for California sales',
       '★ Legal requirement — products sold in CA must declare or comply. Key for Amazon US (ships to CA). Covers lead, cadmium, Cr(VI) in chrome-tanned leather.',
       'Tier 1, 2 & 3'],
      ['REACH (Cr VI < 3 mg/kg)',
       'reach_chromium_compliant',
       'EU ECHA / third-party lab test',
       'Chrome-tanned leather only — hexavalent chromium limit',
       'Required for EU imports but de facto standard for US premium buyers. Chrome-tanned = must test. Vegetable-tanned = exempt.',
       'Tier 1 & 2 (chrome-tanned)'],
      ['USDA BioPreferred',
       'usda_biopreferred',
       'USDA (US Department of Agriculture)',
       'Vegan/plant-based leather only — bio-based content certification',
       'Enables "USDA Certified Biobased Product" label. Growing consumer demand in US for bio-based alternatives. Required for federal procurement channels.',
       'Tier 3 (vegan/PU plant-based only)'],
      ['bluesign® approved leather',
       'bluesign_certified',
       'bluesign technologies',
       'Responsible chemical use in tanning process',
       'Premium signal for US eco-conscious brands (Patagonia, REI use bluesign for textiles). Gaining traction in leather. Indicates restricted substance list compliance.',
       'Tier 1 (Full-Grain) recommended'],
      ['Rainforest Alliance / FSC (sourcing)',
       'responsible_sourcing_cert',
       'Rainforest Alliance / SCS Global',
       'Animal welfare & deforestation-free sourcing claim',
       'Growing US retailer requirement (Amazon Aware, Target Clean). Covers beef leather sourcing — deforestation-linked supply chains are under scrutiny (Lacey Act).',
       'Tier 1 & 2 (bovine leather)'],
      ['Genuine Leather label (FTC)',
       'ftc_label_compliant',
       'FTC Green Guides (self-declaration)',
       'All leather tiers — display label compliance',
       '★ Legal requirement in USA. "Genuine Leather" may only be used for Tier 1 (Full-Grain / Top-Grain). Tier 2/3 must use specific names. MAT-001 enforces this at ingestion.',
       'Tier 1 only for "Genuine Leather" label'],
    ]
  );

  spacer(body);
  buildTable(body,
    ['Certification field', 'Schema object structure', 'Storage'],
    [
      ['All cert fields', '{ cert_id: string, issuer: string, certificate_number: string, valid_until: date (ISO 8601), grade: string|null, document_url: string (S3) }', 'Stored in catalog · Indexed for expiry alerts · Ops verified pre-live'],
      ['Expiry alert',    'Automated notification to Decorator when cert expires within 60 days. SKU auto-unpublished if cert expires with no renewal.', 'Backend (scheduler)'],
      ['Ops cert review', 'Certificate document uploaded to S3 by Decorator. Ops reviews in HITL queue alongside SKU data. One-click approve cert or reject with reason.', 'Ops UI (O1 feature)'],
    ]
  );

  noteText(body,
    '★ Mandatory for USA market launch: LWG (Tier 1 premium badge) · OEKO-TEX Standard 100 (all tiers) · California Prop 65 compliance (all tiers — legal) · FTC label compliance (all tiers — legal). REACH Cr(VI) required for any chrome-tanned product.',
    WARN);

  // ── CATALOG & DATA MODEL ───────────────────────────────────
  spacer(body);
  subHead(body, '4.3 — Catalog & Data Model');
  buildTable(body,
    ['Requirement', 'Detail', 'Owner'],
    [
      ['Blueprint validation rules', 'MAT-001: Tier 2/3 cannot use display label "Genuine Leather" (FTC). DIM-001: thickness_mm must be >0.8mm for wallets, >1.2mm for bags. DEC-001: UV printing requires resolution ≥1200 DPI. CERT-001: prop65_compliant = false → listing blocked for US channels.', 'Backend'],
      ['Decoration method schema',   'Enum: laser_engraving | debossing | uv_printing | hot_foil. Each method has: max_area_mm², min_dpi, color_limit, compatible_tiers (array).', 'Backend'],
      ['Certification expiry index', 'Daily job checks cert valid_until dates. 60 days before expiry: notify Decorator. On expiry: auto-unpublish SKU + notify Ops.', 'Backend (scheduler)'],
    ]
  );

  spacer(body);
  subHead(body, '4.4 — Ingestion & Onboarding');
  buildTable(body,
    ['Requirement', 'Detail', 'Owner'],
    [
      ['Decorator portal intake',  'Form + CSV upload. Per-row validation on submit. Error response: { field_id, error_code, fix_instruction }. Supports cert document upload (PDF/JPG, max 10MB).', 'Frontend'],
      ['Ingestion pipeline',       'Existing Printify ingestion extended with leather validation layer + cert verification step. Target: SKU status = live within 24h of submission with no errors.', 'Backend'],
      ['Confidence scoring (v1)',  'Rule-based: completeness (30%) + material code consistency (25%) + cert validity check (25%) + IP scan (20%). Output: auto_approve | ops_queue | auto_reject.', 'Backend'],
    ]
  );

  spacer(body);
  subHead(body, '4.5 — Marketplace & Mockup');
  buildTable(body,
    ['Requirement', 'Detail', 'Owner'],
    [
      ['Marketplace attribute mapping', 'Etsy: listing_type=handmade, materials field auto-filled from material_name + cert badges. Amazon: browse_node for leather accessories + Prop 65 disclosure if required. Shopify: product_type = Leather Goods + eco badge metafield.', 'Backend'],
      ['Eco badge display',             'If lwg_certification ≥ Bronze AND oeko_tex_standard100 = true → display "Certified Leather" badge on marketplace listing. Badge linked to cert details page.', 'Backend + Frontend'],
      ['Static mockup (v1)',            'Pre-rendered composite: product photography on leather texture at 1200×1200px minimum. 3 base textures per tier. No real-time rendering in v1.', 'Mockup'],
    ]
  );

  noteText(body,
    '⚠️  Critical path: Mockup engine (4w) · Certification upload + Ops review flow (2w). Both must be sequenced in the first 6 weeks to allow pre-launch Decorator pilot.',
    WARN);
}

// ═══════════════════════════════════════════════════════════════
// SECTION 5 — LEAN MVP LAUNCH OPTION
// ═══════════════════════════════════════════════════════════════
function buildSection5(body) {
  sectionHead(body, '05', 'RECOMMENDED LAUNCH OPTION — LEAN MVP  (scored 15/20)');

  buildTable(body,
    ['Option', 'Impact', 'Fit', 'Effort', 'Risk', 'Total', 'Verdict'],
    [
      ['1 — POC First ($5K · 3w)',           '2', '2', '1', '1', '14', 'Not standalone'],
      ['2 — Lean MVP (~$53K · 12–14w)',       '4', '4', '3', '2', '15', '✓ Recommended'],
      ['3 — Full Build ($80–100K · 16–20w)', '5', '5', '5', '4', '13', 'Premature'],
    ],
    { highlightRow: 1 }
  );

  spacer(body);
  noteText(body,
    'Kill criteria: Stop if <3 Decorators live by Week 6 · OR · time-to-live consistently >48h after portal launch · OR · merchant NPS <5 at 90 days.',
    WARN);
}

// ═══════════════════════════════════════════════════════════════
// SECTION 6 — ROI MODEL
// ═══════════════════════════════════════════════════════════════
function buildSection6(body) {
  sectionHead(body, '06', 'ROI MODEL');

  buildTable(body,
    ['Input', 'Value', 'Output', 'Value'],
    [
      ['Active Decorators (steady state)',    '10',      'Monthly platform margin',   '$375,000'],
      ['Avg SKUs per Decorator',              '150',     'Annual platform margin',    '$4,500,000'],
      ['Avg orders / SKU / month',            '50',      'Total investment (est.)',   '~$203,600'],
      ['Platform margin per order',           '$5',      'Payback from kickoff',      '~7 months'],
      ['Engineering cost / person / week',   '$3,000',  'Cost of waiting 6 months',  '$675K–$1.1M foregone'],
    ]
  );

  spacer(body);
  noteText(body,
    '⚠️  Critical assumption: 50 orders/SKU/month drives 100% of the revenue case. At 10 orders/SKU/month, payback extends past 30 months and the initiative fails any investment threshold. Validate via 2-Decorator pilot (gate: >50 consumer orders in 30 days) before full engineering commitment.',
    WARN);
}

// ═══════════════════════════════════════════════════════════════
// SECTION 7 — GO-TO-MARKET PLAN
// ═══════════════════════════════════════════════════════════════
function buildSection7(body) {
  sectionHead(body, '07', 'GO-TO-MARKET PLAN');

  subHead(body, 'Launch phases');
  buildTable(body,
    ['Phase', 'Timeline', 'Activity', 'Success gate'],
    [
      ['Pre-launch (closed beta)', 'Weeks 1–10', 'Onboard 2–3 anchor Decorators manually. Validate data quality, SKU time-to-live, and mockup approval.', '≥3 Decorators live, time-to-live <24h'],
      ['Soft launch',              'Week 12–13', 'Open portal to 10 pre-approved Decorators. Etsy + Amazon + Shopify channels live. No paid marketing.', '≥50 consumer orders in 30 days'],
      ['Public launch',            'Week 14+',   'Open Decorator program to waitlist. Co-marketing with anchor merchants. Press note to POD trade media.', '>70% Decorator auto-approval rate'],
      ['v2 roadmap entry',         'Week 20+',   'Dynamic mockups, TikTok Shop channel, confidence scoring ML, luxury tier. Only if pilot KPIs met.', 'Pilot merchant NPS >7'],
    ]
  );

  spacer(body);
  subHead(body, 'Channel & merchant strategy');
  buildTable(body,
    ['Channel', 'Rationale', 'Target segment', 'Price range'],
    [
      ['Etsy USA',    'Proven demand — "leather" #215 top keyword, Nov-Dec +57% search. Gifting & personalization niche.', 'Artisan brands, gift shops',      '$35–120'],
      ['Amazon USA',  'Volume play — top wallet SKU 8,365 units/month. Corporate gifting Q4 spike.',                      'Corporate gifting, branded merch', '$28–65'],
      ['Shopify',     'DTC brands building own leather accessory line. Higher AOV ($55–120), brand control.',              'Premium DTC brands',               '$55–150'],
      ['TikTok Shop', 'Impulse gifting — laser engraved at $25–45 sweet spot. 60–80% GM on $5 blank. (v2 channel)',      'Gen-Z gifting, viral products',    '$20–45'],
    ]
  );

  spacer(body);
  labelText(body, 'Anchor merchant program',
    '3 merchants pre-selected pre-launch to validate merchant UX, mockup quality, and channel listing flow. Criteria: >$10K monthly Printify GMV, existing leather or accessory catalog, Etsy or Amazon primary channel.',
    DARK);
}

// ═══════════════════════════════════════════════════════════════
// SECTION 8 — RISK & DECISION
// ═══════════════════════════════════════════════════════════════
function buildSection8(body) {
  sectionHead(body, '08', 'RISK ASSESSMENT & DECISION REQUESTED');

  buildTable(body,
    ['Risk', 'Likelihood', 'Impact', 'Mitigation'],
    [
      ['Mockup quality insufficient for leather texture',     'Medium', 'High',   'Gate: pilot Decorators approve mockup before public launch. Static v1 derisks timeline.'],
      ['50 orders/SKU/month assumption fails',                'High',   'High',   '2-Decorator pilot gate before full engineering. Stop criteria at 30 days.'],
      ['Decorator data quality causes ingestion errors',      'High',   'Medium', 'Per-SKU error codes + portal self-correction + MAT-001 auto-reject.'],
      ['Low merchant adoption first 90 days',                 'Medium', 'Medium', 'Anchor merchant program pre-launch + co-marketing launch week.'],
      ['Mockup engine timeline slip (4w → 6w+)',              'High',   'High',   'Decouple: static mockups v1 (4w) · dynamic renders v2. No hard dependency on launch.'],
      ['Printful enters genuine leather (<18 months)',        'Medium', 'High',   'First-mover advantage requires Q1 2026 start. Delay = market window at risk.'],
    ]
  );

  spacer(body);
  var rec = body.appendParagraph('RECOMMENDATION: GO WITH CONDITIONS');
  rec.setSpacingBefore(8).setSpacingAfter(4);
  rec.getChild(0).asText()
    .setFontSize(11).setBold(true)
    .setForegroundColor(COPPER);

  labelText(body, 'Decision requested',
    'Approve Q1 2026 roadmap inclusion for the Lean MVP — 2 backend engineers + 1 mockup engineer + 1 frontend engineer, starting January 2026 (12–14 weeks). ' +
    'Gate at Week 6: ≥3 Decorators live and time-to-live <24h before continuing to full team rollout. ' +
    'Gate at Day 30 post-launch: ≥50 consumer orders before committing v2 scope.',
    DARK);
}
