/* =====================================================================
   View: DNA Verification — records, parentage match, verified status
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.dna = function (root) {
  const R = ASC.data.dnaRecords;
  const sc = (i, l, v) => '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + i + '"></span>' + l + '</div><b>' + v + '</b></div>';
  const match = (ok) => ok ? '<span class="match-yes">' + ASC.icon('check') + 'Match</span>' : '<span class="match-no">' + ASC.icon('close') + 'No match</span>';

  const confirmed = R.filter((r) => r.status === 'Confirmed').length;
  const pending = R.filter((r) => r.status === 'Pending').length;
  const disputed = R.filter((r) => r.status === 'Disputed').length;

  const rows = R.map((r) =>
    '<tr><td><div class="cell-saluki"><span class="s-avatar mal">' + ASC.icon('dna') + '</span><div class="cell-name"><b>' + r.saluki + '</b><span>' + r.reg + '</span></div></div></td>' +
    '<td class="muted">' + r.lab + '</td>' +
    '<td class="mono">' + r.date + '</td>' +
    '<td class="mono">' + r.ref + '</td>' +
    '<td>' + match(r.sire) + '</td>' +
    '<td>' + match(r.dam) + '</td>' +
    '<td>' + ASC.ui.badge(r.status) + '</td></tr>').join('');

  root.innerHTML =
    ASC.ui.pageIntro({ h: 'DNA Verification', p: 'Accredited DNA tests, parentage matching against registered sire and dam, and verified badges.',
      actions: '<button class="btn btn-gold" id="dAdd"><span class="icn" data-icon="plus"></span>Submit DNA Test</button>' }) +
    '<div class="statstrip">' + sc('checkc', 'Confirmed', confirmed) + sc('clock', 'Pending Review', pending) + sc('alert', 'Disputed', disputed) + sc('dna', 'Registry DNA Coverage', ASC.data.dnaStats.rate + '%') + '</div>' +
    '<div class="card table-card"><div class="table-scroll"><table class="data-table"><thead><tr>' +
      '<th>Saluki</th><th>Laboratory</th><th>Test Date</th><th>Lab Ref</th><th>Sire Match</th><th>Dam Match</th><th>Status</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '<div class="tablebar"><div class="count">Showing <b>' + R.length + '</b> DNA records · only DNA-verified Salukis are eligible for premium championship categories</div></div></div>';
  ASC.hydrateIcons(root);
  root.querySelector('#dAdd').addEventListener('click', () => ASC.toast('DNA submission flow (demo)', 'dna'));
};
