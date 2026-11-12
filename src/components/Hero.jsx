import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang, IMAGES, WA_NUMBER } from '../i18n'
import { EASE, Counter, IconArrow, IconCheck, IconWhatsApp } from './ui'

function SplitWords({ text, highlight, delay = 0 }) {
  const words = text.split(' ')
  return words.map((w, i) => (
    <span className="w" key={i}>
      <motion.span
        className={highlight && i >= words.length - highlight ? 'hl' : undefined}
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: delay + i * 0.07, ease: EASE }}
      >
        {w}
      </motion.span>
      {i < words.length - 1 ? '\u00A0' : ''}
    </span>
  ))
}

export default function Hero() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0.25])

  const titleWords = t.hero.titleA.split(' ').length

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <img src={IMAGES.hero} alt="" fetchpriority="high" />
      </motion.div>
      <div className="hero-grain" />
      <motion.div className="wrap hero-in" style={{ opacity: fade }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          <span className="hero-badge"><span className="dot" />{t.hero.badge}</span>
        </motion.div>

        <h1>
          <SplitWords text={t.hero.titleA} delay={0.25} />
          <br />
          <SplitWords text={t.hero.titleB} highlight={lang === 'en' ? 2 : 1} delay={0.25 + titleWords * 0.07} />
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
        >
          <a className="btn btn-amber" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.quote.waIntro)}`} target="_blank" rel="noreferrer">
            <IconWhatsApp />{t.hero.cta1}
          </a>
          <a className="btn btn-ghost" href="#fleet">{t.hero.cta2}<IconArrow /></a>
        </motion.div>

        <motion.div
          className="hero-chips"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {t.hero.chips.map(c => (
            <span className="chip" key={c}><IconCheck />{c}</span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease: EASE }}
      >
        <div className="wrap stats-grid" style={{ width: '100%' }}>
          {t.hero.stats.map(s => (
            <div className="stat" key={s.label}>
              <div className="stat-num"><Counter value={s.value} suffix={s.suffix} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
