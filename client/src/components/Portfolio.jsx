const items = [
  { label:'Produções Audiovisuais', bg:'linear-gradient(135deg,#BBC9C7,#DFEAE8)', dark:false },
  { label:'Conteúdos Estratégicos', bg:'linear-gradient(135deg,#0E191E,#BBC9C7)', dark:true },
  { label:'Projetos Digitais', bg:'linear-gradient(135deg,#DFEAE8,#BBC9C7)', dark:false },
  { label:'Trabalhos com Clientes', bg:'linear-gradient(135deg,#05090A,#0E191E)', dark:true },
]

export default function Portfolio() {
  return (
    <section className="sec port" id="portfolio">
      <div className="mw">
        <div className="port-hd">
          <div>
            <div className="stag">Portfólio</div>
            <h2 className="st">Projetos e produções realizadas.</h2>
          </div>
          <p className="sp" style={{ maxWidth: 260 }}>Conheça trabalhos desenvolvidos com nossos clientes.</p>
        </div>
        <div className="pgrid">
          {items.map((item, i) => (
            <div key={i} className="pi">
              <div className="pibg" style={{ background: item.bg }} />
              <div className="pph">
                <div className="pph-ic" style={item.dark ? { background: 'rgba(255,255,255,.2)' } : {}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke={item.dark ? 'rgba(255,255,255,.5)' : 'rgba(14,25,30,.4)'}
                    strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="3"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <span className="pph-tx" style={item.dark ? { color: 'rgba(255,255,255,.45)' } : {}}>{item.label}</span>
              </div>
              <div className="piov"><div className="pilb">{item.label}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
