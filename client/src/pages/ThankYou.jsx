import { Link } from 'react-router-dom'

export default function ThankYou() {
  return (
    <div className="ty-page">
      <div className="ty-icon">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h1>Recebemos seu contato!</h1>
      <p>Obrigado por entrar em contato com a AKZA. Nossa equipe analisará sua solicitação e retornará em breve.</p>
      <Link to="/" className="ty-back">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M12.5 7.5H2.5M2.5 7.5L7 3M2.5 7.5L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Voltar ao início
      </Link>
    </div>
  )
}
