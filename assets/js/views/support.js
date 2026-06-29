/* =====================================================================
   View: Support — member tickets with a conversation drawer
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.support = function (root) {
  const T = ASC.data.tickets;
  const state = { filter: 'all' };
  const TABS = [['all', 'All'], ['Open', 'Open'], ['In Progress', 'In Progress'], ['Resolved', 'Resolved'], ['Closed', 'Closed']];
  const stBadge = (s) => '<span class="badge ' + ({ 'Open': 'blue', 'In Progress': 'amber', 'Resolved': 'green', 'Closed': 'gray' }[s] || 'gray') + '">' + s + '</span>';
  const countOf = (s) => s === 'all' ? T.length : T.filter((t) => t.status === s).length;
  const list = () => T.filter((t) => state.filter === 'all' || t.status === state.filter);
  const sc = (i, l, v) => '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + i + '"></span>' + l + '</div><b>' + v + '</b></div>';

  function rowHTML(t) {
    return '<tr class="clickable" data-id="' + t.id + '">' +
      '<td class="mono">' + t.id + '</td>' +
      '<td><b>' + t.subject + '</b></td>' +
      '<td>' + ASC.ui.ownerChip(t.member) + '</td>' +
      '<td class="muted">' + t.category + '</td>' +
      '<td><span class="priority ' + t.priority + '">' + t.priority + '</span></td>' +
      '<td>' + stBadge(t.status) + '</td>' +
      '<td class="dim mono">' + t.updated + '</td>' +
      '<td><div class="t-actions"><span class="t-btn" data-icon="chevron"></span></div></td></tr>';
  }
  function renderAll() {
    const st = ASC.data.ticketStats;
    strip.innerHTML = sc('ticket', 'Open', countOf('Open')) + sc('clock', 'In Progress', countOf('In Progress')) +
      sc('checkc', 'Resolved (30d)', st.resolved) + sc('chart', 'Avg. First Response', st.avgResponse);
    tabsEl.innerHTML = TABS.map((t) => '<button class="tab' + (state.filter === t[0] ? ' active' : '') + '" data-f="' + t[0] + '">' + t[1] + ' <span class="dim" style="font-weight:600">' + countOf(t[0]) + '</span></button>').join('');
    const rows = list();
    body.innerHTML = rows.length ? rows.map(rowHTML).join('') : ASC.ui.empty('No tickets in this category', 8);
    ASC.hydrateIcons(strip); ASC.hydrateIcons(tabsEl); ASC.hydrateIcons(body);
  }

  /* drawer */
  function ensureDrawer() {
    if (document.getElementById('spDrawer')) return;
    const ov = document.createElement('div'); ov.className = 'drawer-overlay'; ov.id = 'spOverlay';
    const dr = document.createElement('div'); dr.className = 'drawer'; dr.id = 'spDrawer';
    document.body.appendChild(ov); document.body.appendChild(dr);
    ov.addEventListener('click', closeDrawer);
  }
  function closeDrawer() { const d = document.getElementById('spDrawer'), o = document.getElementById('spOverlay'); if (d) d.classList.remove('open'); if (o) o.classList.remove('open'); }
  function threadHTML(t) {
    return t.thread.map((m) => '<div class="msg ' + m.from + '"><div class="bub">' + m.t + '</div><div class="meta">' + (m.from === 'agent' ? 'Support' : t.member) + ' · ' + m.time + '</div></div>').join('');
  }
  function openTicket(id) {
    ensureDrawer();
    const t = T.find((x) => x.id === id); if (!t) return;
    const dr = document.getElementById('spDrawer'), ov = document.getElementById('spOverlay');
    dr.innerHTML =
      '<div class="drawer-head"><div><div style="font-family:var(--font-display);font-weight:700;font-size:16px">' + t.subject + '</div><div class="dim mono" style="font-size:12px">' + t.id + ' · ' + t.category + '</div></div>' +
      '<button class="icon-btn" id="spClose" style="border:none;background:none"><span class="icn" data-icon="close"></span></button></div>' +
      '<div class="drawer-body">' +
        '<div class="flex items-center gap-12" style="margin-bottom:16px"><span class="avatar">' + ASC.ui.initials(t.member).toUpperCase() + '</span>' +
        '<div style="flex:1"><div style="font-weight:600">' + t.member + '</div><div class="dim" style="font-size:12px">' + t.category + ' request</div></div>' +
        '<span class="priority ' + t.priority + '">' + t.priority + '</span>' + stBadge(t.status) + '</div>' +
        '<div class="thread" id="spThread">' + threadHTML(t) + '</div>' +
        '<div class="reply-box" style="margin-top:16px"><textarea id="spReply" placeholder="Type a reply to ' + t.member + '…"></textarea><button class="btn btn-gold" id="spSend"><span class="icn" data-icon="send"></span></button></div>' +
      '</div>' +
      '<div class="drawer-foot"><button class="btn btn-outline" data-act="progress"><span class="icn" data-icon="clock"></span>In Progress</button>' +
      '<button class="btn btn-gold" data-act="resolve" style="margin-inline-start:auto"><span class="icn" data-icon="check"></span>Resolve</button>' +
      '<button class="btn btn-ghost" data-act="close">Close</button></div>';
    ASC.hydrateIcons(dr);
    dr.querySelector('#spClose').addEventListener('click', closeDrawer);
    dr.querySelector('#spSend').addEventListener('click', () => {
      const ta = dr.querySelector('#spReply'); const v = ta.value.trim(); if (!v) return;
      t.thread.push({ from: 'agent', t: v, time: 'just now' });
      if (t.status === 'Open') t.status = 'In Progress';
      dr.querySelector('#spThread').innerHTML = threadHTML(t); ta.value = '';
      dr.querySelector('#spThread').scrollIntoView({ block: 'end' });
      renderAll(); ASC.toast('Reply sent to ' + t.member, 'send');
    });
    dr.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => {
      const a = b.getAttribute('data-act');
      t.status = a === 'resolve' ? 'Resolved' : a === 'close' ? 'Closed' : 'In Progress';
      closeDrawer(); renderAll(); ASC.toast('Ticket ' + t.id + ' → ' + t.status, a === 'resolve' ? 'check' : 'ticket');
    }));
    void dr.offsetWidth; ov.classList.add('open'); dr.classList.add('open');
  }

  root.innerHTML =
    ASC.ui.pageIntro({ h: 'Support', p: 'Member support requests and tickets raised from the web portal and mobile app.',
      actions: '<button class="btn btn-gold" id="spNew"><span class="icn" data-icon="plus"></span>New Ticket</button>' }) +
    '<div class="statstrip" id="spStrip"></div>' +
    '<div class="tabs" id="spTabs"></div>' +
    '<div class="card table-card"><div class="table-scroll"><table class="data-table"><thead><tr>' +
      '<th>Ticket</th><th>Subject</th><th>Member</th><th>Category</th><th>Priority</th><th>Status</th><th>Updated</th><th></th>' +
    '</tr></thead><tbody id="spBody"></tbody></table></div></div>';
  ASC.hydrateIcons(root);

  const strip = root.querySelector('#spStrip'), tabsEl = root.querySelector('#spTabs'), body = root.querySelector('#spBody');
  tabsEl.addEventListener('click', (e) => { const b = e.target.closest('[data-f]'); if (b) { state.filter = b.getAttribute('data-f'); renderAll(); } });
  body.addEventListener('click', (e) => { const tr = e.target.closest('tr[data-id]'); if (tr) openTicket(tr.getAttribute('data-id')); });
  root.querySelector('#spNew').addEventListener('click', () => ASC.toast('New ticket form (demo)', 'ticket'));
  renderAll();
};
