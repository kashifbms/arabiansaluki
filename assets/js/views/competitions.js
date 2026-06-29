/* =====================================================================
   View: Competitions — events, championship leaderboard, participation
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};
ASC._compCharts = ASC._compCharts || {};

ASC.views.competitions = function (root) {
  const d = ASC.data;
  const sc = (i, l, v) => '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + i + '"></span>' + l + '</div><b>' + v + '</b></div>';

  function eventsHTML() {
    return ASC.data.events.map((e) =>
      '<div class="card ev-card"><div class="event-date"><span class="d">' + e.d + '</span><span class="m">' + e.m + '</span></div>' +
      '<div class="event-info"><div class="event-name">' + e.name + '</div><div class="event-meta">' + e.meta + '</div>' +
      '<div style="margin-top:9px"><span class="badge ' + e.status.c + '">' + e.status.t + '</span></div></div></div>').join('');
  }
  ASC.refreshCompetitionEvents = function () { const el = document.getElementById('compEvents'); if (el) el.innerHTML = eventsHTML(); };

  const board = d.leaderboard.map((l) =>
    '<tr><td><span class="rank-badge' + (l.rank <= 3 ? ' g' + l.rank : '') + '">' + l.rank + '</span></td>' +
    '<td><div class="cell-name"><b>' + l.name + '</b><span>' + l.reg + '</span></div></td>' +
    '<td class="mono">' + l.races + '</td><td class="mono">' + l.wins + '</td>' +
    '<td><b style="font-family:var(--font-display);font-variant-numeric:tabular-nums">' + l.points + '</b></td></tr>').join('');

  root.innerHTML =
    ASC.ui.pageIntro({ h: 'Competitions', p: 'Events calendar, championship standings and participation analytics.',
      actions: '<button class="btn btn-gold" id="cAdd"><span class="icn" data-icon="calplus"></span>Add Event</button>' }) +
    '<div class="statstrip">' + sc('trophy', 'Events This Year', d.stats.competitionsYear) + sc('users', 'Total Participants', d.stats.participants) +
      sc('calendar', 'Upcoming', d.stats.upcomingEvents) + sc('medal', 'Championship Points', d.leaderboard[0].points) + '</div>' +
    '<div class="card-head" style="margin-bottom:14px"><div class="card-title" style="font-size:15px">Events Calendar</div></div>' +
    '<div class="ev-grid" id="compEvents" style="margin-bottom:var(--gutter)">' + eventsHTML() + '</div>' +
    '<div class="grid">' +
      '<div class="sp-8 card hoverable"><div class="card-head"><div class="card-title">Championship Leaderboard</div><span class="badge gold">2026 Season</span></div>' +
        '<div class="table-scroll"><table class="data-table"><thead><tr><th>Rank</th><th>Saluki</th><th>Races</th><th>Wins</th><th>Points</th></tr></thead><tbody>' + board + '</tbody></table></div></div>' +
      '<div class="sp-4 card hoverable"><div class="card-head"><div class="card-title">Participation by Type</div></div><div class="chart-box sm"><canvas id="compChart"></canvas></div></div>' +
    '</div>';
  ASC.hydrateIcons(root);
  root.querySelector('#cAdd').addEventListener('click', () => ASC.openEventModal());
};

ASC.registerChartRenderer(function renderCompetitions() {
  if (typeof Chart === 'undefined' || !document.getElementById('compChart')) return;
  const p = ASC.data.participation, tooltip = ASC.chartTooltip();
  ASC.makeChart(ASC._compCharts, 'compChart', {
    type: 'bar',
    data: { labels: p.labels, datasets: [{ data: p.data, borderRadius: 7, borderSkipped: false, barThickness: 15,
      backgroundColor: (c) => ASC.chartGradient(c.chart.ctx, c.chart.chartArea, ASC.cssVar('--brand-yellow'), ASC.cssVar('--brand-bronze')) }] },
    options: { indexAxis: 'y', plugins: { tooltip: { ...tooltip, callbacks: { label: (i) => ' ' + i.parsed.x + ' entries' } } },
      scales: { x: { grid: { color: ASC.cssVar('--border-soft'), drawTicks: false }, border: { display: false }, ticks: { color: ASC.cssVar('--text-2'), maxTicksLimit: 5 }, beginAtZero: true },
        y: { grid: { display: false }, border: { display: false }, ticks: { color: ASC.cssVar('--text'), font: { weight: '500' } } } } }
  });
});
