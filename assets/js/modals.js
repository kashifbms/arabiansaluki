/* =====================================================================
   Modals — generic dialog + register wizard, ownership transfer, passport
   ===================================================================== */
window.ASC = window.ASC || {};

function escClose(e) { if (e.key === 'Escape') ASC.closeModal(); }

ASC.closeModal = function () {
  const ov = document.getElementById('ascModal');
  if (!ov) return;
  ov.classList.remove('open');
  document.removeEventListener('keydown', escClose);
  setTimeout(() => ov.remove(), 220);
};

ASC.openModal = function (opts) {
  const old = document.getElementById('ascModal');     // remove synchronously (avoid duplicate id)
  if (old) { old.remove(); document.removeEventListener('keydown', escClose); }
  const ov = document.createElement('div');
  ov.className = 'modal-overlay'; ov.id = 'ascModal';
  ov.innerHTML =
    '<div class="modal ' + (opts.size || '') + '" role="dialog" aria-modal="true">' +
    '<div class="modal-head"><div class="modal-title">' + opts.title + '</div>' +
    '<button class="icon-btn" id="mdClose" style="border:none;background:none" aria-label="Close"><span class="icn" data-icon="close"></span></button></div>' +
    '<div class="modal-body" id="mdBody">' + (opts.body || '') + '</div>' +
    (opts.foot ? '<div class="modal-foot" id="mdFoot">' + opts.foot + '</div>' : '') +
    '</div>';
  document.body.appendChild(ov);
  ASC.hydrateIcons(ov);
  ov.addEventListener('click', (e) => { if (e.target === ov) ASC.closeModal(); });
  ov.querySelector('#mdClose').addEventListener('click', ASC.closeModal);
  document.addEventListener('keydown', escClose);
  void ov.offsetWidth;
  ov.classList.add('open');
  return ov;
};

/* ----------------------------- Register wizard ----------------------------- */
ASC.openRegisterWizard = function () {
  let step = 1; const total = 4;
  const STEPS = ['Basic Info', 'Photos', 'Pedigree', 'Review'];
  const f = (l, el, full) => '<div class="field' + (full ? ' full' : '') + '"><label>' + l + '</label>' + el + '</div>';
  const input = (ph, dir) => '<input type="text" placeholder="' + ph + '"' + (dir ? ' dir="rtl"' : '') + '>';

  const ov = ASC.openModal({ title: 'Register a Saluki', size: 'lg',
    body: '<div id="wzBody"></div>',
    foot: '<span class="dim" id="wzStepInfo" style="font-size:12.5px"></span><div style="margin-inline-start:auto;display:flex;gap:8px"><button class="btn btn-ghost" id="wzBack">Back</button><button class="btn btn-gold" id="wzNext">Continue</button></div>' });
  const body = ov.querySelector('#wzBody'), back = ov.querySelector('#wzBack'), next = ov.querySelector('#wzNext'), info = ov.querySelector('#wzStepInfo');

  function stepper() {
    let h = '<div class="stepper">';
    STEPS.forEach((s, i) => {
      const n = i + 1, cls = n === step ? 'active' : n < step ? 'done' : '';
      h += '<div class="stp ' + cls + '"><span class="num">' + (n < step ? '✓' : n) + '</span><span class="lbl">' + s + '</span></div>';
      if (i < STEPS.length - 1) h += '<span class="stp-bar' + (n < step ? ' done' : '') + '"></span>';
    });
    return h + '</div>';
  }
  function content() {
    if (step === 1) return '<div class="form-grid">' +
      f('Name (English) <span class="req">*</span>', input('e.g. Majd Al Reem')) +
      f('Name (Arabic) <span class="req">*</span>', input('مثال: مجد الريم', true)) +
      f('Date of Birth <span class="req">*</span>', '<input type="date">') +
      f('Gender <span class="req">*</span>', '<select><option>Male</option><option>Female</option></select>') +
      f('Breed / Type <span class="req">*</span>', '<select><option>Smooth-coated</option><option>Feathered</option><option>Other</option></select>') +
      f('Colour <span class="req">*</span>', '<select><option>Golden</option><option>Cream</option><option>Tan</option><option>White</option><option>Brown</option><option>Black</option><option>Fawn</option><option>Grizzle</option></select>') +
      f('Microchip Number (ISO) <span class="req">*</span>', input('784-XXXXXXXXXXXX'), true) + '</div>';
    if (step === 2) return '<div class="dropzone"><span class="icn" data-icon="image"></span><div>Drag & drop photos here, or click to browse</div><div class="hint" style="margin-top:4px">JPEG / PNG · up to 10 photos</div></div>' +
      '<div class="photo-slots">' +
      '<div class="pslot req-slot"><span class="icn" data-icon="image"></span>Main profile *</div>' +
      '<div class="pslot req-slot"><span class="icn" data-icon="image"></span>Left side *</div>' +
      '<div class="pslot req-slot"><span class="icn" data-icon="image"></span>Right side *</div>' +
      '<div class="pslot"><span class="icn" data-icon="plus"></span>Front face</div>' +
      '<div class="pslot"><span class="icn" data-icon="plus"></span>Full body</div>' +
      '<div class="pslot"><span class="icn" data-icon="plus"></span>Optional</div></div>';
    if (step === 3) return '<div class="field full" style="margin-bottom:16px"><label>Does this Saluki have pedigree documents?</label>' +
      '<div class="seg2" id="wzPed"><button class="active" data-v="yes">Yes</button><button data-v="no">No</button></div></div>' +
      '<div id="wzPedFields" class="form-grid">' +
      f('Sire (Father) — registry search', input('Search registered sires…')) +
      f('Dam (Mother) — registry search', input('Search registered dams…')) +
      f('Pedigree Certificate', '<div class="dropzone" style="padding:16px"><span class="icn" data-icon="download"></span><div style="font-size:12.5px">Upload certificate (PDF)</div></div>', true) + '</div>';
    // step 4 review
    return '<div class="kv-grid">' +
      '<div class="kv"><label>Name</label><div class="v">Majd Al Reem · مجد الريم</div></div>' +
      '<div class="kv"><label>Date of Birth</label><div class="v">14 Mar 2023</div></div>' +
      '<div class="kv"><label>Gender / Breed</label><div class="v">Male · Smooth-coated</div></div>' +
      '<div class="kv"><label>Microchip</label><div class="v mono">784098100234561</div></div>' +
      '<div class="kv"><label>Photos</label><div class="v">5 uploaded</div></div>' +
      '<div class="kv"><label>Documents</label><div class="v">Health · Vaccination · Microchip</div></div></div>' +
      '<div class="declaration"><input type="checkbox" id="wzDecl"><label for="wzDecl">I declare that the information provided is accurate and that I am the rightful owner of this Saluki, in accordance with Arabian Saluki Center registration rules.</label></div>';
  }
  function render() {
    body.innerHTML = stepper() + content();
    info.textContent = 'Step ' + step + ' of ' + total + ' · ' + STEPS[step - 1];
    back.style.visibility = step === 1 ? 'hidden' : 'visible';
    next.innerHTML = step === total ? '<span class="icn" data-icon="check"></span>Submit Registration' : 'Continue';
    ASC.hydrateIcons(body); ASC.hydrateIcons(next);
    const seg = body.querySelector('#wzPed');
    if (seg) seg.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
      seg.querySelectorAll('button').forEach((x) => x.classList.toggle('active', x === b));
      body.querySelector('#wzPedFields').style.display = b.getAttribute('data-v') === 'no' ? 'none' : 'grid';
    }));
  }
  back.addEventListener('click', () => { if (step > 1) { step--; render(); } });
  next.addEventListener('click', () => {
    if (step < total) { step++; render(); return; }
    const decl = body.querySelector('#wzDecl');
    if (decl && !decl.checked) { ASC.toast('Please confirm the declaration to submit', 'alert'); return; }
    ASC.closeModal();
    ASC.toast('Registration submitted · Reference REQ-2026-00044', 'check');
  });
  render();
};

/* ----------------------------- Ownership transfer ----------------------------- */
ASC.openTransfer = function (reg) {
  const s = ASC.findSaluki(reg);
  const others = ASC.data.owners.filter((o) => o.name !== s.owner).map((o) => '<option>' + o.name + '</option>').join('');
  ASC.openModal({ title: 'Transfer Ownership',
    body: '<div class="flex items-center gap-12" style="margin-bottom:18px"><span class="s-avatar ' + (s.sex === 'Female' ? 'fem' : 'mal') + '">' + ASC.icon('paw') + '</span>' +
      '<div><div style="font-weight:600">' + s.nameEn + '</div><div class="dim mono" style="font-size:12px">' + s.reg + '</div></div></div>' +
      '<div class="form-grid">' +
      '<div class="field"><label>Current Owner</label><input type="text" value="' + s.owner + '" disabled></div>' +
      '<div class="field"><label>New Owner <span class="req">*</span></label><select>' + others + '</select></div>' +
      '<div class="field full"><label>Supporting Document <span class="req">*</span></label><div class="dropzone" style="padding:16px"><span class="icn" data-icon="download"></span><div style="font-size:12.5px">Upload sale agreement / gift deed (PDF)</div></div></div>' +
      '</div><div class="declaration"><input type="checkbox" id="trDecl"><label for="trDecl">Both parties agree to this ownership transfer and accept the registry terms. The transfer will be reviewed by a Club Administrator.</label></div>',
    foot: '<button class="btn btn-ghost" onclick="ASC.closeModal()" style="margin-inline-start:auto">Cancel</button><button class="btn btn-gold" id="trSubmit"><span class="icn" data-icon="transfer"></span>Submit Transfer</button>' });
  const ov = document.getElementById('ascModal');
  ov.querySelector('#trSubmit').addEventListener('click', () => {
    const decl = ov.querySelector('#trDecl');
    if (!decl.checked) { ASC.toast('Please confirm the declaration', 'alert'); return; }
    ASC.closeModal();
    ASC.toast('Transfer request submitted for admin review', 'transfer');
  });
};

/* ----------------------------- Digital passport ----------------------------- */
ASC.openPassport = function (reg) {
  const s = ASC.findSaluki(reg);
  const d = ASC.data.details[reg];
  const owner = ASC.data.owners.find((o) => o.name === s.owner) || { emirate: s.emirate };
  const vax = d ? d.vaccinations : [{ name: 'Rabies', status: 'Valid' }, { name: 'DHPP', status: 'Valid' }];
  const ped = d && d.pedigree;
  const ver = d ? d.passport.version : 1;
  const updated = d ? d.passport.updated : s.registered;

  const vaxChips = vax.map((v) => '<span class="pp-chip ' + (v.status === 'Valid' ? 'ok' : 'warn') + '">' + v.name + '</span>').join('');
  const sheet =
    '<div class="passport-sheet">' +
      '<div class="pp-head"><img src="logo.png" alt=""><div><div class="t1">Arabian Saluki Center</div><div class="t2">Digital Saluki Passport</div></div><div class="pp-ver">Version ' + ver + '<br>Updated ' + updated + '</div></div>' +
      '<div class="pp-body">' +
        '<div class="pp-top"><div class="pp-photo">' + ASC.icon('paw') + '</div>' +
          '<div><div class="pp-name">' + s.nameEn + '<span class="ar">' + s.nameAr + '</span></div><div class="pp-reg">' + s.reg + '</div>' +
          '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap"><span class="pp-chip">' + s.breed + '</span><span class="pp-chip">' + s.sex + '</span><span class="pp-chip">' + s.color + '</span>' + (s.dna ? '<span class="pp-chip ok">DNA Verified</span>' : '') + '</div></div></div>' +
        '<div class="pp-grid three">' +
          '<div class="pp-kv"><label>Microchip</label><div class="v">' + s.microchip + '</div></div>' +
          '<div class="pp-kv"><label>Date of Birth</label><div class="v">' + s.dob + '</div></div>' +
          '<div class="pp-kv"><label>Age</label><div class="v">' + s.age + '</div></div>' +
          '<div class="pp-kv"><label>Owner</label><div class="v">' + s.owner + '</div></div>' +
          '<div class="pp-kv"><label>Emirate</label><div class="v">' + owner.emirate + '</div></div>' +
          '<div class="pp-kv"><label>Status</label><div class="v">' + s.status + '</div></div>' +
        '</div>' +
        (ped ? '<div class="pp-sec-t">Pedigree</div><div class="pp-grid"><div class="pp-kv"><label>Sire</label><div class="v">' + ped.sire.name + '</div></div><div class="pp-kv"><label>Dam</label><div class="v">' + ped.dam.name + '</div></div></div>' : '') +
        '<div class="pp-sec-t">Vaccination Record</div><div class="pp-vax">' + vaxChips + '</div>' +
        '<div class="pp-foot"><div><div class="pp-elig">' + ASC.icon('checkc') + 'Competition Eligible</div><div class="pp-dna" style="margin-top:6px">' + (s.dna ? 'DNA-verified · accepted for travel, vet & transfers' : 'Accepted for competitions, vet visits & transfers') + '</div></div>' +
        '<div class="pp-qr">' + ASC.ui.qr(s.reg, 92) + '</div></div>' +
      '</div></div>';

  ASC.openModal({ title: 'Digital Passport', size: 'lg', body: sheet,
    foot: '<button class="btn btn-ghost" onclick="ASC.closeModal()">Close</button><button class="btn btn-outline" id="ppShare" style="margin-inline-start:auto"><span class="icn" data-icon="qr"></span>Share</button><button class="btn btn-gold" id="ppPrint"><span class="icn" data-icon="download"></span>Print / Save PDF</button>' });
  const ov = document.getElementById('ascModal');
  ASC.hydrateIcons(ov);
  ov.querySelector('#ppPrint').addEventListener('click', () => window.print());
  ov.querySelector('#ppShare').addEventListener('click', () => ASC.toast('Passport link copied to clipboard', 'qr'));
};

/* ----------------------------- Add event ----------------------------- */
ASC.openEventModal = function () {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fld = (l, el, full) => '<div class="field' + (full ? ' full' : '') + '"><label>' + l + '</label>' + el + '</div>';
  const ov = ASC.openModal({ title: 'Add Event', size: 'lg',
    body:
      '<div class="form-grid">' +
        fld('Event Name (English) <span class="req">*</span>', '<input id="evEn" type="text" placeholder="e.g. Autumn Beauty Contest">', true) +
        fld('Event Name (Arabic) <span class="req">*</span>', '<input id="evAr" type="text" dir="rtl" placeholder="مثال: مسابقة الجمال الخريفية">', true) +
        fld('Event Type', '<select id="evType"><option>Beauty Contest</option><option>Hunting Race</option><option>Championship</option><option>Parade</option><option>Festival</option><option>ADIHEX</option></select>') +
        fld('Location', '<input id="evLoc" type="text" placeholder="e.g. Abu Dhabi">') +
        fld('Event Date', '<input id="evDate" type="date">') +
        fld('Registration Deadline', '<input id="evDeadline" type="date">') +
        fld('Entry Fee (AED)', '<input id="evFee" type="number" min="0" placeholder="0">') +
        fld('Max Entries', '<input id="evMax" type="number" min="0" placeholder="50">') +
        fld('Categories', '<input id="evCats" type="text" placeholder="e.g. Adult Male, Adult Female, Junior">', true) +
        fld('Eligibility Rules', '<textarea id="evElig" placeholder="e.g. Registration approved · vaccinations current"></textarea>', true) +
      '</div>' +
      '<div class="field full" style="margin-top:16px"><label>Visibility &amp; Status</label><div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;min-height:40px">' +
        '<label style="display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500"><input type="checkbox" checked style="width:16px;height:16px;accent-color:var(--brand-gold)"> Public (website &amp; app)</label>' +
        '<div class="seg2" id="evStatus"><button class="active" data-v="Published">Published</button><button data-v="Draft">Draft</button></div>' +
      '</div></div>',
    foot: '<button class="btn btn-ghost" onclick="ASC.closeModal()" style="margin-inline-start:auto">Cancel</button><button class="btn btn-gold" id="evCreate"><span class="icn" data-icon="calplus"></span>Create Event</button>' });
  let status = 'Published';
  ov.querySelectorAll('#evStatus button').forEach((b) => b.addEventListener('click', () => { status = b.getAttribute('data-v'); ov.querySelectorAll('#evStatus button').forEach((x) => x.classList.toggle('active', x === b)); }));
  ov.querySelector('#evCreate').addEventListener('click', () => {
    const name = (ov.querySelector('#evEn').value || '').trim() || 'New Event';
    const type = ov.querySelector('#evType').value;
    const loc = (ov.querySelector('#evLoc').value || '').trim();
    const ds = ov.querySelector('#evDate').value;
    let d = 1, m = 'Jul';
    if (ds) { const p = ds.split('-'); d = parseInt(p[2], 10); m = MONTHS[parseInt(p[1], 10) - 1] || m; }
    const ev = { d: d, m: m, name: name, meta: type + (loc ? ' · ' + loc : ''), status: status === 'Published' ? { t: 'Open', c: 'green' } : { t: 'Draft', c: 'gray' } };
    ASC.data.events.unshift(ev);
    ASC.closeModal();
    ASC.toast('Event created · ' + name, 'calplus');
    if (ASC.renderEvents) ASC.renderEvents();
    if (ASC.refreshCompetitionEvents) ASC.refreshCompetitionEvents();
  });
};
