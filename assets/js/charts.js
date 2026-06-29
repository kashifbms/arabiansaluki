/* =====================================================================
   Chart.js setup — theme-aware, multi-renderer.
   Each screen registers a renderer via ASC.registerChartRenderer(fn).
   renderCharts() re-applies theme defaults then runs every renderer, so
   charts on any screen track theme + language. Renderers force a
   synchronous draw() (browsers pause rAF on hidden tabs → blank canvas).
   ===================================================================== */
window.ASC = window.ASC || {};
ASC._charts = {};        // overview chart instances
ASC._renderers = [];     // registered render functions

ASC.cssVar = function (name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); };
const cssVar = ASC.cssVar;

ASC.chartGradient = function (ctx, area, from, to) {
  if (!area) return from;
  const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, from); g.addColorStop(1, to);
  return g;
};

ASC.centerText = function (getLines) {
  return {
    id: 'centerText',
    afterDraw(chart) {
      const meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data.length) return;
      const { ctx } = chart, { x, y } = meta.data[0], lines = getLines();
      ctx.save();
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = cssVar('--text'); ctx.font = `700 22px ${cssVar('--font-display')}`;
      ctx.fillText(lines[0], x, y - 7);
      ctx.fillStyle = cssVar('--text-3'); ctx.font = `500 11px ${cssVar('--font-body')}`;
      ctx.fillText(lines[1], x, y + 12);
      ctx.restore();
    }
  };
};

ASC.chartTooltip = function () {
  return {
    backgroundColor: cssVar('--card'), titleColor: cssVar('--text'), bodyColor: cssVar('--text-2'),
    borderColor: cssVar('--border'), borderWidth: 1, padding: 11, cornerRadius: 10,
    titleFont: { family: cssVar('--font-display'), weight: '600' }, displayColors: true, usePointStyle: true
  };
};

ASC.registerChartRenderer = function (fn) { if (ASC._renderers.indexOf(fn) < 0) ASC._renderers.push(fn); };

ASC.renderCharts = function () {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.font.family = cssVar('--font-body');
  Chart.defaults.font.size = 12;
  Chart.defaults.color = cssVar('--text-2');
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.maintainAspectRatio = false;
  Chart.defaults.animation = false;            // paint synchronously (hidden-tab safe)
  ASC._renderers.forEach((fn) => { try { fn(); } catch (e) { console.error('chart renderer failed:', e); } });
};

/* helper: build a chart only if its canvas is visible (non-zero size), store it, force a draw.
   The size guard prevents clobbering charts on hidden screens (display:none → 0 width). */
ASC.makeChart = function (store, id, config) {
  const el = document.getElementById(id);
  if (!el || !el.clientWidth || !el.clientHeight) return;
  if (store[id]) { store[id].destroy(); }
  store[id] = new Chart(el, config);
  store[id].draw();
};

/* ============================ Overview ============================ */
ASC.registerChartRenderer(function renderOverview() {
  const d = ASC.data, S = ASC._charts;
  const text2 = cssVar('--text-2'), grid = cssVar('--border-soft'), tooltip = ASC.chartTooltip();
  const gold = cssVar('--brand-gold'), bronze = cssVar('--brand-bronze'), yellow = cssVar('--brand-yellow');
  const ok = cssVar('--success'), warn = cssVar('--warning'), err = cssVar('--error');

  ASC.makeChart(S, 'chartTrend', {
    type: 'line',
    data: { labels: d.trend.labels, datasets: [{
      data: d.trend.data, borderColor: gold, borderWidth: 3, tension: .42, fill: true,
      pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: gold, pointHoverBorderColor: cssVar('--card'), pointHoverBorderWidth: 2,
      backgroundColor: (c) => ASC.chartGradient(c.chart.ctx, c.chart.chartArea, 'rgba(240,165,60,.34)', 'rgba(240,165,60,0)')
    }]},
    options: { plugins: { tooltip: { ...tooltip, callbacks: { label: (i) => ' ' + i.parsed.y + ' registrations' } } },
      scales: { x: { grid: { display: false }, border: { display: false }, ticks: { color: text2 } },
        y: { grid: { color: grid, drawTicks: false }, border: { display: false }, ticks: { color: text2, padding: 8, maxTicksLimit: 5 }, beginAtZero: true } } }
  });

  ASC.makeChart(S, 'chartStatus', {
    type: 'doughnut',
    data: { labels: ['Approved', 'Pending', 'Rejected'], datasets: [{ data: d.status.data, backgroundColor: [ok, warn, err], borderColor: cssVar('--card'), borderWidth: 3, hoverOffset: 6 }] },
    options: { cutout: '72%', plugins: { tooltip } },
    plugins: [ASC.centerText(() => [d.stats.totalSalukis.toLocaleString(), 'Total'])]
  });

  ASC.makeChart(S, 'chartEmirate', {
    type: 'bar',
    data: { labels: d.emirate.labels, datasets: [{ data: d.emirate.data, borderRadius: 7, borderSkipped: false, barThickness: 18, backgroundColor: (c) => ASC.chartGradient(c.chart.ctx, c.chart.chartArea, yellow, bronze) }] },
    options: { indexAxis: 'y', plugins: { tooltip: { ...tooltip, callbacks: { label: (i) => ' ' + i.parsed.x + ' Salukis' } } },
      scales: { x: { grid: { color: grid, drawTicks: false }, border: { display: false }, ticks: { color: text2, maxTicksLimit: 5 }, beginAtZero: true },
        y: { grid: { display: false }, border: { display: false }, ticks: { color: cssVar('--text'), font: { weight: '500' } } } } }
  });

  ASC.makeChart(S, 'chartBreed', {
    type: 'doughnut',
    data: { labels: d.breed.labels, datasets: [{ data: d.breed.data, backgroundColor: [gold, bronze], borderColor: cssVar('--card'), borderWidth: 3, hoverOffset: 6 }] },
    options: { cutout: '70%', plugins: { tooltip: { ...tooltip, callbacks: { label: (i) => ' ' + i.label + ': ' + i.parsed + '%' } } } },
    plugins: [ASC.centerText(() => [d.breed.data[0] + '%', d.breed.labels[0]])]
  });
});
