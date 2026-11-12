import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang, IMAGES } from '../i18n'
import { EASE, Reveal, IconUser, IconTruck, IconCalendar, IconWrench, IconPlus } from './ui'

/* ————— Amber marquee ticker ————— */
export function Marquee() {
  const { t } = useLang()
  const items = [...t.marquee, ...t.marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((w, i) => (
          <span key={i}>{w}<i>◆</i></span>
        ))}
      </div>
    </div>
  )
}

/* ————— Why us ————— */
const WHY_ICONS = [IconUser, IconTruck, IconCalendar, IconWrench]
export function Why() {
  const { t } = useLang()
  return (
    <section className="section" id="why" style={{ paddingTop: '1rem' }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t.why.eyebrow}</span>
          <h2>{t.why.title}</h2>
        </Reveal>
        <div className="why-grid">
          {t.why.items.map((item, i) => {
            const Icon = WHY_ICONS[i]
            return (
              <Reveal key={item.t} delay={i * 0.1}>
                <div className="why">
                  <div className="why-icon"><Icon /></div>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ————— Process ————— */
export function Process() {
  const { t } = useLang()
  return (
    <section className="section process" id="process">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t.process.eyebrow}</span>
          <h2>{t.process.title}</h2>
          <p>{t.process.sub}</p>
        </Reveal>
        <div className="steps">
          {t.process.steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.12}>
              <div className="step">
                <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ————— About (light paper section) ————— */
export function About() {
  const { t } = useLang()
  return (
    <section className="section about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <Reveal>
            <span className="eyebrow">{t.about.eyebrow}</span>
            <h2>{t.about.title}</h2>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <figure className="about-img">
              <img src={IMAGES.about} alt="" loading="lazy" />
              <figcaption>
                <b>{t.about.captionNum}</b>
                <span>{t.about.caption}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="values">
          {t.about.values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.09}>
              <div className="value">
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ————— FAQ accordion ————— */
export function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2>{t.faq.title}</h2>
        </Reveal>
        <div className="faq-list">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.06}>
                <div className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    {item.q}
                    <span className="fx"><IconPlus width="16" height="16" /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
