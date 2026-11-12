import { useState } from 'react';
import { useLang, FLEET, WA_NUMBER, WA_DISPLAY, PHONE_2, EMAIL } from '../i18n';
import { scrollToTarget } from '../fx/scroll';
import SplitText from '../bits/SplitText';
import SpotlightCard from '../bits/SpotlightCard';
import Magnet from '../bits/Magnet';
import { ChapterTag, IconClock, IconMail, IconPhone, IconPin, IconWhatsApp, Logo } from './ui';

export default function Quote({ machine, setMachine }) {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ period: 0, name: '', phone: '', site: '', notes: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const machineName = id => {
    const f = FLEET.find(m => m.id === id);
    return f ? f[lang].name : t.quote.other;
  };

  // Quote flow: the form composes a WhatsApp message to the main line.
  const buildLink = () => {
    const q = t.quote;
    const lines = [q.waIntro];
    lines.push(`${q.waMachine}: ${machineName(machine)}`);
    lines.push(`${q.waPeriod}: ${q.periods[form.period]}`);
    if (form.name.trim()) lines.push(`${q.waName}: ${form.name.trim()}`);
    if (form.phone.trim()) lines.push(`${q.waPhone}: ${form.phone.trim()}`);
    if (form.site.trim()) lines.push(`${q.waSite}: ${form.site.trim()}`);
    if (form.notes.trim()) lines.push(`${q.waNotes}: ${form.notes.trim()}`);
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const c = t.quote.contact;
  const rows = [
    { icon: IconPin, label: c.addressL, value: c.address },
    { icon: IconWhatsApp, label: c.phoneL, value: WA_DISPLAY, href: `https://wa.me/${WA_NUMBER}` },
    { icon: IconPhone, label: c.phone2L, value: PHONE_2, href: `tel:${PHONE_2.replace(/\s/g, '')}` },
    { icon: IconMail, label: c.emailL, value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: IconClock, label: c.hoursL, value: c.hours }
  ];

  return (
    <section className="section quote" id="quote">
      <div className="wrap quote-grid">
        <div className="quote-side">
          <ChapterTag index="06" label={t.quote.eyebrow} />
          <SplitText
            text={t.quote.title}
            tag="h2"
            className="quote-title"
            splitType={lang === 'ar' ? 'words' : 'chars'}
            delay={30}
            duration={1}
            effect="rise"
            ease="power4.out"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.3}
            rootMargin="0px"
          />
          <p className="quote-sub">{t.quote.sub}</p>
          <div className="contact-rows" id="contact">
            {rows.map(r => (
              <div className="crow" key={r.label}>
                <span className="crow__ic">
                  <r.icon width="19" height="19" />
                </span>
                <div className="crow__body">
                  <small>{r.label}</small>
                  {r.href ? (
                    <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" dir={r.value.includes('@') || r.value.includes('+') ? 'ltr' : undefined}>
                      <b>{r.value}</b>
                    </a>
                  ) : (
                    <b>{r.value}</b>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SpotlightCard
          className="quote-card"
          spotlightColor="#f5b301"
          intensity={0.16}
          spotlightSize={340}
          softness={0.8}
          borderGlow={0.7}
          proximity={90}
          grain={0.2}
          theme="dark"
        >
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault();
              window.open(buildLink(), '_blank');
            }}
          >
            <h3>{t.quote.formTitle}</h3>
            <p className="fsub">{t.quote.formSub}</p>
            <div className="f-grid">
              <div className="field">
                <label htmlFor="f-machine">{t.quote.machine}</label>
                <select id="f-machine" value={machine} onChange={e => setMachine(e.target.value)}>
                  <option value="" disabled>
                    {t.quote.machinePlaceholder}
                  </option>
                  {FLEET.map(m => (
                    <option key={m.id} value={m.id}>
                      {m[lang].name}
                    </option>
                  ))}
                  <option value="other">{t.quote.other}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-period">{t.quote.period}</label>
                <select
                  id="f-period"
                  value={form.period}
                  onChange={e => setForm(f => ({ ...f, period: Number(e.target.value) }))}
                >
                  {t.quote.periods.map((p, i) => (
                    <option key={p} value={i}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-name">{t.quote.name}</label>
                <input id="f-name" value={form.name} onChange={set('name')} placeholder={t.quote.namePh} autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">{t.quote.phone}</label>
                <input
                  id="f-phone"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder={t.quote.phonePh}
                  dir="ltr"
                  style={{ textAlign: 'start' }}
                  autoComplete="tel"
                />
              </div>
              <div className="field full">
                <label htmlFor="f-site">{t.quote.site}</label>
                <input id="f-site" value={form.site} onChange={set('site')} placeholder={t.quote.sitePh} />
              </div>
              <div className="field full">
                <label htmlFor="f-notes">{t.quote.notes}</label>
                <textarea id="f-notes" value={form.notes} onChange={set('notes')} placeholder={t.quote.notesPh} />
              </div>
            </div>
            <button type="submit" className="btn btn-amber btn-xl form-submit">
              <IconWhatsApp width="20" height="20" />
              {t.quote.send}
            </button>
            <p className="fnote">{t.quote.note}</p>
          </form>
        </SpotlightCard>
      </div>
    </section>
  );
}

/* ————— Footer with the oversized wordmark ————— */
const FOOT_LINKS = [
  ['fleet', 'fleet'],
  ['why', 'why'],
  ['process', 'process'],
  ['about', 'about'],
  ['faq', 'faq'],
  ['contact', 'quote']
];

export function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();
  const go = (e, id) => {
    e.preventDefault();
    scrollToTarget(`#${id}`);
  };
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo />
            <p>{t.footer.tag}</p>
          </div>
          <nav className="foot-links" aria-label="Footer">
            {FOOT_LINKS.map(([key, id]) => (
              <a key={key} href={`#${id}`} onClick={e => go(e, id)}>
                {t.nav[key]}
              </a>
            ))}
          </nav>
          <div className="foot-contact">
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" dir="ltr">
              {WA_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span>{t.footer.since}</span>
          </div>
        </div>
      </div>
      <div className="foot-mark" aria-hidden="true">
        {lang === 'ar' ? 'المنار العصرية' : 'AL MANAR'}
      </div>
      <div className="wrap foot-bottom">
        <span>
          © {year} {t.footer.rights}
        </span>
        <span>{t.footer.since}</span>
      </div>
    </footer>
  );
}

/* ————— Floating WhatsApp (Magnet-wrapped) ————— */
export function FloatWhatsApp() {
  const { t } = useLang();
  return (
    <Magnet padding={56} magnetStrength={3} wrapperClassName="float-wa-wrap">
      <a
        className="float-wa"
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.quote.waIntro)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <IconWhatsApp width="27" height="27" />
      </a>
    </Magnet>
  );
}
