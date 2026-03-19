import { useEffect } from 'react'
import { useContact } from '../context/ContactContext'

export default function Navbar() {
  const { open } = useContact()

  useEffect(() => {
    const nav = document.getElementById('nav')
    const onScroll = () => nav.classList.toggle('s', scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="nav" id="nav">
      <a href="#" className="nav-logo">
        <img src="/logo-dark.webp" alt="AKZA Digital Strategy" />
      </a>
      <ul className="nav-links">
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#servicos">Serviços</a></li>
        <li><a href="#processo">Processo</a></li>
        <li><a href="#portfolio">Portfólio</a></li>
        <li><button className="nav-cta" onClick={open} style={{background:'none',border:'none'}}>Agendar Diagnóstico</button></li>
      </ul>
    </nav>
  )
}
