import { useEffect } from 'react'
import gsap from 'gsap'

export default function Results() {
  useEffect(() => {
    const timelines = []

    document.querySelectorAll('.rnum').forEach(card => {
      const num = card.querySelector('.n')
      const tl = gsap.timeline({ paused: true })
        .to(card, { y: -6, scale: 1.02, borderColor: 'rgba(187,201,199,.4)', duration: .32, ease: 'power2.out' }, 0)
        .to(num,  { scale: num ? 1.08 : 1, duration: .32, ease: 'back.out(2)' }, 0)

      const enter = () => tl.play()
      const leave = () => tl.reverse()
      card.addEventListener('mouseenter', enter)
      card.addEventListener('mouseleave', leave)
      timelines.push({ tl, card, enter, leave })
    })

    return () => {
      timelines.forEach(({ tl, card, enter, leave }) => {
        tl.kill()
        card.removeEventListener('mouseenter', enter)
        card.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section className="res" id="resultados">
      <div className="mw res-in">
        <div>
          <div className="stag">Quando tudo trabalha junto</div>
          <h2 className="st">Resultados que aparecem quando tudo é integrado.</h2>
          <p className="sp">Quando comunicação, tecnologia e estratégia trabalham juntas, os resultados aparecem.</p>
          <ul className="rlist" id="rlist">
            {['Comunicação mais profissional','Mais visibilidade no mercado','Geração constante de oportunidades','Atendimento mais organizado','Decisões baseadas em dados'].map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rvis">
          <div className="rnum">
            <div className="n" data-target="100" data-suf="%">0</div>
            <div className="l">foco no crescimento do cliente</div>
          </div>
          <div className="rnum">
            <div className="n" data-target="4" data-suf=" pilares">0</div>
            <div className="l">integrados em uma única parceria</div>
          </div>
          <div className="rnum w">
            <div className="wt">Presença digital organizada e consistente.</div>
            <div className="ws">Comunicação · Tecnologia · Estratégia trabalhando juntas para o crescimento real da sua empresa.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
