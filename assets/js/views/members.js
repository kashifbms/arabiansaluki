/* =====================================================================
   View: Members — club membership directory
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.members = function (root) {
  const state = { q: '', tier: 'all', status: 'all' };
  const tierBadge = (t) => '<span class="badge ' + (t === 'Honorary' ? 'gold' : t === 'Senior' ? 'blue' : 'gray') + ' plain">' + t + '</span>';

  function rows() {
    return ASC.data.members.filter((m) => {
      if (state.tier !== 'all' && m.tier !== state.tier) return false;
      if (state.status !== 'all' && m.status !== state.status) return false;
      if (state.q) { const q = state.q.toLowerCase(); if (!(m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q) || m.emirate.toLowerCase().includes(q))) return false; }
      return true;
    });
  }
  function rowHTML(m) {
    return '<tr><td><div class="cell-saluki"><span class="avatar sm">' + ASC.ui.initials(m.name).toUpperCase() + '</span><div class="cell-name"><b>' + m.name + '</b><span>' + m.id + '</span></div></div></td>' +
      '<td class="muted">' + m.emirate + '</td>' +
      '<td>' + tierBadge(m.tier) + '</td>' +
      '<td class="mono">' + m.since + '</td>' +
      '<td class="mono">' + m.expiry + '</td>' +
      '<td class="mono">' + m.salukis + '</td>' +
      '<td>' + ASC.ui.badge(m.status) + '</td></tr>';
  }
  function render() {
    const r = rows();
    body.innerHTML = r.length ? r.map(rowHTML).join('') : ASC.ui.empty('No members match your filters', 7);
    count.innerHTML = 'Showing <b>' + r.length + '</b> of <b>' + ASC.data.members.length + '</b> members';
    ASC.hydrateIcons(body);
  }
  const st = ASC.data.memberStats;
  const sc = (i, l, v) => '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + i + '"></span>' + l + '</div><b>' + v + '</b></div>';

  root.innerHTML =
    ASC.ui.pageIntro({ h: 'Members', p: 'Club membership directory across all tiers and emirates.',
      actions: '<button class="btn btn-outline" id="mExport"><span class="icn" data-icon="download"></span>Export</button>' +
        '<button class="btn btn-gold" id="mAdd"><span class="icn" data-icon="plus"></span>New Member</button>' }) +
    '<div class="statstrip">' + sc('users', 'Total Members', st.total) + sc('checkc', 'Active', st.active) + sc('clock', 'Lapsed', st.lapsed) + sc('inbox', 'Pending', st.pending) + sc('star', 'New This Month', st.newMonth) + '</div>' +
    '<div class="toolbar">' +
      '<div class="search-box"><span class="icn" data-icon="search"></span><input type="text" id="mSearch" placeholder="Search name, member ID, emirate…"></div>' +
      ASC.ui.select('mTier', 'All tiers', ['all', 'Regular', 'Senior', 'Honorary'], 'all') +
      ASC.ui.select('mStatus', 'All statuses', ['all', 'Active', 'Lapsed', 'Pending'], 'all') +
    '</div>' +
    '<div class="card table-card"><div class="table-scroll"><table class="data-table"><thead><tr>' +
      '<th>Member</th><th>Emirate</th><th>Tier</th><th>Since</th><th>Expiry</th><th>Salukis</th><th>Status</th>' +
    '</tr></thead><tbody id="mBody"></tbody></table></div><div class="tablebar"><div class="count" id="mCount"></div></div></div>';
  ASC.hydrateIcons(root);

  const body = root.querySelector('#mBody'), count = root.querySelector('#mCount');
  root.querySelector('#mSearch').addEventListener('input', (e) => { state.q = e.target.value.trim(); render(); });
  root.querySelector('#mTier').addEventListener('change', (e) => { state.tier = e.target.value; render(); });
  root.querySelector('#mStatus').addEventListener('change', (e) => { state.status = e.target.value; render(); });
  root.querySelector('#mAdd').addEventListener('click', () => ASC.toast('New membership application (demo)', 'plus'));
  root.querySelector('#mExport').addEventListener('click', () => ASC.toast('Exporting members to Excel…', 'download'));
  render();
};
