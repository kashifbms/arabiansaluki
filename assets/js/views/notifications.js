/* =====================================================================
   View: Notifications — outbound push / email / SMS management (Module 18)
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.notifications = function (root) {
  const CHI = { push: 'bell2', mail: 'mail', sms: 'message', message: 'message' };
  const chChips = (arr) => '<div class="ch-row">' + arr.map((c) => '<span class="chchip on" title="' + c + '">' + ASC.icon(CHI[c] || 'bell2') + '</span>').join('') + '</div>';
  const campBadge = (s) => '<span class="badge ' + (s === 'Sent' ? 'green' : s === 'Scheduled' ? 'blue' : 'gray') + '">' + s + '</span>';
  const sc = (i, l, v) => '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + i + '"></span>' + l + '</div><b>' + v + '</b></div>';

  const camps = ASC.data.campaigns.map((c) =>
    '<tr><td><b>' + c.title + '</b></td><td>' + chChips(c.channels) + '</td><td class="muted">' + c.audience + '</td>' +
    '<td class="mono">' + c.recipients + '</td><td>' + campBadge(c.status) + '</td><td class="mono">' + c.open + '</td><td class="dim mono">' + c.when + '</td></tr>').join('');

  function trigRows() {
    return ASC.data.notifTriggers.map((t, i) =>
      '<tr><td><b>' + t.event + '</b></td>' +
      ['email', 'sms', 'push'].map((ch) => '<td><button class="tgl ' + (t[ch] ? 'on' : '') + '" data-i="' + i + '" data-ch="' + ch + '" aria-label="' + ch + '"></button></td>').join('') +
      '<td class="muted">' + t.who + '</td></tr>').join('');
  }

  const st = ASC.data.campaignStats;
  root.innerHTML =
    ASC.ui.pageIntro({ h: 'Notifications', p: 'Compose push, email and SMS messages to members, and configure the automated alerts the system sends.',
      actions: '<button class="btn btn-gold" id="ntNew"><span class="icn" data-icon="send"></span>New Notification</button>' }) +
    '<div class="statstrip">' + sc('send', 'Sent (30 days)', st.sent30) + sc('clock', 'Scheduled', st.scheduled) + sc('chart', 'Avg. Open Rate', st.openRate) + sc('bell2', 'Active Channels', 'Push · Email · SMS') + '</div>' +
    '<div class="card table-card" style="margin-bottom:var(--gutter)"><div class="card-head" style="padding:16px 16px 0"><div class="card-title">Campaigns</div><span class="dim" style="font-size:12px">Manual push / email / SMS sends</span></div>' +
      '<div class="table-scroll"><table class="data-table"><thead><tr><th>Message</th><th>Channels</th><th>Audience</th><th>Recipients</th><th>Status</th><th>Open</th><th>When</th></tr></thead><tbody>' + camps + '</tbody></table></div></div>' +
    '<div class="card table-card"><div class="card-head" style="padding:16px 16px 0"><div class="card-title">Automated Triggers</div><span class="dim" style="font-size:12px">Events that notify members automatically · toggle channels</span></div>' +
      '<div class="table-scroll"><table class="data-table"><thead><tr><th>Event</th><th>Email</th><th>SMS</th><th>Push</th><th>Recipient</th></tr></thead><tbody id="ntTrig">' + trigRows() + '</tbody></table></div></div>';
  ASC.hydrateIcons(root);

  root.querySelector('#ntTrig').addEventListener('click', (e) => {
    const b = e.target.closest('.tgl'); if (!b) return;
    const t = ASC.data.notifTriggers[+b.getAttribute('data-i')], ch = b.getAttribute('data-ch');
    t[ch] = !t[ch];
    b.classList.toggle('on', t[ch]);
  });
  root.querySelector('#ntNew').addEventListener('click', openCompose);

  function openCompose() {
    const fld = (l, el, full) => '<div class="field' + (full ? ' full' : '') + '"><label>' + l + '</label>' + el + '</div>';
    const chk = (v, l, on) => '<label style="display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500"><input type="checkbox"' + (on ? ' checked' : '') + ' style="width:16px;height:16px;accent-color:var(--brand-gold)"> ' + l + '</label>';
    const ov = ASC.openModal({ title: 'New Notification', size: 'lg',
      body:
        '<div class="form-grid">' +
          fld('Audience', '<select><option>All Members</option><option>Owners</option><option>Competition participants</option><option>Members — Abu Dhabi</option><option>Members — Dubai</option><option>Lapsing members</option></select>') +
          fld('Channels', '<div style="display:flex;gap:16px;align-items:center;height:40px">' + chk('push', 'Push', true) + chk('mail', 'Email', true) + chk('sms', 'SMS', false) + '</div>') +
        '</div>' +
        '<div class="bi-grid" style="margin-top:6px">' +
          '<div class="bi-col"><h4><span class="icn" data-icon="globe2"></span>English</h4>' + fld('Title', '<input type="text" placeholder="Notification title">', true) + fld('Message', '<textarea placeholder="Message body…"></textarea>', true) + '</div>' +
          '<div class="bi-col"><h4><span class="icn" data-icon="globe2"></span>العربية</h4>' + fld('العنوان', '<input type="text" dir="rtl" placeholder="عنوان الإشعار">', true) + fld('الرسالة', '<textarea dir="rtl" placeholder="نص الرسالة…"></textarea>', true) + '</div>' +
        '</div>' +
        '<div class="field full" style="margin-top:16px"><label>Delivery</label><div class="seg2" id="ntWhen"><button class="active" data-v="now">Send now</button><button data-v="later">Schedule</button></div></div>',
      foot: '<button class="btn btn-ghost" onclick="ASC.closeModal()" style="margin-inline-start:auto">Cancel</button><button class="btn btn-gold" id="ntSend"><span class="icn" data-icon="send"></span>Send Notification</button>' });
    ov.querySelectorAll('#ntWhen button').forEach((b) => b.addEventListener('click', () => ov.querySelectorAll('#ntWhen button').forEach((x) => x.classList.toggle('active', x === b))));
    ov.querySelector('#ntSend').addEventListener('click', () => { ASC.closeModal(); ASC.toast('Notification queued · Push + Email to All Members', 'send'); });
  }
};
