import { useEffect, useId, useMemo, useState } from 'react';
import { useLang } from '../i18n';

export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
      <rect width="64" height="64" rx="14" fill="#f5b301" />
      <path d="M32 12 L52 50 H43.5 L32 26.5 L20.5 50 H12 Z" fill="#111113" />
      <rect x="22" y="39" width="20" height="5" fill="#111113" />
    </svg>
  );
}

export function Logo() {
  const { lang } = useLang();
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo-words">
        <b>{lang === 'ar' ? 'المنار العصرية' : 'AL MANAR'}</b>
        <small>{lang === 'ar' ? 'AL MANAR AL ASRIYA' : 'AL ASRIYA — EST. 2002'}</small>
      </span>
    </span>
  );
}

const P = ({ d, ...rest }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {d}
  </svg>
);

export const IconCheck = p => <P {...p} d={<path d="M20 6 9 17l-5-5" />} />;
export const IconArrow = p => <P {...p} d={<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>} />;
export const IconPin = p => <P {...p} d={<><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></>} />;
export const IconPhone = p => <P {...p} d={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" />} />;
export const IconMail = p => <P {...p} d={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>} />;
export const IconClock = p => <P {...p} d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>} />;
export const IconPlus = p => <P {...p} d={<><path d="M12 5v14M5 12h14" /></>} />;
export const IconMenu = p => <P {...p} d={<><path d="M4 7h16M4 12h16M4 17h16" /></>} />;
export const IconClose = p => <P {...p} d={<><path d="M18 6 6 18M6 6l12 12" /></>} />;
export const IconDown = p => <P {...p} d={<><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></>} />;

export const IconWhatsApp = p => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.24-1.49.48-.77.48-1.43.34-1.57-.15-.14-.27-.22-.57-.37M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88m8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.41" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedGridPattern — technique from Magic UI (magicui.design): an SVG grid
// whose cells flicker on at random positions with staggered fades. Rebuilt for
// this project's plain-CSS setup (no Tailwind), same props spirit.
// ─────────────────────────────────────────────────────────────────────────────
export function AnimatedGridPattern({
  width = 44,
  height = 44,
  numSquares = 26,
  maxOpacity = 0.45,
  duration = 3.5,
  className = ''
}) {
  const id = useId().replace(/[^\w-]/g, '');
  const [squares, setSquares] = useState([]);

  const generate = useMemo(
    () => count =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.floor(Math.random() * 32),
        y: Math.floor(Math.random() * 18),
        delay: Math.random() * duration,
        dur: duration * (0.6 + Math.random() * 0.8)
      })),
    [duration]
  );

  useEffect(() => {
    setSquares(generate(numSquares));
    const iv = setInterval(() => setSquares(generate(numSquares)), duration * 1600);
    return () => clearInterval(iv);
  }, [generate, numSquares, duration]);

  return (
    <svg className={`grid-pattern ${className}`} aria-hidden="true" style={{ '--gp-max': maxOpacity }}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path d={`M ${width} 0 L 0 0 0 ${height}`} fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {squares.map(s => (
        <rect
          key={s.id}
          className="grid-pattern__cell"
          width={width - 1}
          height={height - 1}
          x={s.x * width + 1}
          y={s.y * height + 1}
          style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
        />
      ))}
    </svg>
  );
}

// Chapter heading used across the site: giant label + rule.
export function ChapterTag({ index, label }) {
  const { t } = useLang();
  return (
    <div className="chapter-tag" aria-hidden="true">
      <span className="chapter-tag__idx">
        {t.ui.chapter} — {index}
      </span>
      <span className="chapter-tag__rule" />
      <span className="chapter-tag__label">{label}</span>
    </div>
  );
}
