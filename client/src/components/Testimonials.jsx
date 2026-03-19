import { useEffect } from 'react'
import gsap from 'gsap'

const testimonials = [
  { q:'Nossa presença digital mudou completamente depois da AKZA.', initials:'C', name:'Cliente AKZA', company:'Empresa Parceira' },
  { q:'Ter tudo centralizado em uma única equipe fez muita diferença.', initials:'E', name:'Empresário', company:'Empresa Parceira' },
  { q:'Hoje temos comunicação profissional e processos organizados.', initials:'D', name:'Diretor', company:'Empresa Parceira' },
]

export default function Testimonials() {
  useEffect(() => {
    const timelines = []

    document.querySelectorAll('.tc').forEach(card => {
      const quote = card.querySelector('.tq')
      const avatar = card.querySelector('.tav')
      const tl = gsap.timeline({ paused: true })
        .to(card,   { y: -8, boxShadow: '0 20px 56px rgba(14,25,30,.1)', duration: .35, ease: 'power2.out' }, 0)
        .to(quote,  { scale: 1.12, color: '#BBC9C7', duration: .35, ease: 'back.out(2)' }, 0)
        .to(avatar, { scale: 1.12, background: '#0E191E', color: '#fff', duration: .3, ease: 'power2.out' }, 0)

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
    <section className="sec tst" id="depoimentos">
      <div className="mw">
        <div className="tst-hd">
          <div className="stag c">Depoimentos</div>
          <h2 className="st" style={{ textAlign: 'center' }}>O que dizem nossos clientes.</h2>
        </div>
        <div className="tgrid">
          {testimonials.map((t, i) => (
            <div key={i} className="tc">
              <div className="tq">"</div>
              <p className="tt">{t.q}</p>
              <div className="tau">
                <div className="tav">{t.initials}</div>
                <div className="tan">
                  <div className="nm">{t.name}</div>
                  <div className="co">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
