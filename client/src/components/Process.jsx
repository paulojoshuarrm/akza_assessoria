import { useEffect, useState } from 'react'
import gsap from 'gsap'

const steps = [
  { n:'01', title:'Diagnóstico Estratégico', desc:'Análise completa da presença digital da empresa para identificar oportunidades e pontos de melhoria.' },
  { n:'02', title:'Planejamento', desc:'Definição das estratégias digitais alinhadas aos objetivos de crescimento da sua empresa.' },
  { n:'03', title:'Implementação', desc:'Produção de conteúdo, tecnologia e estrutura digital com execução profissional e estratégica.' },
  { n:'04', title:'Acompanhamento', desc:'Monitoramento de resultados e melhoria contínua para garantir crescimento consistente.' }
]

export default function Process() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    // Scroll reveal animations
    document.querySelectorAll('.pstep').forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out' }
      )
    })
  }, [])

  useEffect(() => {
    // Animate active step
    const activeStep = document.querySelector(`.pstep[data-step="${active}"]`)
    if (!activeStep) return

    const circle = activeStep.querySelector('.pcirc')
    const line = activeStep.querySelector('.pline')
    const content = activeStep.querySelector('.pcontent')

    gsap.to(circle, { scale: 1.15, duration: 0.4, ease: 'back.out(2)' })
    gsap.to(line, { scaleY: 1, opacity: 1, duration: 0.5, ease: 'power2.out' })
    gsap.to(content, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })

    // Reset other steps
    document.querySelectorAll('.pstep').forEach((step, i) => {
      if (i !== active) {
        gsap.to(step.querySelector('.pcirc'), { scale: 1, duration: 0.3 })
        gsap.to(step.querySelector('.pline'), { scaleY: 0, opacity: 0.3, duration: 0.3 })
        gsap.to(step.querySelector('.pcontent'), { opacity: 0.6, y: 8, duration: 0.3 })
      }
    })
  }, [active])

  return (
    <section className="proc" id="processo">
      <div className="mw">
        <div className="proc-hd">
          <div className="stag c">Como funciona</div>
          <h2 className="st" style={{ textAlign: 'center' }}>Trabalhar com a AKZA é simples.</h2>
          <p className="sp" style={{ margin: '0 auto', textAlign: 'center' }}>Um processo claro e estruturado para transformar a presença digital da sua empresa.</p>
        </div>

        <div className="psteps-new">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="pstep"
              data-step={i}
              onMouseEnter={() => setActive(i)}
            >
              <div className="pstep-inner">
                <div className="pcirc">{s.n}</div>
                <div className="pline" />
              </div>
              <div className="pcontent" style={{ opacity: i === 0 ? 1 : 0.6, y: i === 0 ? 0 : 8 }}>
                <h3 className="ptt">{s.title}</h3>
                <p className="pds">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
