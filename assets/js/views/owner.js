/* =====================================================================
   View: Owner Profile — identity, contact, Emirates ID docs, linked Salukis
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.owner = function (root, payload) {
  const o = ASC.findOwner(payload && payload.id);
  const linked = ASC.data.salukis.filter((s) => s.owner === o.name);
  const kv = (l, v) => '<div class="kv"><label>' + l + '</label><div class="v">' + v + '</div></div>';

  const idDoc = (label, ok) => '<div class="iddoc' + (ok ? '' : ' pending') + '"><span class="di">' + ASC.icon('id') + '</span>' +
    '<div class="dt"><b>' + label + '</b><span>' + (ok ? 'Uploaded · ' + o.since : 'Awaiting upload') + '</span></div>' +
    '<span class="dv">' + (ok ? ASC.icon('check') + 'Verified' : 'Pending') + '</span></div>';

  const idContact =
    '<div class="card"><div class="panel-title"><span class="icn" data-icon="id"></span>Identity &amp; Contact</div><div class="kv-grid">' +
      '<div class="kv"><label>Emirates ID</label><div class="v mono"><span class="pii-lock"><span class="icn" data-icon="shield"></span><span id="eidVal">' + ASC.maskEid(o.emiratesId) + '</span></span><span class="reveal-btn" id="eidReveal">Reveal</span></div></div>' +
      kv('Nationality', o.nationality) +
      kv('Date of Birth', o.dob) +
      kv('Mobile', '<span class="mono">' + o.mobile + '</span>') +
      kv('Email', o.email) +
      kv('Emirate / City', o.emirate + ' · ' + o.city) +
      kv('Owner ID', '<span class="mono">' + o.id + '</span>') +
      kv('Membership', o.member ? ASC.ui.badge('Active') + ' <span class="dim" style="font-size:12px">' + o.tier + ' · since ' + o.since + '</span>' : '<span class="dim">Non-Member</span>') +
    '</div></div>';

  const docs =
    '<div class="card"><div class="panel-title"><span class="icn" data-icon="shield"></span>Verification Documents</div>' +
      idDoc('Emirates ID — Front', o.idDocs) + idDoc('Emirates ID — Back', o.idDocs) + idDoc('Profile Photo', true) +
      '<div class="dim" style="font-size:11.5px;margin-top:12px;display:flex;gap:6px;align-items:center"><span class="icn" data-icon="shield" style="width:13px;height:13px"></span>PII is encrypted at rest and masked in logs (UAE Federal Decree-Law No. 45 of 2021).</div></div>';

  const linkedCard =
    '<div class="card"><div class="card-head"><div class="card-title">Linked Salukis (' + linked.length + ')</div>' +
      '<a class="card-link" data-goto="registry"><span>Registry</span><span class="icn" data-icon="chevron"></span></a></div>' +
      (linked.length
        ? '<div class="table-scroll"><table class="data-table"><tbody>' + linked.map((s) =>
            '<tr class="clickable" data-reg="' + s.reg + '"><td><div class="cell-saluki">' + ASC.ui.salukiAvatar(s) + '<div class="cell-name"><b>' + s.nameEn + '</b><span>' + s.reg + '</span></div></div></td>' +
            '<td class="muted">' + s.breed + '</td><td>' + ASC.ui.colorChip(s.color) + '</td><td>' + ASC.ui.dnaCell(s.dna) + '</td><td>' + ASC.ui.badge(s.status) + '</td>' +
            '<td><div class="t-actions"><span class="t-btn" data-icon="chevron"></span></div></td></tr>').join('') + '</tbody></table></div>'
        : '<p class="dim" style="font-size:13px">No Salukis registered to this owner yet.</p>') + '</div>';

  root.innerHTML =
    '<button class="btn btn-ghost btn-sm" id="ownBack" style="margin-bottom:14px"><span class="icn rot180" data-icon="chevron"></span>Back to Owners</button>' +
    '<div class="card hoverable" style="margin-bottom:var(--gutter)"><div class="profile-hero">' +
      '<div class="p-photo" style="background:var(--grad-gold-soft);color:var(--brand-bronze)"><span style="font-family:var(--font-display);font-weight:700;font-size:32px">' + ASC.ui.initials(o.name).toUpperCase() + '</span></div>' +
      '<div class="p-id"><div class="p-name"><h1>' + o.name + '</h1><span class="ar">' + o.nameAr + '</span></div>' +
        '<div class="p-sub"><span class="reg">' + o.id + '</span><span class="dot"></span><span>' + o.emirate + '</span><span class="dot"></span><span class="mono">' + o.mobile + '</span></div>' +
        '<div class="p-tags">' + (o.member ? '<span class="badge gold">' + o.tier + ' Member</span>' : '<span class="badge gray">Non-Member</span>') +
          (o.idDocs ? '<span class="badge green">ID Verified</span>' : '<span class="badge amber">ID Pending</span>') + '</div></div>' +
      '<div class="p-actions">' +
        '<button class="btn btn-gold" data-toast="Message sent to owner (demo)" data-toast-icon="send"><span class="icn" data-icon="send"></span>Message</button>' +
        '<button class="btn btn-outline" data-toast="Edit owner (demo)" data-toast-icon="edit"><span class="icn" data-icon="edit"></span>Edit</button>' +
      '</div>' +
    '</div></div>' +
    '<div class="grid" style="margin-bottom:var(--gutter)"><div class="sp-8">' + idContact + '</div><div class="sp-4">' + docs + '</div></div>' +
    linkedCard;
  ASC.hydrateIcons(root);

  root.querySelector('#ownBack').addEventListener('click', () => ASC.go('owners', 'nav.owners'));
  root.querySelectorAll('[data-toast]').forEach((b) => b.addEventListener('click', () => ASC.toast(b.getAttribute('data-toast'), b.getAttribute('data-toast-icon') || 'checkc')));
  root.querySelector('[data-goto]').addEventListener('click', () => ASC.go('registry', 'nav.registry'));
  root.querySelectorAll('tr[data-reg]').forEach((tr) => tr.addEventListener('click', () => ASC.go('profile', 'nav.profile', { reg: tr.getAttribute('data-reg') })));

  let revealed = false;
  root.querySelector('#eidReveal').addEventListener('click', () => {
    revealed = !revealed;
    root.querySelector('#eidVal').textContent = revealed ? o.emiratesId : ASC.maskEid(o.emiratesId);
    root.querySelector('#eidReveal').textContent = revealed ? 'Hide' : 'Reveal';
    if (revealed) ASC.toast('Emirates ID access recorded in audit log', 'shield');
  });
};
