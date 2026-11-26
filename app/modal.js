// United States in Numbers — source panels (V3, interactive edition)
// Tapping any number opens a panel with that figure's fixed facts:
// its source series, a definition, related figures, a small chart of
// the ten-year series, the full year table, and a link to the official
// series. Tapping outside the panel, the ✕ button or Esc closes it.
// The panel always opens scrolled to the top (panel.scrollTop = 0):
// an earlier build scrolled to the highlighted year, which looked
// exactly like the panel inheriting the previous panel's scroll
// position, so that behaviour was removed entirely.

import { YEARS, S, STATES, BEA, RANK, META } from './data.js';
import { esc, sparkline } from './charts.js';

const backdrop = document.getElementById('backdrop');
const panel = document.getElementById('panel');
let modalTimer = null;

function showPanel(html) {
  panel.innerHTML = html;
  document.body.style.overflow = 'hidden';
  backdrop.classList.remove('closing');
  backdrop.classList.add('open');
  document.getElementById('x').onclick = closeModal;
  // Always from the top, wherever the panel was opened from.
  panel.scrollTop = 0;
  // Move focus to the close button so keyboard users land inside the panel.
  document.getElementById('x').focus();
  // Name the panel for screen readers after its heading is in place.
  const h = panel.querySelector('h2');
  if (h) panel.setAttribute('aria-label', h.textContent + ' — source panel');
}

export function openModal(key, year) {
  const m = META[key];
  if (!m) return;
  const rows = YEARS.map((y, i) =>
    '<tr' + (year === y ? ' class="hl"' : '') + '><td>' + y + '</td><td class="num">' + m.f(S[key][i]) + '</td></tr>').join('');
  showPanel(
    '<button class="x" id="x" aria-label="Close">✕</button>' +
    '<div class="k">Source panel · ' + esc(m.src) + '</div><h2>' + esc(m.t) + '</h2>' +
    '<div class="big">' + m.f(S[key][9]) + ' <small>· 2024</small></div>' +
    '<p>' + esc(m.def) + '</p>' +
    '<div>' + m.rel.map(r => '<span class="pill">' + esc(r[0]) + ': <b>' + esc(r[1]) + '</b></span>').join('') + '</div>' +
    sparkline(key, S[key], '#0e7c7b') +
    '<table><thead><tr><th>Year</th><th class="num">Value</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    '<a class="btn" href="' + m.link + '" target="_blank" rel="noopener">Open the official data series ↗</a>' +
    '<p class="note" style="margin-top:12px">The link opens the real series at data.worldbank.org — the same figures used on this page. Tap outside this panel or press Esc to close.</p>');
}

export function openStateModal(name) {
  const s = STATES.find(x => x.name === name);
  if (!s) return;
  showPanel(
    '<button class="x" id="x" aria-label="Close">✕</button>' +
    '<div class="k">Source panel · ' + BEA.src + '</div><h2>' + esc(s.name) + '</h2>' +
    '<div class="big">$' + s.gdp.toFixed(2) + 'T <small>· GDP, 2024</small></div>' +
    '<p>' + esc(s.note) + '.</p>' +
    '<div><span class="pill">Share of US GDP: <b>' + s.share.toFixed(1) + '%</b></span>' +
    '<span class="pill">GDP rank: <b>#' + RANK[s.name] + '</b></span></div>' +
    '<table><thead><tr><th>State</th><th class="num">GDP</th><th class="num">Share</th></tr></thead><tbody>' +
    STATES.map(x => '<tr><td>' + esc(x.name) + '</td><td class="num">$' + x.gdp.toFixed(2) + 'T</td><td class="num">' + x.share.toFixed(1) + '%</td></tr>').join('') +
    '</tbody></table>' +
    '<a class="btn" href="' + BEA.link + '" target="_blank" rel="noopener">Open the official BEA release ↗</a>' +
    '<p class="note" style="margin-top:12px">Figures are current-dollar GDP by state from the BEA. Tap outside this panel or press Esc to close.</p>');
}

export function closeModal() {
  if (!backdrop.classList.contains('open')) return;
  backdrop.classList.add('closing');
  clearTimeout(modalTimer);
  modalTimer = setTimeout(() => {
    backdrop.classList.remove('open', 'closing');
    document.body.style.overflow = '';
  }, 230);
}

// Backdrop click (only when the backdrop itself is the target, never
// a click inside the panel) and Esc both close the panel.
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
