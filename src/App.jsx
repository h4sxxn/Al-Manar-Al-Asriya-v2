import { useState, useCallback } from 'react'
import { LangProvider } from './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Fleet from './components/Fleet'
import { Marquee, Why, Process, About, Faq } from './components/Sections'
import Quote, { Footer, FloatWhatsApp } from './components/Quote'

export default function App() {
  const [machine, setMachine] = useState('')

  const handleQuote = useCallback(id => {
    setMachine(id)
    requestAnimationFrame(() => {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Fleet onQuote={handleQuote} />
        <Why />
        <Process />
        <About />
        <Faq />
        <Quote machine={machine} setMachine={setMachine} />
      </main>
      <Footer />
      <FloatWhatsApp />
    </LangProvider>
  )
}
