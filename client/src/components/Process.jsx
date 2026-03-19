const steps = [
  { n:'01', title:'Diagnóstico Estratégico', desc:'Análise completa da presença digital da empresa para identificar oportunidades e pontos de melhoria.' },
  { n:'02', title:'Planejamento', desc:'Definição das estratégias digitais alinhadas aos objetivos de crescimento da sua empresa.' },
  { n:'03', title:'Implementação', desc:'Produção de conteúdo, tecnologia e estrutura digital com execução profissional e estratégica.' },
  { n:'04', title:'Acompanhamento', desc:'Monitoramento de resultados e melhoria contínua para garantir crescimento consistente.' }
]

export default function Process() {
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
