import { useState } from 'react'
import { useLang, FLEET, WA_NUMBER, WA_DISPLAY, PHONE_2, EMAIL } from '../i18n'
import { Reveal, Logo, IconWhatsApp, IconPin, IconPhone, IconMail, IconClock } from './ui'

export default function Quote({ machine, setMachine }) {
  const { t, lang } = useLang()
  const [form, setForm] = useState({ period: 0, name: '', phone: '', site: '', notes: '' })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const machineName = id => {
    const f = FLEET.find(m => m.id === id)
    return f ? f[lang].name : t.quote.other
  }

  const buildLink = () => {
    const q = t.quote
    const lines = [q.waIntro]
    lines.push(`${q.waMachine}: ${machineName(machine)}`)
    lines.push(`${q.waPeriod}: ${q.periods[form.period]}`)
    if (form.name.trim()) lines.push(`${q.waName}: ${form.name.trim()}`)
    if (form.phone.trim()) lines.push(`${q.waPhone}: ${form.phone.trim()}`)
    if (form.site.trim()) lines.push(`${q.waSite}: ${form.site.trim()}`)
    if (form.notes.trim()) lines.push(`${q.waNotes}: ${form.notes.trim()}`)
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  const c = t.quote.contact
  const rows = [
    { icon: IconPin, label: c.addressL, value: c.address },
    { icon: IconWhatsApp, label: c.phoneL, value: WA_DISPLAY, href: `https://wa.me/${WA_NUMBER}` },
    { icon: IconPhone, label: c.phone2L, value: PHONE_2, href: `tel:${PHONE_2.replace(/\s/g, '')}` },
    { icon: IconMail, label: c.emailL, value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: IconClock, label: c.hoursL, value: c.hours },
  ]

  return (
    <section className="section quote" id="quote">
      <div className="wrap quote-grid">
        <Reveal className="quote-side">
          <span className="eyebrow">{t.quote.eyebrow}</span>
          <h2>{t.quote.title}</h2>
          <p>{t.quote.sub}</p>
          <div className="contact-rows" id="contact">
            {rows.map(r => (
              <div className="crow" key={r.label}>
                <span className="ic"><r.icon /></span>
                <div>
                  <small>{r.label}</small>
                  {r.href
                    ? <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><b>{r.value}</b></a>
                    : <b>{r.value}</b>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form className="form" onSubmit={e => { e.preventDefault(); window.open(buildLink(), '_blank') }}>
            <h3>{t.quote.formTitle}</h3>
            <p className="fsub">{t.quote.formSub}</p>
            <div className="f-grid">
              <div className="field">
                <label htmlFor="f-machine">{t.quote.machine}</label>
                <select id="f-machine" value={machine} onChange={e => setMachine(e.target.value)}>
                  <option value="" disabled>{t.quote.machinePlaceholder}</option>
                  {FLEET.map(m => <option key={m.id} value={m.id}>{m[lang].name}</option>)}
                  <option value="other">{t.quote.other}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-period">{t.quote.period}</label>
                <select id="f-period" value={form.period} onChange={e => setForm(f => ({ ...f, period: Number(e.target.value) }))}>
                  {t.quote.periods.map((p, i) => <option key={p} value={i}>{p}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-name">{t.quote.name}</label>
                <input id="f-name" value={form.name} onChange={set('name')} placeholder={t.quote.namePh} autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">{t.quote.phone}</label>
                <input id="f-phone" value={form.phone} onChange={set('phone')} placeholder={t.quote.phonePh} dir="ltr" style={{ textAlign: 'start' }} autoComplete="tel" />
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
            <button type="submit" className="btn btn-amber"><IconWhatsApp />{t.quote.send}</button>
            <p className="fnote">{t.quote.note}</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Logo />
            <p style={{ color: 'var(--muted)', marginTop: '1.1rem', maxWidth: '38ch', fontSize: '.95rem' }}>{t.footer.tag}</p>
          </div>
          <nav className="foot-links" aria-label="Footer">
            <a href="#fleet">{t.nav.fleet}</a>
            <a href="#why">{t.nav.why}</a>
            <a href="#process">{t.nav.process}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#faq">{t.nav.faq}</a>
            <a href="#quote">{t.nav.contact}</a>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© {year} {t.footer.rights}</span>
          <span>{t.footer.since}</span>
        </div>
      </div>
    </footer>
  )
}

export function FloatWhatsApp() {
  const { t } = useLang()
  return (
    <a
      className="float-wa"
      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.quote.waIntro)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
    >
      <IconWhatsApp />
    </a>
  )
}
