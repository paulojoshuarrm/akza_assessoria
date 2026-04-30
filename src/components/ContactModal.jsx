import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_AKZA = "5511832275588";
const EMAIL_AKZA = "agenciaakaza@gmail.com";

/* ─── Context ──────────────────────────────────────────────────── */

const ContactModalContext = createContext({ open: false, setOpen: () => {} });
export const useContactModal = () => useContext(ContactModalContext);

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  // Intercept any anchor click whose href targets the contact section.
  // Captures BEFORE the anchor's onClick (capture phase) so other handlers
  // like Nav's smooth-scroll never fire for these links.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href === "#contato" || href === "/#contato") {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // ESC to close + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <ContactModalContext.Provider value={{ open, setOpen }}>
      {children}
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </ContactModalContext.Provider>
  );
}

/* ─── Helpers ──────────────────────────────────────────────────── */

function formatPhone(v) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─── Modal ────────────────────────────────────────────────────── */

function Field({ id, type = "text", label, value, onChange, autoComplete, required = true }) {
  return (
    <div className="cm-field">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        placeholder=" "
        spellCheck={false}
      />
      <label htmlFor={id}>{label}</label>
      <span aria-hidden="true" className="cm-field-ring" />
    </div>
  );
}

function Textarea({ id, label, value, onChange }) {
  return (
    <div className="cm-field cm-field-area">
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        rows={3}
      />
      <label htmlFor={id}>{label}</label>
      <span aria-hidden="true" className="cm-field-ring" />
    </div>
  );
}

function ContactModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const firstFieldRef = useRef(null);

  // Reset state when re-opened
  useEffect(() => {
    if (open) {
      setDone(false);
      setErrors({});
      setTimeout(() => firstFieldRef.current?.focus(), 700);
    }
  }, [open]);

  function validate() {
    const e = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Informe seu nome";
    if (!EMAIL_RE.test(email.trim())) e.email = "Email inválido";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) e.phone = "Telefone inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function buildMessage() {
    return (
      `Olá, AKZA! Sou ${name.trim()}.\n` +
      `Email: ${email.trim()}\n` +
      `Telefone: ${phone}\n\n` +
      (message.trim()
        ? message.trim()
        : "Gostaria de agendar um diagnóstico estratégico.")
    );
  }

  function sendWhatsApp(e) {
    e?.preventDefault?.();
    if (!validate()) return;
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_AKZA}?text=${text}`, "_blank", "noopener");
    setDone(true);
  }

  function sendEmail() {
    if (!validate()) return;
    const subject = encodeURIComponent(`Diagnóstico estratégico — ${name.trim()}`);
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${EMAIL_AKZA}?subject=${subject}&body=${body}`;
    setDone(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cm-overlay"
          aria-hidden={!open}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop click closes */}
          <div
            className="cm-backdrop"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cm-title"
            className="cm-card"
            initial={{ opacity: 0, scale: 1.18, filter: "blur(28px)", y: 14 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(14px)", y: 8 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.5 },
              filter: { duration: 0.7 },
            }}
          >
            {/* Akza-green corner glow */}
            <span aria-hidden="true" className="cm-glow" />
            <span aria-hidden="true" className="cm-grid" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar formulário de contato"
              className="cm-close"
              data-cursor="hover"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {!done ? (
              <>
                {/* Header */}
                <header className="cm-header">
                  <span className="cm-eyebrow">
                    <span className="cm-rec-dot" />
                    Contato · Akza Studio
                  </span>
                  <h2 id="cm-title" className="cm-title">
                    Vamos{" "}
                    <span className="text-gradient-akza">conversar</span>?
                  </h2>
                  <p className="cm-sub">
                    Conte um pouco sobre o seu projeto. Em até 24h respondemos
                    com um diagnóstico estratégico inicial.
                  </p>
                </header>

                <form className="cm-form" onSubmit={sendWhatsApp} noValidate>
                  <motion.div
                    className="cm-grid-fields"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div variants={fieldVariants}>
                      <input
                        ref={firstFieldRef}
                        style={{ display: "none" }}
                        aria-hidden="true"
                        tabIndex={-1}
                      />
                      <Field
                        id="cm-name"
                        label="Nome"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        autoComplete="name"
                      />
                      {errors.name && <p className="cm-error">{errors.name}</p>}
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <Field
                        id="cm-email"
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        autoComplete="email"
                      />
                      {errors.email && <p className="cm-error">{errors.email}</p>}
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <Field
                        id="cm-phone"
                        type="tel"
                        label="Telefone"
                        value={phone}
                        onChange={(e) => {
                          setPhone(formatPhone(e.target.value));
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        autoComplete="tel"
                      />
                      {errors.phone && <p className="cm-error">{errors.phone}</p>}
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      <Textarea
                        id="cm-message"
                        label="Mensagem (opcional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="cm-actions"
                    variants={fieldVariants}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      type="submit"
                      className="cm-submit"
                      data-cursor="hover"
                    >
                      <span className="cm-submit-bg" aria-hidden="true" />
                      <span className="cm-submit-content">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.5 3.5A11 11 0 0 0 3.6 17.6L2 22l4.5-1.6A11 11 0 1 0 20.5 3.5zM12 20.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.7 1 1-2.6-.2-.3a8.2 8.2 0 1 1 6.4 3.3zM16.6 14a14 14 0 0 1-1.7-.7c-.2 0-.4 0-.5.2l-.7 1c-.1.1-.3.1-.5 0a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.3.1-.4l.4-.5a.5.5 0 0 0 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4H8.5c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.8 4.3 1.7.7 2.4.7 3.2.6.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z" />
                        </svg>
                        Enviar via WhatsApp
                        <span aria-hidden="true" className="cm-submit-arrow">→</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={sendEmail}
                      className="cm-submit-secondary"
                      data-cursor="hover"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                      Por email
                    </button>
                  </motion.div>

                  <p className="cm-trust">
                    Seus dados são usados só para esta conversa.
                  </p>
                </form>
              </>
            ) : (
              <SuccessState onClose={onClose} />
            )}
          </motion.div>

          <ModalStyles />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const fieldVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function SuccessState({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="cm-success"
    >
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 18 }}
        className="cm-check"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
      <h3>Mensagem preparada!</h3>
      <p>
        Continue na aba que abrimos pra finalizar o envio. Em até 24h
        respondemos com um diagnóstico estratégico inicial.
      </p>
      <button type="button" onClick={onClose} className="cm-success-close" data-cursor="hover">
        Fechar
      </button>
    </motion.div>
  );
}

function ModalStyles() {
  return (
    <style>{`
      .cm-overlay {
        position: fixed;
        inset: 0;
        z-index: 1100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        overflow: hidden;
      }
      .cm-backdrop {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 60% 50% at 50% 50%, rgba(15,42,40,0.55), rgba(2,6,8,0.85) 70%);
        backdrop-filter: blur(14px) saturate(120%);
        -webkit-backdrop-filter: blur(14px) saturate(120%);
      }
      .cm-card {
        position: relative;
        z-index: 2;
        width: min(560px, 100%);
        max-height: calc(100dvh - 48px);
        overflow-x: hidden;
        overflow-y: auto;
        border-radius: 28px;
        padding: 32px 32px 28px;
        background:
          linear-gradient(180deg, rgba(22,32,34,0.95) 0%, rgba(12,18,20,0.95) 100%);
        border: 1px solid rgba(127,182,164,0.22);
        box-shadow:
          0 40px 90px rgba(0,0,0,0.65),
          0 0 80px rgba(127,182,164,0.10),
          inset 0 1px 0 rgba(255,255,255,0.06);
        font-family: var(--font-display);
        color: var(--fg-1);
        will-change: transform, filter, opacity;
      }
      .cm-glow {
        position: absolute;
        top: -120px; right: -120px;
        width: 360px; height: 360px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(127,182,164,0.30), transparent 65%);
        filter: blur(40px);
        pointer-events: none;
      }
      .cm-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(127,182,164,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(127,182,164,0.05) 1px, transparent 1px);
        background-size: 32px 32px;
        mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 75%);
        -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 75%);
        opacity: 0.5;
        border-radius: inherit;
        pointer-events: none;
      }
      .cm-close {
        position: absolute;
        top: 16px; right: 16px;
        z-index: 3;
        width: 36px; height: 36px;
        border-radius: 999px;
        background: rgba(7,12,14,0.6);
        border: 1px solid rgba(127,182,164,0.28);
        color: var(--fg-1);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: background 240ms ease, transform 240ms ease, border-color 240ms ease;
      }
      .cm-close:hover {
        background: rgba(127,182,164,0.18);
        border-color: rgba(187,224,210,0.55);
        transform: rotate(90deg);
      }
      .cm-header { position: relative; z-index: 1; }
      .cm-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 5px 11px;
        border-radius: 999px;
        background: rgba(7,12,14,0.6);
        border: 1px solid rgba(127,182,164,0.28);
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--mint-200);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .cm-rec-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        background: #7fb6a4;
        box-shadow: 0 0 8px rgba(127,182,164,0.7);
        animation: akzaPulse 2.4s ease-in-out infinite;
      }
      .cm-title {
        margin: 14px 0 0;
        font-family: var(--font-display);
        font-weight: 700;
        font-size: clamp(26px, 3.4vw, 36px);
        letter-spacing: -0.025em;
        line-height: 1.05;
      }
      .cm-sub {
        margin: 12px 0 0;
        font-size: 14px;
        color: var(--fg-2);
        line-height: 1.55;
        max-width: 460px;
      }
      .cm-form { position: relative; z-index: 1; margin-top: 24px; }
      .cm-grid-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .cm-grid-fields > div:nth-child(1),
      .cm-grid-fields > div:nth-child(4) {
        grid-column: span 2;
      }
      @media (max-width: 540px) {
        .cm-grid-fields { grid-template-columns: 1fr; }
        .cm-grid-fields > div { grid-column: span 1 !important; }
      }

      /* Floating label fields */
      .cm-field {
        position: relative;
      }
      .cm-field input,
      .cm-field textarea {
        width: 100%;
        padding: 22px 14px 8px;
        border-radius: 14px;
        background: rgba(15,21,22,0.6);
        border: 1px solid rgba(127,182,164,0.18);
        color: var(--fg-1);
        font-family: var(--font-display);
        font-size: 14px;
        outline: none;
        transition: border-color 280ms ease, background 280ms ease, box-shadow 280ms ease;
        font-weight: 500;
      }
      .cm-field textarea {
        resize: vertical;
        min-height: 96px;
        font-family: var(--font-display);
        line-height: 1.55;
      }
      .cm-field label {
        position: absolute;
        left: 14px;
        top: 16px;
        font-family: var(--font-display);
        font-size: 13px;
        color: var(--fg-3);
        pointer-events: none;
        transform-origin: 0 0;
        transition: transform 280ms cubic-bezier(0.22,1,0.36,1), color 240ms ease;
      }
      .cm-field input:focus + label,
      .cm-field input:not(:placeholder-shown) + label,
      .cm-field textarea:focus + label,
      .cm-field textarea:not(:placeholder-shown) + label {
        transform: translate(0, -10px) scale(0.78);
        color: var(--mint-300);
        font-family: var(--font-mono);
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .cm-field input:focus,
      .cm-field textarea:focus {
        border-color: rgba(187,224,210,0.65);
        background: rgba(127,182,164,0.06);
        box-shadow: 0 0 0 4px rgba(127,182,164,0.10);
      }
      .cm-field-ring {
        position: absolute;
        inset: 0;
        border-radius: 14px;
        pointer-events: none;
        background:
          linear-gradient(115deg, transparent 30%, rgba(187,224,210,0.10) 50%, transparent 70%);
        background-size: 220% 100%;
        background-position: 200% 0;
        opacity: 0;
        transition: opacity 280ms ease;
      }
      .cm-field input:focus ~ .cm-field-ring,
      .cm-field textarea:focus ~ .cm-field-ring {
        opacity: 1;
        animation: cmRingSweep 1.2s cubic-bezier(0.22,1,0.36,1);
      }
      @keyframes cmRingSweep {
        0%   { background-position: 200% 0; }
        100% { background-position: -100% 0; }
      }
      .cm-error {
        margin: 6px 0 0;
        padding: 0 6px;
        font-family: var(--font-mono);
        font-size: 11px;
        color: #ff7a7a;
        letter-spacing: 0.04em;
      }

      .cm-actions {
        margin-top: 22px;
        display: flex;
        gap: 10px;
        align-items: stretch;
      }
      .cm-submit {
        position: relative;
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 16px 22px;
        min-height: 50px;
        border-radius: 14px;
        background: linear-gradient(135deg, #e8f3ef 0%, #bbe0d2 100%);
        color: var(--bg-0);
        border: none;
        font-family: var(--font-display);
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        overflow: hidden;
        box-shadow:
          0 16px 36px rgba(127,182,164,0.45),
          inset 0 1px 0 rgba(255,255,255,0.55);
        transition: box-shadow 320ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1);
      }
      .cm-submit:hover {
        transform: translateY(-2px) scale(1.01);
        box-shadow:
          0 24px 50px rgba(127,182,164,0.65),
          0 0 0 1px rgba(187,224,210,0.55),
          inset 0 1px 0 rgba(255,255,255,0.65);
      }
      .cm-submit:active { transform: translateY(0) scale(0.98); }
      .cm-submit-content {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .cm-submit-bg {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
        background-size: 220% 100%;
        background-position: 200% 0;
        opacity: 0;
        mix-blend-mode: overlay;
        pointer-events: none;
        transition: opacity 280ms ease;
      }
      .cm-submit:hover .cm-submit-bg {
        opacity: 1;
        animation: cmRingSweep 0.9s cubic-bezier(0.22,1,0.36,1);
      }
      .cm-submit-arrow {
        display: inline-block;
        transition: transform 320ms cubic-bezier(0.22,1,0.36,1);
      }
      .cm-submit:hover .cm-submit-arrow { transform: translateX(4px); }

      .cm-submit-secondary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 16px 18px;
        border-radius: 14px;
        background: transparent;
        border: 1px solid rgba(127,182,164,0.30);
        color: var(--fg-1);
        font-family: var(--font-display);
        font-weight: 500;
        font-size: 13px;
        cursor: pointer;
        transition: background 240ms ease, border-color 240ms ease, transform 240ms ease;
      }
      .cm-submit-secondary:hover {
        background: rgba(127,182,164,0.08);
        border-color: rgba(187,224,210,0.55);
        transform: translateY(-1px);
      }

      .cm-trust {
        margin: 14px 0 0;
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--fg-3);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        text-align: center;
      }

      /* Success state */
      .cm-success {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 24px 0 8px;
      }
      .cm-check {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #bbe0d2, #5fa28e 60%, #1f3531);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgba(7,12,14,0.85);
        margin-bottom: 18px;
        box-shadow:
          0 0 0 8px rgba(127,182,164,0.18),
          0 16px 40px rgba(127,182,164,0.35),
          inset 0 1px 0 rgba(255,255,255,0.4);
      }
      .cm-success h3 {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: 26px;
        margin: 0;
        letter-spacing: -0.02em;
      }
      .cm-success p {
        margin: 12px 0 0;
        color: var(--fg-2);
        line-height: 1.55;
        max-width: 380px;
        margin-inline: auto;
      }
      .cm-success-close {
        margin-top: 22px;
        padding: 12px 24px;
        border-radius: 999px;
        background: transparent;
        border: 1px solid rgba(127,182,164,0.30);
        color: var(--fg-1);
        font-family: var(--font-display);
        font-weight: 500;
        font-size: 13px;
        cursor: pointer;
        transition: background 240ms ease, border-color 240ms ease;
      }
      .cm-success-close:hover {
        background: rgba(127,182,164,0.08);
        border-color: rgba(187,224,210,0.55);
      }

      @media (prefers-reduced-motion: reduce) {
        .cm-card { filter: none !important; }
      }

      @media (max-width: 540px) {
        .cm-overlay { padding: 14px; }
        .cm-card { padding: 24px 22px 20px; border-radius: 22px; }
        .cm-actions { flex-direction: column; }
        .cm-submit-secondary { justify-content: center; }
      }
    `}</style>
  );
}
