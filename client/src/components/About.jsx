import { useEffect } from 'react'
import gsap from 'gsap'

export default function About() {
  useEffect(() => {
    // Hover animations on stats
    document.querySelectorAll('.astat').forEach(stat => {
      const bg = stat.querySelector('.astat-bg')
      const num = stat.querySelector('.asn')
      const icon = stat.querySelector('.astat-icon')

      const enter = () => {
        gsap.to(bg, { scaleY: 1, duration: 0.4, ease: 'power2.out' })
        gsap.to(num, { y: -6, scale: 1.08, duration: 0.3, ease: 'back.out(2)' })
        gsap.to(icon, { rotate: 360, scale: 1.1, duration: 0.5, ease: 'back.out(2)' })
      }
      const leave = () => {
        gsap.to(bg, { scaleY: 0, duration: 0.3 })
        gsap.to(num, { y: 0, scale: 1, duration: 0.3 })
        gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4 })
      }

      stat.addEventListener('mouseenter', enter)
      stat.addEventListener('mouseleave', leave)
    })
  }, [])

  return (
    <section className="sec about" id="sobre">
      <div className="mw about-in">
        <div className="about-text">
          <div className="stag">Sobre a AKZA</div>
          <h2 className="st">Mais do que uma agência.<br />Uma parceira estratégica.</h2>
          <p>A AKZA atua como parceira estratégica para empresas que desejam fortalecer sua presença digital e crescer com mais organização.</p>
          <p>Integramos comunicação, tecnologia e gestão para que empresas tenham uma presença digital sólida, processos mais estruturados e decisões mais seguras.</p>
          <p>Mais do que executar serviços, ajudamos empresas a organizar sua presença digital e transformar comunicação em crescimento real.</p>
        </div>

        <div className="av">
          <div className="astat">
            <div className="astat-bg" />
            <div className="astat-icon">◉</div>
            <div className="asn">360°</div>
            <div className="asl">Visão digital<br />integrada</div>
          </div>
          <div className="astat">
            <div className="astat-bg" />
            <div className="astat-icon">★</div>
            <div className="asn">4</div>
            <div className="asl">Pilares<br />integrados</div>
          </div>
          <div className="astat w">
            <div className="astat-bg" />
            <div className="astat-icon">⚡</div>
            <div className="asn">Comunicação · Tecnologia · Estratégia</div>
            <div className="asl">Os três pilares de uma presença digital consistente e crescimento real</div>
          </div>
        </div>
      </div>
    </section>
  )
}
