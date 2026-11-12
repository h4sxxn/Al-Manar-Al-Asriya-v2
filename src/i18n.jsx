import { createContext, useContext, useEffect, useState } from 'react'

export const WA_NUMBER = '96599015863'
export const WA_DISPLAY = '+965 9901 5863'
export const PHONE_2 = '+965 9755 8200'
export const EMAIL = 'Almanar.kw.jcb2012@gmail.com'

const IMG = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export const IMAGES = {
  hero: IMG('1541888946425-d81bb19240f5', 2000),
  about: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Tower_crane_at_a_building_construction_site_in_Taichung_2023-05-13_01.jpg/1280px-Tower_crane_at_a_building_construction_site_in_Taichung_2023-05-13_01.jpg',
}

export const FLEET = [
  {
    id: 'excavator',
    img: IMG('1580901368919-7738efb0f87e'),
    en: { name: 'Excavators', blurb: 'Digging, trenching, foundations and site prep — handled by an experienced operator.', tags: ['Digging', 'Trenching', 'Foundations'] },
    ar: { name: 'الحفارات', blurb: 'الحفر وحفر الخنادق والأساسات وتجهيز المواقع — بسائق ذي خبرة.', tags: ['حفر', 'خنادق', 'أساسات'] },
  },
  {
    id: 'loader',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Komatsu_WA500_wheel_loader_for_gravel_mining.jpg/1280px-Komatsu_WA500_wheel_loader_for_gravel_mining.jpg',
    en: { name: 'Wheel Loaders', blurb: 'Moving aggregates, loading trucks and keeping busy sites flowing.', tags: ['Aggregates', 'Truck loading', 'Site clearing'] },
    ar: { name: 'اللودرات', blurb: 'نقل الركام وتحميل الشاحنات وإبقاء المواقع المزدحمة في حركة دائمة.', tags: ['ركام', 'تحميل شاحنات', 'تنظيف مواقع'] },
  },
  {
    id: 'jcb',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/JCB_3CX_Backhoe_Loader_on_outriggers.jpg',
    badge: true,
    en: { name: 'JCB Machines', blurb: 'Backhoe loaders, telehandlers and more — the all-rounders every site asks for.', tags: ['Backhoes', 'Telehandlers', 'Multi-purpose'] },
    ar: { name: 'معدات JCB', blurb: 'لودرات حفارة وتليسكوبات وغيرها — معدات متعددة الاستخدامات يطلبها كل موقع.', tags: ['حفار لودر', 'تليسكوب', 'متعددة الاستخدام'] },
  },
  {
    id: 'cat',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Caterpillar_950k_Wheel_Loader.jpg/1280px-Caterpillar_950k_Wheel_Loader.jpg',
    en: { name: 'CAT Machines', blurb: 'Heavy-duty Caterpillar power for earthmoving and road work.', tags: ['Earthmoving', 'Road work', 'Heavy duty'] },
    ar: { name: 'معدات CAT', blurb: 'قوة كاتربيلر للخدمة الشاقة في أعمال الحفر والطرق.', tags: ['أعمال ترابية', 'طرق', 'خدمة شاقة'] },
  },
  {
    id: 'crane',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/20230107_Construction_Site_Nuremberg.jpg/1280px-20230107_Construction_Site_Nuremberg.jpg',
    en: { name: 'Cranes', blurb: 'Lifting power for steel, precast and heavy installs — planned, safe lifts.', tags: ['Steel lifting', 'Precast', 'Heavy installs'] },
    ar: { name: 'الرافعات', blurb: 'قدرة رفع للحديد والخرسانة الجاهزة والتركيبات الثقيلة — رفعات مخططة وآمنة.', tags: ['رفع حديد', 'خرسانة جاهزة', 'تركيبات ثقيلة'] },
  },
  {
    id: 'mixer',
    img: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Clean_concrete_mixer_truck.jpg/1280px-Clean_concrete_mixer_truck.jpg',
    en: { name: 'Concrete Mixers', blurb: 'Mixers that keep pours on schedule — one pour or full project supply.', tags: ['On-schedule pours', 'Project supply'] },
    ar: { name: 'خلاطات الخرسانة', blurb: 'خلاطات تحافظ على مواعيد الصب — صبة واحدة أو توريد مشروع كامل.', tags: ['صب في الموعد', 'توريد مشاريع'] },
  },
]

export const dict = {
  en: {
    dir: 'ltr',
    ui: { scroll: 'Scroll', sideways: 'Keep scrolling — the fleet moves sideways', chapter: 'Chapter', est: 'EST. 2002 — KUWAIT', rail: 'HEAVY MACHINERY RENTAL — KUWAIT' },
    nav: { fleet: 'Fleet', why: 'Why Us', process: 'Process', about: 'About', faq: 'FAQ', contact: 'Contact', quote: 'Get a quote', langName: 'العربية' },
    hero: {
      badge: 'Kuwait · Available 24/7',
      titleA: 'Machinery that shows up',
      titleB: 'ready to work.',
      sub: 'Excavators, loaders, JCB & CAT machines, cranes and mixers — rented by the day, the week or the full project, with our operator in the cab and delivered to your site anywhere in Kuwait.',
      cta1: 'Get a WhatsApp quote',
      cta2: 'Browse the fleet',
      chips: ['Operator included', 'Delivered to your site', '2-day hire welcome', 'Open 24/7'],
      stats: [
        { value: 24, suffix: '', label: 'Years serving Kuwait projects' },
        { value: 6, suffix: '', label: 'Machine categories, one call' },
        { value: 2, suffix: '-day', label: 'Minimum hire — short jobs welcome' },
        { value: 24, suffix: '/7', label: 'Support, every day of the year' },
      ],
    },
    marquee: ['Excavators', 'Wheel Loaders', 'JCB Machines', 'CAT Machines', 'Cranes', 'Concrete Mixers', 'Operator Included', 'Site Delivery', 'Since 2002'],
    fleet: {
      eyebrow: 'The Fleet',
      title: 'Pick your machine.',
      sub: 'An owned fleet, maintained in our own workshops and ready today. Tap any machine — it loads straight into your quote.',
      badge: 'Large fleet',
      quoteBtn: 'Quote this machine',
    },
    why: {
      eyebrow: 'Why Al Manar',
      title: 'One call. Machine, operator, delivery — sorted.',
      items: [
        { t: 'Operator included', d: 'Every hire arrives with an experienced operator in the cab. No scrambling for crew, no learning curve on your site.' },
        { t: 'Delivered to your site', d: 'We bring the machine to you — anywhere in Kuwait — checked, fueled and ready to work the moment it lands.' },
        { t: 'Terms that flex', d: 'Two days, a week, or the whole build. Day, weekly and full project-contract rates, agreed clearly up front.' },
        { t: 'Our own workshops', d: 'Our workshops and storage yards keep every machine maintained and ready — with support on call 24/7.' },
      ],
    },
    process: {
      eyebrow: 'How It Works',
      title: 'Four steps. Machine on site.',
      sub: 'From a 2-day job to a full project contract — the process stays this simple.',
      steps: [
        { t: 'Tell us what you need', d: 'WhatsApp or the form below — the machine, the site, the dates. Two days or two years, both work.' },
        { t: 'We match the machine', d: 'We review the fleet and pick the right machine for the job — checked, fueled and ready.' },
        { t: 'Quote & schedule', d: 'Clear price, clear timing. Day, week or full contract terms — no surprises later.' },
        { t: 'Delivered, operator included', d: 'We deliver to your site anywhere in Kuwait, our operator in the cab, support on call 24/7.' },
      ],
    },
    about: {
      eyebrow: 'About Al Manar',
      title: 'The first name builders think of.',
      p1: 'Al Manar Al Asriya — General Trading & Contracting Co. has supplied Kuwait\u2019s projects with heavy machinery since 2002. Our vision is simple: be the first name builders think of when a project needs a machine — and earn it with a fleet that\u2019s always ready and a promise that\u2019s always kept.',
      p2: 'Behind every hire stands our own workshops, storage yards and a safety-first crew — so the machine that arrives on your site is one we\u2019d put our name on. Because we do.',
      captionNum: '2002',
      caption: 'Serving Kuwait\u2019s construction projects for over two decades',
      values: [
        { t: 'Excellence', d: 'Machines maintained to a standard, operators who take pride in the work.' },
        { t: 'Innovation', d: 'A modern fleet and modern planning — better ways of working on every site.' },
        { t: 'Integrity', d: 'Clear terms, honest timelines, and a contract we stand behind.' },
        { t: 'Sustainability', d: 'Well-kept machines burn less, last longer, and keep sites cleaner.' },
      ],
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Before you ask.',
      items: [
        { q: 'What is the shortest hire?', a: 'Two days. Short hires are welcome here — and if the job grows, day and weekly rates roll easily into a full project contract.' },
        { q: 'Is an operator included?', a: 'Yes. Every machine is supplied with our own experienced operator/driver as standard — it is part of the hire, not an extra.' },
        { q: 'Do you deliver to our site?', a: 'Yes — we deliver to your site anywhere in Kuwait, and collect when the hire ends.' },
        { q: 'How do I get a price?', a: 'Tap any machine in the fleet section and it loads into the quote form, or message us on WhatsApp with the machine, the site and the dates. You get a clear price and clear timing back.' },
        { q: 'Where are you located?', a: 'Our office is at Al-Sahli Complex, 3rd Floor, Office 47/1, Jaleeb Al-Shuyukh, Kuwait — and we are reachable 24/7.' },
      ],
    },
    quote: {
      eyebrow: 'Get a Quote',
      title: 'Tell us the job. We\u2019ll price it.',
      sub: 'Machine, site, dates — that\u2019s all we need. Send the form and it opens WhatsApp with your request ready to go.',
      formTitle: 'Request a quote',
      formSub: 'Takes under a minute. Replies come back on WhatsApp.',
      machine: 'Machine',
      machinePlaceholder: 'Choose a machine…',
      other: 'Something else / not sure yet',
      period: 'Rental period',
      periods: ['2 days', 'A few days', 'One week', 'A few weeks', 'Full project contract'],
      name: 'Your name',
      namePh: 'Full name',
      phone: 'Phone / WhatsApp',
      phonePh: '+965 …',
      site: 'Site location',
      sitePh: 'Area / city in Kuwait',
      notes: 'Anything else? (optional)',
      notesPh: 'Dates, access, working hours…',
      send: 'Send via WhatsApp',
      note: 'Opens WhatsApp with your request pre-filled — just press send.',
      waIntro: 'Hello Al Manar Al Asriya, I would like a quote:',
      waMachine: 'Machine',
      waPeriod: 'Rental period',
      waName: 'Name',
      waPhone: 'Phone',
      waSite: 'Site',
      waNotes: 'Details',
      contact: {
        addressL: 'Office', address: 'Jaleeb Al-Shuyukh, Al-Sahli Complex, 3rd Floor, Office 47/1, Kuwait',
        phoneL: 'WhatsApp / Main line', phone2L: 'Second line',
        emailL: 'Email', hoursL: 'Hours', hours: 'Open 24/7 — every day',
      },
    },
    footer: {
      tag: 'Heavy machinery rental in Kuwait — with operator, delivered to your site.',
      rights: 'Al Manar Al Asriya — General Trading & Contracting Co. All rights reserved.',
      since: 'Since 2002 · Jaleeb Al-Shuyukh, Kuwait',
    },
  },

  ar: {
    dir: 'rtl',
    ui: { scroll: 'مرّر للأسفل', sideways: 'تابع التمرير — الأسطول يتحرك جانبياً', chapter: 'الفصل', est: 'منذ ٢٠٠٢ — الكويت', rail: 'تأجير معدات ثقيلة — الكويت' },
    nav: { fleet: 'الأسطول', why: 'لماذا نحن', process: 'خطوات العمل', about: 'من نحن', faq: 'الأسئلة الشائعة', contact: 'تواصل معنا', quote: 'اطلب عرض سعر', langName: 'English' },
    hero: {
      badge: 'الكويت · متاحون على مدار الساعة',
      titleA: 'معدات تصل إلى موقعك',
      titleB: 'جاهزة للعمل.',
      sub: 'حفارات ولودرات ومعدات JCB وCAT ورافعات وخلاطات خرسانة — تأجير باليوم أو الأسبوع أو بعقود المشاريع الكاملة، مع مشغّلنا الخاص وتوصيل إلى موقعك في أي مكان بالكويت.',
      cta1: 'اطلب عرض سعر عبر واتساب',
      cta2: 'تصفح الأسطول',
      chips: ['المشغّل مشمول', 'توصيل إلى موقعك', 'تأجير من يومين', 'مفتوح على مدار الساعة'],
      stats: [
        { value: 24, suffix: '', label: 'عاماً في خدمة مشاريع الكويت' },
        { value: 6, suffix: '', label: 'فئات من المعدات بمكالمة واحدة' },
        { value: 2, suffix: '', label: 'يومان كحد أدنى — الأعمال القصيرة مرحب بها' },
        { value: 24, suffix: '/7', label: 'دعم متواصل طوال أيام السنة' },
      ],
    },
    marquee: ['حفارات', 'لودرات', 'معدات JCB', 'معدات CAT', 'رافعات', 'خلاطات خرسانة', 'المشغّل مشمول', 'توصيل للموقع', 'منذ 2002'],
    fleet: {
      eyebrow: 'الأسطول',
      title: 'اختر معدّتك.',
      sub: 'أسطول مملوك لنا، يُصان في ورشنا الخاصة وجاهز اليوم. اضغط أي معدة — وستنتقل مباشرة إلى طلب عرض السعر.',
      badge: 'أسطول كبير',
      quoteBtn: 'اطلب سعر هذه المعدة',
    },
    why: {
      eyebrow: 'لماذا المنار',
      title: 'مكالمة واحدة. المعدة والمشغّل والتوصيل — كل شيء جاهز.',
      items: [
        { t: 'المشغّل مشمول', d: 'كل تأجير يصلك مع مشغّل ذي خبرة في الكابينة. لا بحث عن عمالة ولا منحنى تعلّم في موقعك.' },
        { t: 'توصيل إلى موقعك', d: 'نوصل المعدة إليك — في أي مكان بالكويت — بعد فحصها وتزويدها بالوقود، جاهزة للعمل فور وصولها.' },
        { t: 'شروط مرنة', d: 'يومان أو أسبوع أو مدة المشروع كاملة. أسعار يومية وأسبوعية وبعقود كاملة، متفق عليها بوضوح من البداية.' },
        { t: 'ورشنا الخاصة', d: 'ورشنا وساحات التخزين الخاصة بنا تحافظ على جاهزية كل معدة وصيانتها — مع دعم على مدار الساعة.' },
      ],
    },
    process: {
      eyebrow: 'خطوات العمل',
      title: 'أربع خطوات. المعدة في موقعك.',
      sub: 'من عمل ليومين إلى عقد مشروع كامل — العملية بهذه البساطة دائماً.',
      steps: [
        { t: 'أخبرنا بما تحتاجه', d: 'عبر واتساب أو النموذج أدناه — المعدة والموقع والتواريخ. يومان أو عامان، كلاهما متاح.' },
        { t: 'نختار المعدة المناسبة', d: 'نراجع الأسطول ونختار المعدة الأنسب لعملك — مفحوصة ومزوّدة بالوقود وجاهزة.' },
        { t: 'عرض السعر والجدولة', d: 'سعر واضح وتوقيت واضح. شروط يومية أو أسبوعية أو عقد كامل — بلا مفاجآت لاحقاً.' },
        { t: 'التوصيل مع المشغّل', d: 'نوصّل إلى موقعك في أي مكان بالكويت، ومشغّلنا في الكابينة، والدعم متاح على مدار الساعة.' },
      ],
    },
    about: {
      eyebrow: 'من نحن',
      title: 'أول اسم يخطر ببال المقاولين.',
      p1: 'المنار العصرية — شركة تجارة عامة ومقاولات — تزوّد مشاريع الكويت بالمعدات الثقيلة منذ عام 2002. رؤيتنا بسيطة: أن نكون أول اسم يفكر فيه المقاولون عندما يحتاج المشروع إلى معدة — وأن نستحق ذلك بأسطول جاهز دائماً ووعد يُنفَّذ دائماً.',
      p2: 'خلف كل تأجير تقف ورشنا الخاصة وساحات تخزيننا وطاقم يضع السلامة أولاً — فالمعدة التي تصل إلى موقعك هي معدة نضع اسمنا عليها. لأننا نفعل ذلك فعلاً.',
      captionNum: '2002',
      caption: 'في خدمة مشاريع البناء في الكويت منذ أكثر من عقدين',
      values: [
        { t: 'التميّز', d: 'معدات تُصان وفق معيار ثابت، ومشغّلون يفخرون بعملهم.' },
        { t: 'الابتكار', d: 'أسطول حديث وتخطيط حديث — طرق عمل أفضل في كل موقع.' },
        { t: 'النزاهة', d: 'شروط واضحة وجداول زمنية صادقة وعقد نقف خلفه.' },
        { t: 'الاستدامة', d: 'المعدات المُصانة جيداً تحرق وقوداً أقل وتدوم أطول وتبقي المواقع أنظف.' },
      ],
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'قبل أن تسأل.',
      items: [
        { q: 'ما هي أقصر مدة تأجير؟', a: 'يومان. الأعمال القصيرة مرحّب بها هنا — وإذا كبر العمل، تنتقل الأسعار اليومية والأسبوعية بسهولة إلى عقد مشروع كامل.' },
        { q: 'هل المشغّل مشمول؟', a: 'نعم. كل معدة تُورَّد مع مشغّل/سائق ذي خبرة من فريقنا بشكل قياسي — فهو جزء من التأجير وليس إضافة مدفوعة.' },
        { q: 'هل توصلون إلى موقعنا؟', a: 'نعم — نوصّل إلى موقعك في أي مكان بالكويت، ونستلم المعدة عند انتهاء التأجير.' },
        { q: 'كيف أحصل على السعر؟', a: 'اضغط أي معدة في قسم الأسطول لتنتقل إلى نموذج عرض السعر، أو راسلنا عبر واتساب بالمعدة والموقع والتواريخ. وسيصلك سعر واضح وتوقيت واضح.' },
        { q: 'أين يقع مقرّكم؟', a: 'مكتبنا في مجمع السهلي، الطابق الثالث، مكتب 47/1، جليب الشيوخ، الكويت — ويمكن الوصول إلينا على مدار الساعة.' },
      ],
    },
    quote: {
      eyebrow: 'طلب عرض سعر',
      title: 'أخبرنا بالعمل. وسنعطيك السعر.',
      sub: 'المعدة والموقع والتواريخ — هذا كل ما نحتاجه. أرسل النموذج وسيفتح واتساب بطلبك جاهزاً للإرسال.',
      formTitle: 'اطلب عرض سعر',
      formSub: 'يستغرق أقل من دقيقة. والرد يصلك عبر واتساب.',
      machine: 'المعدة',
      machinePlaceholder: 'اختر معدة…',
      other: 'شيء آخر / لست متأكداً بعد',
      period: 'مدة التأجير',
      periods: ['يومان', 'بضعة أيام', 'أسبوع واحد', 'بضعة أسابيع', 'عقد مشروع كامل'],
      name: 'اسمك',
      namePh: 'الاسم الكامل',
      phone: 'الهاتف / واتساب',
      phonePh: '+965 …',
      site: 'موقع العمل',
      sitePh: 'المنطقة / المدينة في الكويت',
      notes: 'أي شيء آخر؟ (اختياري)',
      notesPh: 'التواريخ، الدخول، ساعات العمل…',
      send: 'أرسل عبر واتساب',
      note: 'يفتح واتساب بطلبك مكتوباً وجاهزاً — ما عليك سوى الضغط على إرسال.',
      waIntro: 'مرحباً المنار العصرية، أود طلب عرض سعر:',
      waMachine: 'المعدة',
      waPeriod: 'مدة التأجير',
      waName: 'الاسم',
      waPhone: 'الهاتف',
      waSite: 'الموقع',
      waNotes: 'تفاصيل',
      contact: {
        addressL: 'المكتب', address: 'جليب الشيوخ، مجمع السهلي، الطابق الثالث، مكتب 47/1، الكويت',
        phoneL: 'واتساب / الخط الرئيسي', phone2L: 'الخط الثاني',
        emailL: 'البريد الإلكتروني', hoursL: 'ساعات العمل', hours: 'مفتوح على مدار الساعة — كل يوم',
      },
    },
    footer: {
      tag: 'تأجير معدات ثقيلة في الكويت — مع المشغّل، وتوصيل إلى موقعك.',
      rights: 'المنار العصرية — شركة تجارة عامة ومقاولات. جميع الحقوق محفوظة.',
      since: 'منذ 2002 · جليب الشيوخ، الكويت',
    },
  },
}

const LangCtx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('am-lang') || 'en' } catch { return 'en' }
  })
  useEffect(() => {
    const d = dict[lang]
    document.documentElement.lang = lang
    document.documentElement.dir = d.dir
    try { localStorage.setItem('am-lang', lang) } catch { /* private mode */ }
  }, [lang])
  const toggle = () => setLang(l => (l === 'en' ? 'ar' : 'en'))
  return <LangCtx.Provider value={{ lang, t: dict[lang], toggle }}>{children}</LangCtx.Provider>
}

export function useLang() {
  return useContext(LangCtx)
}
