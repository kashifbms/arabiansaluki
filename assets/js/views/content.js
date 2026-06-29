/* =====================================================================
   View: App Content — bilingual CMS for the mobile app (Module 24)
   ===================================================================== */
window.ASC = window.ASC || {};
ASC.views = ASC.views || {};

ASC.views.content = function (root) {
  const C = ASC.data.cmsContent;
  const state = { lang: 'en' };
  const sc = (i, l, v) => '<div class="sc"><div class="sc-h"><span class="icn" data-icon="' + i + '"></span>' + l + '</div><b>' + v + '</b></div>';
  const stBadge = (s) => '<span class="badge ' + (s === 'Published' ? 'green' : 'gray') + '">' + s + '</span>';

  function card(it) {
    const ar = state.lang === 'ar';
    const title = ar ? it.titleAr : it.titleEn;
    const body = ar ? it.bodyAr : it.bodyEn;
    return '<div class="card hoverable">' +
      '<div class="cms-prev' + (it.status === 'Draft' ? ' draft' : '') + (ar ? ' ar' : '') + '"><span class="ptype">' + it.type + '</span><div class="pt">' + title + '</div><div class="pb">' + body + '</div></div>' +
      '<div class="cms-foot"><div>' + stBadge(it.status) +
        '<div style="font-size:11.5px;color:var(--text-3);margin-top:7px">' + it.placement + ' · <span class="lang-pill">EN</span> <span class="lang-pill">العربية</span></div></div>' +
        '<button class="btn btn-outline btn-sm" data-edit="' + it.id + '"><span class="icn" data-icon="edit"></span>Edit</button></div>' +
      '</div>';
  }
  function renderAll() {
    stats.innerHTML = sc('checkc', 'Published', C.filter((x) => x.status === 'Published').length) +
      sc('edit', 'Drafts', C.filter((x) => x.status === 'Draft').length) +
      sc('image', 'Banners', C.filter((x) => x.type === 'Banner').length) +
      sc('globe2', 'Languages', 'EN · العربية');
    grid.innerHTML = C.map(card).join('');
    ASC.hydrateIcons(stats); ASC.hydrateIcons(grid);
  }

  function openEditor(it) {
    const isNew = !it;
    it = it || { type: 'Banner', placement: 'App Home · Hero', status: 'Draft', titleEn: '', titleAr: '', bodyEn: '', bodyAr: '' };
    const fld = (l, el) => '<div class="field full"><label>' + l + '</label>' + el + '</div>';
    const sel = (opts, v) => '<select>' + opts.map((o) => '<option' + (o === v ? ' selected' : '') + '>' + o + '</option>').join('') + '</select>';
    const ov = ASC.openModal({ title: isNew ? 'New Content' : 'Edit Content', size: 'lg',
      body:
        '<div class="form-grid">' +
          '<div class="field"><label>Type</label>' + sel(['Banner', 'Announcement', 'Home Card'], it.type) + '</div>' +
          '<div class="field"><label>Placement</label>' + sel(['App Home · Hero', 'App Home · Top', 'App Home · Quick Actions'], it.placement) + '</div>' +
        '</div>' +
        '<div class="bi-grid" style="margin-top:6px">' +
          '<div class="bi-col"><h4><span class="icn" data-icon="globe2"></span>English</h4>' +
            fld('Title', '<input id="edTE" type="text" value="' + it.titleEn.replace(/"/g, '&quot;') + '" placeholder="Title">') +
            fld('Body', '<textarea id="edBE" placeholder="Body text…">' + it.bodyEn + '</textarea>') + '</div>' +
          '<div class="bi-col"><h4><span class="icn" data-icon="globe2"></span>العربية</h4>' +
            fld('العنوان', '<input id="edTA" type="text" dir="rtl" value="' + it.titleAr.replace(/"/g, '&quot;') + '" placeholder="العنوان">') +
            fld('النص', '<textarea id="edBA" dir="rtl" placeholder="النص…">' + it.bodyAr + '</textarea>') + '</div>' +
        '</div>' +
        '<div class="field full" style="margin-top:16px"><label>Status</label><div class="seg2" id="edStatus"><button class="' + (it.status === 'Published' ? 'active' : '') + '" data-v="Published">Published</button><button class="' + (it.status !== 'Published' ? 'active' : '') + '" data-v="Draft">Draft</button></div></div>',
      foot: '<button class="btn btn-ghost" onclick="ASC.closeModal()" style="margin-inline-start:auto">Cancel</button><button class="btn btn-gold" id="edSave"><span class="icn" data-icon="check"></span>Save</button>' });
    let status = it.status;
    ov.querySelectorAll('#edStatus button').forEach((b) => b.addEventListener('click', () => { status = b.getAttribute('data-v'); ov.querySelectorAll('#edStatus button').forEach((x) => x.classList.toggle('active', x === b)); }));
    ov.querySelector('#edSave').addEventListener('click', () => {
      const g = (id) => ov.querySelector('#' + id).value;
      it.titleEn = g('edTE') || 'Untitled'; it.bodyEn = g('edBE'); it.titleAr = g('edTA') || 'بدون عنوان'; it.bodyAr = g('edBA'); it.status = status;
      if (isNew) { it.id = 'CMS-' + (C.length + 1); it.updated = 'just now'; C.unshift(it); }
      else it.updated = 'just now';
      ASC.closeModal(); renderAll(); ASC.toast(isNew ? 'Content created' : 'Content saved', 'check');
    });
  }

  root.innerHTML =
    ASC.ui.pageIntro({ h: 'App Content', p: 'Manage the bilingual content members see in the mobile app — banners, announcements and home cards.',
      actions: '<div class="langtog" id="cmsLang"><button class="active" data-l="en">EN</button><button data-l="ar">العربية</button></div>' +
        '<button class="btn btn-gold" id="cmsNew"><span class="icn" data-icon="plus"></span>New Content</button>' }) +
    '<div class="statstrip" id="cmsStats"></div>' +
    '<div class="cms-grid" id="cmsGrid"></div>';
  ASC.hydrateIcons(root);

  const stats = root.querySelector('#cmsStats'), grid = root.querySelector('#cmsGrid');
  root.querySelectorAll('#cmsLang button').forEach((b) => b.addEventListener('click', () => {
    state.lang = b.getAttribute('data-l');
    root.querySelectorAll('#cmsLang button').forEach((x) => x.classList.toggle('active', x === b));
    renderAll();
  }));
  root.querySelector('#cmsNew').addEventListener('click', () => openEditor(null));
  grid.addEventListener('click', (e) => { const b = e.target.closest('[data-edit]'); if (b) openEditor(C.find((x) => x.id === b.getAttribute('data-edit'))); });
  renderAll();
};
