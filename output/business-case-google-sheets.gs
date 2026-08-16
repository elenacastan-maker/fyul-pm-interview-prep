/**
 * PRINTIFY — Premium Leather Goods
 * PRD Business Case · Max 2 páginas · Google Apps Script
 *
 * HOW TO USE:
 * 1. Google Sheets → Extensions → Apps Script
 * 2. Pega este archivo completo y guarda (Ctrl+S)
 * 3. Ejecuta buildPRD() desde el menú 🧳 Leather PRD
 * 4. Rellena las celdas amarillas (INPUTS) con datos reales
 * 5. Las celdas azules se calculan solas
 */

// ═══════════════════════════════════════════════════════════════
// MENÚ
// ═══════════════════════════════════════════════════════════════
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🧳 Leather PRD')
    .addItem('Build PRD', 'buildPRD')
    .addItem('Update ROI', 'updateROI')
    .addItem('Reset', 'reset')
    .addToUi();
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
function buildPRD() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const old = ss.getSheetByName('Leather PRD');
  if (old) ss.deleteSheet(old);
  const s = ss.insertSheet('Leather PRD', 0);

  let row = 1;
  row = buildDocHeader(s, row);
  row = buildSection1(s, row);   // Problem Statement + Market Opportunity
  row = buildSection2(s, row);   // Objectives & KPIs
  row = buildSection3(s, row);   // Launch Option (Lean MVP)
  row = buildSection4(s, row);   // ROI Model
  row = buildSection5(s, row);   // Risk & Decision

  formatSheet(s);
  s.activate();

  SpreadsheetApp.getUi().alert(
    '✅ PRD creado.\n\n' +
    '• Celdas AMARILLAS → rellena con datos reales\n' +
    '• Celdas AZULES → se calculan solas\n' +
    '• Para imprimir: Archivo → Imprimir → Sin márgenes → 2 páginas'
  );
}

// ═══════════════════════════════════════════════════════════════
// CABECERA DEL DOCUMENTO
// ═══════════════════════════════════════════════════════════════
function buildDocHeader(s, row) {
  merge(s, row, 1, 1, 7);
  cell(s, row, 1, 'PRODUCT REQUIREMENTS DOCUMENT', 'doc-title');
  row++;

  merge(s, row, 1, 1, 7);
  cell(s, row, 1, 'Expanding into Premium Leather Goods · Printify Supply Pillar', 'doc-sub');
  row++;

  // Meta fila
  const metas = [
    ['Owner', 'Supply PM · Supplier Management'],
    ['Target', 'Q1 2026'],
    ['Status', 'Draft'],
    ['Market', 'USA · 2025'],
  ];
  metas.forEach(([k, v], i) => {
    cell(s, row, i * 2 + 1, k, 'meta-key');
    cell(s, row, i * 2 + 2, v, 'meta-val');
  });
  row++;

  merge(s, row, 1, 1, 7);
  cell(s, row, 1, '⚠️ Celdas AMARILLAS = input manual · Celdas AZULES = calculado · Max 2 páginas al imprimir', 'note');
  row += 2;

  return row;
}

// ═══════════════════════════════════════════════════════════════
// SECCIÓN 1 — PROBLEM STATEMENT + MARKET OPPORTUNITY
// ═══════════════════════════════════════════════════════════════
function buildSection1(s, row) {
  merge(s, row, 1, 1, 7);
  cell(s, row, 1, '01  PROBLEM STATEMENT & MARKET OPPORTUNITY', 'section-head');
  row++;

  // Problem Statement
  cell(s, row, 1, 'Problem Statement', 'sub-head');
  row++;

  const problems = [
    ['Current state (gap)',
     'Decorators are purchasing premium leather blanks but have no Printify channel to list and sell them. They route their catalog to Printful or independent channels. Merchants selling personalized gifts and corporate accessories cannot fulfill leather orders through Printify.'],
    ['Root cause',
     'No leather blueprint schema · No mockup engine support for leather texture · No decoration method config for laser engraving or debossing.'],
    ['Desired state',
     'Decorators self-onboard leather SKUs in <24h · Merchants list custom leather goods on Etsy, Amazon, Shopify via Printify · AOV premium captured: leather $35–80 vs apparel $18–25.'],
  ];

  problems.forEach(([label, text]) => {
    cell(s, row, 1, label, 'label');
    merge(s, row, 2, 1, 6);
    cell(s, row, 2, text, 'text');
    row++;
  });

  row++;

  // Market Opportunity
  cell(s, row, 1, 'Market Opportunity (USA 2025)', 'sub-head');
  row++;

  // Demand signals table
  const demandHeaders = ['Channel', 'Search Term', 'Monthly Searches', 'Avg Price', 'Signal', 'Source'];
  demandHeaders.forEach((h, i) => cell(s, row, i + 1, h, 'col-h'));
  row++;

  const demandRows = [
    ['Etsy USA',    'custom leather wallet',       'HIGH', '$35–70',  'HIGH', 'eRank 2025 — #215 top keyword, 125%+ CTR'],
    ['Etsy USA',    'personalized leather bag',    'HIGH', '$55–120', 'HIGH', 'ShelfTrend 2025 — $130K–270K weekly GMV'],
    ['Etsy USA',    'engraved leather keychain',   'MED',  '$15–35',  'HIGH', 'eRank 2025 — Nov-Dec +57% search growth'],
    ['Amazon USA',  'custom leather wallet',       'HIGH', '$30–65',  'HIGH', 'accio.com — top SKU 8,365 units/month'],
    ['Amazon USA',  'personalized leather gifts',  'HIGH', '$22–65',  'HIGH', 'AmzChart — 1.5–3.5× AOV vs apparel'],
    ['TikTok Shop', 'laser engraved leather',      'HIGH', '$25–45',  'HIGH', 'TikTok Shop category page — 60–80% GM on $5 blank'],
  ];

  demandRows.forEach(r => {
    r.forEach((v, i) => {
      const isInput = i === 2 || i === 4; // searches + signal = inputs
      cell(s, row, i + 1, v, isInput ? 'input' : 'data');
    });
    row++;
  });

  row++;

  // Competitive gap
  cell(s, row, 1, 'Competitive Gap', 'label');
  merge(s, row, 2, 1, 6);
  cell(s, row, 2, 'Gelato: 0 leather products (verified Aug 2025) · Printful: PU/faux-leather patches only, no genuine leather (verified Aug 2025) · Gooten/CustomCat: none. First-mover window: ~18 months [ESTIMATE] before Printful likely enters genuine leather.', 'data-good');
  row += 2;

  return row;
}

// ═══════════════════════════════════════════════════════════════
// SECCIÓN 2 — OBJECTIVES & KPIs
// ═══════════════════════════════════════════════════════════════
function buildSection2(s, row) {
  merge(s, row, 1, 1, 7);
  cell(s, row, 1, '02  OBJECTIVES & SUCCESS METRICS', 'section-head');
  row++;

  const kpiHeaders = ['Metric', 'Baseline', 'Target (12m post-launch)', 'Measurement'];
  kpiHeaders.forEach((h, i) => cell(s, row, i + 1, h, 'col-h'));
  row++;

  const kpis = [
    ['Decorator leather time-to-live', 'N/A', '<24 hours', 'Pipeline timestamp delta'],
    ['Active leather Decorators',       '0',   '',          'Printify dashboard'],
    ['Leather SKUs live in catalog',    '0',   '',          'Catalog tag filter'],
    ['Monthly GMV (platform margin)',   '$0',  '',          'GMV dashboard — leather tag'],
    ['Decorator auto-approval rate',    'N/A', '>70%',      'Ingestion layer logs'],
    ['Merchant NPS — leather category', 'N/A', '>7',        'Post-launch survey'],
  ];

  kpis.forEach(r => {
    r.forEach((v, i) => {
      const isInput = i === 2 && v === ''; // empty targets = input
      cell(s, row, i + 1, v, isInput ? 'input' : 'data');
    });
    row++;
  });

  row++;
  return row;
}

// ═══════════════════════════════════════════════════════════════
// SECCIÓN 3 — LAUNCH OPTION: LEAN MVP
// ═══════════════════════════════════════════════════════════════
function buildSection3(s, row) {
  merge(s, row, 1, 1, 7);
  cell(s, row, 1, '03  RECOMMENDED LAUNCH OPTION — LEAN MVP  (scored 15/20)', 'section-head');
  row++;

  // Scoring matrix
  const scoreHeaders = ['Option', 'Impact', 'Fit', 'Effort', 'Risk', 'Total', 'Verdict'];
  scoreHeaders.forEach((h, i) => cell(s, row, i + 1, h, 'col-h'));
  row++;

  const scoreRows = [
    ['1 — POC First ($5K · 3w)',          '2','2','1','1','14','Not standalone'],
    ['2 — Lean MVP ($47K · 12–14w)',       '4','4','3','2','15','✅ Recommended'],
    ['3 — Full Build ($80–100K · 16–20w)', '5','5','5','4','13','Premature'],
  ];

  scoreRows.forEach((r, idx) => {
    r.forEach((v, i) => {
      const style = idx === 1 ? (i === 6 ? 'data-good' : 'data-highlight') : 'data';
      cell(s, row, i + 1, v, style);
    });
    row++;
  });

  row++;

  // MVP P0 features
  cell(s, row, 1, 'MVP P0 Features (12–14 weeks)', 'sub-head');
  row++;

  const features = [
    ['C1', 'Leather blueprint schema', 'Backend (2 eng)', '3w', 'P0'],
    ['C2', 'Decoration method config: laser engraving + debossing', 'Backend (2 eng)', '3w', 'P0'],
    ['M1', 'Marketplace mapping: Etsy · Amazon · Shopify', 'Backend (1 eng)', '2w', 'P0'],
    ['D1', 'Decorator portal: leather SKU submission + error report', 'Frontend (1 eng)', '2w', 'P0'],
    ['F3', 'Static mockup (leather texture — dynamic in v2)', 'Mockup (1 eng)', '4w', 'P0'],
    ['C4', 'MAT-001: auto-reject Tier 2/3 labeled as Genuine Leather', 'Backend (1 eng)', '1w', 'P0'],
  ];

  const fHeaders = ['ID', 'Feature', 'Owner', 'Duration', 'Priority'];
  fHeaders.forEach((h, i) => cell(s, row, i + 1, h, 'col-h'));
  row++;

  features.forEach(r => {
    r.forEach((v, i) => cell(s, row, i + 1, v, 'data'));
    row++;
  });

  row++;

  // Kill criteria
  cell(s, row, 1, 'Kill criteria', 'label');
  merge(s, row, 2, 1, 6);
  cell(s, row, 2, 'Stop if: <3 Decorators live by Week 6 · OR · time-to-live consistently >48h after portal launch · OR · merchant NPS <5 at 90 days', 'data-warn');
  row += 2;

  return row;
}

// ═══════════════════════════════════════════════════════════════
// SECCIÓN 4 — ROI MODEL
// ═══════════════════════════════════════════════════════════════
function buildSection4(s, row) {
  merge(s, row, 1, 1, 7);
  cell(s, row, 1, '04  ROI MODEL  (edita los inputs amarillos)', 'section-head');
  row++;

  // Two columns: inputs left, outputs right
  cell(s, row, 1, 'INPUT', 'col-h');
  cell(s, row, 2, 'VALUE', 'col-h');
  cell(s, row, 4, 'CALCULATED', 'col-h');
  cell(s, row, 5, 'VALUE', 'col-h');
  row++;

  const inp = [
    ['Active Decorators (steady state)',      10],
    ['Avg SKUs per Decorator',               150],
    ['Avg orders / SKU / month',              50],
    ['Platform margin per order ($)',          5],
    ['Eng. cost per person/week ($)',       3000],
    ['Backend: weeks × engineers',     '3 × 2'],
    ['Mockup engine: weeks × engineers','4 × 1'],
    ['Frontend: weeks × engineers',     '2 × 1'],
    ['Ops: h/week × weeks × rate ($)', '10×12×50'],
    ['GTM: weeks × weekly cost ($)',    '2×2500'],
  ];

  // Input rows
  const inpStartRow = row;
  inp.forEach(([label, val], i) => {
    cell(s, row + i, 1, label, 'label');
    // Only numeric inputs are yellow; text hints are just data
    const isNum = typeof val === 'number';
    cell(s, row + i, 2, isNum ? val : val, isNum ? 'input' : 'data-muted');
  });

  // Calculated outputs alongside inputs
  const r = inpStartRow; // reference
  const calcs = [
    ['Monthly GMV (margin $)',    `=B${r}*B${r+1}*B${r+2}*B${r+3}`],
    ['Annual GMV (12m $)',        `=B${r}*B${r+1}*B${r+2}*B${r+3}*12`],
    ['Eng. Backend ($)',          `=B${r+4}*3*2`],
    ['Eng. Mockup ($)',           `=B${r+4}*4*1`],
    ['Eng. Frontend ($)',         `=B${r+4}*2*1`],
    ['Total Engineering ($)',     `=B${r}*0+B${r+4}*(3*2+4*1+2*1)`],
    ['Ops cost ($)',              `=10*12*50`],
    ['GTM cost ($)',              `=2*2500`],
    ['Total Investment ($)',      `=B${r+4}*(3*2+4*1+2*1)+10*12*50+2*2500`],
    ['Payback (months)',          `=CEILING((B${r+4}*(3*2+4*1+2*1)+10*12*50+2*2500)/(B${r}*B${r+1}*B${r+2}*B${r+3}),1)`],
  ];

  calcs.forEach(([label, formula], i) => {
    cell(s, inpStartRow + i, 4, label, i >= 8 ? 'label' : 'label');
    const calcCell = s.getRange(inpStartRow + i, 5);
    calcCell.setFormula(formula)
      .setBackground('#E8F4FD')
      .setFontColor('#1A4A8A')
      .setFontWeight(i >= 8 ? 'bold' : 'normal')
      .setNumberFormat(i === 9 ? '0" months"' : '$#,##0');
  });

  row += Math.max(inp.length, calcs.length) + 1;
  return row;
}

// ═══════════════════════════════════════════════════════════════
// SECCIÓN 5 — RISK & DECISION
// ═══════════════════════════════════════════════════════════════
function buildSection5(s, row) {
  merge(s, row, 1, 1, 7);
  cell(s, row, 1, '05  RISK ASSESSMENT & DECISION REQUESTED', 'section-head');
  row++;

  // Risk table
  const riskHeaders = ['Risk', 'Likelihood', 'Impact', 'Mitigation'];
  riskHeaders.forEach((h, i) => cell(s, row, i + 1, h, 'col-h'));
  row++;

  const risks = [
    ['Mockup quality insufficient for leather', 'Medium', 'High', 'Pilot 2 Decorators pre-launch · gate on NPS >7'],
    ['Decorator data quality issues', 'High', 'Medium', 'Per-SKU error codes · self-correct in portal · MAT-001 auto-reject'],
    ['Low merchant adoption first 90 days', 'Medium', 'Medium', 'Co-marketing with 3 anchor merchants pre-launch'],
    ['Mockup engine timeline slip', 'High', 'High', 'Decouple: static mockups v1 · dynamic renders v2'],
  ];

  risks.forEach(r => {
    r.forEach((v, i) => {
      const style = i === 1
        ? (v === 'High' ? 'data-warn' : 'data')
        : i === 2
        ? (v === 'High' ? 'data-warn' : 'data')
        : 'data';
      cell(s, row, i + 1, v, style);
    });
    row++;
  });

  row++;

  // Decision
  cell(s, row, 1, 'RECOMMENDATION', 'label');
  merge(s, row, 2, 1, 6);
  cell(s, row, 2, '', 'input'); // PM fills in: Prioritize / Deprioritize
  row++;

  cell(s, row, 1, 'Decision requested', 'label');
  merge(s, row, 2, 1, 6);
  cell(s, row, 2, 'Approve Q1 2026 roadmap inclusion: 2 backend engineers + 1 mockup engineer + 1 frontend engineer · 12–14 weeks · starting January 2026.', 'data');
  row++;

  return row;
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function cell(s, row, col, value, style) {
  const c = s.getRange(row, col);
  c.setValue(value);

  const styles = {
    'doc-title':     { bg:'#16110C', fg:'#F0E8DC', bold:true,  sz:16, wrap:true },
    'doc-sub':       { bg:'#16110C', fg:'#B87333', bold:false, sz:12 },
    'meta-key':      { bg:'#2E2218', fg:'#9A8878', bold:true,  sz:10 },
    'meta-val':      { bg:'#2E2218', fg:'#F0E8DC', bold:false, sz:10 },
    'note':          { bg:'#FDF4E3', fg:'#9A6B1A', bold:false, sz:9,  italic:true },
    'section-head':  { bg:'#B87333', fg:'#FFFFFF', bold:true,  sz:11 },
    'sub-head':      { bg:'#F2EDE6', fg:'#1A1208', bold:true,  sz:10 },
    'col-h':         { bg:'#E0D8CE', fg:'#1A1208', bold:true,  sz:9  },
    'label':         { bg:'#F2EDE6', fg:'#1A1208', bold:true,  sz:10 },
    'text':          { bg:'#FFFFFF', fg:'#1A1208', bold:false, sz:10, wrap:true },
    'data':          { bg:'#FFFFFF', fg:'#1A1208', bold:false, sz:10 },
    'data-muted':    { bg:'#FAFAF8', fg:'#7A6A58', bold:false, sz:10 },
    'data-good':     { bg:'#EBF5EF', fg:'#2E7D52', bold:false, sz:10, wrap:true },
    'data-highlight':{ bg:'#EBF5EF', fg:'#1A1208', bold:true,  sz:10 },
    'data-warn':     { bg:'#FDF4E3', fg:'#9A6B1A', bold:false, sz:10, wrap:true },
    'input':         { bg:'#FFFDE0', fg:'#1A1208', bold:false, sz:10 },
  };

  const st = styles[style] || styles['data'];
  c.setBackground(st.bg)
   .setFontColor(st.fg)
   .setFontWeight(st.bold ? 'bold' : 'normal')
   .setFontSize(st.sz || 10)
   .setFontStyle(st.italic ? 'italic' : 'normal')
   .setWrap(st.wrap || false)
   .setVerticalAlignment('middle');
}

function merge(s, row, col, numRows, numCols) {
  s.getRange(row, col, numRows, numCols).merge();
}

function formatSheet(s) {
  s.setColumnWidth(1, 220);
  s.setColumnWidth(2, 160);
  s.setColumnWidth(3, 130);
  s.setColumnWidth(4, 160);
  s.setColumnWidth(5, 120);
  s.setColumnWidth(6, 100);
  s.setColumnWidth(7,  90);
  s.setFrozenRows(4);
  s.setRowHeight(1, 40);
  s.setRowHeight(2, 28);
}

function updateROI() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leather PRD');
  if (!s) { SpreadsheetApp.getUi().alert('Primero ejecuta Build PRD'); return; }
  SpreadsheetApp.getUi().alert('Edita directamente las celdas amarillas de la sección ROI — se recalculan solas.');
}

function reset() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const s = ss.getSheetByName('Leather PRD');
  if (s) ss.deleteSheet(s);
}
