import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n'
import { Logo, IconMenu, IconClose } from './ui'

const LINKS = [
  ['fleet', 'fleet'],
  ['why', 'why'],
  ['process', 'process'],
  ['about', 'about'],
  ['faq', 'faq'],
  ['contact', 'quote'],
]

export default function Navbar() {
  const { t, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`nav ${scrolled || open ? 'scrolled' : ''}`}>
        <div className="wrap nav-in">
          <Logo />
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([key, id]) => (
              <a key={key} href={`#${id}`}>{t.nav[key]}</a>
            ))}
          </nav>
          <div className="nav-cta">
            <button className="lang-btn" onClick={toggle} aria-label="Switch language">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" /></svg>
              {t.nav.langName}
            </button>
            <a href="#quote" className="btn btn-amber">{t.nav.quote}</a>
            <button className="burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
              {open ? <IconClose width="26" height="26" /> : <IconMenu width="26" height="26" />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="wrap">
              {LINKS.map(([key, id]) => (
                <a key={key} href={`#${id}`} onClick={() => setOpen(false)}>{t.nav[key]}</a>
              ))}
              <a href="#quote" onClick={() => setOpen(false)} style={{ color: 'var(--amber)' }}>{t.nav.quote}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
