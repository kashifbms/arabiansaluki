/* =====================================================================
   App orchestration — boot, navigation, counters, sparklines,
   live date, toasts, demo interactions.
   ===================================================================== */
window.ASC = window.ASC || {};

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Count-up ---------------- */
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      // hidden tabs pause rAF; show the final value immediately so it's never blank
      if (reduceMotion || document.visibilityState === 'hidden') { el.textContent = target.toLocaleString() + suffix; return; }
      const dur = 1100, t0 = performance.now();
      function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------------- Sparklines ---------------- */
  function buildSpark(arr) {
    const w = 100, h = 32, pad = 3;
    const min = Math.min(...arr), max = Math.max(...arr), span = max - min || 1;
    const pts = arr.map((v, i) => {
      const x = (i / (arr.length - 1)) * w;
      const y = h - pad - ((v - min) / span) * (h - pad * 2);
      return [x, y];
    });
    const line = pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const area = `0,${h} ` + line + ` ${w},${h}`;
    return `<svg class="kpi-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <polygon points="${area}" fill="rgba(240,165,60,.15)"/>
      <polyline points="${line}" fill="none" stroke="var(--brand-gold)" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    </svg>`;
  }
  function renderSparklines() {
    document.querySelectorAll('[data-spark]').forEach((el) => {
      const key = el.getAttribute('data-spark');
      const series = ASC.data.sparks[key];
      if (series) el.innerHTML = buildSpark(series);
    });
  }

  /* ---------------- Overview lists (feed + events) ---------------- */
  function renderFeed() {
    const el = document.getElementById('feedList');
    if (!el) return;
    el.innerHTML = ASC.data.activity.map((a) => `
      <div class="feed-item">
        <div class="feed-icon ${a.tone}">${ASC.icon(a.icon)}</div>
        <div class="feed-body"><div class="feed-text">${a.html}</div><div class="feed-time">${a.time}</div></div>
      </div>`).join('');
  }
  function renderEvents() {
    const el = document.getElementById('eventList');
    if (!el) return;
    el.innerHTML = ASC.data.events.map((e) => `
      <div class="event-item">
        <div class="event-date"><span class="d">${e.d}</span><span class="m">${e.m}</span></div>
        <div class="event-info"><div class="event-name">${e.name}</div><div class="event-meta">${e.meta}</div></div>
        <span class="badge ${e.status.c}">${e.status.t}</span>
      </div>`).join('');
  }

  /* ---------------- Live date ---------------- */
  function updateDate() {
    const el = document.getElementById('dateNow');
    if (!el) return;
    el.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* ---------------- Toast ---------------- */
  ASC.toast = function (msg, icon) {
    const wrap = document.getElementById('toast');
    if (!wrap) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = ASC.icon(icon || 'checkc') + '<span>' + msg + '</span>';
    wrap.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 240); }, 2600);
  };

  /* ---------------- Navigation ---------------- */
  const ALWAYS = { profile: true, owner: true };   // views that re-render on every visit
  const rendered = new Set();
  let activeNav = 'overview';

  function ensureView(nav) {
    let sec = document.getElementById('view-' + nav);
    if (!sec) {
      sec = document.createElement('section');
      sec.className = 'view';
      sec.id = 'view-' + nav;
      document.querySelector('.content-inner').appendChild(sec);
    }
    return sec;
  }

  function go(nav, labelKey, payload) {
    activeNav = nav;
    document.querySelectorAll('.nav-link').forEach((l) => l.classList.toggle('active', l.getAttribute('data-nav') === nav));
    document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));

    const titleEl = document.getElementById('pageTitle');
    const isOverview = nav === 'overview';

    if (isOverview) {
      document.getElementById('view-overview').classList.add('active');
      titleEl.setAttribute('data-i18n', 'top.title'); titleEl.textContent = ASC.t('top.title');
    } else if (ASC.views && ASC.views[nav]) {
      const sec = ensureView(nav);
      if (ALWAYS[nav] || !rendered.has(nav)) {
        sec.innerHTML = '';
        try { ASC.views[nav](sec, payload); } catch (e) { console.error('view ' + nav + ' failed:', e); }
        rendered.add(nav);
      }
      sec.classList.add('active');
      titleEl.removeAttribute('data-i18n'); titleEl.textContent = ASC.t(labelKey || ('nav.' + nav));
    } else {
      document.getElementById('view-placeholder').classList.add('active');
      const nameEl = document.getElementById('phName');
      if (nameEl) { nameEl.setAttribute('data-i18n', labelKey); nameEl.textContent = ASC.t(labelKey); }
      titleEl.removeAttribute('data-i18n'); titleEl.textContent = ASC.t(labelKey);
    }

    // the target section is now visible → (re)render its charts at correct size + theme
    if (ASC.renderCharts) ASC.renderCharts();

    closeSidebar();
    const content = document.querySelector('.content');
    if (content) content.scrollTop = 0;
  }
  ASC.go = go;

  function initNav() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        go(link.getAttribute('data-nav'), link.querySelector('[data-i18n]').getAttribute('data-i18n'));
      });
    });
    const phBack = document.getElementById('phBack');
    if (phBack) phBack.addEventListener('click', () => {
      const o = document.querySelector('.nav-link[data-nav="overview"]');
      go('overview', 'top.title');
    });
    // "View all" + quick actions
    document.querySelectorAll('[data-goto]').forEach((b) => {
      b.addEventListener('click', () => {
        const nav = b.getAttribute('data-goto');
        const link = document.querySelector('.nav-link[data-nav="' + nav + '"]');
        if (link) go(nav, link.querySelector('[data-i18n]').getAttribute('data-i18n'));
      });
    });
    document.querySelectorAll('[data-toast]').forEach((b) => {
      b.addEventListener('click', () => ASC.toast(b.getAttribute('data-toast'), b.getAttribute('data-toast-icon') || 'checkc'));
    });
  }

  /* ---------------- Mobile sidebar ---------------- */
  function openSidebar() { document.getElementById('sidebar').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
  function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }
  function initSidebar() {
    const mb = document.getElementById('menuBtn'), ov = document.getElementById('overlay');
    if (mb) mb.addEventListener('click', openSidebar);
    if (ov) ov.addEventListener('click', closeSidebar);
  }

  /* ---------------- Progress bars (animate on load) ---------------- */
  function animateProgress() {
    document.querySelectorAll('.progress-fill[data-val]').forEach((el) => {
      const v = el.getAttribute('data-val');
      if (reduceMotion || document.visibilityState === 'hidden') { el.style.width = v + '%'; return; }
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.width = v + '%'; }));
    });
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderFeed();
    renderEvents();
    ASC.renderEvents = renderEvents;   // let the Add-Event modal refresh the overview list
    ASC.hydrateIcons();
    ASC.initTheme();
    if (ASC.initLogin) ASC.initLogin();   // sign-in gate
    ASC.initI18n();      // applies translations + sets dir
    initNav();
    initSidebar();
    animateCounters();
    renderSparklines();
    animateProgress();
    updateDate();
    if (ASC.renderCharts) ASC.renderCharts();

    // "/" focuses global search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault();
        const s = document.getElementById('globalSearch');
        if (s) s.focus();
      }
    });

    // Re-render charts on resize (debounced) so they track container width
    let rT;
    window.addEventListener('resize', () => {
      clearTimeout(rT);
      rT = setTimeout(() => { if (ASC.renderCharts) ASC.renderCharts(); }, 200);
    });

    // Repaint charts when the page becomes visible (covers the case where it
    // first rendered while the tab was backgrounded).
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && ASC.renderCharts) ASC.renderCharts();
    });

    // Topbar global search → jump to the registry with the query applied
    const gs = document.getElementById('globalSearch');
    if (gs) gs.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const q = gs.value.trim();
      go('registry', 'nav.registry');
      const rg = document.getElementById('rgSearch');
      if (rg) { rg.value = q; rg.dispatchEvent(new Event('input')); }
    });

    // Delegated openers for modal flows (works for buttons in any view)
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-open="register"]') && ASC.openRegisterWizard) ASC.openRegisterWizard();
      else if (e.target.closest('[data-open="event"]') && ASC.openEventModal) ASC.openEventModal();
    });
  });
})();
