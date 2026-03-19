import { useEffect } from 'react'
import gsap from 'gsap'
import { useContact } from '../context/ContactContext'

export default function Hero() {
  const { open } = useContact()

  useEffect(() => {
    // Mouse parallax
    const onMove = (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      gsap.to('.sh1', { x: x * -18, y: y * -10, duration: 1.6, ease: 'power2.out' })
      gsap.to('.sh2', { x: x * -30, y: y * -18, duration: 1.6, ease: 'power2.out' })
      gsap.to('.sh3', { x: x * -12, y: y * -7, duration: 1.6, ease: 'power2.out' })
      gsap.to('.sc1', { x: x * 14, y: y * 9, duration: 2, ease: 'power2.out' })
      gsap.to('.sc2', { x: x * -22, y: y * -14, duration: 1.8, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hgrid" />
      <div className="hgrad" />
      <div className="hgrad2" />
      <div className="shapes">
        <div className="sh sh1" />
        <div className="sh sh2" />
        <div className="sh sh3" />
        <div className="sc sc1" />
        <div className="sc sc2" />
      </div>
      <div className="hero-content">
        <div className="htag" id="htag">Digital Strategy</div>
        <h1 className="hh">
          <div className="ln"><span>Estruturamos</span></div>
          <div className="ln"><span>e amplificamos</span></div>
          <div className="ln"><span>sua presença</span></div>
          <div className="ln"><span>digital.</span></div>
        </h1>
        <p className="hsub" id="hsub">
          Empresas que se destacam hoje possuem comunicação forte, presença digital consistente e processos organizados. A AKZA integra conteúdo, tecnologia e estratégia para acelerar seu crescimento.
        </p>
        <div className="hact" id="hact">
          <button className="btn" onClick={open}>
            <span>Agendar Diagnóstico Estratégico</span>
            <svg className="arr" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2.5 12.5L12.5 2.5M12.5 2.5H5.5M12.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="hscroll" id="hscroll">
        <div className="sline" />
        Scroll
      </div>
    </section>
  )
}
