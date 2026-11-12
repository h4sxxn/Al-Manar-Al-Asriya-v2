import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang, FLEET } from '../i18n';
import { ChapterTag, IconArrow } from './ui';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// The fleet as a pinned horizontal journey: as the visitor scrolls, the six
// machine categories travel sideways as full-bleed panels with giant index
// numerals, per-panel image parallax (containerAnimation) and a progress rail.
// RTL note: the track mechanics live in an internal LTR shell (dir="ltr" on
// the viewport) — under dir="rtl" the RTL flex row + GSAP's mirrored x sent
// the track off-screen the wrong way, leaving a blank void. Each panel keeps
// dir={dir} so its text still reads RTL in Arabic; only the track is LTR.
// ─────────────────────────────────────────────────────────────────────────────
export default function Fleet({ onQuote }) {
  const { t, lang, dir } = useLang();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const ctx = gsap.context(() => {
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: self => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (counterRef.current) {
              const idx = Math.min(FLEET.length, Math.floor(self.progress * FLEET.length) + 1);
              counterRef.current.textContent = String(idx).padStart(2, '0');
            }
          }
        }
      });

      track.querySelectorAll('.fleet-panel__img img').forEach(img => {
        gsap.fromTo(
          img,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.fleet-panel'),
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          }
        );
      });

      track.querySelectorAll('.fleet-panel__num').forEach(num => {
        gsap.fromTo(
          num,
          { xPercent: 14 },
          {
            xPercent: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: num.closest('.fleet-panel'),
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          }
        );
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [lang, dir]);

  return (
    <section className="fleet-h" id="fleet" ref={sectionRef}>
      <div className="fleet-h__head wrap">
        <ChapterTag index="01" label={t.fleet.eyebrow} />
        <div className="fleet-h__title-row">
          <h2 className="fleet-h__title">
            {t.fleet.title}
            <span className="fleet-h__hint">{t.ui.sideways}</span>
          </h2>
          <div className="fleet-h__counter" aria-hidden="true">
            <span ref={counterRef}>01</span>
            <span className="fleet-h__counter-total">/ 06</span>
          </div>
        </div>
      </div>

      <div className="fleet-h__viewport" dir="ltr">
        <div className="fleet-track" ref={trackRef}>
          {FLEET.map((item, i) => {
            const c = item[lang];
            return (
              <article className="fleet-panel" key={item.id} dir={dir}>
                <span className="fleet-panel__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="fleet-panel__img">
                  <img src={item.img} alt={c.name} loading="lazy" />
                  <span className="fleet-panel__shade" />
                  {item.badge && <span className="fleet-panel__badge">{t.fleet.badge}</span>}
                </div>
                <div className="fleet-panel__body">
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                  <div className="fleet-panel__tags">
                    {c.tags.map(tag => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button type="button" className="btn btn-amber fleet-panel__cta" onClick={() => onQuote(item.id)}>
                    {t.fleet.quoteBtn}
                    <IconArrow width="17" height="17" />
                  </button>
                </div>
              </article>
            );
          })}
          <div className="fleet-panel fleet-panel--end" dir={dir} aria-hidden="true">
            <span className="fleet-panel__endmark">{lang === 'ar' ? 'المنار' : 'AL MANAR'}</span>
          </div>
        </div>
      </div>

      <div className="fleet-h__rail" aria-hidden="true">
        <div className="fleet-h__progress" ref={progressRef} />
      </div>
      <p className="fleet-h__sub wrap">{t.fleet.sub}</p>
    </section>
  );
}
