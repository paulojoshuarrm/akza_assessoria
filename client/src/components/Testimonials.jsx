const testimonials = [
  { q:'Nossa presença digital mudou completamente depois da AKZA.', initials:'C', name:'Cliente AKZA', company:'Empresa Parceira' },
  { q:'Ter tudo centralizado em uma única equipe fez muita diferença.', initials:'E', name:'Empresário', company:'Empresa Parceira' },
  { q:'Hoje temos comunicação profissional e processos organizados.', initials:'D', name:'Diretor', company:'Empresa Parceira' },
]

export default function Testimonials() {
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
