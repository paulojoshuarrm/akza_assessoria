const items = ['Comunicação','Tecnologia','Estratégia','Conteúdo','Redes Sociais','Sites e Sistemas','Tráfego Pago','Inteligência Artificial']
const doubled = [...items, ...items]

export default function MarqueeBand() {
  return (
    <div className="mq">
      <div className="mqt">
        {doubled.map((item, i) => (
          <span key={i} className="mqi">{item} <span className="dot">●</span></span>
        ))}
      </div>
    </div>
  )
}
