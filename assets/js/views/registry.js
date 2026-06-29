/* =====================================================================
   View: Saluki Registry — searchable / filterable / sortable / paginated
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.registry = function (root) {
  const data = ASC.data.salukis;
  const state = { q: '', status: 'all', breed: 'all', sex: 'all', emirate: 'all', sort: 'reg', dir: 'asc', page: 1, per: 8 };
  const KEY = { name: 'nameEn', owner: 'owner', breed: 'breed', emirate: 'emirate', status: 'status', reg: 'reg' };

  function apply() {
    let arr = data.filter((s) => {
      if (state.status !== 'all' && s.status !== state.status) return false;
      if (state.breed !== 'all' && s.breed !== state.breed) return false;
      if (state.sex !== 'all' && s.sex !== state.sex) return false;
      if (state.emirate !== 'all' && s.emirate !== state.emirate) return false;
      if (state.q) {
        const q = state.q.toLowerCase();
        const hit = s.nameEn.toLowerCase().includes(q) || s.nameAr.includes(state.q) ||
          s.reg.toLowerCase().includes(q) || s.microchip.includes(state.q) || s.owner.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
    const k = KEY[state.sort] || 'reg';
    arr.sort((a, b) => {
      const r = ('' + a[k]).localeCompare('' + b[k], undefined, { numeric: true });
      return state.dir === 'asc' ? r : -r;
    });
    return arr;
  }

  function rowHTML(s) {
    return '<tr class="clickable" data-reg="' + s.reg + '">' +
      '<td><div class="cell-saluki">' + ASC.ui.salukiAvatar(s) +
        '<div class="cell-name"><b>' + s.nameEn + '</b><span>' + s.reg + '</span></div></div></td>' +
      '<td>' + ASC.ui.ownerChip(s.owner) + '</td>' +
      '<td>' + s.breed + '</td>' +
      '<td class="muted">' + s.sex + '</td>' +
      '<td>' + ASC.ui.colorChip(s.color) + '</td>' +
      '<td class="muted">' + s.emirate + '</td>' +
      '<td>' + ASC.ui.dnaCell(s.dna) + '</td>' +
      '<td>' + ASC.ui.badge(s.status) + '</td>' +
      '<td><div class="t-actions"><span class="t-btn" title="View profile" data-icon="chevron"></span></div></td>' +
      '</tr>';
  }

  function pagerHTML(pages) {
    let h = '<button class="prev pg-ico" data-pg="prev"' + (state.page <= 1 ? ' disabled' : '') + '><span class="icn" data-icon="chevron"></span></button>';
    for (let i = 1; i <= pages; i++) h += '<button data-pg="' + i + '"' + (i === state.page ? ' class="active"' : '') + '>' + i + '</button>';
    h += '<button class="pg-ico" data-pg="next"' + (state.page >= pages ? ' disabled' : '') + '><span class="icn" data-icon="chevron"></span></button>';
    return h;
  }

  function renderTable() {
    const arr = apply();
    const total = arr.length;
    const pages = Math.max(1, Math.ceil(total / state.per));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * state.per;
    const rows = arr.slice(start, start + state.per);

    body.innerHTML = rows.length ? rows.map(rowHTML).join('') : ASC.ui.empty('No Salukis match your filters', 9);
    countEl.innerHTML = total
      ? 'Showing <b>' + (start + 1) + '–' + (start + rows.length) + '</b> of <b>' + total + '</b> Salukis'
      : 'No matching Salukis';
    pagerEl.innerHTML = total ? pagerHTML(pages) : '';

    root.querySelectorAll('th.sortable').forEach((th) => {
      const on = th.getAttribute('data-sort') === state.sort;
      th.classList.toggle('active-sort', on);
      let ind = th.querySelector('.sort-i');
      if (ind) ind.remove();
      if (on) { ind = document.createElement('span'); ind.className = 'sort-i'; ind.textContent = state.dir === 'asc' ? '▲' : '▼'; th.appendChild(ind); }
    });

    ASC.hydrateIcons(body);
    ASC.hydrateIcons(pagerEl);
  }

  root.innerHTML =
    ASC.ui.pageIntro({
      h: 'Saluki Registry',
      p: 'Browse, search and filter every registered Saluki in the national registry.',
      actions: '<button class="btn btn-outline" id="rgExport"><span class="icn" data-icon="download"></span>Export</button>' +
        '<button class="btn btn-gold" id="rgAdd"><span class="icn" data-icon="plus"></span>Register Saluki</button>'
    }) +
    '<div class="toolbar">' +
      '<div class="search-box"><span class="icn" data-icon="search"></span><input type="text" id="rgSearch" placeholder="Search name, reg #, microchip, owner…"></div>' +
      ASC.ui.select('rgStatus', 'All statuses', ['all', 'Approved', 'Pending', 'Info Required', 'Rejected', 'Suspended'], 'all') +
      ASC.ui.select('rgBreed', 'All breeds', ['all', 'Smooth-coated', 'Feathered'], 'all') +
      ASC.ui.select('rgSex', 'Any sex', ['all', 'Male', 'Female'], 'all') +
      ASC.ui.select('rgEmirate', 'All emirates', ['all', 'Abu Dhabi', 'Dubai', 'Al Ain', 'Sharjah'], 'all') +
      '<button class="btn btn-ghost btn-sm" id="rgReset">Reset</button>' +
    '</div>' +
    '<div class="card table-card"><div class="table-scroll"><table class="data-table"><thead><tr>' +
      '<th class="sortable" data-sort="name">Saluki</th>' +
      '<th class="sortable" data-sort="owner">Owner</th>' +
      '<th class="sortable" data-sort="breed">Breed</th>' +
      '<th>Sex</th><th>Colour</th>' +
      '<th class="sortable" data-sort="emirate">Emirate</th>' +
      '<th>DNA</th>' +
      '<th class="sortable" data-sort="status">Status</th>' +
      '<th aria-label="Actions"></th>' +
    '</tr></thead><tbody id="rgBody"></tbody></table></div>' +
    '<div class="tablebar"><div class="count" id="rgCount"></div><div class="pager" id="rgPager"></div></div></div>';

  ASC.hydrateIcons(root);

  const body = root.querySelector('#rgBody');
  const countEl = root.querySelector('#rgCount');
  const pagerEl = root.querySelector('#rgPager');

  root.querySelector('#rgSearch').addEventListener('input', (e) => { state.q = e.target.value.trim(); state.page = 1; renderTable(); });
  [['rgStatus', 'status'], ['rgBreed', 'breed'], ['rgSex', 'sex'], ['rgEmirate', 'emirate']].forEach((p) => {
    root.querySelector('#' + p[0]).addEventListener('change', (e) => { state[p[1]] = e.target.value; state.page = 1; renderTable(); });
  });
  root.querySelector('#rgReset').addEventListener('click', () => {
    Object.assign(state, { q: '', status: 'all', breed: 'all', sex: 'all', emirate: 'all', page: 1 });
    root.querySelector('#rgSearch').value = '';
    ['rgStatus', 'rgBreed', 'rgSex', 'rgEmirate'].forEach((id) => { root.querySelector('#' + id).value = 'all'; });
    renderTable();
  });
  root.querySelector('#rgAdd').addEventListener('click', () => ASC.openRegisterWizard());
  root.querySelector('#rgExport').addEventListener('click', () => ASC.toast('Exporting registry to Excel…', 'download'));
  root.querySelectorAll('th.sortable').forEach((th) => th.addEventListener('click', () => {
    const k = th.getAttribute('data-sort');
    if (state.sort === k) state.dir = state.dir === 'asc' ? 'desc' : 'asc';
    else { state.sort = k; state.dir = 'asc'; }
    renderTable();
  }));
  body.addEventListener('click', (e) => {
    const tr = e.target.closest('tr[data-reg]');
    if (tr) ASC.go('profile', 'nav.profile', { reg: tr.getAttribute('data-reg') });
  });
  pagerEl.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-pg]');
    if (!b || b.disabled) return;
    const v = b.getAttribute('data-pg');
    const pages = Math.max(1, Math.ceil(apply().length / state.per));
    if (v === 'prev') state.page = Math.max(1, state.page - 1);
    else if (v === 'next') state.page = Math.min(pages, state.page + 1);
    else state.page = parseInt(v, 10);
    renderTable();
  });

  renderTable();
};
