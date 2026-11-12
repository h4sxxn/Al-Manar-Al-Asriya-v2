// ─────────────────────────────────────────────────────────────────────────────
// CountUp — genuine React Bits component (reactbits.dev / DavidHDev/react-bits,
// src/content/TextAnimations/CountUp/CountUp.jsx). The 'count' mode machinery
// (motion animate() driver, easing set incl. the overshoot spring, grouping /
// compact formatting, in-view trigger) is copied faithfully; the experimental
// digit-'roll' render mode is not used by this project and was left out.
// 'motion/react' imports mapped to this project's framer-motion package.
// ─────────────────────────────────────────────────────────────────────────────
import { animate, cubicBezier, useInView } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const UNITS = [
  [1e12, 'T'],
  [1e9, 'B'],
  [1e6, 'M'],
  [1e3, 'K']
];

const SR_ONLY = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0
};

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const clamp01 = value => Math.min(1, Math.max(0, value));

const makeSpring = overshoot => {
  const log = Math.log(Math.min(0.5, Math.max(0.001, overshoot)));
  const zeta = -log / Math.sqrt(Math.PI * Math.PI + log * log);
  const damped = Math.PI / 0.52;
  const natural = damped / Math.sqrt(1 - zeta * zeta);
  const raw = t =>
    1 - Math.exp(-zeta * natural * t) * (Math.cos(damped * t) + ((zeta * natural) / damped) * Math.sin(damped * t));
  const residual = 1 - raw(1);
  return t => (t >= 1 ? 1 : raw(t) + residual * t * t * t);
};

const EASINGS = {
  linear: t => t,
  easeOut: cubicBezier(0.33, 1, 0.68, 1),
  expo: t => (t >= 1 ? 1 : (1 - Math.pow(2, -10 * t)) / (1 - Math.pow(2, -10))),
  spring: makeSpring(0.06)
};

const getDecimalPlaces = num => {
  const str = num.toString();
  if (str.includes('.')) {
    const decimals = str.split('.')[1];
    if (parseInt(decimals) !== 0) {
      return decimals.length;
    }
  }
  return 0;
};

const unitFor = value => UNITS.find(([size]) => Math.abs(value) >= size * 0.9995) || [1, ''];

const scaleFor = (value, compact, decimals, places) => {
  if (!compact) return { size: 1, label: '', digits: places };
  const [size, label] = unitFor(value);
  const digits = decimals ?? (label ? (Math.abs(value) / size < 100 ? 1 : 0) : places);
  return { size, label, digits };
};

const splitNumber = (value, digits, size) => {
  const fixed = (Math.abs(value) / size).toFixed(digits);
  const [int, frac = ''] = fixed.split('.');
  return { negative: value < 0 && Number(fixed) !== 0, int, frac };
};

const group = (int, separator) => (separator ? int.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : int);

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  style,
  startWhen = true,
  separator = '',
  prefix = '',
  suffix = '',
  easing = 'easeOut',
  decimals,
  format = 'standard',
  trigger = 'view',
  onStart,
  onEnd
}) {
  const ref = useRef(null);
  const textRef = useRef(null);
  const valueRef = useRef(direction === 'down' ? to : from);
  const startedRef = useRef(false);
  const runningRef = useRef(false);
  const [play, setPlay] = useState(null);

  const startValue = direction === 'down' ? to : from;
  const endValue = direction === 'down' ? from : to;

  const isInView = useInView(ref, { once: true, margin: '0px' });
  const active = trigger === 'load' || isInView;
  const compact = format === 'compact';
  const places = decimals ?? Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    latest => {
      const { size, label, digits } = scaleFor(latest, compact, decimals, places);
      const parts = splitNumber(latest, digits, size);
      const body = `${parts.negative ? '-' : ''}${group(parts.int, separator)}${parts.frac ? `.${parts.frac}` : ''}`;
      return `${prefix}${body}${label}${suffix}`;
    },
    [compact, decimals, places, separator, prefix, suffix]
  );

  const [initialText] = useState(() => formatValue(startValue));
  const latestRef = useRef(null);

  useIsoLayoutEffect(() => {
    latestRef.current = { formatValue, onStart, onEnd, easing, duration: Math.max(0, duration), delay };
  });

  useIsoLayoutEffect(() => {
    if (!startedRef.current) valueRef.current = startValue;
    if (!runningRef.current && textRef.current) {
      textRef.current.textContent = formatValue(valueRef.current);
    }
  }, [startValue, formatValue]);

  useEffect(() => {
    if (!active || !startWhen) return;
    startedRef.current = true;
    setPlay(previous => ({
      id: (previous?.id || 0) + 1,
      from: valueRef.current,
      to: endValue,
      wait: true
    }));
  }, [active, startWhen, endValue]);

  useEffect(() => {
    if (!play) return undefined;
    const live = latestRef.current;
    const ease = EASINGS[live.easing] || EASINGS.easeOut;
    const total = live.duration;
    const progress = t => (total > 0 ? clamp01(t / total) : 1);

    const render = t => {
      const value = play.from + (play.to - play.from) * ease(progress(t));
      valueRef.current = value;
      if (textRef.current) textRef.current.textContent = latestRef.current.formatValue(value);
    };

    runningRef.current = true;
    if (typeof live.onStart === 'function') live.onStart();

    const finish = () => {
      render(Infinity);
      valueRef.current = play.to;
      runningRef.current = false;
      if (typeof latestRef.current.onEnd === 'function') latestRef.current.onEnd();
    };

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return undefined;
    }

    const controls = animate(0, total, {
      duration: total,
      delay: play.wait ? live.delay : 0,
      ease: 'linear',
      onUpdate: render,
      onComplete: finish
    });

    return () => {
      controls.stop();
      runningRef.current = false;
    };
  }, [play]);

  const finalText = formatValue(play ? play.to : endValue);

  return (
    <span ref={ref} className={className} style={style}>
      <span style={SR_ONLY}>{finalText}</span>
      <span ref={textRef} aria-hidden="true">
        {initialText}
      </span>
    </span>
  );
}
