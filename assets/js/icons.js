/* =====================================================================
   Inline SVG icon set. Usage in HTML:  <span class="icn" data-icon="paw"></span>
   hydrateIcons() replaces every [data-icon] with the matching SVG.
   ===================================================================== */
window.ASC = window.ASC || {};

const ICON_PATHS = {
  grid:    '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  chart:   '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="15"/>',
  list:    '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
  paw:     '<ellipse cx="5.6" cy="12" rx="1.7" ry="2.3"/><ellipse cx="9.7" cy="8.4" rx="1.8" ry="2.5"/><ellipse cx="14.3" cy="8.4" rx="1.8" ry="2.5"/><ellipse cx="18.4" cy="12" rx="1.7" ry="2.3"/><path d="M8 17.2c0-2.3 1.8-3.9 4-3.9s4 1.6 4 3.9c0 1.9-1.8 2.8-4 2.8s-4-.9-4-2.8z"/>',
  id:      '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2.1"/><path d="M4.8 16.6c.4-1.7 1.9-2.7 3.7-2.7s3.3 1 3.7 2.7"/><line x1="15" y1="10" x2="18.5" y2="10"/><line x1="15" y1="14" x2="18.5" y2="14"/>',
  inbox:   '<path d="M22 12h-5l-2 3H9l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"/>',
  trophy:  '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.7V17c0 .6-.5 1-1 1.2C7.9 18.8 7 20.2 7 22"/><path d="M14 14.7V17c0 .6.5 1 1 1.2 1.1.6 2 2 2 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  dna:     '<path d="M5 3c0 5 14 6 14 11"/><path d="M19 21c0-5-14-6-14-11"/><line x1="7.5" y1="6" x2="16.5" y2="6"/><line x1="6" y1="10" x2="18" y2="10"/><line x1="6" y1="14" x2="18" y2="14"/><line x1="7.5" y1="18" x2="16.5" y2="18"/>',
  lineage: '<circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="12" r="2.4"/><path d="M8.3 6.9 15.6 11"/><path d="M8.3 17.1 15.6 13"/>',
  users:   '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  bell:    '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  search:  '<circle cx="11" cy="11" r="7.5"/><line x1="21" y1="21" x2="16.7" y2="16.7"/>',
  sun:     '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="5.1" y1="5.1" x2="6.8" y2="6.8"/><line x1="17.2" y1="17.2" x2="18.9" y2="18.9"/><line x1="18.9" y1="5.1" x2="17.2" y2="6.8"/><line x1="6.8" y1="17.2" x2="5.1" y2="18.9"/>',
  moon:    '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>',
  globe:   '<circle cx="12" cy="12" r="9.5"/><line x1="2.5" y1="12" x2="21.5" y2="12"/><path d="M12 2.5a14 14 0 0 1 0 19 14 14 0 0 1 0-19z"/>',
  menu:    '<line x1="3.5" y1="6.5" x2="20.5" y2="6.5"/><line x1="3.5" y1="12" x2="20.5" y2="12"/><line x1="3.5" y1="17.5" x2="20.5" y2="17.5"/>',
  plus:    '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  calendar:'<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="3" y1="10" x2="21" y2="10"/>',
  calplus: '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="13" x2="12" y2="18"/><line x1="9.5" y1="15.5" x2="14.5" y2="15.5"/>',
  clock:   '<circle cx="12" cy="12" r="9.5"/><polyline points="12 6.5 12 12 16 14"/>',
  shield:  '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11.5 11 13.5 15 9.5"/>',
  alert:   '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h16.9a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13.5"/><line x1="12" y1="17.3" x2="12.01" y2="17.3"/>',
  transfer:'<polyline points="16 1.5 20.5 6 16 10.5"/><path d="M3.5 11V9a4 4 0 0 1 4-4h13"/><polyline points="8 22.5 3.5 18 8 13.5"/><path d="M20.5 13v2a4 4 0 0 1-4 4h-13"/>',
  check:   '<polyline points="20 6 9 17 4 12"/>',
  checkc:  '<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><polyline points="22 4 12 14 9 11"/>',
  chevron: '<polyline points="9 18 15 12 9 6"/>',
  arrowup: '<line x1="12" y1="19" x2="12" y2="6"/><polyline points="6 12 12 6 18 12"/>',
  arrowdn: '<line x1="12" y1="5" x2="12" y2="18"/><polyline points="6 12 12 18 18 12"/>',
  arrowtr: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="8 7 17 7 17 16"/>',
  pin:     '<path d="M20.5 10c0 6.5-8.5 12-8.5 12s-8.5-5.5-8.5-12a8.5 8.5 0 0 1 17 0z"/><circle cx="12" cy="10" r="3"/>',
  star:    '<polygon points="12 2.5 15 8.6 21.7 9.6 16.8 14.3 18 21 12 17.8 6 21 7.2 14.3 2.3 9.6 9 8.6"/>',
  vet:     '<path d="M12 21s-7-4.5-7-10a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 5.5-7 10-7 10"/><line x1="12" y1="9.5" x2="12" y2="14.5"/><line x1="9.5" y1="12" x2="14.5" y2="12"/>',
  qr:      '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><line x1="14" y1="14" x2="14" y2="17"/><line x1="14" y1="20" x2="14" y2="21"/><line x1="17.5" y1="14" x2="21" y2="14"/><line x1="21" y1="17.5" x2="17.5" y2="17.5"/><line x1="21" y1="21" x2="17.5" y2="21"/>',
  logout:  '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  spark:   '<path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>',
  passport:'<rect x="4" y="2.5" width="16" height="19" rx="2.5"/><circle cx="12" cy="10" r="3"/><path d="M9 15.5h6"/>',
  close:   '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  image:   '<rect x="3" y="3" width="18" height="18" rx="2.5"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="m21 15-4.5-4.5L5 21"/>',
  filter:  '<polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5"/>',
  phone:   '<rect x="6" y="2" width="12" height="20" rx="2.5"/><line x1="10.5" y1="18.5" x2="13.5" y2="18.5"/>',
  scan:    '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="3" y1="12" x2="21" y2="12"/>',
  bell2:   '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  finger:  '<path d="M12 11V8a2 2 0 1 0-4 0v6"/><path d="M8 14v-2a2 2 0 1 0-4 0c0 3 2 7 6 7h2a5 5 0 0 0 5-5v-3a2 2 0 1 0-4 0"/><path d="M16 11.5V9a2 2 0 1 0-4 0v2"/>',
  apple:   '<path d="M16.5 12.5c0-2 1.5-3 1.6-3.1-0.9-1.3-2.3-1.5-2.8-1.5-1.2-0.1-2.3 0.7-2.9 0.7-0.6 0-1.5-0.7-2.5-0.7-1.3 0-2.5 0.8-3.2 2-1.4 2.4-0.4 5.9 1 7.8 0.6 0.9 1.4 2 2.4 1.9 1-0.1 1.3-0.6 2.5-0.6 1.2 0 1.5 0.6 2.5 0.6 1 0 1.7-0.9 2.3-1.8 0.5-0.7 0.7-1.4 0.7-1.4s-1.9-0.7-1.9-2.6z"/><path d="M14.5 6.2c0.5-0.7 0.9-1.6 0.8-2.5-0.8 0-1.7 0.5-2.3 1.2-0.5 0.6-0.9 1.5-0.8 2.4 0.9 0.1 1.7-0.4 2.3-1.1z"/>',
  play:    '<polygon points="5 3 19 12 5 21 5 3"/>',
  mail:    '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  message: '<path d="M21 11.5a8.5 8.5 0 0 1-11.8 7.8L3 21l1.7-6.2A8.5 8.5 0 1 1 21 11.5z"/>',
  ticket:  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/><line x1="5" y1="5" x2="9.6" y2="9.6"/><line x1="14.4" y1="14.4" x2="19" y2="19"/><line x1="14.4" y1="9.6" x2="19" y2="5"/><line x1="5" y1="19" x2="9.6" y2="14.4"/>',
  send:    '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  megaphone:'<path d="M3 11v2a1 1 0 0 0 1 1h2l4.5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M14 8.5a4 4 0 0 1 0 7"/><path d="M17 5.5a8 8 0 0 1 0 13"/>',
  edit:    '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  globe2:  '<circle cx="12" cy="12" r="9.5"/><line x1="2.5" y1="12" x2="21.5" y2="12"/><path d="M12 2.5a14 14 0 0 1 0 19 14 14 0 0 1 0-19z"/>',
  eye:     '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:  '<path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.7 3.6M6.6 6.6A17.6 17.6 0 0 0 2 11s3.5 7 10 7a9.1 9.1 0 0 0 4.4-1.1"/><line x1="2" y1="2" x2="22" y2="22"/>',
  lock:    '<rect x="4.5" y="11" width="15" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  layers:  '<polygon points="12 2 22 8.5 12 15 2 8.5"/><polyline points="2 15.5 12 22 22 15.5"/>',
  medal:   '<circle cx="12" cy="14" r="6"/><path d="M8.5 8.5 6 2h4l2 4 2-4h4l-2.5 6.5"/><path d="M12 11.5v5M9.6 13h4.8"/>'
};

ASC.icon = function (name) {
  const p = ICON_PATHS[name] || ICON_PATHS.grid;
  return `<svg class="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
};

ASC.hydrateIcons = function (root) {
  (root || document).querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon');
    const tmp = document.createElement('div');
    tmp.innerHTML = ASC.icon(name);
    const svg = tmp.firstChild;
    // carry over the placeholder's classes AND inline styles (e.g. custom sizing)
    svg.setAttribute('class', (el.className ? el.className + ' ' : '') + 'icn');
    const style = el.getAttribute('style');
    if (style) svg.setAttribute('style', style);
    el.replaceWith(svg);
  });
};
