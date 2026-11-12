import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n';
import { scrollToTarget } from '../fx/scroll';
import { IconClose, IconMenu, Logo } from './ui';

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  ['fleet', 'fleet'],
  ['why', 'why'],
  ['process', 'process'],
  ['about', 'about'],
  ['faq', 'faq'],
  ['contact', 'quote']
];

export default function Navbar() {
  const { t, dir, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const beamRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Aceternity-style scroll progress beam across the top of the viewport.
  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return undefined;
    const tween = gsap.to(beam, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(`#${id}`);
  };

  return (
    <>
      <div ref={beamRef} className="scroll-beam" aria-hidden="true" />
      <aside className="rail" aria-hidden="true">
        <span className="rail__text">{t.ui.rail}</span>
        <span className="rail__line" />
        <span className="rail__est">{t.ui.est}</span>
      </aside>
      <header className={`nav ${scrolled || open ? 'scrolled' : ''}`}>
        <div className="wrap nav-in">
          <a href="#top" className="nav-logo" aria-label="Al Manar Al Asriya" onClick={e => go(e, 'top')}>
            <Logo />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([key, id]) => (
              <a key={key} href={`#${id}`} onClick={e => go(e, id)}>
                {t.nav[key]}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <button className="lang-btn" onClick={toggle} aria-label="Switch language">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
              </svg>
              {t.nav.langName}
            </button>
            <a href="#quote" className="btn btn-amber nav-quote" onClick={e => go(e, 'quote')}>
              {t.nav.quote}
            </a>
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
            dir={dir}
          >
            <div className="wrap">
              {LINKS.map(([key, id]) => (
                <a key={key} href={`#${id}`} onClick={e => go(e, id)}>
                  {t.nav[key]}
                </a>
              ))}
              <a href="#quote" onClick={e => go(e, 'quote')} style={{ color: 'var(--amber)' }}>
                {t.nav.quote}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
