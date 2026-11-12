import { useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { useLang } from '../i18n'

export const EASE = [0.22, 1, 0.36, 1]

/* ——— Crafted typographic logo mark: amber beacon tile + gantry "A" ——— */
export function LogoMark({ size = 40 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="am-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffc61a" />
          <stop offset="100%" stopColor="#f5b301" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#am-g)" />
      <path d="M32 11 L53 51 H44.2 L32 26.8 L19.8 51 H11 Z" fill="#111113" />
      <rect x="21.5" y="39.5" width="21" height="5" rx="1" fill="#111113" />
    </svg>
  )
}

export function Logo() {
  const { lang } = useLang()
  return (
    <a href="#top" className="logo" aria-label="Al Manar Al Asriya">
      <LogoMark />
      <span className="logo-text">
        <span className="logo-name">
          {lang === 'ar' ? <>المنار <em>العصرية</em></> : <>AL MANAR <em>AL ASRIYA</em></>}
        </span>
        <span className="logo-sub">{lang === 'ar' ? 'تجارة عامة ومقاولات · الكويت' : 'General Trading & Contracting · Kuwait'}</span>
      </span>
    </a>
  )
}

/* ——— Scroll reveal wrapper ——— */
export function Reveal({ children, delay = 0, y = 28, className, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* ——— Animated counter ——— */
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => { if (ref.current) ref.current.textContent = String(Math.round(v)) },
    })
    return () => controls.stop()
  }, [inView, value])
  return (
    <span>
      <span ref={ref}>0</span>
      {suffix && <span className="plus">{suffix}</span>}
    </span>
  )
}

/* ——— Icons (stroke, 24 viewBox) ——— */
const P = ({ d, ...rest }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {d}
  </svg>
)
export const IconCheck = p => <P {...p} d={<path d="M20 6 9 17l-5-5" />} />
export const IconArrow = p => <P {...p} d={<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>} />
export const IconUser = p => <P {...p} d={<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" /></>} />
export const IconTruck = p => <P {...p} d={<><path d="M2 7h11v9H2z" /><path d="M13 10h4.5L21 13.5V16h-8" /><circle cx="6.5" cy="18" r="1.8" /><circle cx="16.5" cy="18" r="1.8" /></>} />
export const IconCalendar = p => <P {...p} d={<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>} />
export const IconWrench = p => <P {...p} d={<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" />} />
export const IconPin = p => <P {...p} d={<><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></>} />
export const IconPhone = p => <P {...p} d={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" />} />
export const IconMail = p => <P {...p} d={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>} />
export const IconClock = p => <P {...p} d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>} />
export const IconPlus = p => <P {...p} d={<><path d="M12 5v14M5 12h14" /></>} />
export const IconMenu = p => <P {...p} d={<><path d="M4 7h16M4 12h16M4 17h16" /></>} />
export const IconClose = p => <P {...p} d={<><path d="M18 6 6 18M6 6l12 12" /></>} />
export const IconWhatsApp = p => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.24-1.49.48-.77.48-1.43.34-1.57-.15-.14-.27-.22-.57-.37M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88m8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.41" />
  </svg>
)
