import { useEffect } from 'react'
import gsap from 'gsap'

const steps = [
  { n:'01', title:'Diagnóstico Estratégico', desc:'Análise completa da presença digital da empresa para identificar oportunidades e pontos de melhoria.' },
  { n:'02', title:'Planejamento', desc:'Definição das estratégias digitais alinhadas aos objetivos de crescimento da sua empresa.' },
  { n:'03', title:'Implementação', desc:'Produção de conteúdo, tecnologia e estrutura digital com execução profissional e estratégica.' },
  { n:'04', title:'Acompanhamento', desc:'Monitoramento de resultados e melhoria contínua para garantir crescimento consistente.' }
]

export default function Process() {
  useEffect(() => {
    const timelines = []

    document.querySelectorAll('.pstep').forEach(step => {
      const circ = step.querySelector('.pcirc')
      const title = step.querySelector('.ptt')
      const desc = step.querySelector('.pds')
      const tl = gsap.timeline({ paused: true })
        .to(circ,  { scale: 1.12, background: '#0E191E', color: '#fff', borderColor: '#0E191E', duration: .32, ease: 'back.out(2)' }, 0)
        .to(title, { y: -3, color: '#0E191E', duration: .28, ease: 'power2.out' }, 0)
        .to(desc,  { opacity: 1, duration: .28, ease: 'power2.out' }, 0)

      const enter = () => tl.play()
      const leave = () => tl.reverse()
      step.addEventListener('mouseenter', enter)
      step.addEventListener('mouseleave', leave)
      timelines.push({ tl, step, enter, leave })
    })

    return () => {
      timelines.forEach(({ tl, step, enter, leave }) => {
        tl.kill()
        step.removeEventListener('mouseenter', enter)
        step.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section className="proc" id="processo">
      <div className="mw">
        <div className="proc-hd">
          <div className="stag c">Como funciona</div>
          <h2 className="st" style={{ textAlign: 'center' }}>Trabalhar com a AKZA é simples.</h2>
          <p className="sp" style={{ margin: '0 auto', textAlign: 'center' }}>Um processo claro e estruturado para transformar a presença digital da sua empresa.</p>
        </div>
        <div className="psteps">
          {steps.map(s => (
            <div key={s.n} className="pstep">
              <div className="pcirc">{s.n}</div>
              <h3 className="ptt">{s.title}</h3>
              <p className="pds">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
