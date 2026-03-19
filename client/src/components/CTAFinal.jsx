import { useContact } from '../context/ContactContext'

export default function CTAFinal() {
  const { open } = useContact()

  return (
    <section className="ctaf" id="contato">
      <div className="ctaf-in">
        <div className="stag c">Próximo passo</div>
        <h2>Estruture a presença digital<br />da sua empresa com a AKZA.</h2>
        <p>Agende um diagnóstico estratégico gratuito e descubra as oportunidades de crescimento digital da sua empresa.</p>
        <button className="btn-l" onClick={open}>
          <span>Agendar Diagnóstico Estratégico</span>
          <svg className="arr" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2.5 12.5L12.5 2.5M12.5 2.5H5.5M12.5 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
