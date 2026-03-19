import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MarqueeBand from '../components/MarqueeBand'
import About from '../components/About'
import Services from '../components/Services'
import Results from '../components/Results'
import Process from '../components/Process'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTAFinal from '../components/CTAFinal'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

function initScrollAnimations() {
  // Hero
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .to('#htag', { opacity: 1, y: 0, duration: .8, delay: .1 })
    .to('.hh .ln span', { y: '0%', duration: 1, stagger: .1 }, '-=.5')
    .to('#hsub', { opacity: 1, y: 0, duration: .8 }, '-=.5')
    .to('#hact', { opacity: 1, y: 0, duration: .8 }, '-=.5')
    .to('#hscroll', { opacity: 1, duration: .6 }, '-=.3')

  // Parallax
  gsap.to('.hgrad', { y: '25%', ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })

  // About stats
  gsap.utils.toArray('.astat').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: .7, delay: i * .12, ease: 'power3.out', scrollTrigger: { trigger: '.av', start: 'top 85%' } })
  })

  // Section titles
  document.querySelectorAll('h2.st').forEach(el => {
    gsap.from(el, { opacity: 0, y: 36, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
  })

  // Service cards
  gsap.utils.toArray('.scard').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: .8, delay: (i % 2) * .12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%' } })
  })

  // Results list
  gsap.utils.toArray('#rlist li').forEach((el, i) => {
    gsap.to(el, { opacity: 1, x: 0, duration: .6, delay: i * .09, ease: 'power3.out', scrollTrigger: { trigger: '#rlist', start: 'top 82%' } })
  })

  // Result numbers (counters)
  gsap.utils.toArray('.rnum').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: .7, delay: i * .1, ease: 'power3.out',
      scrollTrigger: {
        trigger: el, start: 'top 85%',
        onEnter: () => {
          const n = el.querySelector('[data-target]')
          if (!n) return
          const target = +n.dataset.target, suf = n.dataset.suf || ''
          let v = 0; const step = target / 55
          const t = setInterval(() => { v = Math.min(v + step, target); n.textContent = Math.round(v) + suf; if (v >= target) clearInterval(t) }, 16)
        }
      }
    })
  })

  // Process steps
  gsap.utils.toArray('.pstep').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: .7, delay: i * .13, ease: 'power3.out', scrollTrigger: { trigger: '.psteps', start: 'top 82%' } })
  })

  // Portfolio items
  gsap.utils.toArray('.pi').forEach((el, i) => {
    gsap.to(el, { opacity: 1, scale: 1, duration: .8, delay: i * .08, ease: 'power3.out', scrollTrigger: { trigger: '.pgrid', start: 'top 82%' } })
  })

  // Testimonials
  gsap.utils.toArray('.tc').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: .8, delay: i * .13, ease: 'power3.out', scrollTrigger: { trigger: '.tgrid', start: 'top 82%' } })
  })

  // CTA
  gsap.from('.ctaf-in', { opacity: 0, y: 50, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.ctaf', start: 'top 78%' } })

  // Tags
  document.querySelectorAll('.stag').forEach(el => {
    gsap.from(el, { opacity: 0, x: -12, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
  })
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) {
      initScrollAnimations()
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [loaded])

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Navbar />
      <Hero />
      <MarqueeBand />
      <About />
      <Services />
      <Results />
      <Process />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTAFinal />
      <Footer />
    </>
  )
}
