/* =====================================================================
   View: Registration Queue — review list + slide-in detail drawer
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.queue = function (root) {
  const state = { filter: 'all' };
  const TABS = [['all', 'All'], ['Pending Review', 'Pending'], ['Info Required', 'Info Required'], ['Approved', 'Approved'], ['Rejected', 'Rejected']];

  const list = () => ASC.data.queue.filter((q) => state.filter === 'all' || q.status === state.filter);
  const countOf = (st) => st === 'all' ? ASC.data.queue.length : ASC.data.queue.filter((q) => q.status === st).length;

  function sc(icon, label, val) {
    return '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + icon + '"></span>' + label + '</div><b>' + val + '</b></div>';
  }

  function itemHTML(q) {
    return '<div class="card hoverable" data-req="' + q.req + '" style="display:flex;align-items:center;gap:14px;cursor:pointer">' +
      '<span class="s-avatar ' + (q.sex === 'Female' ? 'fem' : 'mal') + '">' + ASC.icon('paw') + '</span>' +
      '<div style="flex:1;min-width:0"><div style="font-weight:600">' + q.name + ' <span style="font-family:var(--font-arabic);color:var(--text-2);font-size:12px">' + q.nameAr + '</span></div>' +
      '<div class="dim" style="font-size:12.5px">' + q.req + ' · ' + q.owner + ' · ' + q.breed + ' · ' + q.sex + '</div></div>' +
      (q.priority === 'Urgent' ? '<span class="pri urgent">Urgent</span>' : '') +
      '<div class="dim mono nowrap" style="font-size:12px;text-align:end">' + q.submitted + '<br><span style="font-size:11px">' + q.when + '</span></div>' +
      ASC.ui.badge(q.status) +
      '<button class="btn btn-outline btn-sm">Review</button></div>';
  }

  function renderAll() {
    tabsEl.innerHTML = TABS.map((t) => '<button class="tab' + (state.filter === t[0] ? ' active' : '') + '" data-f="' + t[0] + '">' + t[1] + ' <span class="dim" style="font-weight:600">' + countOf(t[0]) + '</span></button>').join('');
    const rows = list();
    listEl.innerHTML = rows.length ? rows.map(itemHTML).join('')
      : '<div class="card"><div class="empty-cell"><span class="icn" data-icon="inbox"></span><span>No requests in this category.</span></div></div>';
    ASC.hydrateIcons(tabsEl);
    ASC.hydrateIcons(listEl);
    strip.innerHTML = sc('clock', 'Awaiting Review', countOf('Pending Review')) +
      sc('inbox', 'Info Required', countOf('Info Required')) +
      sc('checkc', 'Approved (30d)', ASC.data.stats.approvedThisMonth) +
      sc('chart', 'Avg. Review Time', '1.4 <span style="font-size:13px;font-weight:500">days</span>');
    ASC.hydrateIcons(strip);
  }

  /* -------- drawer -------- */
  function ensureDrawer() {
    if (document.getElementById('qDrawer')) return;
    const ov = document.createElement('div'); ov.className = 'drawer-overlay'; ov.id = 'qOverlay';
    const dr = document.createElement('div'); dr.className = 'drawer'; dr.id = 'qDrawer';
    document.body.appendChild(ov); document.body.appendChild(dr);
    ov.addEventListener('click', closeDrawer);
  }
  function closeDrawer() {
    const dr = document.getElementById('qDrawer'), ov = document.getElementById('qOverlay');
    if (dr) dr.classList.remove('open'); if (ov) ov.classList.remove('open');
  }
  function docRow(label, ok) {
    return '<div class="doc ' + (ok ? 'ok' : 'miss') + '"><span class="ic">' + ASC.icon(ok ? 'check' : 'close') + '</span>' + label +
      (ok ? '' : '<span class="dim" style="margin-inline-start:auto;font-size:11.5px">Missing</span>') + '</div>';
  }
  function openDrawer(req) {
    ensureDrawer();
    const q = ASC.data.queue.find((x) => x.req === req); if (!q) return;
    const dr = document.getElementById('qDrawer'), ov = document.getElementById('qOverlay');
    let photos = ''; for (let i = 0; i < q.photos; i++) photos += '<div class="g-tile"><span class="icn" data-icon="image"></span></div>';
    dr.innerHTML =
      '<div class="drawer-head"><div><div style="font-family:var(--font-display);font-weight:700;font-size:17px">' + q.name + '</div><div class="dim mono" style="font-size:12px">' + q.req + '</div></div>' +
      '<button class="icon-btn" id="qClose" style="border:none;background:none"><span class="icn" data-icon="close"></span></button></div>' +
      '<div class="drawer-body">' +
        '<div class="flex items-center gap-12" style="margin-bottom:18px"><span class="s-avatar ' + (q.sex === 'Female' ? 'fem' : 'mal') + '" style="width:60px;height:60px;border-radius:14px">' + ASC.icon('paw') + '</span>' +
        '<div><div class="p-tags">' + ASC.ui.badge(q.status) + (q.priority === 'Urgent' ? '<span class="pri urgent">Urgent</span>' : '') + '</div>' +
        '<div class="dim" style="font-size:12.5px;margin-top:7px">' + q.breed + ' · ' + q.sex + ' · ' + q.emirate + '</div></div></div>' +
        '<div class="kv-grid" style="margin-bottom:18px">' +
          '<div class="kv"><label>Owner</label><div class="v">' + q.owner + '</div></div>' +
          '<div class="kv"><label>Submitted</label><div class="v mono">' + q.submitted + '</div></div>' +
        '</div>' +
        '<div class="panel-title"><span class="icn" data-icon="id"></span>Submitted Documents</div><div class="docs">' +
          docRow('Veterinary Health Certificate', q.docs.health) + docRow('Vaccination Record', q.docs.vacc) +
          docRow('Microchip Certificate', q.docs.microchip) + docRow('Pedigree Certificate', q.docs.pedigree) + '</div>' +
        '<div class="panel-title" style="margin-top:18px"><span class="icn" data-icon="image"></span>Photos (' + q.photos + ')</div><div class="gallery">' + photos + '</div>' +
      '</div>' +
      '<div class="drawer-foot"><button class="btn btn-gold" data-act="approve"><span class="icn" data-icon="check"></span>Approve</button>' +
      '<button class="btn btn-outline" data-act="info"><span class="icn" data-icon="inbox"></span>Request Info</button>' +
      '<button class="btn btn-ghost" data-act="reject" style="color:var(--error)"><span class="icn" data-icon="close"></span>Reject</button></div>';
    ASC.hydrateIcons(dr);
    dr.querySelector('#qClose').addEventListener('click', closeDrawer);
    dr.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => doAction(req, b.getAttribute('data-act'))));
    void dr.offsetWidth;   // commit closed state so the slide-in animates (rAF is paused on hidden tabs)
    ov.classList.add('open'); dr.classList.add('open');
  }
  function doAction(req, act) {
    const q = ASC.data.queue.find((x) => x.req === req); if (!q) return;
    if (act === 'approve') { q.status = 'Approved'; ASC.toast('Registration approved · QR code generated', 'check'); }
    else if (act === 'info') { q.status = 'Info Required'; ASC.toast('Additional information requested', 'inbox'); }
    else { q.status = 'Rejected'; ASC.toast('Registration rejected', 'close'); }
    closeDrawer(); renderAll();
  }

  /* -------- shell -------- */
  root.innerHTML =
    ASC.ui.pageIntro({ h: 'Registration Queue', p: 'Review incoming Saluki registrations and approve, request more information, or reject.',
      actions: '<button class="btn btn-outline" id="qExport"><span class="icn" data-icon="download"></span>Export</button>' }) +
    '<div class="statstrip" id="qStrip"></div>' +
    '<div class="tabs" id="qTabs"></div>' +
    '<div id="qList" style="display:flex;flex-direction:column;gap:12px"></div>';
  ASC.hydrateIcons(root);

  const tabsEl = root.querySelector('#qTabs'), listEl = root.querySelector('#qList'), strip = root.querySelector('#qStrip');
  tabsEl.addEventListener('click', (e) => { const b = e.target.closest('[data-f]'); if (b) { state.filter = b.getAttribute('data-f'); renderAll(); } });
  listEl.addEventListener('click', (e) => { const c = e.target.closest('[data-req]'); if (c) openDrawer(c.getAttribute('data-req')); });
  root.querySelector('#qExport').addEventListener('click', () => ASC.toast('Exporting queue to Excel…', 'download'));

  renderAll();
};
