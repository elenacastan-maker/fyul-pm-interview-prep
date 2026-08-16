/**
 * PRINTIFY — Premium Leather Goods Business Case
 * Google Apps Script
 *
 * HOW TO USE:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this entire file and save
 * 3. Run buildBusinessCase() from the menu or click ▶
 * 4. A new sheet "Business Case" will be created with all sections
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🧳 Leather Case')
    .addItem('Build Business Case', 'buildBusinessCase')
    .addItem('Update ROI Model', 'updateROIModel')
    .addItem('Reset', 'resetSheet')
    .addToUi();
}

// ─────────────────────────────────────────────────────────────
// MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────
function buildBusinessCase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Remove existing sheet if present
  const existing = ss.getSheetByName('Business Case');
  if (existing) ss.deleteSheet(existing);

  const sheet = ss.insertSheet('Business Case', 0);

  buildHeader(sheet);
  buildTrackA(sheet);
  buildTrackB(sheet);
  buildTrackC(sheet);
  buildROIModel(sheet);
  buildSynthesis(sheet);

  formatSheet(sheet);
  sheet.activate();
  SpreadsheetApp.getUi().alert('✅ Business Case built. Review each section and update the yellow INPUT cells with real data.');
}

// ─────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────
function buildHeader(sheet) {
  setCell(sheet, 1, 1, 'PRINTIFY — Premium Leather Goods: Business Case', 'header-title');
  setCell(sheet, 2, 1, 'Supply Pillar · USA Market · 2025', 'subheader');
  setCell(sheet, 3, 1, 'Decision: Prioritize or Deprioritize the initiative', 'subheader');
  setCell(sheet, 4, 1, 'Yellow cells = INPUT (edit with real data)  |  Blue cells = CALCULATED', 'note');
  sheet.setRowHeight(1, 36);
}

// ─────────────────────────────────────────────────────────────
// TRACK A — MARKET DEMAND
// ─────────────────────────────────────────────────────────────
function buildTrackA(sheet) {
  const startRow = 6;
  setCell(sheet, startRow,     1, 'TRACK A — MARKET DEMAND RESEARCH (USA 2025)', 'section-header-a');
  setCell(sheet, startRow + 1, 1, 'Is there proven demand for custom premium leather goods in the USA?', 'section-sub');

  // Column headers
  const headers = ['Channel', 'Search Term', 'Monthly Searches', 'Avg Price ($)', 'Active Listings', 'Signal Strength', 'Source / Flag'];
  headers.forEach((h, i) => setCell(sheet, startRow + 3, i + 1, h, 'col-header'));

  // Data rows — yellow = input cells
  const rows = [
    ['Etsy USA', 'custom leather wallet',       '', '', '', '', '[ESTIMATE: eRank]'],
    ['Etsy USA', 'personalized leather bag',     '', '', '', '', '[ESTIMATE: eRank]'],
    ['Etsy USA', 'engraved leather keychain',    '', '', '', '', '[ESTIMATE: eRank]'],
    ['Amazon USA', 'custom leather wallet',      '', '', '', '', '[ESTIMATE: Jungle Scout]'],
    ['Amazon USA', 'personalized leather gifts', '', '', '', '', '[ESTIMATE: Helium10]'],
    ['TikTok Shop', 'laser engraved leather',    '', '', '', '', '[ESTIMATE: Creator Marketplace]'],
  ];

  rows.forEach((row, i) => {
    row.forEach((val, j) => {
      const isInput = j >= 2 && j <= 5;
      setCell(sheet, startRow + 4 + i, j + 1, val, isInput ? 'input' : 'data');
    });
  });

  const verdictRow = startRow + 4 + rows.length + 1;
  setCell(sheet, verdictRow, 1, 'Demand Verdict:', 'label-bold');
  setCell(sheet, verdictRow, 2, 'STRONG / MODERATE / WEAK', 'input');
  setCell(sheet, verdictRow + 1, 1, 'Top insight:', 'label-bold');
  setCell(sheet, verdictRow + 1, 2, '', 'input');
  sheet.getRange(verdictRow + 1, 2, 1, 5).merge();
}

// ─────────────────────────────────────────────────────────────
// TRACK B — BUSINESS CASE
// ─────────────────────────────────────────────────────────────
function buildTrackB(sheet) {
  const startRow = 21;
  setCell(sheet, startRow,     1, 'TRACK B — COMPETITIVE GAP & BUSINESS CASE', 'section-header-b');
  setCell(sheet, startRow + 1, 1, 'Does the revenue opportunity justify the investment?', 'section-sub');

  // Competitor matrix
  const compHeaders = ['Competitor', 'Leather Catalog', 'Genuine Leather', 'Decoration Methods', 'Threat Level', 'Time to Close Gap'];
  compHeaders.forEach((h, i) => setCell(sheet, startRow + 3, i + 1, h, 'col-header'));

  const competitors = [
    ['Gelato',     'None (2025)', 'No', 'DTG, Sublimation, Embroidery', 'Low — no leather today', '12–18 months [EST]'],
    ['Printful',   'PU only',     'No', 'Sublimation on PU leather',    'Low — no genuine leather', '12–18 months [EST]'],
    ['Gooten',     'Partial',     'No', 'Limited journal covers',        'Low', '6–12 months [EST]'],
    ['CustomCat',  'None',        'No', 'N/A',                           'None', 'N/A'],
  ];

  competitors.forEach((row, i) => {
    row.forEach((val, j) => {
      setCell(sheet, startRow + 4 + i, j + 1, val, j === 4 ? 'data-good' : 'data');
    });
  });

  const compEnd = startRow + 4 + competitors.length;
  setCell(sheet, compEnd + 1, 1, 'Whitespace summary:', 'label-bold');
  setCell(sheet, compEnd + 1, 2, 'No major POD platform offers genuine leather goods with engraving/debossing at scale.', 'data');
  sheet.getRange(compEnd + 1, 2, 1, 5).merge();
}

// ─────────────────────────────────────────────────────────────
// TRACK C — LAUNCH OPTIONS SCORING
// ─────────────────────────────────────────────────────────────
function buildTrackC(sheet) {
  const startRow = 36;
  setCell(sheet, startRow,     1, 'TRACK C — LAUNCH OPTIONS SCORING', 'section-header-c');
  setCell(sheet, startRow + 1, 1, 'Which option fits Printify best? Score: Impact + Fit + (6-Effort) + (6-Risk). Max = 20', 'section-sub');

  const scoreHeaders = ['Option', 'Description', 'Cost (est.)', 'Duration', 'Impact (1–5)', 'Effort (1–5)', 'Risk (1–5)', 'Fit (1–5)', 'TOTAL', 'Recommended?'];
  scoreHeaders.forEach((h, i) => setCell(sheet, startRow + 3, i + 1, h, 'col-header'));

  const options = [
    ['1 — POC First',    'Manual onboard 2 Decorators, 0 engineering', '$5K',     '3 weeks'],
    ['2 — Lean MVP',     'P0 features: schema, decoration config, static mockup', '$47K', '12–14 weeks'],
    ['3 — Full Build',   'All features + dynamic mockups + 10 marketplaces', '$80–100K', '16–20 weeks'],
  ];

  options.forEach((row, i) => {
    const r = startRow + 4 + i;
    row.forEach((val, j) => setCell(sheet, r, j + 1, val, 'data'));
    // Score inputs (cols 5–8)
    for (let j = 4; j < 8; j++) setCell(sheet, r, j + 1, '', 'input');
    // Total formula
    sheet.getRange(r, 9).setFormula(
      `=IF(AND(E${r}<>"",F${r}<>"",G${r}<>"",H${r}<>""), E${r}+H${r}+(6-F${r})+(6-G${r}), "")`
    );
    sheet.getRange(r, 9).setBackground('#E8F4FD').setFontWeight('bold');
    setCell(sheet, r, 10, '', 'input');
  });

  const recRow = startRow + 4 + options.length + 1;
  setCell(sheet, recRow, 1, 'Recommended option:', 'label-bold');
  setCell(sheet, recRow, 2, '', 'input');
  setCell(sheet, recRow + 1, 1, 'Kill criteria:', 'label-bold');
  setCell(sheet, recRow + 1, 2, '', 'input');
  sheet.getRange(recRow, 2, 1, 4).merge();
  sheet.getRange(recRow + 1, 2, 1, 4).merge();
}

// ─────────────────────────────────────────────────────────────
// ROI MODEL
// ─────────────────────────────────────────────────────────────
function buildROIModel(sheet) {
  const startRow = 52;
  setCell(sheet, startRow, 1, 'ROI MODEL — Edit yellow inputs, blue cells auto-calculate', 'section-header-roi');

  // Inputs
  const inputs = [
    ['Active Decorators at steady state',   10],
    ['Avg SKUs per Decorator',             150],
    ['Avg orders per SKU per month',        50],
    ['Platform margin per order ($)',         5],
    ['Engineering cost per person/week ($)', 3000],
    ['Engineering: backend (weeks)',          3],
    ['Engineering: backend (engineers)',      2],
    ['Engineering: mockup (weeks)',           4],
    ['Engineering: mockup (engineers)',       1],
    ['Engineering: frontend (weeks)',         2],
    ['Engineering: frontend (engineers)',     1],
    ['Ops specialist: hours/week',           10],
    ['Ops pilot duration (weeks)',           12],
    ['Ops hourly rate ($)',                   50],
    ['GTM weeks',                             2],
    ['GTM weekly cost ($)',                2500],
  ];

  setCell(sheet, startRow + 2, 1, 'INPUT', 'col-header');
  setCell(sheet, startRow + 2, 2, 'VALUE', 'col-header');

  inputs.forEach(([label, val], i) => {
    setCell(sheet, startRow + 3 + i, 1, label, 'data');
    setCell(sheet, startRow + 3 + i, 2, val, 'input');
  });

  // Calculated outputs
  const outStartRow = startRow + 3 + inputs.length + 2;
  setCell(sheet, outStartRow - 1, 1, 'CALCULATED OUTPUT', 'col-header');
  setCell(sheet, outStartRow - 1, 2, 'VALUE', 'col-header');

  const r = startRow + 3; // reference row for inputs
  const calcs = [
    ['Monthly GMV (margin)',        `=B${r}*B${r+1}*B${r+2}*B${r+3}`],
    ['Annual GMV (12 months)',      `=B${outStartRow}*12`],
    ['Eng. Backend cost ($)',       `=B${r+4}*B${r+5}*B${r+6}`],
    ['Eng. Mockup cost ($)',        `=B${r+4}*B${r+7}*B${r+8}`],
    ['Eng. Frontend cost ($)',      `=B${r+4}*B${r+9}*B${r+10}`],
    ['Total Engineering cost ($)',  `=B${outStartRow+2}+B${outStartRow+3}+B${outStartRow+4}`],
    ['Ops pilot cost ($)',          `=B${r+11}*B${r+12}*B${r+13}`],
    ['GTM cost ($)',                `=B${r+14}*B${r+15}`],
    ['Total Ops + GTM cost ($)',    `=B${outStartRow+6}+B${outStartRow+7}`],
    ['TOTAL INVESTMENT ($)',        `=B${outStartRow+5}+B${outStartRow+8}`],
    ['Payback period (months)',     `=CEILING(B${outStartRow+9}/B${outStartRow},1)`],
  ];

  calcs.forEach(([label, formula], i) => {
    setCell(sheet, outStartRow + i, 1, label, i === calcs.length - 1 ? 'label-bold' : 'data');
    sheet.getRange(outStartRow + i, 2).setFormula(formula)
      .setBackground('#E8F4FD')
      .setFontColor('#1A4A8A')
      .setFontWeight(i >= calcs.length - 2 ? 'bold' : 'normal')
      .setNumberFormat('$#,##0');
  });
}

// ─────────────────────────────────────────────────────────────
// SYNTHESIS
// ─────────────────────────────────────────────────────────────
function buildSynthesis(sheet) {
  const startRow = 90;
  setCell(sheet, startRow,     1, 'GO / NO-GO SYNTHESIS', 'section-header-synth');
  setCell(sheet, startRow + 1, 1, 'Fill in after all 3 tracks are complete', 'section-sub');

  const fields = [
    ['VERDICT (GO / NO-GO / GO WITH CONDITIONS)', ''],
    ['Reason 1 (from Track A)', ''],
    ['Reason 2 (from Track B)', ''],
    ['Reason 3 (from Track C)', ''],
    ['Recommended first action', ''],
    ['Owner', ''],
    ['Timeline', ''],
    ['Kill criteria 1', ''],
    ['Kill criteria 2', ''],
  ];

  fields.forEach(([label, val], i) => {
    setCell(sheet, startRow + 3 + i, 1, label, 'label-bold');
    setCell(sheet, startRow + 3 + i, 2, val, 'input');
    sheet.getRange(startRow + 3 + i, 2, 1, 5).merge();
  });
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function setCell(sheet, row, col, value, style) {
  const cell = sheet.getRange(row, col);
  cell.setValue(value);

  const styles = {
    'header-title':     { bg: '#1A1208', fg: '#F0E8DC', bold: true,  size: 14, wrap: true },
    'subheader':        { bg: '#1A1208', fg: '#B87333', bold: false, size: 11 },
    'note':             { bg: '#F2EDE6', fg: '#7A6A58', bold: false, size: 10, italic: true },
    'section-header-a': { bg: '#1A4A7A', fg: '#FFFFFF', bold: true,  size: 11 },
    'section-header-b': { bg: '#5A2A7A', fg: '#FFFFFF', bold: true,  size: 11 },
    'section-header-c': { bg: '#1A6A4A', fg: '#FFFFFF', bold: true,  size: 11 },
    'section-header-roi':{ bg: '#7A4A1A', fg: '#FFFFFF', bold: true,  size: 11 },
    'section-header-synth':{ bg: '#1A1208', fg: '#B87333', bold: true, size: 11 },
    'section-sub':      { bg: '#F2EDE6', fg: '#7A6A58', bold: false, size: 10, italic: true },
    'col-header':       { bg: '#E0D8CE', fg: '#1A1208', bold: true,  size: 10 },
    'input':            { bg: '#FFFDE0', fg: '#1A1208', bold: false, size: 11 },
    'data':             { bg: '#FFFFFF', fg: '#1A1208', bold: false, size: 11 },
    'data-good':        { bg: '#EBF5EF', fg: '#2E7D52', bold: true,  size: 11 },
    'label-bold':       { bg: '#F2EDE6', fg: '#1A1208', bold: true,  size: 11 },
  };

  const s = styles[style] || styles['data'];
  cell.setBackground(s.bg || '#FFFFFF')
      .setFontColor(s.fg || '#1A1208')
      .setFontWeight(s.bold ? 'bold' : 'normal')
      .setFontSize(s.size || 11)
      .setFontStyle(s.italic ? 'italic' : 'normal');

  if (s.wrap) cell.setWrap(true);
}

function formatSheet(sheet) {
  sheet.setColumnWidth(1, 260);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 130);
  sheet.setColumnWidth(4, 130);
  sheet.setColumnWidth(5, 110);
  sheet.setColumnWidth(6, 110);
  sheet.setColumnWidth(7, 110);
  sheet.setColumnWidth(8, 100);
  sheet.setColumnWidth(9, 80);
  sheet.setColumnWidth(10, 110);
  sheet.setFrozenRows(1);
}

function updateROIModel() {
  buildROIModel(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Business Case'));
}

function resetSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Business Case');
  if (sheet) ss.deleteSheet(sheet);
  SpreadsheetApp.getUi().alert('Sheet deleted. Run Build Business Case to start fresh.');
}
