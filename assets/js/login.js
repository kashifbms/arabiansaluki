/* =====================================================================
   Sign-in gate (mock auth for the pitch demo).
   Shows on every load (no persistence) — light theme. Correct credentials
   reveal the dark dashboard; Sign Out returns to the light login.
   ===================================================================== */
window.ASC = window.ASC || {};

ASC.signOut = function () {
  document.documentElement.classList.remove('authed');
  if (ASC.setTheme) ASC.setTheme('light');                 // login screen defaults to light
  const lt = document.getElementById('loginTheme'); if (lt) lt.innerHTML = ASC.icon('moon');
  const p = document.getElementById('lpass'); if (p) { p.value = 'saluki2026'; p.type = 'password'; }
  if (ASC.toast) ASC.toast('Signed out', 'logout');
};

ASC.initLogin = function () {
  const login = document.getElementById('login');
  if (!login) return;
  const CRED = { user: 'admin', pass: 'saluki2026' };
  const form = document.getElementById('loginForm');
  const err = document.getElementById('lerror');
  const userI = document.getElementById('luser');
  const passI = document.getElementById('lpass');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = (userI.value || '').trim().toLowerCase();
    const p = passI.value || '';
    if (u === CRED.user && p === CRED.pass) {
      err.classList.remove('show');
      document.documentElement.classList.add('authed');
      if (ASC.setTheme) ASC.setTheme('dark');              // dashboard defaults to dark
      if (ASC.toast) ASC.toast('Welcome back, Ahmed', 'checkc');
    } else {
      err.textContent = 'Incorrect username or password.';
      err.classList.add('show');
      const card = login.querySelector('.login-card');
      card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    }
  });

  const toggle = document.getElementById('lpassToggle');
  toggle.addEventListener('click', () => {
    const show = passI.type === 'password';
    passI.type = show ? 'text' : 'password';
    toggle.innerHTML = ASC.icon(show ? 'eyeoff' : 'eye');
  });

  const forgot = document.getElementById('lforgot');
  if (forgot) forgot.addEventListener('click', (e) => { e.preventDefault(); if (ASC.toast) ASC.toast('Please contact your club administrator to reset your password.', 'mail'); });

  const lt = document.getElementById('loginTheme');
  function paintLT() { lt.innerHTML = ASC.icon((document.documentElement.getAttribute('data-theme') || 'dark') === 'dark' ? 'sun' : 'moon'); }
  paintLT();
  lt.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    if (ASC.setTheme) ASC.setTheme(cur === 'dark' ? 'light' : 'dark');
    paintLT();
  });

  const so = document.getElementById('signOut');
  if (so) so.addEventListener('click', ASC.signOut);
};
