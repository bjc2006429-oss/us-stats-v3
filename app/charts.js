// United States in Numbers — charts (V3, interactive edition)
// Hand-drawn SVG line charts and state bar rows. No libraries, no
// network: everything is computed from data.js and rendered as inline
// SVG. In V3 every point, year label and bar is clickable and opens
// the source panel for that figure (see modal.js).

import { META } from './data.js';

export function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// Ten-year line chart. `key` names the indicator (for panel links),
// `yrs`/`vals` are the slice actually drawn (a range button may show
// 2015-2019 or 2020-2024), `color` is the series colour.
export function lineChart(key, yrs, vals, color) {
  const W = 680, H = 240, P = { l: 56, r: 14, t: 14, b: 30 };
  const min = Math.min(...vals), max = Math.max(...vals);
  const lo = Math.floor(min - (max - min) * 0.15), hi = Math.ceil(max + (max - min) * 0.15);
  const X = i => P.l + (W - P.l - P.r) * (i / (vals.length - 1));
  const Y = v => P.t + (H - P.t - P.b) * (1 - (v - lo) / (hi - lo));
  const pts = vals.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ');
  const area = 'M' + X(0).toFixed(1) + ',' + Y(vals[0]).toFixed(1) + ' ' +
    'L' + vals.map((v, i) => X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' L ') +
    ' L' + X(vals.length - 1).toFixed(1) + ',' + (H - P.b) +
    ' L' + X(0).toFixed(1) + ',' + (H - P.b) + ' Z';
  let grid = '';
  for (let g = 0; g <= 3; g++) {
    const v = lo + (hi - lo) * g / 3, y = Y(v);
    grid += '<line x1="' + P.l + '" y1="' + y + '" x2="' + (W - P.r) + '" y2="' + y + '" stroke="#e8edf1"/>' +
      '<text x="' + (P.l - 8) + '" y="' + (y + 4) + '" font-size="11" fill="#8a97a3" text-anchor="end">' + v.toLocaleString() + '</text>';
  }
  // Each point gets a fat invisible hit circle (easy to tap on a phone)
  // plus the visible dot; both carry data-open so a tap opens the panel.
  const dots = vals.map((v, i) =>
    '<circle class="dot-hit" data-open="' + key + '" data-year="' + yrs[i] + '" cx="' + X(i) + '" cy="' + Y(v) + '" r="16" fill="transparent">' +
    '<title>' + yrs[i] + ': ' + META[key].f(v) + '</title></circle>' +
    '<circle class="dot" data-open="' + key + '" data-year="' + yrs[i] + '" cx="' + X(i) + '" cy="' + Y(v) + '" r="4.5" fill="' + color + '" pointer-events="none">' +
    '<title>' + yrs[i] + ': ' + META[key].f(v) + '</title></circle>').join('');
  const xl = yrs.map((y, i) =>
    '<text class="ylab" data-open="' + key + '" data-year="' + y + '" x="' + X(i) + '" y="' + (H - 8) + '" font-size="11" fill="#8a97a3" text-anchor="middle">' + y + '</text>').join('');
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(META[key].t) + ' chart">' +
    '<path d="' + area + '" fill="' + color + '" opacity="0.10"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
    grid + dots + xl + '</svg>';
}

// Small area sparkline for the source panel: the same ten-year series
// drawn tiny, so the panel shows the shape of the data at a glance.
export function sparkline(key, vals, color) {
  const W = 520, H = 90, P = { l: 4, r: 4, t: 8, b: 8 };
  const min = Math.min(...vals), max = Math.max(...vals);
  const lo = min - (max - min) * 0.2, hi = max + (max - min) * 0.2;
  const X = i => P.l + (W - P.l - P.r) * (i / (vals.length - 1));
  const Y = v => P.t + (H - P.t - P.b) * (1 - (v - lo) / (hi - lo));
  const pts = vals.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ');
  const area = 'M' + X(0).toFixed(1) + ',' + Y(vals[0]).toFixed(1) + ' ' +
    'L' + vals.map((v, i) => X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' L ') +
    ' L' + X(vals.length - 1).toFixed(1) + ',' + (H - P.b) +
    ' L' + X(0).toFixed(1) + ',' + (H - P.b) + ' Z';
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(META[key].t) + ' 2015–2024 shape" style="width:100%;height:auto;display:block;margin:10px 0 2px">' +
    '<path d="' + area + '" fill="' + color + '" opacity="0.12"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
    '<circle cx="' + X(vals.length - 1) + '" cy="' + Y(vals[vals.length - 1]) + '" r="4" fill="' + color + '"/>' +
    '<text x="' + P.l + '" y="' + (H - 1) + '" font-size="10" fill="#8a97a3">2015</text>' +
    '<text x="' + (W - P.r) + '" y="' + (H - 1) + '" font-size="10" fill="#8a97a3" text-anchor="end">2024</text>' +
    '</svg>';
}

// Horizontal bars for the four largest state economies. Rows are
// clickable and open the state source panel.
export function barChart(rows) {
  const max = Math.max(...rows.map(r => r.gdp));
  return rows.map(r =>
    '<div class="bar-row" data-state="' + esc(r.name) + '">' +
    '<div class="lbl">' + esc(r.name) + '</div>' +
    '<div class="track"><div class="fill" style="width:' + (r.gdp / max * 100).toFixed(1) + '%"></div></div>' +
    '<div class="val">$' + r.gdp.toFixed(2) + 'T</div></div>').join('');
}
