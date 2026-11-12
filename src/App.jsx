import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { LangProvider, useLang } from './i18n';
import { scrollState, scrollToTarget } from './fx/scroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fleet from './components/Fleet';
import { Why, Process, About, Faq } from './components/Sections';
import Quote, { Footer, FloatWhatsApp } from './components/Quote';

gsap.registerPlugin(ScrollTrigger);

function Shell() {
  const { lang } = useLang();
  const [machine, setMachine] = useState('');

  // Lenis smooth scrolling, driven by GSAP's ticker and synced to ScrollTrigger.
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    scrollState.lenis = lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);
    const raf = time => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      scrollState.lenis = null;
    };
  }, []);

  // After a language switch the layout changes (RTL/lengths) — recalc pins.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [lang]);

  const handleQuote = useCallback(id => {
    setMachine(id);
    scrollToTarget('#quote');
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Fleet onQuote={handleQuote} />
        <Why />
        <Process />
        <About />
        <Faq />
        <Quote machine={machine} setMachine={setMachine} />
      </main>
      <Footer />
      <FloatWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  );
}
