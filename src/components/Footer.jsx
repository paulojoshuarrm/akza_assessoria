import Reveal from "./Reveal";

const COLS = [
  { h: "Sobre",   items: [{ label: "Serviços", href: "/#servicos" }, { label: "Processo", href: "/#processo" }, { label: "Portfólio", href: "/#portfolio" }] },
  { h: "Outros",  items: [{ label: "Projetos", href: "/projetos" }, { label: "Clientes", href: "/#processo" }, { label: "Contato", href: "/#contato" }] },
  {
    h: "Contato",
    items: [
      { label: "WhatsApp", href: "https://wa.me/5511832275588" },
      { label: "agenciaakaza@gmail.com", href: "mailto:agenciaakaza@gmail.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      id="contato"
      role="contentinfo"
      aria-label="Rodapé"
      style={{ padding: "0 24px 32px", maxWidth: 1200, margin: "0 auto" }}
    >
      <Reveal>
        <div
          className="footer-grid"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,30,32,0.85) 0%, rgba(15,21,22,0.85) 100%)",
            border: "1px solid rgba(127,182,164,0.14)",
            borderRadius: 28,
            padding: 32,
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: 32,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.4), 0 0 80px rgba(127,182,164,0.06)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(127,182,164,0.18), transparent 65%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <div>
            <a href="#top" aria-label="Akza Digital Strategy — voltar ao topo" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
              <img
                src="/logo-sage-light.webp"
                alt="Akza Digital Strategy"
                width="200"
                height="36"
                style={{ height: 34, width: "auto", display: "block" }}
              />
            </a>
            <p style={{ fontSize: 13, color: "var(--fg-3)", marginTop: 18, lineHeight: 1.55, maxWidth: 260 }}>
              Comunicação · Tecnologia · Estratégia. Estruturamos e amplificamos a presença digital das empresas.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.h}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--fg-3)",
                  marginBottom: 14,
                }}
              >
                {col.h}
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", margin: 0, padding: 0 }}>
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      className="akza-link"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 13,
                        color: "var(--fg-2)",
                        textDecoration: "none",
                      }}
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
      <div
        className="footer-meta"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 18,
          fontSize: 11,
          color: "var(--fg-4)",
          fontFamily: "var(--font-mono)",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>© {new Date().getFullYear()} AKZA Digital Strategy</span>
        <span>Comunicação · Tecnologia · Estratégia</span>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; padding: 24px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-meta { justify-content: center; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
