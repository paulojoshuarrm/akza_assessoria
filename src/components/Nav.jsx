import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SECTION_LINKS = [
  { label: "Sobre",     hash: "#sobre" },
  { label: "Serviços",  hash: "#servicos" },
  { label: "Processo",  hash: "#processo" },
];

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const goSection = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      // also update URL hash
      history.replaceState(null, "", hash);
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <header
      role="banner"
      style={{
        position: "sticky",
        top: 16,
        zIndex: 50,
        margin: "16px auto 0",
        maxWidth: 1200,
        padding: "0 16px",
        animation: "akzaFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      <nav
        aria-label="Navegação principal"
        className="akza-nav"
        style={{
          background: scrolled ? "rgba(12,17,18,0.78)" : "rgba(20,28,29,0.55)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999,
          padding: "10px 12px 10px 22px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: scrolled ? "0 24px 60px rgba(0,0,0,0.5)" : "0 16px 48px rgba(0,0,0,0.4)",
          transition: "background 300ms ease, box-shadow 300ms ease",
        }}
      >
        <Link
          to="/"
          aria-label="Akza Digital Strategy — voltar ao início"
          className="nav-logo"
          style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
        >
          <img
            src="/logo-sage-light.webp"
            alt="Akza Digital Strategy"
            width="140"
            height="24"
            style={{ height: 22, width: "auto", display: "block" }}
          />
        </Link>

        <ul
          className="nav-desktop"
          style={{
            display: "flex",
            gap: 24,
            flex: 1,
            justifyContent: "center",
            margin: 0,
            padding: 0,
            listStyle: "none",
            fontFamily: "var(--font-display)",
            fontSize: 14,
            color: "var(--fg-2)",
            fontWeight: 500,
          }}
        >
          {SECTION_LINKS.map((l) => (
            <li key={l.hash}>
              <a
                href={isHome ? l.hash : `/${l.hash}`}
                onClick={(e) => goSection(e, l.hash)}
                data-cursor="hover"
                className="akza-link nav-link"
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                <span className="nav-link-inner">{l.label}</span>
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/projetos"
              data-cursor="hover"
              className="akza-link nav-link"
              style={{ textDecoration: "none", display: "inline-block" }}
              aria-current={location.pathname === "/projetos" ? "page" : undefined}
            >
              <span
                className="nav-link-inner"
                style={{
                  color: location.pathname === "/projetos" ? "var(--mint-200)" : undefined,
                }}
              >
                Projetos
              </span>
            </Link>
          </li>
        </ul>

        <a
          href={isHome ? "#contato" : "/#contato"}
          onClick={(e) => goSection(e, "#contato")}
          className="akza-cta nav-cta"
          data-cursor="hover"
          style={{
            position: "relative",
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 13,
            background: "transparent",
            color: "var(--fg-1)",
            border: "1px solid rgba(127,182,164,0.30)",
            padding: "10px 18px",
            borderRadius: 999,
            textDecoration: "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            transition:
              "color 240ms ease, border-color 240ms ease, transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms ease",
          }}
        >
          <span
            aria-hidden="true"
            className="nav-cta-fill"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, #e8f3ef 0%, #bbe0d2 100%)",
              transform: "translateY(101%)",
              transition: "transform 380ms cubic-bezier(0.22,1,0.36,1)",
              pointerEvents: "none",
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>
            Agendar Diagnóstico
          </span>
        </a>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="nav-burger"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 999,
            width: 44,
            height: 44,
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--fg-1)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className="nav-drawer"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 250ms ease",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          {SECTION_LINKS.map((l) => (
            <li key={l.hash}>
              <a
                href={isHome ? l.hash : `/${l.hash}`}
                onClick={(e) => goSection(e, l.hash)}
                style={{
                  display: "block",
                  padding: "16px 20px",
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  color: "var(--fg-1)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  letterSpacing: "-0.01em",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/projetos"
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "16px 20px",
                fontFamily: "var(--font-display)",
                fontSize: 22,
                color: location.pathname === "/projetos" ? "var(--mint-200)" : "var(--fg-1)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                letterSpacing: "-0.01em",
              }}
            >
              Projetos
            </Link>
          </li>
          <li>
            <a
              href={isHome ? "#contato" : "/#contato"}
              onClick={(e) => goSection(e, "#contato")}
              style={{
                display: "block",
                marginTop: 16,
                padding: "16px 20px",
                fontFamily: "var(--font-display)",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--bg-0)",
                background: "var(--fg-1)",
                borderRadius: 999,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Agendar Diagnóstico Estratégico
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        .nav-link { overflow: hidden; }
        .nav-link-inner { display: inline-block; transition: transform 380ms cubic-bezier(0.22,1,0.36,1), color 240ms ease; will-change: transform; }
        .nav-link:hover .nav-link-inner { transform: translateY(-1px); color: var(--fg-1); }
        .nav-cta:hover {
          border-color: rgba(187,224,210,0.65);
          color: var(--bg-0);
          transform: translateY(-1px);
          box-shadow: 0 12px 28px rgba(127,182,164,0.35);
        }
        .nav-cta:hover .nav-cta-fill { transform: translateY(0); }
        .nav-cta:active { transform: translateY(0) scale(0.98); }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: inline-flex !important; margin-left: auto; }
          .akza-nav {
            padding: 8px 8px 8px 18px !important;
            gap: 8px !important;
          }
          .nav-logo img { height: 20px !important; }
          .nav-drawer {
            position: fixed;
            inset: 88px 12px auto 12px;
            background: rgba(10,15,16,0.96);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 24px;
            padding: 16px;
            z-index: 49;
            box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          }
        }
        @media (max-width: 480px) {
          .akza-nav { padding: 6px 6px 6px 16px !important; }
          .nav-logo img { height: 19px !important; }
          .nav-burger {
            width: 40px !important;
            height: 40px !important;
          }
        }
        @media (min-width: 901px) {
          .nav-drawer { display: none; }
        }
      `}</style>
    </header>
  );
}
