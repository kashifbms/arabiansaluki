/* =====================================================================
   View: Analytics — national statistics dashboard
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};
ASC._anCharts = ASC._anCharts || {};

ASC.views.analytics = function (root) {
  const d = ASC.data, st = d.stats;
  const sc = (i, l, v) => '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + i + '"></span>' + l + '</div><b>' + v + '</b></div>';
  const card = (span, title, body, sub) => '<div class="' + span + ' card hoverable"><div class="card-head"><div><div class="card-title">' + title + '</div>' + (sub ? '<div class="card-sub">' + sub + '</div>' : '') + '</div></div>' + body + '</div>';
  const legend = (items) => '<div class="legend">' + items.map((x) => '<div class="legend-item"><span class="legend-dot" style="background:' + x[1] + '"></span><span>' + x[0] + '</span><span class="val">' + x[2] + '</span></div>').join('') + '</div>';

  const compliancePct = Math.round(d.compliance.valid / (d.compliance.valid + d.compliance.expiring + d.compliance.expired) * 100);

  const genderCard =
    '<div class="progress-row"><div class="progress-top"><span>Male</span><b>' + d.gender.male + '%</b></div><div class="progress-track"><div class="progress-fill" style="width:' + d.gender.male + '%"></div></div></div>' +
    '<div class="progress-row"><div class="progress-top"><span>Female</span><b>' + d.gender.female + '%</b></div><div class="progress-track"><div class="progress-fill alt" style="width:' + d.gender.female + '%"></div></div></div>' +
    '<div class="divider"></div>' +
    '<div class="flex between" style="font-size:13px"><span class="muted">DNA verified</span><b style="font-family:var(--font-display)">' + d.dnaStats.rate + '%</b></div>' +
    '<div class="flex between mt-12" style="font-size:13px"><span class="muted">Vaccination compliance</span><b style="font-family:var(--font-display)">87%</b></div>' +
    '<div class="flex between mt-12" style="font-size:13px"><span class="muted">New registrations (30d)</span><b style="font-family:var(--font-display)">' + st.approvedThisMonth + '</b></div>';

  const reports = '<div class="card"><div class="card-head"><div class="card-title">Exportable Reports</div></div>' +
    d.reports.map((r, i) => '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;' + (i < d.reports.length - 1 ? 'border-bottom:1px solid var(--border-soft)' : '') + '"><span style="font-size:13.5px">' + r + '</span>' +
      '<div class="flex gap-8"><button class="btn btn-outline btn-sm" data-toast="Exporting · ' + r + ' (Excel)" data-toast-icon="download">Excel</button><button class="btn btn-ghost btn-sm" data-toast="Exporting · ' + r + ' (PDF)" data-toast-icon="download">PDF</button></div></div>').join('') + '</div>';

  root.innerHTML =
    ASC.ui.pageIntro({ h: 'Analytics', p: 'National registry, competition and veterinary-compliance statistics.',
      actions: '<button class="btn btn-outline" data-toast="Exporting full analytics report…" data-toast-icon="download"><span class="icn" data-icon="download"></span>Export Report</button>' }) +
    '<div class="statstrip">' + sc('paw', 'Total Salukis', st.totalSalukis.toLocaleString()) + sc('checkc', 'Approved', st.approved.toLocaleString()) +
      sc('clock', 'Pending', st.pending) + sc('users', 'Active Members', st.activeMembers) + sc('trophy', 'Competitions', st.competitionsYear) + sc('shield', 'Expiring Certs', st.expiringCerts) + '</div>' +
    '<div class="grid" style="margin-bottom:var(--gutter)">' +
      card('sp-8', 'Registrations Over Time', '<div class="chart-box"><canvas id="anTrend"></canvas></div>', 'New approved Salukis · last 12 months') +
      card('sp-4', 'Breed Distribution', '<div class="chart-box sm"><canvas id="anBreed"></canvas></div>' + legend([['Smooth-coated', 'var(--brand-gold)', '68%'], ['Feathered', 'var(--brand-bronze)', '32%']])) +
    '</div>' +
    '<div class="grid" style="margin-bottom:var(--gutter)">' +
      card('sp-4', 'By Emirate', '<div class="chart-box sm"><canvas id="anEmirate"></canvas></div>') +
      card('sp-4', 'By Age Group', '<div class="chart-box sm"><canvas id="anAge"></canvas></div>') +
      card('sp-4', 'Veterinary Compliance', '<div class="chart-box sm"><canvas id="anCompliance"></canvas></div>' + legend([['Valid', 'var(--success)', d.compliance.valid.toLocaleString()], ['Expiring', 'var(--warning)', d.compliance.expiring], ['Expired', 'var(--error)', d.compliance.expired]])) +
    '</div>' +
    '<div class="grid" style="margin-bottom:var(--gutter)">' +
      card('sp-8', 'Competition Participation by Type', '<div class="chart-box sm"><canvas id="anPart"></canvas></div>') +
      card('sp-4', 'Demographics & Compliance', genderCard) +
    '</div>' +
    reports;
  ASC.hydrateIcons(root);
  root.querySelectorAll('[data-toast]').forEach((b) => b.addEventListener('click', () => ASC.toast(b.getAttribute('data-toast'), b.getAttribute('data-toast-icon') || 'checkc')));
};

ASC.registerChartRenderer(function renderAnalytics() {
  if (typeof Chart === 'undefined' || !document.getElementById('anTrend')) return;
  const d = ASC.data, S = ASC._anCharts, tt = ASC.chartTooltip();
  const gold = ASC.cssVar('--brand-gold'), bronze = ASC.cssVar('--brand-bronze'), yellow = ASC.cssVar('--brand-yellow');
  const text2 = ASC.cssVar('--text-2'), grid = ASC.cssVar('--border-soft'), cardc = ASC.cssVar('--card');
  const ok = ASC.cssVar('--success'), warn = ASC.cssVar('--warning'), err = ASC.cssVar('--error');
  const barX = { x: { grid: { color: grid, drawTicks: false }, border: { display: false }, ticks: { color: text2, maxTicksLimit: 5 }, beginAtZero: true }, y: { grid: { display: false }, border: { display: false }, ticks: { color: ASC.cssVar('--text'), font: { weight: '500' } } } };

  ASC.makeChart(S, 'anTrend', { type: 'line', data: { labels: d.trend.labels, datasets: [{ data: d.trend.data, borderColor: gold, borderWidth: 3, tension: .42, fill: true, pointRadius: 0, pointHoverRadius: 6, backgroundColor: (c) => ASC.chartGradient(c.chart.ctx, c.chart.chartArea, 'rgba(240,165,60,.34)', 'rgba(240,165,60,0)') }] },
    options: { plugins: { tooltip: tt }, scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: text2 } }, y: { grid: { color: grid, drawTicks: false }, border: { display: false }, ticks: { color: text2, maxTicksLimit: 5, padding: 8 }, beginAtZero: true } } } });

  ASC.makeChart(S, 'anBreed', { type: 'doughnut', data: { labels: d.breed.labels, datasets: [{ data: d.breed.data, backgroundColor: [gold, bronze], borderColor: cardc, borderWidth: 3, hoverOffset: 6 }] },
    options: { cutout: '68%', plugins: { tooltip: { ...tt, callbacks: { label: (i) => ' ' + i.label + ': ' + i.parsed + '%' } } } }, plugins: [ASC.centerText(() => [d.breed.data[0] + '%', 'Smooth'])] });

  ASC.makeChart(S, 'anEmirate', { type: 'bar', data: { labels: d.emirate.labels, datasets: [{ data: d.emirate.data, borderRadius: 7, borderSkipped: false, barThickness: 14, backgroundColor: (c) => ASC.chartGradient(c.chart.ctx, c.chart.chartArea, yellow, bronze) }] }, options: { indexAxis: 'y', plugins: { tooltip: tt }, scales: barX } });

  ASC.makeChart(S, 'anAge', { type: 'bar', data: { labels: d.ageGroups.labels, datasets: [{ data: d.ageGroups.data, borderRadius: 7, borderSkipped: false, maxBarThickness: 32, backgroundColor: (c) => ASC.chartGradient(c.chart.ctx, c.chart.chartArea, yellow, bronze) }] },
    options: { plugins: { tooltip: tt }, scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: text2 } }, y: { grid: { color: grid, drawTicks: false }, border: { display: false }, ticks: { color: text2, maxTicksLimit: 5, padding: 6 }, beginAtZero: true } } } });

  const comp = d.compliance, totalCerts = comp.valid + comp.expiring + comp.expired;
  ASC.makeChart(S, 'anCompliance', { type: 'doughnut', data: { labels: ['Valid', 'Expiring', 'Expired'], datasets: [{ data: [comp.valid, comp.expiring, comp.expired], backgroundColor: [ok, warn, err], borderColor: cardc, borderWidth: 3, hoverOffset: 6 }] },
    options: { cutout: '68%', plugins: { tooltip: tt } }, plugins: [ASC.centerText(() => [Math.round(comp.valid / totalCerts * 100) + '%', 'Valid'])] });

  ASC.makeChart(S, 'anPart', { type: 'bar', data: { labels: d.participation.labels, datasets: [{ data: d.participation.data, borderRadius: 7, borderSkipped: false, barThickness: 16, backgroundColor: (c) => ASC.chartGradient(c.chart.ctx, c.chart.chartArea, yellow, bronze) }] }, options: { indexAxis: 'y', plugins: { tooltip: tt }, scales: barX } });
});
