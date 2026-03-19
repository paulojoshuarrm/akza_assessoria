import { useState } from 'react'

const faqs = [
  {
    q: 'A AKZA é uma agência de marketing?',
    a: 'A AKZA vai além de uma agência tradicional. Integramos comunicação, tecnologia e gestão em uma única parceria estratégica, diferenciando-nos de agências que executam apenas serviços isolados.'
  },
  {
    q: 'A AKZA cuida apenas das redes sociais?',
    a: 'Não. Podemos estruturar toda a presença digital da empresa — desde criação de sites e sistemas, produção de conteúdo, gestão de redes sociais, até estratégia digital completa com tráfego pago e análise de dados.'
  },
  {
    q: 'Como começar a trabalhar com a AKZA?',
    a: 'Agende um diagnóstico estratégico. Vamos analisar sua presença digital atual, identificar oportunidades de melhoria e apresentar as melhores estratégias para o crescimento da sua empresa.'
  }
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section className="sec faq">
      <div className="faq-in">
        <div className="faq-hd">
          <div className="stag c">Perguntas Frequentes</div>
          <h2 className="st" style={{ textAlign: 'center' }}>Dúvidas comuns.</h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} className="fi">
            <button className={`fq${open === i ? ' a' : ''}`} onClick={() => toggle(i)}>
              <span>{f.q}</span>
              <div className="fic">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </button>
            <div className={`fa${open === i ? ' o' : ''}`}>
              <div className="fa-in">{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
