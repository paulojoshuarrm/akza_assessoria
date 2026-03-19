import { useContact } from '../context/ContactContext'

const services = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
    ),
    title: 'Comunicação e Produção de Conteúdo',
    desc: 'Criamos conteúdos que posicionam a empresa com profissionalismo e autoridade no mercado.',
    items: ['Captação de fotos e vídeos','Produção audiovisual profissional','Edição de fotos e vídeos','Conteúdo estratégico para redes sociais']
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"/></svg>
    ),
    title: 'Gestão de Redes Sociais',
    desc: 'Transformamos redes sociais em um canal consistente de posicionamento e relacionamento com o mercado.',
    items: ['Planejamento de conteúdo','Copy estratégica','Design e criação de posts','Gestão completa das redes sociais']
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    ),
    title: 'Estrutura Digital e Tecnologia',
    desc: 'Organizamos toda a base tecnológica necessária para sustentar a presença digital da empresa.',
    items: ['Criação de sites institucionais','Desenvolvimento de sistemas e softwares','Implementação de agentes de IA','Estrutura digital para geração de leads']
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    title: 'Gestão Estratégica',
    desc: 'Acompanhamos o crescimento digital da empresa com visão estratégica e análise de dados.',
    items: ['Organização do processo comercial','Gestão de campanhas e tráfego pago','Análise de indicadores de marketing','Melhoria contínua da presença digital']
  }
]

export default function Services() {
  return (
    <section className="sec" id="servicos">
      <div className="mw">
        <div className="svc-hd">
          <div>
            <div className="stag">O que fazemos</div>
            <h2 className="st">Estruturamos toda<br />a sua presença digital.</h2>
          </div>
          <p className="sp" style={{ maxWidth: 300 }}>Integrando conteúdo, tecnologia e estratégia em um único parceiro.</p>
        </div>
        <div className="sgrid">
          {services.map(s => (
            <div key={s.num} className="scard">
              <span className="snum">{s.num}</span>
              <div className="sico">{s.icon}</div>
              <h3 className="stt">{s.title}</h3>
              <p className="sds">{s.desc}</p>
              <ul className="slist">
                {s.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
