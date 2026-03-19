import { useEffect } from 'react'
import gsap from 'gsap'

export default function About() {
  useEffect(() => {
    const timelines = []

    document.querySelectorAll('.astat').forEach(stat => {
      const num = stat.querySelector('.asn')
      const tl = gsap.timeline({ paused: true })
        .to(stat, { y: -6, boxShadow: '0 16px 48px rgba(14,25,30,.1)', duration: .32, ease: 'power2.out' }, 0)
        .to(num,  { scale: 1.06, color: '#0E191E', duration: .32, ease: 'back.out(2)' }, 0)

      const enter = () => tl.play()
      const leave = () => tl.reverse()
      stat.addEventListener('mouseenter', enter)
      stat.addEventListener('mouseleave', leave)
      timelines.push({ tl, stat, enter, leave })
    })

    return () => {
      timelines.forEach(({ tl, stat, enter, leave }) => {
        tl.kill()
        stat.removeEventListener('mouseenter', enter)
        stat.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section className="sec about" id="sobre">
      <div className="mw about-in">
        <div>
          <div className="stag">Sobre a AKZA</div>
          <h2 className="st">Mais do que uma agência. Uma parceira estratégica.</h2>
          <p>A AKZA atua como parceira estratégica para empresas que desejam fortalecer sua presença digital e crescer com mais organização.</p>
          <p>Integramos comunicação, tecnologia e gestão para que empresas tenham uma presença digital sólida, processos mais estruturados e decisões mais seguras.</p>
          <p>Mais do que executar serviços, ajudamos empresas a organizar sua presença digital e transformar comunicação em crescimento real.</p>
        </div>
        <div className="av">
          <div className="astat">
            <div className="asn">360°</div>
            <div className="asl">Visão digital integrada da sua empresa</div>
          </div>
          <div className="astat">
            <div className="asn">4</div>
            <div className="asl">Pilares integrados em uma única parceria</div>
          </div>
          <div className="astat w">
            <div className="asn">Comunicação · Tecnologia · Estratégia</div>
            <div className="asl">Os três pilares de uma presença digital consistente e crescimento real</div>
          </div>
        </div>
      </div>
    </section>
  )
}
