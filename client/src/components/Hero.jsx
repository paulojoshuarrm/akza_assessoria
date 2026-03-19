import { useEffect } from 'react'
import gsap from 'gsap'
import { useContact } from '../context/ContactContext'

export default function Hero() {
  const { open } = useContact()

  useEffect(() => {
    // Float animations
    gsap.to('.hring-visual', { y: -14, duration: 4.0, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.2 })
    gsap.to('.hcard-main',   { y: -8,  duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true })
    gsap.to('.hcard-dark',   { y: -10, duration: 3.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 })
    gsap.to('.hpill1',       { y: -8,  duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.4 })
    gsap.to('.hpill2',       { y: -8,  duration: 3.0, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.8 })

    // Parallax on wrapper divs
    const onMove = (e) => {
      const x = (e.clientX / innerWidth  - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      gsap.to('.hpx-ring',    { x: x * 7,   y: y * 5,   duration: 2.5, ease: 'power2.out' })
      gsap.to('.hpx-main',    { x: x * 14,  y: y * 9,   duration: 1.8, ease: 'power2.out' })
      gsap.to('.hpx-dark',    { x: x * -10, y: y * -7,  duration: 2.2, ease: 'power2.out' })
      gsap.to('.hpx-p1',      { x: x * -16, y: y * -11, duration: 1.5, ease: 'power2.out' })
      gsap.to('.hpx-p2',      { x: x * 12,  y: y * 9,   duration: 2.0, ease: 'power2.out' })
      gsap.to('.hright-glow', { x: x * 6,   y: y * 5,   duration: 3.0, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero" id="hero">
      {/* LEFT side */}
      <div className="hero-left">
        <div className="hgrid-left" />

        <div className="hero-text">
          <div className="htag" id="htag">
            <span className="htag-dot" />
            Digital Strategy
          </div>

          <h1 className="hh">
            <div className="ln"><span>Estruturamos</span></div>
            <div className="ln"><span>e amplificamos</span></div>
            <div className="ln"><span>sua presença</span></div>
            <div className="ln"><span className="hh-accent">digital.</span></div>
          </h1>

          <p className="hsub" id="hsub">
            Empresas que se destacam possuem comunicação forte, presença digital consistente e processos organizados. A AKZA integra conteúdo, tecnologia e estratégia para acelerar seu crescimento.
          </p>

          <div className="hact" id="hact">
            <button className="btn" onClick={open}>
              <span>Agendar Diagnóstico</span>
              <svg className="arr" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Diagnóstico gratuito
            </div>
          </div>

          <div className="hclients" id="hclients">
            <div className="hclients-avatars">
              {['C','E','D','M'].map((l,i) => (
                <div key={i} className="hav" style={{background: i%2===0?'#BBC9C7':'#0E191E', color: i%2===0?'#0E191E':'#fff'}}>{l}</div>
              ))}
            </div>
            <span className="hclients-text">Empresas atendidas com excelência</span>
          </div>
        </div>

        <div className="hscroll" id="hscroll">
          <div className="sline" />
          Scroll
        </div>
      </div>

      {/* RIGHT side — colored panel */}
      <div className="hero-right">
        <div className="hright-glow" />
        <div className="hright-grid" />

        {/* Abstract ring visual */}
        <div className="hpx hpx-ring">
          <div className="hring-visual">
            <div className="hr hr1" />
            <div className="hr hr2" />
            <div className="hr hr3" />
            <div className="hr-dots">
              <div className="hr-dot hrd1" />
              <div className="hr-dot hrd2" />
              <div className="hr-dot hrd3" />
            </div>
            <div className="hr-center">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M5 13h16M13 5l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* White service card */}
        <div className="hpx hpx-main">
          <div className="hcard hcard-main">
            <div className="hcard-head">
              <div className="hcard-head-dot active" />
              <span className="hcard-head-label">Presença Digital</span>
              <div className="hcard-head-badge">Ativo</div>
            </div>
            <div className="hcsvc-grid">
              {['Comunicação', 'Tecnologia', 'Estratégia', 'Redes Sociais'].map(s => (
                <div key={s} className="hcsvc">
                  <div className="hcsvc-dot" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="hcard-footer">
              <span className="pulse-dot" />
              <span className="hcard-footer-txt">Gestão ativa</span>
            </div>
          </div>
        </div>

        {/* Dark accent card */}
        <div className="hpx hpx-dark">
          <div className="hcard hcard-dark">
            <div className="hcard-dark-tag">Gestão Estratégica</div>
            <div className="hcard-dark-title">Diagnóstico<br/>Completo</div>
            <div className="hcard-dark-chips">
              <span>Tráfego Pago</span>
              <span>Analytics</span>
              <span>SEO</span>
            </div>
            <div className="hcard-dark-status">
              <span className="pulse-dot" />
              Em execução
            </div>
          </div>
        </div>

        {/* Floating pills */}
        <div className="hpx hpx-p1">
          <div className="hpill hpill1">
            <span className="hpill-ico">✦</span>
            4 pilares integrados
          </div>
        </div>
        <div className="hpx hpx-p2">
          <div className="hpill hpill2">
            <span className="hpill-ico">↑</span>
            Diagnóstico gratuito
          </div>
        </div>
      </div>
    </section>
  )
}
