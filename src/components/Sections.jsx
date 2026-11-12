import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang, IMAGES } from '../i18n';
import ScrollVelocity from '../bits/ScrollVelocity';
import SpotlightCard from '../bits/SpotlightCard';
import BlurText from '../bits/BlurText';
import { AnimatedGridPattern, ChapterTag, IconPlus } from './ui';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1];

const P = ({ d, ...rest }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {d}
  </svg>
);
const IconUser = p => <P {...p} d={<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>} />;
const IconTruck = p => <P {...p} d={<><path d="M2 7h11v9H2z" /><path d="M13 10h4.5L21 13.5V16h-8" /><circle cx="6.5" cy="18" r="1.8" /><circle cx="16.5" cy="18" r="1.8" /></>} />;
const IconCalendar = p => <P {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>} />;
const IconWrench = p => <P {...p} d={<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" />} />;

/* ————— ScrollVelocity divider (React Bits) — the marquee replacement ————— */
export function VelocityDivider() {
  const { t, lang } = useLang();
  const row = t.marquee.join(' ✦ ') + ' ✦ ';
  return (
    <div className="velocity" aria-hidden="true">
      <ScrollVelocity
        texts={[row, row]}
        velocity={lang === 'ar' ? 55 : 65}
        numCopies={4}
        damping={55}
        stiffness={420}
        velocityMapping={{ input: [0, 1000], output: [0, 4.5] }}
        parallaxClassName="velocity-parallax"
        scrollerClassName="velocity-scroller"
      />
    </div>
  );
}

/* ————— Why us — React Bits SpotlightCards over a Magic UI grid pattern ————— */
const WHY_ICONS = [IconUser, IconTruck, IconCalendar, IconWrench];

export function Why() {
  const { t } = useLang();
  return (
    <section className="section why-sec" id="why">
      <AnimatedGridPattern className="why-grid-bg" numSquares={30} maxOpacity={0.5} />
      <div className="wrap">
        <ChapterTag index="02" label={t.why.eyebrow} />
        <h2 className="sec-title">{t.why.title}</h2>
        <div className="why-grid">
          {t.why.items.map((item, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <SpotlightCard
                key={item.t}
                className="why-card"
                spotlightColor="#f5b301"
                intensity={0.34}
                spotlightSize={300}
                softness={0.65}
                borderGlow={0.85}
                proximity={110}
                grain={0.35}
                theme="dark"
              >
                <div className="why-card__top">
                  <span className="why-card__icon">
                    <Icon width="26" height="26" />
                  </span>
                  <span className="why-card__idx" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ————— Process — sticky-stacked chapter panels ————— */
export function Process() {
  const { t } = useLang();
  return (
    <section className="process" id="process">
      <div className="wrap process-head">
        <ChapterTag index="03" label={t.process.eyebrow} />
        <h2 className="sec-title">{t.process.title}</h2>
        <p className="sec-sub">{t.process.sub}</p>
      </div>
      <div className="stack">
        {t.process.steps.map((s, i) => (
          <div className="stack-card" key={s.t} style={{ '--i': i }}>
            <div className="stack-card__in wrap">
              <span className="stack-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="stack-card__body">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
              <span className="stack-card__of" aria-hidden="true">
                {String(i + 1).padStart(2, '0')} / 04
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ————— About / manifesto — parallax photo + variable-font stretch title ————— */
export function About() {
  const { t, lang } = useLang();
  const secRef = useRef(null);
  const imgRef = useRef(null);
  const bigRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: frameRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );
      if (lang === 'en' && bigRef.current) {
        // Archivo variable width axis scrubbed by scroll — type as a machine.
        gsap.fromTo(
          bigRef.current,
          { fontVariationSettings: '"wght" 560, "wdth" 68' },
          {
            fontVariationSettings: '"wght" 820, "wdth" 122',
            ease: 'none',
            scrollTrigger: { trigger: sec, start: 'top 85%', end: 'top 15%', scrub: true }
          }
        );
      }
    }, sec);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="section about" id="about" ref={secRef}>
      <div className="wrap">
        <ChapterTag index="04" label={t.about.eyebrow} />
        <h2 className="about-big" ref={bigRef}>
          {t.about.title}
        </h2>
        <div className="about-grid">
          <div className="about-copy">
            <BlurText
              text={t.about.p1}
              className="about-lead"
              animateBy="words"
              delay={26}
              stepDuration={0.34}
              blur={7}
              distance={18}
              direction="bottom"
              effect="focus"
            />
            <p className="about-p2">{t.about.p2}</p>
            <div className="values">
              {t.about.values.map((v, i) => (
                <div className="value" key={v.t}>
                  <span className="value__idx" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{v.t}</h3>
                    <p>{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <figure className="about-frame" ref={frameRef}>
            <div className="about-frame__clip">
              <img ref={imgRef} src={IMAGES.about} alt="" loading="lazy" />
            </div>
            <figcaption>
              <b>{t.about.captionNum}</b>
              <span>{t.about.caption}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ————— FAQ — numbered editorial rows ————— */
export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="wrap">
        <ChapterTag index="05" label={t.faq.eyebrow} />
        <h2 className="sec-title">{t.faq.title}</h2>
        <div className="faq-list">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.q}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span className="faq-q__idx" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="faq-q__text">{item.q}</span>
                  <motion.span className="faq-q__fx" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.35, ease: EASE }}>
                    <IconPlus width="17" height="17" />
                  </motion.span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
