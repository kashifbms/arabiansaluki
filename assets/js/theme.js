/* =====================================================================
   Theme switcher — dark / light, persisted to localStorage.
   The <html data-theme> is set pre-paint by an inline head script.
   ===================================================================== */
window.ASC = window.ASC || {};

ASC.initTheme = function () {
  const btn = document.getElementById('themeBtn');

  function current() { return document.documentElement.getAttribute('data-theme') || 'dark'; }

  function paintBtn(t) {
    if (!btn) return;
    btn.innerHTML = ASC.icon(t === 'dark' ? 'sun' : 'moon');
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    btn.title = t === 'dark' ? 'Light mode' : 'Dark mode';
  }

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    paintBtn(t);
    // charts read CSS variables → rebuild so grid/label colors track the theme
    if (ASC.renderCharts) requestAnimationFrame(ASC.renderCharts);
  }

  paintBtn(current());
  if (btn) btn.addEventListener('click', () => setTheme(current() === 'dark' ? 'light' : 'dark'));

  ASC.setTheme = setTheme;
};
