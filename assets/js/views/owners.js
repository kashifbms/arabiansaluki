/* =====================================================================
   View: Owners — owner management directory (Module 2)
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.owners = function (root) {
  const state = { q: '', emirate: 'all', membership: 'all' };
  const memBadge = (o) => o.member ? '<span class="badge ' + (o.tier === 'Senior' ? 'blue' : o.tier === 'Honorary' ? 'gold' : 'gray') + ' plain">' + o.tier + ' Member</span>' : '<span class="dim">Non-Member</span>';

  function rows() {
    return ASC.data.owners.filter((o) => {
      if (state.emirate !== 'all' && o.emirate !== state.emirate) return false;
      if (state.membership === 'member' && !o.member) return false;
      if (state.membership === 'non' && o.member) return false;
      if (state.q) { const q = state.q.toLowerCase(); if (!(o.name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.mobile.includes(state.q) || o.emiratesId.includes(state.q) || o.email.toLowerCase().includes(q))) return false; }
      return true;
    });
  }
  function rowHTML(o) {
    return '<tr class="clickable" data-id="' + o.id + '">' +
      '<td><div class="cell-saluki"><span class="avatar sm">' + ASC.ui.initials(o.name).toUpperCase() + '</span><div class="cell-name"><b>' + o.name + '</b><span>' + o.id + '</span></div></div></td>' +
      '<td class="mono"><span class="pii-lock"><span class="icn" data-icon="shield"></span>' + ASC.maskEid(o.emiratesId) + '</span></td>' +
      '<td class="mono">' + o.mobile + '</td>' +
      '<td class="muted">' + o.emirate + '</td>' +
      '<td class="mono">' + o.salukis + '</td>' +
      '<td>' + memBadge(o) + '</td>' +
      '<td><div class="t-actions"><span class="t-btn" data-icon="chevron"></span></div></td></tr>';
  }
  function render() {
    const r = rows();
    body.innerHTML = r.length ? r.map(rowHTML).join('') : ASC.ui.empty('No owners match your filters', 7);
    count.innerHTML = 'Showing <b>' + r.length + '</b> of <b>' + ASC.data.owners.length + '</b> owners';
    ASC.hydrateIcons(body);
  }

  root.innerHTML =
    ASC.ui.pageIntro({ h: 'Owners', p: 'Registered owner accounts — identity, contact details and verified Emirates ID documents.',
      actions: '<button class="btn btn-outline" id="oExport"><span class="icn" data-icon="download"></span>Export</button>' }) +
    '<div class="toolbar">' +
      '<div class="search-box"><span class="icn" data-icon="search"></span><input type="text" id="oSearch" placeholder="Search name, owner ID, mobile, Emirates ID…"></div>' +
      ASC.ui.select('oEmirate', 'All emirates', ['all', 'Abu Dhabi', 'Dubai', 'Al Ain', 'Sharjah'], 'all') +
      '<select class="f-select" id="oMember" aria-label="Membership"><option value="all">All owners</option><option value="member">Members</option><option value="non">Non-members</option></select>' +
    '</div>' +
    '<div class="card table-card"><div class="table-scroll"><table class="data-table"><thead><tr>' +
      '<th>Owner</th><th>Emirates ID</th><th>Mobile</th><th>Emirate</th><th>Salukis</th><th>Membership</th><th></th>' +
    '</tr></thead><tbody id="oBody"></tbody></table></div><div class="tablebar"><div class="count" id="oCount"></div></div></div>';
  ASC.hydrateIcons(root);

  const body = root.querySelector('#oBody'), count = root.querySelector('#oCount');
  root.querySelector('#oSearch').addEventListener('input', (e) => { state.q = e.target.value.trim(); render(); });
  root.querySelector('#oEmirate').addEventListener('change', (e) => { state.emirate = e.target.value; render(); });
  root.querySelector('#oMember').addEventListener('change', (e) => { state.membership = e.target.value; render(); });
  root.querySelector('#oExport').addEventListener('click', () => ASC.toast('Exporting owners to Excel…', 'download'));
  body.addEventListener('click', (e) => { const tr = e.target.closest('tr[data-id]'); if (tr) ASC.go('owner', 'nav.owner', { id: tr.getAttribute('data-id') }); });
  render();
};
