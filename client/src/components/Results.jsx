export default function Results() {
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
