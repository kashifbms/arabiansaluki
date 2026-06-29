/* =====================================================================
   View: Saluki Profile — Info / Medical / Competitions / Pedigree tabs
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.profile = function (root, payload) {
  const s = ASC.findSaluki(payload && payload.reg);
  const d = getDetail(s);
  const owner = ASC.data.owners.find((o) => o.name === s.owner) || { emirate: s.emirate, member: false, salukis: 1 };
  const sx = s.sex === 'Female' ? 'fem' : 'mal';

  function getDetail(s) {
    const specific = ASC.data.details[s.reg];
    if (specific) return specific;
    return {
      pedigree: null,
      vaccinations: [
        { name: 'Rabies', date: '12 Feb 2026', due: '12 Feb 2027', status: 'Valid' },
        { name: 'DHPP', date: '20 Mar 2026', due: '20 Mar 2027', status: 'Valid' }
      ],
      certs: [],
      vet: { name: 'Dr. Sara Al Hammadi', clinic: 'Gulf Veterinary Centre', emirate: s.emirate, phone: '+971 4 555 2200' },
      competitions: [],
      perf: null,
      dna: s.dna ? { lab: 'GenVet UAE Laboratory', date: '—', ref: '—', sire: true, dam: true, health: 'No hereditary conditions detected', verified: true } : null,
      passport: { version: 1, updated: s.registered }
    };
  }

  const kv = (l, v, mono) => '<div class="kv"><label>' + l + '</label><div class="v' + (mono ? ' mono' : '') + '">' + v + '</div></div>';

  /* ---------------- Info panel ---------------- */
  function infoPanel() {
    const id =
      '<div class="card"><div class="panel-title"><span class="icn" data-icon="id"></span>Identity</div>' +
      '<div class="kv-grid">' +
        kv('Registration No', s.reg, true) +
        kv('Microchip (ISO)', s.microchip, true) +
        kv('Date of Birth', fmtDob(s.dob)) +
        kv('Age', s.age) +
        kv('Sex', s.sex) +
        kv('Breed / Type', s.breed) +
        kv('Colour', ASC.ui.colorChip(s.color)) +
        kv('Registered', s.registered) +
        kv('Status', ASC.ui.badge(s.status)) +
        kv('DNA', s.dna ? '<span class="badge gold">Verified</span>' : '<span class="dim">Not verified</span>') +
      '</div></div>';

    const ownerCard =
      '<div class="card"><div class="panel-title"><span class="icn" data-icon="users"></span>Current Owner</div>' +
      '<div class="flex items-center gap-12"><span class="avatar">' + ASC.ui.initials(s.owner).toUpperCase() + '</span>' +
      '<div><div style="font-weight:600">' + s.owner + '</div><div class="dim" style="font-size:12.5px">' + owner.emirate + ' · ' +
      (owner.member ? 'Club Member' : 'Non-Member') + '</div></div></div>' +
      '<div class="divider"></div>' +
      '<div class="flex between" style="font-size:13px"><span class="muted">Salukis owned</span><b style="font-family:var(--font-display)">' + owner.salukis + '</b></div>' +
      '<div class="flex between mt-12" style="font-size:13px"><span class="muted">Membership</span>' + (owner.member ? ASC.ui.badge('Active') : '<span class="dim">—</span>') + '</div>' +
      (owner.id ? '<button class="btn btn-outline btn-sm" id="pfOwner" style="width:100%;margin-top:14px"><span class="icn" data-icon="users"></span>View owner profile</button>' : '') + '</div>';

    const idCard =
      '<div class="id-card">' + ASC.ui.qr(s.reg, 132) +
      '<div class="mono" style="margin-top:12px;font-weight:700">' + s.reg + '</div>' +
      '<div class="scan"><span class="icn" data-icon="qr"></span>Scan to verify official record</div></div>';

    return '<div class="grid">' +
      '<div class="sp-8">' + id + '</div>' +
      '<div class="sp-4"><div class="stack">' + idCard + '<div class="mt-16">' + ownerCard + '</div></div></div>' +
      '</div>';
  }

  /* ---------------- Medical panel ---------------- */
  function medPanel() {
    const vacc = '<div class="card"><div class="panel-title"><span class="icn" data-icon="vet"></span>Vaccinations</div>' +
      '<div class="table-scroll"><table class="data-table"><thead><tr><th>Vaccine</th><th>Administered</th><th>Next Due</th><th>Status</th></tr></thead><tbody>' +
      d.vaccinations.map((v) => '<tr><td><b>' + v.name + '</b></td><td class="mono">' + v.date + '</td><td class="mono">' + v.due + '</td><td>' + ASC.ui.badge(v.status) + '</td></tr>').join('') +
      '</tbody></table></div></div>';

    const certs = '<div class="card"><div class="panel-title"><span class="icn" data-icon="shield"></span>Health Certificates</div>' +
      (d.certs.length
        ? '<div class="table-scroll"><table class="data-table"><thead><tr><th>Type</th><th>Issued</th><th>Expiry</th><th>Issued By</th><th>Status</th></tr></thead><tbody>' +
          d.certs.map((c) => '<tr><td><b>' + c.type + '</b></td><td class="mono">' + c.issued + '</td><td class="mono">' + c.expiry + '</td><td class="muted">' + c.by + '</td><td>' + ASC.ui.badge(c.status) + '</td></tr>').join('') +
          '</tbody></table></div>'
        : '<p class="dim" style="font-size:13px">No active health certificates on file.</p>') + '</div>';

    const vet = '<div class="card"><div class="panel-title"><span class="icn" data-icon="vet"></span>Treating Veterinarian</div>' +
      '<div class="kv-grid">' + kv('Veterinarian', d.vet.name) + kv('Clinic', d.vet.clinic) + kv('Emirate', d.vet.emirate) + kv('Contact', d.vet.phone, true) + '</div></div>';

    return '<div class="stack">' + vet + '<div class="mt-16">' + vacc + '</div><div class="mt-16">' + certs + '</div></div>';
  }

  /* ---------------- Competitions panel ---------------- */
  function compPanel() {
    const c = d.competitions || [];
    if (!c.length) return '<div class="card"><div class="empty-cell"><span class="icn" data-icon="trophy"></span><span>No competition history yet for ' + s.nameEn + '.</span></div></div>';
    const wins = c.filter((x) => x.rank === 1).length;
    const best = Math.min.apply(null, c.map((x) => x.rank));
    const pts = c.reduce((a, x) => a + (x.points || 0), 0);
    const winRate = Math.round((wins / c.length) * 100);

    const stats = '<div class="card"><div class="stat-row">' +
      stat(c.length, 'Events') + stat(wins, 'Wins') + stat(best === 1 ? '1st' : best + 'th', 'Best Rank') +
      stat(winRate + '%', 'Win Rate') + stat(pts, 'Points') + '</div></div>';

    const perf = d.perf ? '<div class="card mt-16"><div class="panel-title"><span class="icn" data-icon="chart"></span>Placement Over Time <span class="dim" style="font-weight:400;font-size:11.5px;margin-inline-start:6px">(higher = better)</span></div>' + perfSvg(d.perf) + '</div>' : '';

    const table = '<div class="card mt-16"><div class="panel-title"><span class="icn" data-icon="trophy"></span>Results History</div>' +
      '<div class="table-scroll"><table class="data-table"><thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Rank</th><th>Award</th><th>Points</th></tr></thead><tbody>' +
      c.map((x) => '<tr><td><b>' + x.event + '</b></td><td class="muted">' + x.type + '</td><td class="mono">' + x.date + '</td><td class="mono">' + (x.rank === 1 ? '🥇 1st' : x.rank + (x.rank === 2 ? 'nd' : x.rank === 3 ? 'rd' : 'th')) + '</td><td><span class="badge gold plain">' + x.award + '</span></td><td class="mono">' + x.points + '</td></tr>').join('') +
      '</tbody></table></div></div>';

    return '<div class="stack">' + stats + perf + table + '</div>';
  }
  function stat(v, l) { return '<div class="stat"><b>' + v + '</b><span>' + l + '</span></div>'; }
  function perfSvg(p) {
    const w = 600, h = 110, pad = 10, max = Math.max.apply(null, p), min = 1, span = (max - min) || 1;
    const pts = p.map((v, i) => [pad + (i / (p.length - 1)) * (w - 2 * pad), pad + ((v - min) / span) * (h - 2 * pad)]);
    const line = pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" style="width:100%;height:110px;display:block">' +
      '<polygon points="0,' + h + ' ' + line + ' ' + w + ',' + h + '" fill="rgba(240,165,60,.14)"/>' +
      '<polyline points="' + line + '" fill="none" stroke="var(--brand-gold)" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/></svg>';
  }

  /* ---------------- Pedigree panel ---------------- */
  function pedPanel() {
    const p = d.pedigree;
    let tree;
    if (!p) {
      tree = '<div class="card"><div class="empty-cell"><span class="icn" data-icon="lineage"></span><span>Pedigree not documented for this Saluki.</span></div></div>';
    } else {
      const node = (role, n, cls) => '<div class="pnode ' + (cls || '') + '"><div class="ped-role">' + role + '</div><div class="ped-name">' + n.name + (n.dna ? '<span class="icn" data-icon="dna" title="DNA verified"></span>' : '') + '</div>' + (n.reg ? '<div class="ped-reg">' + n.reg + '</div>' : '') + '</div>';
      const leaf = (role, n) => '<div class="pkid">' + node(role, n, 'sm') + '</div>';
      tree = '<div class="card"><div class="panel-title"><span class="icn" data-icon="lineage"></span>Pedigree & Lineage</div>' +
        '<div class="pedtree"><div class="ped2">' + node('Self', { name: s.nameEn, reg: s.reg, dna: s.dna }, 'self') +
          '<div class="pkids">' +
            '<div class="pkid"><div class="ped2">' + node('Sire', p.sire) +
              '<div class="pkids">' + leaf('P. Grandsire', p.sireSire) + leaf('P. Granddam', p.sireDam) + '</div></div></div>' +
            '<div class="pkid"><div class="ped2">' + node('Dam', p.dam) +
              '<div class="pkids">' + leaf('M. Grandsire', p.damSire) + leaf('M. Granddam', p.damDam) + '</div></div></div>' +
          '</div></div></div></div>';
    }

    const dna = d.dna
      ? '<div class="card mt-16"><div class="panel-title"><span class="icn" data-icon="dna"></span>DNA Verification <span class="badge gold" style="margin-inline-start:8px">Verified</span></div>' +
        '<div class="kv-grid">' + kv('Laboratory', d.dna.lab) + kv('Test Date', d.dna.date) + kv('Lab Reference', d.dna.ref, true) +
        kv('Sire Match', d.dna.sire ? '<span class="badge green">Confirmed</span>' : '<span class="badge red">Unmatched</span>') +
        kv('Dam Match', d.dna.dam ? '<span class="badge green">Confirmed</span>' : '<span class="badge red">Unmatched</span>') +
        kv('Genetic Health', d.dna.health) + '</div></div>'
      : '<div class="card mt-16"><div class="panel-title"><span class="icn" data-icon="dna"></span>DNA Verification</div><div class="flex between items-center wrap gap-12"><p class="dim" style="font-size:13px;margin:0">This Saluki has not been DNA-verified yet.</p><button class="btn btn-outline btn-sm" data-toast="DNA submission flow (demo)" data-toast-icon="dna"><span class="icn" data-icon="plus"></span>Submit DNA Test</button></div></div>';

    return '<div class="stack">' + tree + dna + '</div>';
  }

  function fmtDob(iso) {
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const p = iso.split('-');
    return parseInt(p[2], 10) + ' ' + m[parseInt(p[1], 10) - 1] + ' ' + p[0];
  }

  /* ---------------- Assemble ---------------- */
  root.innerHTML =
    '<button class="btn btn-ghost btn-sm" id="pfBack" style="margin-bottom:14px"><span class="icn rot180" data-icon="chevron"></span>Back to Registry</button>' +
    '<div class="card hoverable" style="margin-bottom:var(--gutter)"><div class="profile-hero">' +
      '<div class="p-photo ' + sx + '"><span class="icn" data-icon="paw"></span></div>' +
      '<div class="p-id">' +
        '<div class="p-name"><h1>' + s.nameEn + '</h1><span class="ar">' + s.nameAr + '</span></div>' +
        '<div class="p-sub"><span class="reg">' + s.reg + '</span><span class="dot"></span><span>' + s.breed + '</span><span class="dot"></span><span>' + s.sex + ' · ' + s.age + '</span><span class="dot"></span><span class="mono">Chip ' + s.microchip + '</span></div>' +
        '<div class="p-tags">' + ASC.ui.badge(s.status) + ASC.ui.colorChip(s.color) + (s.dna ? '<span class="badge gold">DNA Verified</span>' : '') + '</div>' +
      '</div>' +
      '<div class="p-actions">' +
        '<button class="btn btn-gold" id="pfPassport"><span class="icn" data-icon="passport"></span>Digital Passport</button>' +
        '<button class="btn btn-outline" id="pfTransfer"><span class="icn" data-icon="transfer"></span>Transfer Ownership</button>' +
      '</div>' +
    '</div></div>' +
    '<div class="tabs">' +
      '<button class="tab active" data-tab="info"><span class="icn" data-icon="id"></span>Info</button>' +
      '<button class="tab" data-tab="med"><span class="icn" data-icon="vet"></span>Medical</button>' +
      '<button class="tab" data-tab="comp"><span class="icn" data-icon="trophy"></span>Competitions</button>' +
      '<button class="tab" data-tab="ped"><span class="icn" data-icon="lineage"></span>Pedigree</button>' +
    '</div>' +
    '<div class="panel active" data-panel="info">' + infoPanel() + '</div>' +
    '<div class="panel" data-panel="med">' + medPanel() + '</div>' +
    '<div class="panel" data-panel="comp">' + compPanel() + '</div>' +
    '<div class="panel" data-panel="ped">' + pedPanel() + '</div>';

  ASC.hydrateIcons(root);

  root.querySelector('#pfBack').addEventListener('click', () => ASC.go('registry', 'nav.registry'));
  root.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
    const id = t.getAttribute('data-tab');
    root.querySelectorAll('.tab').forEach((x) => x.classList.toggle('active', x === t));
    root.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.getAttribute('data-panel') === id));
  }));
  root.querySelectorAll('[data-toast]').forEach((b) => b.addEventListener('click', () => ASC.toast(b.getAttribute('data-toast'), b.getAttribute('data-toast-icon') || 'checkc')));
  root.querySelector('#pfPassport').addEventListener('click', () => ASC.openPassport(s.reg));
  root.querySelector('#pfTransfer').addEventListener('click', () => ASC.openTransfer(s.reg));
  const ownBtn = root.querySelector('#pfOwner');
  if (ownBtn) ownBtn.addEventListener('click', () => ASC.go('owner', 'nav.owner', { id: owner.id }));
};
