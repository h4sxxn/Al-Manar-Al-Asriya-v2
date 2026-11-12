import { Suspense, lazy, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang, IMAGES, WA_NUMBER } from '../i18n';
import { scrollToTarget } from '../fx/scroll';
import SplitText from '../bits/SplitText';
import BlurText from '../bits/BlurText';
import CountUp from '../bits/CountUp';
import CircularText from '../bits/CircularText';
import Magnet from '../bits/Magnet';
import { IconArrow, IconCheck, IconDown, IconWhatsApp } from './ui';

gsap.registerPlugin(ScrollTrigger);

// WebGL hero accent — code-split so it never blocks first paint.
const ShaderHero = lazy(() => import('../bits/ShaderHero'));

export default function Hero() {
  const { t, lang, dir } = useLang();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imgRef = useRef(null);
  const statsRef = useRef(null);

  // GSAP parallax: the field photo drifts under the shader while the content
  // lags slightly and fades — depth instead of a flat banner.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to(contentRef.current, {
        yPercent: -10,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to(statsRef.current, {
        yPercent: -34,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
    }, hero);
    return () => ctx.revert();
  }, []);

  const chips = t.hero.chips;
  const statNum = (s, i) => {
    const m = String(s.value).match(/^(\d+)\s*(.*)$/);
    if (!m) return s.value;
    return (
      <>
        <CountUp to={parseInt(m[1], 10)} duration={2.2} delay={0.15 * i} />
        {m[2] ? <span className="plus">{m[2]}</span> : null}
        {s.suffix}
      </>
    );
  };

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-media" aria-hidden="true">
        <img ref={imgRef} className="hero-photo" src={IMAGES.hero} alt="" fetchPriority="high" />
      </div>
      <Suspense fallback={null}>
        <ShaderHero />
      </Suspense>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-frame" aria-hidden="true">
        <span>{t.ui.est}</span>
        <span className="hero-frame__mid">{t.hero.badge}</span>
        <span dir="ltr">29.33° N — 47.96° E</span>
      </div>

      <div className="wrap hero-in" ref={contentRef}>
        <div className="hero-badgeline">
          <span className="hero-badge">
            <span className="dot" />
            {t.hero.badge}
          </span>
        </div>

        <h1 className="hero-title">
          <SplitText
            text={t.hero.titleA}
            tag="span"
            className="hero-line"
            splitType={lang === 'ar' ? 'words' : 'chars'}
            delay={36}
            duration={1.15}
            effect="rise"
            ease="power4.out"
            from={{ opacity: 0, y: 90 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.05}
            rootMargin="0px"
            textAlign={dir === 'rtl' ? 'right' : 'left'}
          />
          <SplitText
            text={t.hero.titleB}
            tag="span"
            className="hero-line hero-line--accent"
            splitType={lang === 'ar' ? 'words' : 'chars'}
            delay={44}
            duration={1.25}
            effect="blur"
            ease="power3.out"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.05}
            rootMargin="0px"
            textAlign={dir === 'rtl' ? 'right' : 'left'}
          />
        </h1>

        <div className="hero-row">
          <div className="hero-subwrap">
            <BlurText
              text={t.hero.sub}
              className="hero-sub"
              animateBy="words"
              delay={55}
              stepDuration={0.4}
              blur={8}
              distance={26}
              direction="bottom"
            />
            <div className="hero-ctas">
              <Magnet padding={90} magnetStrength={2.6} wrapperClassName="magnet-wrap">
                <a
                  className="btn btn-amber btn-xl"
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.quote.waIntro)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconWhatsApp width="20" height="20" />
                  {t.hero.cta1}
                </a>
              </Magnet>
              <Magnet padding={70} magnetStrength={3.4} wrapperClassName="magnet-wrap">
                <button type="button" className="btn btn-ghost btn-xl" onClick={() => scrollToTarget('#fleet')}>
                  {t.hero.cta2}
                  <IconArrow width="19" height="19" />
                </button>
              </Magnet>
            </div>
            <div className="hero-chips">
              {chips.map(c => (
                <span className="chip" key={c}>
                  <IconCheck width="13" height="13" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          <CircularText
            text={lang === 'ar' ? 'تأجير معدات ثقيلة • الكويت • منذ ٢٠٠٢ • ' : 'HEAVY MACHINERY RENTAL • KUWAIT • SINCE 2002 • '}
            spinDuration={22}
            onHover="speedUp"
            className="hero-circular"
          >
            <IconDown width="22" height="22" />
          </CircularText>
        </div>
      </div>

      <div className="hero-stats" ref={statsRef}>
        <div className="wrap stats-strip">
          {t.hero.stats.map((s, i) => (
            <div className="stat" key={s.label}>
              <div className="stat-num">{statNum(s, i)}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
          <div className="stat stat--scroll" aria-hidden="true">
            <span className="scroll-hint">
              {t.ui.scroll}
              <IconDown width="15" height="15" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
