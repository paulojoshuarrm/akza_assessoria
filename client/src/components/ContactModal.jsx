import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContact } from '../context/ContactContext'

const initialForm = { name: '', email: '', whatsapp: '', message: '' }

function formatWhatsApp(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`
  return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
}

export default function ContactModal() {
  const { isOpen, close } = useContact()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  // Prevent scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) { setForm(initialForm); setErrors({}) }
  }, [isOpen])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nome é obrigatório'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g,'').length < 10) e.whatsapp = 'WhatsApp inválido'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'whatsapp' ? formatWhatsApp(value) : value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, whatsapp: form.whatsapp, message: form.message })
      })
      if (!res.ok) throw new Error('Erro ao salvar')
      close()
      navigate('/obrigado')
    } catch {
      setErrors({ submit: 'Ocorreu um erro. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`modal-overlay${isOpen ? ' open' : ''}`} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Formulário de contato">
        <button className="modal-close" onClick={close} aria-label="Fechar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <h3>Agendar Diagnóstico</h3>
        <p className="sub">Preencha seus dados e entraremos em contato em breve.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Nome *</label>
            <input
              id="name" name="name" type="text"
              className={`form-input${errors.name ? ' err' : ''}`}
              placeholder="Seu nome completo"
              value={form.name} onChange={handleChange}
            />
            {errors.name && <div className="form-err">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">E-mail *</label>
            <input
              id="email" name="email" type="email"
              className={`form-input${errors.email ? ' err' : ''}`}
              placeholder="seu@email.com"
              value={form.email} onChange={handleChange}
            />
            {errors.email && <div className="form-err">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="whatsapp">WhatsApp *</label>
            <input
              id="whatsapp" name="whatsapp" type="tel"
              className={`form-input${errors.whatsapp ? ' err' : ''}`}
              placeholder="(00) 00000-0000"
              value={form.whatsapp} onChange={handleChange}
            />
            {errors.whatsapp && <div className="form-err">{errors.whatsapp}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="message">Mensagem <span style={{fontWeight:400,opacity:.6}}>(opcional)</span></label>
            <textarea
              id="message" name="message"
              className="form-textarea"
              placeholder="Conte um pouco sobre sua empresa e seus objetivos..."
              value={form.message} onChange={handleChange}
            />
          </div>

          {errors.submit && <div className="form-err" style={{marginBottom:12}}>{errors.submit}</div>}

          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}
