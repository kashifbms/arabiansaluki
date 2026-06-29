/* =====================================================================
   Shared UI render helpers used by the screen views.
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.ui = {};

/* status → badge colour */
ASC.ui.STATUS = {
  'Approved':'green', 'Pending':'amber', 'Pending Review':'amber', 'Under Review':'blue',
  'Info Required':'blue', 'Rejected':'red', 'Suspended':'red', 'Draft':'gray',
  'Active':'green', 'Lapsed':'amber', 'Cancelled':'red', 'Valid':'green', 'Expiring':'amber', 'Expired':'red',
  'Confirmed':'green', 'Disputed':'red'
};
ASC.ui.badge = function (s, plain) {
  var c = ASC.ui.STATUS[s] || 'gray';
  return '<span class="badge ' + c + (plain ? ' plain' : '') + '">' + s + '</span>';
};

ASC.ui.initials = function (name) {
  var p = (name || '').trim().split(/\s+/);
  return ((p[0] || '')[0] || '' ) + ((p[1] || '')[0] || '');
};

/* circular Saluki avatar (paw glyph, sex-tinted) */
ASC.ui.salukiAvatar = function (s, big) {
  return '<span class="s-avatar ' + (s.sex === 'Female' ? 'fem' : 'mal') + (big ? ' big' : '') + '">' + ASC.icon('paw') + '</span>';
};

/* owner initials chip */
ASC.ui.ownerChip = function (name) {
  return '<span class="owner-chip"><span class="avatar sm">' + ASC.ui.initials(name).toUpperCase() + '</span>' + name + '</span>';
};

ASC.ui.colorChip = function (color) {
  var hex = (ASC.data.colorHex[color] || '#999');
  return '<span class="color-chip"><i style="background:' + hex + '"></i>' + color + '</span>';
};

ASC.ui.dnaCell = function (dna) {
  return dna
    ? '<span class="dna-ok" title="DNA verified">' + ASC.icon('dna') + '</span>'
    : '<span class="dim">—</span>';
};

ASC.ui.pageIntro = function (o) {
  return '<div class="page-intro"><div><h1>' + o.h + '</h1>' +
    (o.p ? '<p>' + o.p + '</p>' : '') + '</div>' +
    (o.actions ? '<div class="flex gap-8 wrap">' + o.actions + '</div>' : '') + '</div>';
};

/* select dropdown */
ASC.ui.select = function (id, label, opts, val) {
  var o = opts.map(function (x) { return '<option value="' + x + '"' + (x === val ? ' selected' : '') + '>' + (x === 'all' ? (label) : x) + '</option>'; }).join('');
  return '<select class="f-select" id="' + id + '" aria-label="' + label + '">' + o + '</select>';
};

/* deterministic faux-QR (decorative, scannable-looking) */
ASC.ui.qr = function (seed, size) {
  size = size || 128;
  var n = 23, cell = size / n, h = 5381;
  for (var i = 0; i < seed.length; i++) h = ((h * 33) ^ seed.charCodeAt(i)) >>> 0;
  function rnd() { h = (h * 1103515245 + 12345) >>> 0; return (h >>> 16) / 65536; }
  var r = '';
  function finder(gx, gy) {
    r += '<rect x="' + (gx * cell) + '" y="' + (gy * cell) + '" width="' + (7 * cell) + '" height="' + (7 * cell) + '" rx="' + cell + '" fill="#0e1116"/>';
    r += '<rect x="' + ((gx + 1) * cell) + '" y="' + ((gy + 1) * cell) + '" width="' + (5 * cell) + '" height="' + (5 * cell) + '" rx="' + (cell * .6) + '" fill="#fff"/>';
    r += '<rect x="' + ((gx + 2) * cell) + '" y="' + ((gy + 2) * cell) + '" width="' + (3 * cell) + '" height="' + (3 * cell) + '" rx="' + (cell * .4) + '" fill="#0e1116"/>';
  }
  for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
    if ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)) continue;
    if (rnd() > 0.52) r += '<rect x="' + (x * cell).toFixed(2) + '" y="' + (y * cell).toFixed(2) + '" width="' + cell.toFixed(2) + '" height="' + cell.toFixed(2) + '" rx="' + (cell * .25).toFixed(2) + '" fill="#0e1116"/>';
  }
  finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
  return '<svg class="qr" viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '"><rect width="' + size + '" height="' + size + '" rx="8" fill="#fff"/>' + r + '</svg>';
};

/* empty-state row */
ASC.ui.empty = function (msg, span) {
  return '<tr class="empty-row"><td colspan="' + (span || 9) + '"><div class="empty-cell">' + ASC.icon('search') + '<span>' + (msg || 'No results found') + '</span></div></td></tr>';
};
