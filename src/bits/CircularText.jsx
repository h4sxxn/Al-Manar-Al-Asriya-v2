// ─────────────────────────────────────────────────────────────────────────────
// CircularText — genuine React Bits component (reactbits.dev / DavidHDev/
// react-bits, src/content/TextAnimations/CircularText/CircularText.jsx):
// letters are laid out one-by-one around a circle and the ring rotates with
// framer-motion controls; hover modes (speedUp / slowDown / pause / goBonkers)
// follow the original. 'motion/react' mapped to framer-motion for this project.
// ─────────────────────────────────────────────────────────────────────────────
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const getRotationTransition = (duration, from) => ({
  duration,
  ease: 'linear',
  repeat: Infinity,
  repeatType: 'loop',
  from
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from)
});

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '', children }) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const glyphRefs = useRef([]);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const rotationRef = useRef(0);

  useEffect(() => {
    controls.start({
      rotate: [rotationRef.current, rotationRef.current + 360],
      transition: { duration: spinDuration, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinDuration, text]);

  const handleHoverStart = () => {
    if (!onHover || onHover === 'none') return;
    switch (onHover) {
      case 'slowDown':
        controls.start({
          rotate: [rotationRef.current, rotationRef.current + 360],
          transition: { duration: spinDuration * 2, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
        });
        break;
      case 'speedUp':
        controls.start({
          rotate: [rotationRef.current, rotationRef.current + 360],
          transition: { duration: spinDuration / 4, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
        });
        break;
      case 'pause':
        controls.stop();
        break;
      case 'goBonkers':
        setScale(0.8);
        controls.start({
          rotate: [rotationRef.current, rotationRef.current + 360],
          transition: { duration: spinDuration / 20, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
        });
        break;
      default:
        break;
    }
  };

  const handleHoverEnd = () => {
    if (!onHover || onHover === 'none') return;
    setScale(1);
    controls.start({
      rotate: [rotationRef.current, rotationRef.current + 360],
      transition: { duration: spinDuration, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
    });
  };

  return (
    <motion.div
      className={`circular-text ${className}`}
      animate={controls}
      onUpdate={latest => {
        if (typeof latest.rotate === 'number') rotationRef.current = latest.rotate % 360;
      }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      style={{ scale }}
      aria-label={text}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        return (
          <span
            key={i}
            ref={el => {
              glyphRefs.current[i] = el;
            }}
            className="circular-text__letter"
            style={{ transform: `translate(-50%, -50%) rotate(${rotationDeg}deg) translateY(var(--ct-radius, -58px))` }}
            aria-hidden="true"
          >
            {letter}
          </span>
        );
      })}
      {children != null && children !== false ? <div className="circular-text__center">{children}</div> : null}
    </motion.div>
  );
};

export { getRotationTransition, getTransition };
export default CircularText;
