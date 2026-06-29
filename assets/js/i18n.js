/* =====================================================================
   Dashboard strings (English only).
   The admin dashboard is always English. Bilingual EN/AR content lives
   in the end-user product (mobile app / public pages), not here.
   This module just centralizes the UI copy used via data-i18n.
   ===================================================================== */
window.ASC = window.ASC || {};

const STR = {
  'brand.sub': 'Registry System',
  'nav.overview': 'Overview', 'nav.analytics': 'Analytics',
  'nav.registry': 'Saluki Registry', 'nav.profile': 'Saluki Profile', 'nav.queue': 'Registration Queue',
  'nav.owners': 'Owners', 'nav.owner': 'Owner Profile',
  'nav.competitions': 'Competitions', 'nav.breeder': 'Breeder Registry', 'nav.dna': 'DNA Verification',
  'nav.members': 'Members', 'nav.notifications': 'Notifications',
  'nav.support': 'Support', 'nav.content': 'App Content', 'group.engage': 'Engagement',
  'group.main': 'Main', 'group.registry': 'Registry', 'group.programs': 'Programs', 'group.community': 'Community',
  'top.title': 'Dashboard Overview', 'search.ph': 'Search Salukis, owners, reg #…',
  'page.h': 'Welcome back, Ahmed', 'page.p': 'Here is what is happening across the Arabian Saluki Center registry today.',
  'qa.register': 'Register Saluki', 'qa.review': 'Review Queue', 'qa.event': 'Add Event', 'qa.export': 'Export Report',
  'kpi.salukis': 'Total Registered Salukis', 'kpi.pending': 'Pending Approvals', 'kpi.members': 'Active Members',
  'kpi.events': 'Upcoming Events', 'kpi.approved': 'Approved This Month', 'kpi.certs': 'Expiring Health Certs',
  'card.trend': 'Registrations Over Time', 'card.trend.sub': 'New approved Salukis · last 12 months',
  'card.status': 'Registration Status', 'card.emirate': 'Registrations by Emirate', 'card.breed': 'Breed Distribution',
  'card.gender': 'By Gender', 'card.activity': 'Recent Activity', 'card.events': 'Upcoming Events',
  'lbl.male': 'Male', 'lbl.female': 'Female', 'lbl.total': 'Total', 'lbl.thismonth': 'this month',
  'see.all': 'View all', 'role.superadmin': 'Super Admin',
  'ph.title': 'Screen coming up next',
  'ph.text': 'This module is queued in the build plan. The Overview is ready for your review first — approve the look & feel and I’ll build this screen with the same design language.',
  'ph.badge': 'In the build queue', 'ph.back': 'Back to Overview'
};

ASC.lang = 'en';
ASC.t = function (key) { return STR[key] || key; };

ASC.applyI18n = function (root) {
  const scope = root || document;
  scope.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = ASC.t(el.getAttribute('data-i18n')); });
  scope.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.setAttribute('placeholder', ASC.t(el.getAttribute('data-i18n-ph'))); });
};

ASC.initI18n = function () {
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
  ASC.applyI18n();
};
