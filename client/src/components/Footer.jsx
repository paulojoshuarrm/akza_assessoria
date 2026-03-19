import { useContact } from '../context/ContactContext'

export default function Footer() {
  const { open } = useContact()
  return (
    <footer>
      <div className="flogo">
        <img src="/logo-white.webp" alt="AKZA" />
        <div className="ftag">Comunicação · Tecnologia · Estratégia</div>
      </div>
      <div className="flinks">
        <a href="#sobre">Sobre</a>
        <a href="#servicos">Serviços</a>
        <a href="#processo">Processo</a>
        <a href="#portfolio">Portfólio</a>
        <button onClick={open} style={{background:'none',border:'none',color:'rgba(255,255,255,.45)',fontSize:13,cursor:'none',fontFamily:'Inter,sans-serif',transition:'color .3s',padding:0}}
          onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.45)'}>
          Contato
        </button>
      </div>
      <div className="fcopy">© 2026 AKZA. Todos os direitos reservados.</div>
    </footer>
  )
}
