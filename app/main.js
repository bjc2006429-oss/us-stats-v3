// United States in Numbers — entry point (V3, interactive edition)
// Hash router (Overview, Population, Economy, Prices & Jobs, Trade,
// Regions, Government, Sources) plus one delegated click handler for
// everything interactive: source panels, chart range switches, the
// sortable regions table, and state rows. Only a route change scrolls
// back to the top; control clicks keep the visitor where they are.

import { ROUTES, RANGES, sortKey, sortDir, setSort } from './views.js';
import { openModal, openStateModal, closeModal } from './modal.js';

const app = document.getElementById('app');

function render(toTop) {
  const r = (location.hash || '#/').replace(/^#\/?/, '').split('/')[0];
  const fn = ROUTES[r] || ROUTES[''];
  app.innerHTML = fn();
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('active', a.dataset.r === r));
  // Keep the tab title in step with the page being shown.
  const titles = { '': 'Overview', population: 'Population', economy: 'Economy', prices: 'Prices & Jobs', trade: 'Trade', regions: 'Regions', government: 'Government & Debt', sources: 'Sources & Methods' };
  document.title = 'United States in Numbers — ' + (titles[r] || 'Overview');
  if (toTop) {
    try { window.scrollTo(0, 0); } catch (e) { /* headless environments may lack scrolling */ }
  }
}

document.addEventListener('click', e => {
  const st = e.target.closest('[data-open]');
  if (st) { openModal(st.dataset.open, st.dataset.year ? Number(st.dataset.year) : null); return; }
  const row = e.target.closest('[data-state]');
  if (row) { openStateModal(row.dataset.state); return; }
  const seg = e.target.closest('[data-range]');
  if (seg) { RANGES[seg.dataset.key] = seg.dataset.range; render(false); return; }
  const th = e.target.closest('[data-sort]');
  if (th) {
    const k = th.dataset.sort;
    if (k === sortKey) setSort(k, sortDir === 'desc' ? 'asc' : 'desc');
    else setSort(k, (k === 'rank' || k === 'name') ? 'asc' : 'desc');
    render(false);
    return;
  }
});

// Keyboard: Enter on a focused card opens its panel, like a click.
// Enter or Space on a sortable header sorts, like a click.
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const st = e.target.closest && e.target.closest('[data-open]');
    if (st) openModal(st.dataset.open, st.dataset.year ? Number(st.dataset.year) : null);
  }
  if (e.key === 'Enter' || e.key === ' ') {
    const th = e.target.closest && e.target.closest('[data-sort]');
    if (th) {
      e.preventDefault();
      const k = th.dataset.sort;
      if (k === sortKey) setSort(k, sortDir === 'desc' ? 'asc' : 'desc');
      else setSort(k, (k === 'rank' || k === 'name') ? 'asc' : 'desc');
      render(false);
    }
  }
});

window.addEventListener('hashchange', () => render(true));
render(true);

// Keep the closer reachable for inline handlers and tests.
window.__closeModal = closeModal;
