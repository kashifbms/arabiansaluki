/* =====================================================================
   View: Breeder Registry — kennels + litter registration
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.breeder = function (root) {
  const B = ASC.data.breeders, L = ASC.data.litters, P = ASC.data.puppies;
  const sc = (i, l, v) => '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + i + '"></span>' + l + '</div><b>' + v + '</b></div>';
  const tag = (s, good) => '<span class="badge ' + (good ? 'green' : 'amber') + '">' + s + '</span>';

  const breederRows = B.map((b) =>
    '<tr><td><div class="cell-saluki"><span class="s-avatar mal">' + ASC.icon('lineage') + '</span><div class="cell-name"><b>' + b.kennel + '</b><span>' + b.id + '</span></div></div></td>' +
    '<td>' + ASC.ui.ownerChip(b.owner) + '</td>' +
    '<td class="muted">' + b.emirate + '</td>' +
    '<td class="mono">' + b.license + '</td>' +
    '<td class="mono">' + b.expiry + '</td>' +
    '<td class="mono">' + b.litters + '</td>' +
    '<td>' + tag(b.status, b.status === 'Active') + '</td></tr>').join('');

  const litterRows = L.map((l) =>
    '<tr><td class="mono">' + l.id + '</td><td><b>' + l.kennel + '</b></td>' +
    '<td>' + l.sire + ' <span class="dim">×</span> ' + l.dam + '</td>' +
    '<td class="mono">' + l.born + '</td><td class="mono">' + l.puppies + '</td>' +
    '<td>' + tag(l.screening, l.screening === 'Complete') + '</td>' +
    '<td>' + (l.status === 'Registered' ? ASC.ui.badge('Approved') : '<span class="badge blue">' + l.status + '</span>') + '</td></tr>').join('');

  const pups = P.map((p) =>
    '<div class="ped-node"><div class="ped-role">' + p.id + '</div><div class="ped-name">' + p.name + '</div>' +
    '<div class="ped-reg">' + p.sex + ' · ' + p.color + '</div></div>').join('');

  root.innerHTML =
    ASC.ui.pageIntro({ h: 'Breeder Registry', p: 'Licensed kennels, breeding records and litter registration.',
      actions: '<button class="btn btn-gold" id="bAdd"><span class="icn" data-icon="plus"></span>Register Litter</button>' }) +
    '<div class="statstrip">' + sc('lineage', 'Licensed Breeders', B.length) + sc('paw', 'Litters Registered', L.filter((l) => l.status === 'Registered').length) +
      sc('id', 'Puppies Registered', P.length) + sc('clock', 'Expected Litters', L.filter((l) => l.status !== 'Registered').length) + '</div>' +
    '<div class="card table-card" style="margin-bottom:var(--gutter)"><div class="card-head" style="padding:16px 16px 0"><div class="card-title">Licensed Kennels</div></div>' +
      '<div class="table-scroll"><table class="data-table"><thead><tr><th>Kennel</th><th>Owner</th><th>Emirate</th><th>License No</th><th>Expiry</th><th>Litters</th><th>Status</th></tr></thead><tbody>' + breederRows + '</tbody></table></div></div>' +
    '<div class="card table-card" style="margin-bottom:var(--gutter)"><div class="card-head" style="padding:16px 16px 0"><div class="card-title">Litter Registry</div></div>' +
      '<div class="table-scroll"><table class="data-table"><thead><tr><th>Litter ID</th><th>Kennel</th><th>Pairing (Sire × Dam)</th><th>Born</th><th>Puppies</th><th>Genetic Screening</th><th>Status</th></tr></thead><tbody>' + litterRows + '</tbody></table></div></div>' +
    '<div class="card"><div class="panel-title"><span class="icn" data-icon="paw"></span>Featured Litter · LIT-2026-0021 — Al Reem Kennels <span class="dim" style="font-weight:400;margin-inline-start:6px">Majd Al Reem × Noor Al Sahra · born 14 May 2026</span></div>' +
      '<div class="pedigree" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr))">' + pups + '</div></div>';
  ASC.hydrateIcons(root);
  root.querySelector('#bAdd').addEventListener('click', () => ASC.toast('Litter registration flow (demo)', 'plus'));
};
