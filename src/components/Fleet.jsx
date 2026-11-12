import { motion } from 'framer-motion'
import { useLang, FLEET } from '../i18n'
import { EASE, Reveal, IconArrow } from './ui'

function FleetCard({ item, index, onQuote }) {
  const { t, lang } = useLang()
  const c = item[lang]
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <motion.article
      className="card"
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.12, ease: EASE }}
    >
      <div className="card-img">
        <img src={item.img} alt={c.name} loading="lazy" />
        {item.badge && <span className="card-badge">{t.fleet.badge}</span>}
      </div>
      <div className="card-body">
        <h3>{c.name}</h3>
        <p>{c.blurb}</p>
        <div className="card-tags">
          {c.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <button className="card-btn" onClick={() => onQuote(item.id)}>
          {t.fleet.quoteBtn}<IconArrow />
        </button>
      </div>
    </motion.article>
  )
}

export default function Fleet({ onQuote }) {
  const { t } = useLang()
  return (
    <section className="section" id="fleet">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t.fleet.eyebrow}</span>
          <h2>{t.fleet.title}</h2>
          <p>{t.fleet.sub}</p>
        </Reveal>
        <div className="fleet-grid">
          {FLEET.map((item, i) => (
            <FleetCard key={item.id} item={item} index={i} onQuote={onQuote} />
          ))}
        </div>
      </div>
    </section>
  )
}
