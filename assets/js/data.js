/* =====================================================================
   Dummy data — seeded from the Master Spec demo-data blocks.
   All numbers are illustrative for the pitch (no live backend).
   ===================================================================== */
window.ASC = window.ASC || {};

ASC.data = {
  /* ---- National stats (Module 17) ---- */
  stats: {
    totalSalukis: 1284, approved: 1198, pending: 54, rejected: 32,
    approvedThisMonth: 142, activeMembers: 231, newMembersMonth: 14,
    upcomingEvents: 5, expiringCerts: 18,
    competitionsYear: 8, participants: 342
  },

  /* KPI sparkline series (12 pts) */
  sparks: {
    salukis:  [62,71,80,95,88,76,110,124,138,151,167,142],
    pending:  [70,66,61,72,58,64,55,60,49,57,48,54],
    members:  [188,194,201,205,210,214,219,222,225,228,230,231],
    events:   [2,3,3,4,3,5,4,5,6,5,5,5],
    approved: [88,96,101,118,109,99,121,130,128,139,148,142],
    certs:    [9,11,8,14,12,16,13,17,15,19,16,18]
  },

  /* ---- Chart series ---- */
  trend: {
    labels: ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'],
    data:   [62,71,80,95,88,76,110,124,138,151,167,142]
  },
  emirate: { labels: ['Abu Dhabi','Dubai','Al Ain','Sharjah','Other'], data: [612, 287, 198, 104, 83] },
  breed: { labels: ['Smooth-coated','Feathered'], data: [68, 32] },
  status: { labels: ['Approved','Pending','Rejected'], data: [1198, 54, 32] },
  gender: { male: 54, female: 46 },

  /* Colour swatch hex for table chips */
  colorHex: {
    'Golden':'#E0A437','Cream':'#EAD9B0','Tan':'#C8956A','White':'#F2EFE9','Brown':'#6B4A2B',
    'Black':'#2A2622','Fawn':'#D9B380','Grizzle':'#8A7E6A','Red':'#B25B36',
    'Black & Tan':'#3A2E22','White & Tan':'#E6D9C2'
  },

  /* ---- Recent activity feed ---- */
  activity: [
    { icon:'inbox',    tone:'amber', html:'New registration <b>REQ-2026-00041</b> · Sultan Al Badia submitted by Ahmed Al Mansoori', time:'2 hours ago' },
    { icon:'dna',      tone:'gold',  html:'DNA verification <b>approved</b> for Majd Al Reem (ASC-2026-00001)', time:'5 hours ago' },
    { icon:'trophy',   tone:'green', html:'Results posted · <b>Spring Beauty Contest 2026</b> — Majd Al Reem won Adult Male (94.5)', time:'Yesterday' },
    { icon:'paw',      tone:'blue',  html:'Litter registered · <b>Al Reem Kennels</b> — 4 puppies (genetic screening complete)', time:'Yesterday' },
    { icon:'transfer', tone:'gold',  html:'Ownership transfer <b>approved</b> · Khalid Al Sahara → Mohammed Al Shamsi', time:'2 days ago' },
    { icon:'alert',    tone:'red',   html:'Vaccination <b>expiring</b> · Bordetella for Majd Al Reem due 5 Jun 2026', time:'2 days ago' },
    { icon:'check',    tone:'green', html:'Registration <b>approved</b> · REQ-2026-00039 · Khalid Al Sahara', time:'3 days ago' }
  ],

  /* ---- Upcoming events (Module 13) ---- */
  events: [
    { d:15, m:'Jun', name:'Abu Dhabi Saluki Championship', meta:'Open · 24 / 50 entries', status:{t:'Open', c:'green'} },
    { d:10, m:'Jul', name:'ADIHEX 2026 Saluki Race',       meta:'Registration opens 1 Jun', status:{t:'Upcoming', c:'blue'} },
    { d:20, m:'Aug', name:'Summer Hunting Trial',           meta:'Members only',            status:{t:'Upcoming', c:'blue'} },
    { d:5,  m:'Sep', name:'Heritage Parade & Festival',     meta:'Free entry',              status:{t:'Upcoming', c:'blue'} },
    { d:12, m:'Oct', name:'Autumn Beauty Contest',          meta:'Not yet published',       status:{t:'Draft', c:'gray'} }
  ],

  /* ---- Owners (Module 2) ---- */
  owners: [
    { id:'OWN-2026-0019', name:'Ahmed Al Mansoori',  nameAr:'أحمد المنصوري',  emirate:'Dubai',     city:'Dubai',     salukis:5, member:true,  tier:'Senior',  since:2019,
      emiratesId:'784-1985-1234567-1', nationality:'United Arab Emirates', dob:'12 Apr 1985', mobile:'+971 50 123 4567', email:'a.almansoori@email.ae', idDocs:true },
    { id:'OWN-2026-0042', name:'Mohammed Al Shamsi', nameAr:'محمد الشامسي',   emirate:'Abu Dhabi', city:'Abu Dhabi', salukis:4, member:true,  tier:'Regular', since:2022,
      emiratesId:'784-1990-7654321-2', nationality:'United Arab Emirates', dob:'08 Sep 1990', mobile:'+971 50 765 4321', email:'m.alshamsi@email.ae', idDocs:true },
    { id:'OWN-2026-0067', name:'Khalid Al Mazrouei', nameAr:'خالد المزروعي',  emirate:'Al Ain',    city:'Al Ain',    salukis:3, member:false, tier:'—',       since:2025,
      emiratesId:'784-1988-2468135-3', nationality:'United Arab Emirates', dob:'21 Jan 1988', mobile:'+971 55 246 8135', email:'k.almazrouei@email.ae', idDocs:false },
    { id:'OWN-2026-0081', name:'Saeed Al Nuaimi',    nameAr:'سعيد النعيمي',   emirate:'Sharjah',   city:'Sharjah',   salukis:4, member:true,  tier:'Senior',  since:2018,
      emiratesId:'784-1979-1357924-4', nationality:'United Arab Emirates', dob:'03 Mar 1979', mobile:'+971 56 135 7924', email:'s.alnuaimi@email.ae', idDocs:true }
  ],

  /* ---- Saluki registry (Module 1) ---- */
  salukis: [
    { reg:'ASC-2026-00001', nameEn:'Majd Al Reem',      nameAr:'مجد الريم',     sex:'Male',   breed:'Smooth-coated', color:'Golden',      status:'Approved',      dna:true,  owner:'Ahmed Al Mansoori',  emirate:'Dubai',     dob:'2023-03-14', age:'3 yrs', microchip:'784098100234561', registered:'14 Jan 2026' },
    { reg:'ASC-2026-00002', nameEn:'Layla Bint Hamdan', nameAr:'ليلى بنت حمدان', sex:'Female', breed:'Feathered',     color:'Cream',       status:'Approved',      dna:false, owner:'Mohammed Al Shamsi', emirate:'Abu Dhabi', dob:'2022-11-02', age:'3 yrs', microchip:'784098100211904', registered:'09 Jan 2026' },
    { reg:'ASC-2026-00003', nameEn:'Sultan Al Badia',   nameAr:'سلطان البادية', sex:'Male',   breed:'Smooth-coated', color:'Tan',         status:'Pending',       dna:false, owner:'Ahmed Al Mansoori',  emirate:'Dubai',     dob:'2024-05-21', age:'2 yrs', microchip:'784098100256730', registered:'27 Jun 2026' },
    { reg:'ASC-2026-00004', nameEn:'Noor Al Sahra',     nameAr:'نور الصحراء',   sex:'Female', breed:'Feathered',     color:'White',       status:'Rejected',      dna:false, owner:'Khalid Al Mazrouei', emirate:'Al Ain',    dob:'2023-08-09', age:'2 yrs', microchip:'784098100240118', registered:'02 May 2026' },
    { reg:'ASC-2026-00005', nameEn:'Faris Al Hamra',    nameAr:'فارس الحمراء',  sex:'Male',   breed:'Smooth-coated', color:'Brown',       status:'Approved',      dna:true,  owner:'Saeed Al Nuaimi',    emirate:'Sharjah',   dob:'2022-02-18', age:'4 yrs', microchip:'784098100198455', registered:'21 Dec 2025' },
    { reg:'ASC-2026-00006', nameEn:'Hessa Al Dhafra',   nameAr:'حصة الظفرة',    sex:'Female', breed:'Smooth-coated', color:'Black & Tan', status:'Approved',      dna:false, owner:'Mohammed Al Shamsi', emirate:'Abu Dhabi', dob:'2023-06-30', age:'3 yrs', microchip:'784098100262281', registered:'18 Feb 2026' },
    { reg:'ASC-2026-00007', nameEn:'Rashid Al Maha',    nameAr:'راشد المها',    sex:'Male',   breed:'Feathered',     color:'Grizzle',     status:'Approved',      dna:true,  owner:'Saeed Al Nuaimi',    emirate:'Sharjah',   dob:'2021-09-12', age:'4 yrs', microchip:'784098100177320', registered:'30 Nov 2025' },
    { reg:'ASC-2026-00008', nameEn:'Warda Al Nakheel',  nameAr:'وردة النخيل',   sex:'Female', breed:'Smooth-coated', color:'Cream',       status:'Info Required', dna:false, owner:'Saeed Al Nuaimi',    emirate:'Sharjah',   dob:'2024-01-25', age:'2 yrs', microchip:'784098100271044', registered:'28 Jun 2026' },
    { reg:'ASC-2026-00009', nameEn:'Ghazal Al Liwa',    nameAr:'غزال الليوا',   sex:'Female', breed:'Feathered',     color:'Fawn',        status:'Approved',      dna:false, owner:'Ahmed Al Mansoori',  emirate:'Dubai',     dob:'2022-07-08', age:'3 yrs', microchip:'784098100203977', registered:'11 Jan 2026' },
    { reg:'ASC-2026-00010', nameEn:'Sahim Al Wathba',   nameAr:'سهم الوثبة',    sex:'Male',   breed:'Smooth-coated', color:'Golden',      status:'Approved',      dna:true,  owner:'Mohammed Al Shamsi', emirate:'Abu Dhabi', dob:'2023-04-17', age:'3 yrs', microchip:'784098100249562', registered:'05 Feb 2026' },
    { reg:'ASC-2026-00011', nameEn:'Dana Al Khaleej',   nameAr:'دانة الخليج',   sex:'Female', breed:'Feathered',     color:'White & Tan', status:'Pending',       dna:false, owner:'Khalid Al Mazrouei', emirate:'Al Ain',    dob:'2024-03-03', age:'2 yrs', microchip:'784098100268119', registered:'24 Jun 2026' },
    { reg:'ASC-2026-00012', nameEn:'Khalid Al Sahara',  nameAr:'خالد الصحارى',  sex:'Male',   breed:'Smooth-coated', color:'Red',         status:'Approved',      dna:false, owner:'Mohammed Al Shamsi', emirate:'Abu Dhabi', dob:'2022-10-29', age:'3 yrs', microchip:'784098100215338', registered:'16 Jan 2026' },
    { reg:'ASC-2026-00013', nameEn:'Sheikha Al Reem',   nameAr:'شيخة الريم',    sex:'Female', breed:'Smooth-coated', color:'Golden',      status:'Approved',      dna:true,  owner:'Ahmed Al Mansoori',  emirate:'Dubai',     dob:'2023-12-11', age:'2 yrs', microchip:'784098100259903', registered:'22 Mar 2026' },
    { reg:'ASC-2026-00014', nameEn:'Mansour Al Dhaid',  nameAr:'منصور الذيد',   sex:'Male',   breed:'Feathered',     color:'Black',       status:'Suspended',     dna:false, owner:'Khalid Al Mazrouei', emirate:'Al Ain',    dob:'2021-05-06', age:'5 yrs', microchip:'784098100166201', registered:'14 Oct 2025' }
  ],

  /* ---- Rich profile detail (featured Saluki) ---- */
  details: {
    'ASC-2026-00001': {
      pedigree: {
        sire: { name:'Hamdan Al Reem', reg:'ASC-2024-00089', dna:true },
        dam:  { name:'Layla Al Badia', reg:'ASC-2023-00041', dna:true },
        sireSire:{ name:'Saqr Al Reem', reg:'ASC-2021-00012' }, sireDam:{ name:'Maha Al Reem', reg:'ASC-2021-00033' },
        damSire: { name:'Falah Al Badia', reg:'ASC-2020-00077' }, damDam:{ name:'Wadha Al Badia', reg:'ASC-2020-00081' }
      },
      vaccinations: [
        { name:'Rabies',       date:'15 Jan 2026', due:'15 Jan 2027', status:'Valid' },
        { name:'DHPP',         date:'10 Mar 2026', due:'10 Mar 2027', status:'Valid' },
        { name:'Bordetella',   date:'05 Dec 2025', due:'05 Jun 2026', status:'Expiring' },
        { name:'Leptospirosis',date:'18 Feb 2026', due:'18 Feb 2027', status:'Valid' }
      ],
      certs: [ { type:'International Travel Certificate', issued:'30 Jan 2026', expiry:'30 Jul 2026', by:'Al Rowad Veterinary Clinic', status:'Valid' } ],
      vet: { name:'Dr. Khalid Al Rashidi', clinic:'Al Rowad Veterinary Clinic', emirate:'Abu Dhabi', phone:'+971 2 555 1042' },
      competitions: [
        { event:'Abu Dhabi Saluki Championship 2025', type:'Championship', rank:1, award:'Gold',        points:142, date:'Jun 2025' },
        { event:'Spring Beauty Contest 2025',         type:'Beauty Contest', rank:1, award:'Best in Show', points:96,  date:'Apr 2025' },
        { event:'ADIHEX Hunting Trial 2025',          type:'Hunting Race', rank:3, award:'Bronze',      points:78,  date:'Sep 2025' },
        { event:'Winter Championship 2024',           type:'Championship', rank:2, award:'Silver',      points:88,  date:'Dec 2024' }
      ],
      perf: [3,1,2,1,4,2,1,3,1,2,1,1],
      dna: { lab:'GenVet UAE Laboratory, Abu Dhabi', date:'20 Feb 2026', ref:'GV-2026-04521', sire:true, dam:true, health:'No hereditary conditions detected', verified:true },
      passport: { version:3, updated:'12 May 2026' }
    }
  },

  /* ---- Registration queue (Module 4) ---- */
  queue: [
    { req:'REQ-2026-00041', name:'Sultan Al Badia',  nameAr:'سلطان البادية', owner:'Ahmed Al Mansoori',  emirate:'Dubai',     breed:'Smooth-coated', sex:'Male',   submitted:'27 Jun 2026', when:'2 hrs ago',  status:'Pending Review', priority:'Normal', photos:4, docs:{ health:true, vacc:true, microchip:true, pedigree:false } },
    { req:'REQ-2026-00043', name:'Dana Al Khaleej',  nameAr:'دانة الخليج',   owner:'Khalid Al Mazrouei', emirate:'Al Ain',    breed:'Feathered',     sex:'Female', submitted:'29 Jun 2026', when:'4 hrs ago',  status:'Pending Review', priority:'Urgent', photos:5, docs:{ health:true, vacc:true, microchip:true, pedigree:true } },
    { req:'REQ-2026-00040', name:'Warda Al Nakheel', nameAr:'وردة النخيل',   owner:'Saeed Al Nuaimi',    emirate:'Sharjah',   breed:'Smooth-coated', sex:'Female', submitted:'28 Jun 2026', when:'1 day ago',  status:'Info Required',  priority:'Normal', photos:3, docs:{ health:true, vacc:false, microchip:true, pedigree:false } },
    { req:'REQ-2026-00037', name:'Saqr Al Dhafra',   nameAr:'صقر الظفرة',    owner:'Mohammed Al Shamsi', emirate:'Abu Dhabi', breed:'Smooth-coated', sex:'Male',   submitted:'24 Jun 2026', when:'5 days ago', status:'Pending Review', priority:'Normal', photos:4, docs:{ health:true, vacc:true, microchip:false, pedigree:false } },
    { req:'REQ-2026-00039', name:'Khalid Al Sahara', nameAr:'خالد الصحارى',  owner:'Mohammed Al Shamsi', emirate:'Abu Dhabi', breed:'Smooth-coated', sex:'Male',   submitted:'26 Jun 2026', when:'3 days ago', status:'Approved',       priority:'Normal', photos:6, docs:{ health:true, vacc:true, microchip:true, pedigree:true } },
    { req:'REQ-2026-00038', name:'Bint Al Hamra',    nameAr:'بنت الحمراء',   owner:'Khalid Al Mazrouei', emirate:'Al Ain',    breed:'Feathered',     sex:'Female', submitted:'25 Jun 2026', when:'4 days ago', status:'Rejected',       priority:'Normal', photos:2, docs:{ health:false, vacc:true, microchip:false, pedigree:false } }
  ],

  /* ---- Members (Module 15) ---- */
  memberStats: { total:247, active:231, lapsed:12, pending:4, newMonth:14 },
  members: [
    { id:'MEM-0021', name:'Sheikh Sultan Al Qasimi', emirate:'Sharjah',   tier:'Honorary', since:2012, expiry:'Lifetime', status:'Active',  salukis:8 },
    { id:'MEM-0192', name:'Ahmed Al Mansoori',       emirate:'Dubai',     tier:'Senior',   since:2019, expiry:'Dec 2026', status:'Active',  salukis:5 },
    { id:'MEM-0143', name:'Saeed Al Nuaimi',         emirate:'Sharjah',   tier:'Senior',   since:2018, expiry:'Aug 2026', status:'Active',  salukis:4 },
    { id:'MEM-0288', name:'Mohammed Al Shamsi',      emirate:'Abu Dhabi', tier:'Regular',  since:2022, expiry:'Mar 2027', status:'Active',  salukis:4 },
    { id:'MEM-0088', name:'Salem Al Ameri',          emirate:'Al Ain',    tier:'Senior',   since:2016, expiry:'Jul 2026', status:'Active',  salukis:6 },
    { id:'MEM-0210', name:'Hamad Al Ketbi',          emirate:'Abu Dhabi', tier:'Regular',  since:2021, expiry:'Jan 2027', status:'Active',  salukis:2 },
    { id:'MEM-0299', name:'Maitha Al Suwaidi',       emirate:'Abu Dhabi', tier:'Regular',  since:2023, expiry:'Sep 2026', status:'Active',  salukis:1 },
    { id:'MEM-0312', name:'Rashed Al Marri',         emirate:'Dubai',     tier:'Regular',  since:2024, expiry:'Feb 2027', status:'Active',  salukis:2 },
    { id:'MEM-0401', name:'Fatima Al Hosani',        emirate:'Sharjah',   tier:'Regular',  since:2025, expiry:'Nov 2026', status:'Active',  salukis:1 },
    { id:'MEM-0177', name:'Obaid Al Falasi',         emirate:'Dubai',     tier:'Senior',   since:2017, expiry:'May 2026', status:'Lapsed',  salukis:3 },
    { id:'MEM-0260', name:'Khalifa Al Dhaheri',      emirate:'Abu Dhabi', tier:'Regular',  since:2020, expiry:'Apr 2026', status:'Lapsed',  salukis:2 },
    { id:'MEM-0356', name:'Khalid Al Mazrouei',      emirate:'Al Ain',    tier:'Regular',  since:2025, expiry:'—',        status:'Pending', salukis:3 }
  ],

  /* ---- Notifications (Module 18) ---- */
  notifications: [
    { cat:'Registrations', icon:'inbox',    tone:'amber', title:'New registration submitted',  text:'REQ-2026-00041 · Sultan Al Badia by Ahmed Al Mansoori', time:'2 hours ago', read:false },
    { cat:'System',        icon:'dna',      tone:'gold',  title:'DNA verification approved',    text:'Majd Al Reem (ASC-2026-00001) is now DNA-verified',     time:'5 hours ago', read:false },
    { cat:'Competitions',  icon:'trophy',   tone:'green', title:'Results published',            text:'Spring Beauty Contest 2026 — Majd Al Reem won Adult Male', time:'Yesterday',  read:false },
    { cat:'Registrations', icon:'transfer', tone:'gold',  title:'Ownership transfer approved',  text:'Khalid Al Sahara → Mohammed Al Shamsi',                  time:'Yesterday',  read:true },
    { cat:'System',        icon:'alert',    tone:'red',   title:'Vaccination expiring',         text:'Bordetella for Majd Al Reem due 5 Jun 2026',             time:'2 days ago', read:false },
    { cat:'Competitions',  icon:'calendar', tone:'blue',  title:'New event announced',          text:'Abu Dhabi Saluki Championship — entries now open',       time:'2 days ago', read:true },
    { cat:'Registrations', icon:'check',    tone:'green', title:'Registration approved',        text:'REQ-2026-00039 · Khalid Al Sahara',                      time:'3 days ago', read:true },
    { cat:'System',        icon:'users',    tone:'blue',  title:'Membership renewal due',       text:'Obaid Al Falasi membership expires May 2026',            time:'4 days ago', read:true },
    { cat:'Competitions',  icon:'trophy',   tone:'green', title:'Entry accepted',               text:'Faris Al Hamra entered into ADIHEX 2026 Saluki Race',    time:'5 days ago', read:true },
    { cat:'Registrations', icon:'alert',    tone:'amber', title:'Additional info requested',    text:'REQ-2026-00040 · vaccination record required',          time:'6 days ago', read:true }
  ],

  /* ---- Breeder registry (Module 10) ---- */
  breeders: [
    { id:'BRD-2026-00003', kennel:'Al Reem Kennels', owner:'Ahmed Al Mansoori',  emirate:'Abu Dhabi', license:'LIC-ABD-2024-8821', expiry:'Aug 2026', litters:6, status:'Active' },
    { id:'BRD-2026-00007', kennel:'Al Badia Hounds', owner:'Mohammed Al Shamsi', emirate:'Abu Dhabi', license:'LIC-ABD-2023-7710', expiry:'Mar 2027', litters:4, status:'Active' },
    { id:'BRD-2026-00011', kennel:'Sahra Salukis',   owner:'Saeed Al Nuaimi',    emirate:'Sharjah',   license:'LIC-SHJ-2025-3382', expiry:'Jan 2027', litters:2, status:'Active' },
    { id:'BRD-2026-00014', kennel:'Liwa Bloodline',  owner:'Khalid Al Mazrouei', emirate:'Al Ain',    license:'LIC-AAN-2022-1190', expiry:'Nov 2025', litters:3, status:'Renewal Due' }
  ],
  litters: [
    { id:'LIT-2026-0021', kennel:'Al Reem Kennels', sire:'Majd Al Reem',    dam:'Noor Al Sahra',   born:'14 May 2026', puppies:4, screening:'Complete', status:'Registered' },
    { id:'LIT-2026-0019', kennel:'Al Badia Hounds', sire:'Sahim Al Wathba', dam:'Hessa Al Dhafra', born:'02 Apr 2026', puppies:5, screening:'Complete', status:'Registered' },
    { id:'LIT-2026-0024', kennel:'Sahra Salukis',   sire:'Rashid Al Maha',  dam:'Ghazal Al Liwa',  born:'—',           puppies:0, screening:'Pending',  status:'Expected 20 Jul 2026' }
  ],
  puppies: [
    { id:'PUP-2026-00081', name:'Reem Al Majd',   sex:'Male',   color:'Golden' },
    { id:'PUP-2026-00082', name:'Warda Al Reem',  sex:'Female', color:'Cream' },
    { id:'PUP-2026-00083', name:'Saqr Al Majd',   sex:'Male',   color:'Tan' },
    { id:'PUP-2026-00084', name:'Dana Al Reem',   sex:'Female', color:'Golden' }
  ],

  /* ---- DNA verification (Module 11) ---- */
  dnaStats: { verified:38, pending:2, disputed:1, rate:38 },
  dnaRecords: [
    { saluki:'Majd Al Reem',     reg:'ASC-2026-00001', lab:'GenVet UAE Laboratory', date:'20 Feb 2026', ref:'GV-2026-04521', sire:true,  dam:true,  status:'Confirmed' },
    { saluki:'Faris Al Hamra',   reg:'ASC-2026-00005', lab:'GenVet UAE Laboratory', date:'15 Jan 2026', ref:'GV-2026-03980', sire:true,  dam:true,  status:'Confirmed' },
    { saluki:'Rashid Al Maha',   reg:'ASC-2026-00007', lab:'VetGen Dubai',          date:'08 Dec 2025', ref:'VG-2025-1188',  sire:true,  dam:true,  status:'Confirmed' },
    { saluki:'Sahim Al Wathba',  reg:'ASC-2026-00010', lab:'GenVet UAE Laboratory', date:'22 Feb 2026', ref:'GV-2026-04610', sire:true,  dam:true,  status:'Confirmed' },
    { saluki:'Sheikha Al Reem',  reg:'ASC-2026-00013', lab:'VetGen Dubai',          date:'05 Mar 2026', ref:'VG-2026-1342',  sire:true,  dam:true,  status:'Confirmed' },
    { saluki:'Dana Al Khaleej',  reg:'ASC-2026-00011', lab:'GenVet UAE Laboratory', date:'18 Jun 2026', ref:'GV-2026-05120', sire:true,  dam:true,  status:'Pending' },
    { saluki:'Layla Bint Hamdan',reg:'ASC-2026-00002', lab:'GenVet UAE Laboratory', date:'—',           ref:'GV-2026-05201', sire:true,  dam:false, status:'Pending' },
    { saluki:'Noor Al Sahra',    reg:'ASC-2026-00004', lab:'VetGen Dubai',          date:'10 May 2026', ref:'VG-2026-1501',  sire:false, dam:false, status:'Disputed' }
  ],

  /* ---- Competitions extras (Module 5) ---- */
  leaderboard: [
    { rank:1, name:'Majd Al Reem',    reg:'ASC-2026-00001', races:12, wins:6, points:412 },
    { rank:2, name:'Faris Al Hamra',  reg:'ASC-2026-00005', races:10, wins:4, points:356 },
    { rank:3, name:'Rashid Al Maha',  reg:'ASC-2026-00007', races:9,  wins:3, points:298 },
    { rank:4, name:'Sahim Al Wathba', reg:'ASC-2026-00010', races:8,  wins:3, points:271 },
    { rank:5, name:'Sheikha Al Reem', reg:'ASC-2026-00013', races:7,  wins:2, points:233 },
    { rank:6, name:'Hessa Al Dhafra', reg:'ASC-2026-00006', races:6,  wins:1, points:188 }
  ],
  participation: { labels:['Hunting Race','Beauty Contest','Championship','Parade','ADIHEX'], data:[96, 78, 84, 42, 52] },

  /* ---- Analytics extras (Module 17) ---- */
  ageGroups: { labels:['< 1 yr','1–2 yrs','3–4 yrs','5–6 yrs','7+ yrs'], data:[142, 386, 451, 218, 87] },
  compliance: { valid:1042, expiring:114, expired:42 },
  reports: ['Full Saluki Registry', 'Competition Results by Event', 'Ownership Transfer History', 'Veterinary Compliance Report', 'Member Report (active / lapsed / new)'],

  /* ---- App content / CMS (Module 24 — bilingual) ---- */
  cmsContent: [
    { id:'CMS-01', type:'Banner',       placement:'App Home · Hero',          status:'Published', updated:'2 days ago',
      titleEn:'Welcome to the Arabian Saluki Center', titleAr:'مرحباً بكم في مركز السلوقي العربي',
      bodyEn:'Register, track and celebrate your Saluki heritage.', bodyAr:'سجّل وتابع واحتفِ بتراث السلوقي العربي.' },
    { id:'CMS-02', type:'Announcement', placement:'App Home · Top',            status:'Published', updated:'5 hours ago',
      titleEn:'ADIHEX 2026 registration is now open', titleAr:'التسجيل في أبوظبي الدولي للصيد ٢٠٢٦ مفتوح الآن',
      bodyEn:'Enter your Saluki before 1 July 2026.', bodyAr:'سجّل سلوقيك قبل ١ يوليو ٢٠٢٦.' },
    { id:'CMS-03', type:'Home Card',    placement:'App Home · Quick Actions',  status:'Published', updated:'1 week ago',
      titleEn:'Register a new Saluki', titleAr:'سجّل سلوقي جديد',
      bodyEn:'Complete registration in 4 simple steps.', bodyAr:'أكمل التسجيل في ٤ خطوات بسيطة.' },
    { id:'CMS-04', type:'Banner',       placement:'App Home · Hero',           status:'Draft',     updated:'Yesterday',
      titleEn:'Spring Beauty Contest — Winners', titleAr:'مسابقة الجمال الربيعية — الفائزون',
      bodyEn:'Meet this season’s champions.', bodyAr:'تعرّف على أبطال هذا الموسم.' },
    { id:'CMS-05', type:'Announcement', placement:'App Home · Top',            status:'Published', updated:'3 days ago',
      titleEn:'Keep vaccinations up to date', titleAr:'حافظ على تحديث التطعيمات',
      bodyEn:'Check your Saluki’s health records in the app.', bodyAr:'تحقق من السجلات الصحية لسلوقيك في التطبيق.' },
    { id:'CMS-06', type:'Home Card',    placement:'App Home · Quick Actions',  status:'Draft',     updated:'4 days ago',
      titleEn:'Upcoming events', titleAr:'الفعاليات القادمة',
      bodyEn:'See the full competition calendar.', bodyAr:'اطّلع على روزنامة المسابقات الكاملة.' }
  ],
  cmsStats: { published:4, drafts:2, banners:2, languages:2 },

  /* ---- Notification management (Module 18) ---- */
  campaignStats: { sent30:14, scheduled:2, openRate:'72%', channels:3 },
  campaigns: [
    { title:'ADIHEX 2026 — Entries Open',   channels:['push','mail'],     audience:'All Members',               status:'Sent',      recipients:231, when:'2 days ago', open:'68%' },
    { title:'June Vaccination Reminders',    channels:['mail','message'],  audience:'Owners · vaccinations due',  status:'Sent',      recipients:42,  when:'Yesterday',  open:'74%' },
    { title:'Spring Contest Results',        channels:['push'],            audience:'Participants',               status:'Sent',      recipients:18,  when:'3 days ago', open:'81%' },
    { title:'Eid Greetings',                 channels:['push','mail'],     audience:'All Members',                status:'Scheduled', recipients:247, when:'in 5 days',  open:'—' },
    { title:'Membership Renewal — Q3',       channels:['mail'],            audience:'Lapsing members',            status:'Draft',     recipients:12,  when:'—',          open:'—' }
  ],
  notifTriggers: [
    { event:'Registration submitted',        email:true,  sms:true,  push:true,  who:'Owner' },
    { event:'Registration approved',         email:true,  sms:true,  push:true,  who:'Owner' },
    { event:'Additional info requested',     email:true,  sms:true,  push:true,  who:'Owner' },
    { event:'Ownership transfer approved',   email:true,  sms:true,  push:true,  who:'Both owners' },
    { event:'Vaccination due (14 days)',     email:true,  sms:true,  push:true,  who:'Owner + Vet' },
    { event:'Health certificate expiring',   email:true,  sms:false, push:true,  who:'Owner' },
    { event:'Competition results published', email:true,  sms:true,  push:true,  who:'Participants' },
    { event:'New event announced',           email:true,  sms:false, push:true,  who:'All Members' },
    { event:'Membership renewal due',        email:true,  sms:true,  push:true,  who:'Member' },
    { event:'DNA verification approved',     email:true,  sms:true,  push:true,  who:'Owner' }
  ],

  /* ---- Support / ticketing ---- */
  ticketStats: { open:3, progress:2, resolved:18, avgResponse:'3.2 h' },
  tickets: [
    { id:'TKT-1042', subject:'Cannot upload microchip certificate', member:'Ahmed Al Mansoori',  category:'Technical',     priority:'High',   status:'Open',        updated:'2 hours ago',
      thread:[ { from:'member', t:'The app shows an error when I try to upload the microchip PDF — it spins then fails.', time:'2h ago' } ] },
    { id:'TKT-1041', subject:'Question about DNA test requirement', member:'Mohammed Al Shamsi', category:'Registration',  priority:'Normal', status:'In Progress', updated:'5 hours ago',
      thread:[ { from:'member', t:'Is a DNA test mandatory for championship entry?', time:'1d ago' }, { from:'agent', t:'DNA verification is required only for premium championship categories — standard events do not need it.', time:'5h ago' } ] },
    { id:'TKT-1039', subject:'Competition entry not showing',       member:'Saeed Al Nuaimi',    category:'Competition',   priority:'Normal', status:'Open',        updated:'1 day ago',
      thread:[ { from:'member', t:'I entered Faris Al Hamra into ADIHEX but it is not in my entries list.', time:'1d ago' } ] },
    { id:'TKT-1037', subject:'Membership renewal payment failed',   member:'Obaid Al Falasi',    category:'Billing',       priority:'High',   status:'In Progress', updated:'2 days ago',
      thread:[ { from:'member', t:'My card was charged but membership still shows lapsed.', time:'2d ago' }, { from:'agent', t:'Thanks — we are checking with the payment provider and will update you shortly.', time:'2d ago' } ] },
    { id:'TKT-1038', subject:'Update owner phone number',           member:'Khalid Al Mazrouei', category:'Account',       priority:'Low',    status:'Resolved',    updated:'2 days ago',
      thread:[ { from:'member', t:'Please update my mobile number on file.', time:'3d ago' }, { from:'agent', t:'Updated. You can also change this anytime under Profile → Contact.', time:'2d ago' } ] },
    { id:'TKT-1035', subject:'How do I transfer ownership?',         member:'Maitha Al Suwaidi',  category:'Registration',  priority:'Normal', status:'Resolved',    updated:'3 days ago',
      thread:[ { from:'member', t:'I sold my Saluki — how do I transfer it?', time:'3d ago' }, { from:'agent', t:'Open the Saluki profile → Transfer Ownership, select the new owner and upload the sale agreement.', time:'3d ago' } ] },
    { id:'TKT-1033', subject:'Passport PDF available in Arabic?',    member:'Fatima Al Hosani',   category:'General',       priority:'Normal', status:'Open',        updated:'5 days ago',
      thread:[ { from:'member', t:'Can I download the digital passport in Arabic as well as English?', time:'5d ago' } ] },
    { id:'TKT-1034', subject:'Face ID login not working',           member:'Hamad Al Ketbi',     category:'Technical',     priority:'Low',    status:'Closed',      updated:'1 week ago',
      thread:[ { from:'member', t:'Face ID stopped working after the latest update.', time:'1w ago' }, { from:'agent', t:'Please update to v2.1 from the App Store — that resolves the Face ID issue.', time:'6d ago' } ] }
  ]
};

/* ---- helpers ---- */
ASC.findSaluki = function (reg) {
  return ASC.data.salukis.find((s) => s.reg === reg) || ASC.data.salukis[0];
};
ASC.findOwner = function (key) {
  return ASC.data.owners.find((o) => o.id === key || o.name === key) || ASC.data.owners[0];
};
ASC.maskEid = function (eid) {
  return (eid || '').replace(/^(\d{3})-\d{4}-\d{7}-(\d)$/, '$1-••••-•••••••-$2');
};

/* ---- Review reasons / comment trail for non-approved registrations ---- */
ASC.data.reviews = {
  'ASC-2026-00004': {   // Noor Al Sahra — Rejected
    reason: 'Incomplete documentation — microchip certificate could not be verified',
    by: 'Sara Al Mheiri', role: 'Registration Officer', date: '02 May 2026',
    notes: 'The microchip number on the submitted certificate (784098100240118) could not be matched against an accredited registry during inspection, and the veterinary health certificate was missing. The owner has been notified to re-submit valid documents before the registration can be reconsidered.',
    timeline: [
      { t: 'Registration submitted', by: 'Khalid Al Mazrouei (owner)', time: '28 Apr 2026' },
      { t: 'Documents under review', by: 'Sara Al Mheiri · Registration Officer', time: '30 Apr 2026' },
      { t: 'Additional information requested', by: 'Sara Al Mheiri', time: '01 May 2026' },
      { t: 'Rejected — documentation could not be verified', by: 'Sara Al Mheiri · Registration Officer', time: '02 May 2026' }
    ]
  },
  'ASC-2026-00008': {   // Warda Al Nakheel — Info Required
    reason: 'A current vaccination record is required',
    by: 'Sara Al Mheiri', role: 'Registration Officer', date: '28 Jun 2026',
    notes: 'The submitted vaccination record has expired. Please upload an up-to-date vaccination certificate from an accredited veterinarian to continue the registration.',
    timeline: [
      { t: 'Registration submitted', by: 'Saeed Al Nuaimi (owner)', time: '27 Jun 2026' },
      { t: 'Additional information requested', by: 'Sara Al Mheiri · Registration Officer', time: '28 Jun 2026' }
    ]
  },
  'ASC-2026-00014': {   // Mansour Al Dhaid — Suspended
    reason: 'Suspended pending an ownership dispute',
    by: 'Hamad Al Junaibi', role: 'Club Administrator', date: '14 Oct 2025',
    notes: 'A third party has contested ownership of this Saluki. The registration is temporarily suspended until the dispute is resolved and supporting documentation is provided.',
    timeline: [
      { t: 'Registration approved', by: 'Hamad Al Junaibi · Club Administrator', time: '12 Oct 2025' },
      { t: 'Ownership dispute filed', by: 'System', time: '13 Oct 2025' },
      { t: 'Registration suspended', by: 'Hamad Al Junaibi · Club Administrator', time: '14 Oct 2025' }
    ]
  }
};
