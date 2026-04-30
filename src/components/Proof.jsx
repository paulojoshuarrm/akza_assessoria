import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Counter from "./Counter";

// Heavy shader bundle — keep out of the initial chunk
const LiquidMetal = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({ default: m.LiquidMetal }))
);

/* ─── Inline stats strip ─────────────────────────────────────── */

function StatsStrip() {
  return (
    <div
      className="proof-stats"
      style={{
        marginTop: 32,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr auto 1fr",
        alignItems: "center",
        gap: 24,
        padding: "22px 28px",
        borderRadius: 22,
        background:
          "linear-gradient(180deg, rgba(20,30,32,0.85) 0%, rgba(15,21,22,0.85) 100%)",
        border: "1px solid rgba(127,182,164,0.16)",
        boxShadow:
          "0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
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
          top: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(127,182,164,0.22), transparent 65%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          className="text-gradient-akza"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(34px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          <Counter end={47} duration={1800} suffix="%" />
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
            marginTop: 8,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Taxa de crescimento ↗
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          width: 1,
          height: 56,
          background:
            "linear-gradient(180deg, transparent, rgba(127,182,164,0.30), transparent)",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(34px, 4vw, 48px)",
            color: "var(--fg-1)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            display: "inline-flex",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <Counter end={3} duration={900} />
          <span
            style={{
              fontSize: "0.42em",
              color: "var(--mint-200)",
              fontWeight: 400,
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
            }}
          >
            pilares
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
            marginTop: 8,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Comunicação · Tecnologia · Estratégia
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          width: 1,
          height: 56,
          background:
            "linear-gradient(180deg, transparent, rgba(127,182,164,0.30), transparent)",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(34px, 4vw, 48px)",
            color: "var(--fg-1)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          <Counter end={6} duration={1200} />
          <span
            style={{
              fontSize: "0.42em",
              color: "var(--mint-200)",
              fontWeight: 400,
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              marginLeft: 6,
            }}
          >
            áreas
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
            marginTop: 8,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Vídeo · Conteúdo · Web · Brand
        </div>
      </div>
    </div>
  );
}

/* ─── Tile visuals (kept from previous version) ────────────────── */

function TileVisual({ visual, big = false }) {
  if (visual === "video") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 200 150"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.92,
        }}
        preserveAspectRatio={big ? "xMidYMid slice" : "xMidYMid meet"}
      >
        <rect x="48" y="50" width="84" height="50" rx="6" fill="rgba(232,243,239,0.10)" stroke="rgba(232,243,239,0.30)" />
        <rect x="118" y="44" width="22" height="14" rx="3" fill="rgba(232,243,239,0.18)" />
        <circle cx="90" cy="75" r="20" fill="rgba(127,182,164,0.18)" stroke="rgba(232,243,239,0.4)" />
        <circle cx="90" cy="75" r="13" fill="rgba(0,0,0,0.5)" stroke="rgba(127,182,164,0.5)" />
        <circle cx="90" cy="75" r="6" fill="#7fb6a4" />
        <circle cx="86" cy="71" r="2" fill="rgba(232,243,239,0.9)" />
        <circle cx="160" cy="60" r="3" fill="#ff5a5a" opacity="0.9">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <text x="166" y="63" fontSize="6" fill="#ff5a5a" fontFamily="monospace">REC</text>
        <text x="56" y="120" fontSize="6" fill="rgba(232,243,239,0.7)" fontFamily="monospace">00:01:24:08</text>
        <text x="56" y="130" fontSize="5" fill="rgba(127,182,164,0.7)" fontFamily="monospace">4K · 24 FPS</text>
      </svg>
    );
  }
  if (visual === "editorial") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.92 }}>
        <rect x="32" y="28" width="136" height="98" rx="6" fill="rgba(10,18,22,0.55)" stroke="rgba(127,182,164,0.30)" />
        <rect x="42" y="38" width="40" height="2" fill="rgba(127,182,164,0.7)" />
        <text x="42" y="56" fontSize="9" fill="rgba(232,243,239,0.95)" fontFamily="serif" fontStyle="italic">Estratégia</text>
        <text x="42" y="68" fontSize="9" fill="rgba(232,243,239,0.95)" fontFamily="serif" fontStyle="italic">de Marca</text>
        <line x1="42" y1="78" x2="158" y2="78" stroke="rgba(255,255,255,0.10)" />
        {[84, 92, 100, 108, 116].map((y, i) => (
          <line key={i} x1="42" y1={y} x2={i === 4 ? 120 : 158} y2={y} stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
        ))}
      </svg>
    );
  }
  if (visual === "code") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.95 }}>
        <rect x="20" y="22" width="160" height="106" rx="8" fill="rgba(7,12,14,0.85)" stroke="rgba(127,182,164,0.30)" />
        <circle cx="32" cy="34" r="2.4" fill="#ff6a5a" />
        <circle cx="40" cy="34" r="2.4" fill="#f7c95c" />
        <circle cx="48" cy="34" r="2.4" fill="#7fb6a4" />
        <text x="28" y="56" fontSize="6.5" fontFamily="monospace" fill="#7fb6a4">const</text>
        <text x="46" y="56" fontSize="6.5" fontFamily="monospace" fill="#bbe0d2">akza</text>
        <text x="64" y="56" fontSize="6.5" fontFamily="monospace" fill="rgba(232,243,239,0.6)">= </text>
        <text x="72" y="56" fontSize="6.5" fontFamily="monospace" fill="#e8d27a">{"{"}</text>
        <text x="36" y="68" fontSize="6.5" fontFamily="monospace" fill="#bbe0d2">strategy:</text>
        <text x="76" y="68" fontSize="6.5" fontFamily="monospace" fill="#e8a07a">"digital"</text>
        <text x="36" y="80" fontSize="6.5" fontFamily="monospace" fill="#bbe0d2">stack:</text>
        <text x="64" y="80" fontSize="6.5" fontFamily="monospace" fill="#e8a07a">["react", "node"]</text>
        <text x="36" y="92" fontSize="6.5" fontFamily="monospace" fill="#bbe0d2">growth:</text>
        <text x="68" y="92" fontSize="6.5" fontFamily="monospace" fill="#7fb6a4">true</text>
        <text x="28" y="104" fontSize="6.5" fontFamily="monospace" fill="#e8d27a">{"}"}</text>
        <rect x="34" y="100" width="4" height="6" fill="#7fb6a4" opacity="0.8">
          <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
        </rect>
      </svg>
    );
  }
  if (visual === "browser") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.92 }}>
        <rect x="20" y="24" width="160" height="104" rx="6" fill="rgba(10,18,22,0.85)" stroke="rgba(127,182,164,0.25)" />
        <rect x="20" y="24" width="160" height="14" rx="6" fill="rgba(20,32,34,0.95)" />
        <circle cx="30" cy="31" r="1.8" fill="#ff6a5a" />
        <circle cx="36" cy="31" r="1.8" fill="#f7c95c" />
        <circle cx="42" cy="31" r="1.8" fill="#7fb6a4" />
        <rect x="60" y="27" width="100" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
        <text x="65" y="33" fontSize="5" fontFamily="monospace" fill="rgba(127,182,164,0.8)">akza.tech/cliente</text>
        <rect x="32" y="50" width="80" height="6" fill="rgba(232,243,239,0.85)" />
        <rect x="32" y="60" width="60" height="4" fill="rgba(232,243,239,0.45)" />
        <rect x="32" y="68" width="50" height="4" fill="rgba(232,243,239,0.30)" />
        <rect x="32" y="80" width="32" height="10" rx="3" fill="#7fb6a4" />
        <rect x="124" y="50" width="44" height="44" rx="4" fill="rgba(127,182,164,0.18)" stroke="rgba(127,182,164,0.40)" />
        <circle cx="146" cy="68" r="6" fill="rgba(232,243,239,0.7)" />
        <path d="M132 90 L142 78 L152 86 L165 70 L165 94 L132 94 Z" fill="rgba(232,243,239,0.50)" />
        <circle cx="34" cy="118" r="1.5" fill="rgba(127,182,164,0.6)" />
        <circle cx="42" cy="118" r="1.5" fill="rgba(232,243,239,0.3)" />
        <circle cx="50" cy="118" r="1.5" fill="rgba(232,243,239,0.3)" />
      </svg>
    );
  }
  if (visual === "brand") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.95 }}>
        <rect x="32" y="34" width="50" height="50" rx="6" fill="rgba(127,182,164,0.18)" stroke="rgba(127,182,164,0.4)" />
        <text x="50" y="65" fontSize="22" fontFamily="serif" fontStyle="italic" fill="#bbe0d2">A</text>
        <rect x="92" y="34" width="50" height="50" rx="6" fill="rgba(232,243,239,0.04)" stroke="rgba(232,243,239,0.20)" />
        <circle cx="117" cy="59" r="14" fill="none" stroke="#bbe0d2" strokeWidth="1.6" />
        <circle cx="117" cy="59" r="4" fill="#bbe0d2" />
        <rect x="32" y="98" width="22" height="22" rx="4" fill="#7fb6a4" />
        <rect x="58" y="98" width="22" height="22" rx="4" fill="#bbe0d2" />
        <rect x="84" y="98" width="22" height="22" rx="4" fill="#0f2a23" stroke="rgba(255,255,255,0.18)" />
        <rect x="110" y="98" width="22" height="22" rx="4" fill="#e8f3ef" />
        <rect x="136" y="98" width="22" height="22" rx="4" fill="#1d2c34" />
      </svg>
    );
  }
  // cases — growth chart
  return (
    <svg aria-hidden="true" viewBox="0 0 200 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.95 }}>
      <rect x="22" y="28" width="156" height="98" rx="6" fill="rgba(10,18,22,0.7)" stroke="rgba(127,182,164,0.25)" />
      <line x1="34" y1="100" x2="166" y2="100" stroke="rgba(255,255,255,0.10)" />
      <line x1="34" y1="80" x2="166" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="2,3" />
      <line x1="34" y1="60" x2="166" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="2,3" />
      <path
        d="M34 92 L54 84 L74 78 L94 64 L114 56 L134 50 L154 38 L166 32 L166 100 L34 100 Z"
        fill="url(#caseGrad)"
        opacity="0.65"
      />
      <path d="M34 92 L54 84 L74 78 L94 64 L114 56 L134 50 L154 38 L166 32" fill="none" stroke="#7fb6a4" strokeWidth="1.5" />
      <defs>
        <linearGradient id="caseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb6a4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7fb6a4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="34" y="46" fontSize="6" fontFamily="monospace" fill="rgba(127,182,164,0.9)">+47% growth</text>
      <text x="34" y="118" fontSize="5" fontFamily="monospace" fill="rgba(232,243,239,0.5)">jan · fev · mar · abr · mai · jun · jul</text>
    </svg>
  );
}

/* ─── Bento tiles ─────────────────────────────────────────────── */

const TILES = [
  {
    label: "Produções\nAudiovisuais",
    accent: "VIDEO · 4K",
    desc: "Filmes, captações em estúdio e reels com direção e edição estratégica.",
    cta: "Ver case",
    tone: "linear-gradient(135deg, rgba(59,131,110,0.85), rgba(15,42,35,0.95))",
    bg: "/materiais/bg-glass-panel.webp",
    visual: "video",
    span: "featured",
    cat: "video",
  },
  {
    label: "Conteúdos\nEstratégicos",
    accent: "EDITORIAL",
    desc: "Pautas, copys e posts com voz de marca consistente.",
    tone: "linear-gradient(135deg, rgba(44,102,85,0.85), rgba(15,42,35,0.95))",
    bg: "/materiais/bg-ambient.webp",
    visual: "editorial",
    cat: "content",
  },
  {
    label: "Projetos\nDigitais",
    accent: "<DEV/>",
    desc: "Aplicações, automações e integrações sob medida.",
    tone: "linear-gradient(135deg, rgba(31,74,62,0.88), rgba(7,20,15,0.95))",
    bg: "/materiais/bg-scanlines.webp",
    visual: "code",
    cat: "web",
  },
  {
    label: "Sites\nInstitucionais",
    accent: "WEB",
    desc: "Sites de alto desempenho com SEO técnico e UX premium.",
    tone: "linear-gradient(135deg, rgba(15,42,35,0.92), rgba(7,20,15,0.95))",
    bg: "/materiais/bg-glass-panel.webp",
    visual: "browser",
    cat: "web",
  },
  {
    label: "Identidade\nVisual",
    accent: "BRAND",
    desc: "Sistemas de marca completos: logo, tipografia, paleta e voz.",
    tone: "linear-gradient(135deg, rgba(44,102,85,0.85), rgba(31,74,62,0.95))",
    bg: "/materiais/bg-ambient.webp",
    visual: "brand",
    cat: "brand",
  },
  {
    label: "Trabalhos\ncom Clientes",
    accent: "CASES",
    desc: "Resultados mensuráveis em parceria com marcas que querem crescer.",
    tone: "linear-gradient(135deg, rgba(59,131,110,0.85), rgba(31,74,62,0.95))",
    bg: "/materiais/bg-scanlines.webp",
    visual: "cases",
    cat: "all",
  },
];

function PortfolioTile({ tile, index }) {
  const isFeatured = tile.span === "featured";
  const target = tile.cat === "all" ? "/projetos" : `/projetos#${tile.cat}`;
  return (
    <Reveal as="div" delay={0.05 + index * 0.06} className={`bento-cell ${isFeatured ? "is-featured" : ""}`}>
      <Link
        to={target}
        data-cursor="hover"
        className={`bento-tile ${isFeatured ? "is-featured" : ""}`}
        aria-label={`Ver projetos: ${tile.label.replace("\n", " ")}`}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          minHeight: isFeatured ? 460 : 220,
          position: "relative",
          overflow: "hidden",
          borderRadius: 22,
          backgroundImage: `url('${tile.bg}'), ${tile.tone}`,
          backgroundSize: "cover, auto",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          border: "1px solid rgba(127,182,164,0.18)",
          cursor: "pointer",
          padding: 0,
          textAlign: "left",
          textDecoration: "none",
          transition:
            "transform 600ms cubic-bezier(0.22,1,0.36,1), filter 600ms ease, border-color 400ms ease, box-shadow 500ms ease",
          willChange: "transform",
          boxShadow: "0 18px 40px rgba(0,0,0,0.4)",
          color: "var(--fg-1)",
          font: "inherit",
        }}
      >
        {/* tonal wash */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: tile.tone,
            mixBlendMode: "color",
            opacity: 0.55,
          }}
        />

        {/* visual */}
        <TileVisual visual={tile.visual} big={isFeatured} />

        {/* gradient mask for legibility */}
        <div
          aria-hidden="true"
          className="bento-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(7,12,14,0.20) 0%, rgba(7,12,14,0.20) 40%, rgba(0,0,0,0.85) 100%)",
            transition: "opacity 400ms ease",
          }}
        />

        {/* Akza-green corner glow */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(127,182,164,0.30), transparent 65%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        {/* Hover shine */}
        <div
          aria-hidden="true"
          className="bento-shine"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 0%, rgba(187,224,210,0.30), transparent 50%)",
            opacity: 0,
            transition: "opacity 500ms ease",
          }}
        />

        {/* Top-left accent pill */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "rgba(7,9,10,0.65)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(127,182,164,0.30)",
            borderRadius: 999,
            padding: "5px 11px",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--mint-200)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {tile.accent}
        </span>

        {/* Top-right arrow / "↗" badge */}
        <span
          aria-hidden="true"
          className="bento-arrow"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: isFeatured ? 40 : 32,
            height: isFeatured ? 40 : 32,
            borderRadius: "50%",
            background: "rgba(187,224,210,0.92)",
            color: "#05090a",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isFeatured ? 16 : 14,
            opacity: isFeatured ? 0.85 : 0,
            transform: isFeatured
              ? "translate(0, 0) scale(1)"
              : "translate(8px, -8px) scale(0.8)",
            transition:
              "opacity 320ms ease, transform 480ms cubic-bezier(0.22,1,0.36,1)",
            boxShadow: isFeatured
              ? "0 8px 22px rgba(0,0,0,0.4), 0 0 18px rgba(127,182,164,0.30)"
              : "none",
          }}
        >
          ↗
        </span>

        {/* Footer content */}
        <div
          style={{
            position: "absolute",
            left: isFeatured ? 24 : 16,
            right: isFeatured ? 24 : 16,
            bottom: isFeatured ? 24 : 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            zIndex: 2,
          }}
        >
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: isFeatured ? 700 : 600,
              fontSize: isFeatured ? "clamp(22px, 2.4vw, 32px)" : "clamp(15px, 1.5vw, 18px)",
              color: "var(--fg-1)",
              whiteSpace: "pre-line",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            {tile.label}
          </h4>
          {isFeatured && (
            <p
              style={{
                fontSize: 14,
                color: "rgba(232,243,239,0.78)",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "85%",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              {tile.desc}
            </p>
          )}
          {isFeatured && (
            <span
              style={{
                marginTop: 10,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--mint-200)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {tile.cta}
              <span aria-hidden="true">→</span>
            </span>
          )}
        </div>
      </Link>
    </Reveal>
  );
}

function BentoGrid() {
  return (
    <div className="bento-grid">
      {TILES.map((t, i) => (
        <PortfolioTile key={t.label} tile={t} index={i} />
      ))}
      <style>{`
        .bento-grid {
          margin-top: 32px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(220px, auto);
          gap: 16px;
        }
        .bento-cell { display: contents; }
        .bento-cell.is-featured > .bento-tile,
        .bento-tile.is-featured {
          grid-column: span 2;
          grid-row: span 2;
        }
        /* Reveal wraps each cell as a div; make it span on the wrapper too */
        .bento-cell.is-featured {
          display: block;
          grid-column: span 2;
          grid-row: span 2;
        }
        .bento-cell:not(.is-featured) {
          display: block;
        }

        .bento-tile:hover { transform: translate3d(0, -3px, 0); border-color: rgba(127,182,164,0.55); box-shadow: 0 24px 60px rgba(0,0,0,0.55), 0 0 50px rgba(127,182,164,0.18); }
        .bento-tile:hover .bento-overlay { opacity: 0.75; }
        .bento-tile:hover .bento-shine { opacity: 1; }
        .bento-tile:hover .bento-arrow { opacity: 1 !important; transform: translate(0, 0) scale(1) !important; }

        @media (max-width: 880px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-cell.is-featured { grid-column: span 2; grid-row: span 1; }
          .bento-cell.is-featured > .bento-tile,
          .bento-tile.is-featured { grid-column: span 2; grid-row: span 1; min-height: 320px; }
        }
        @media (max-width: 540px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-cell.is-featured,
          .bento-cell.is-featured > .bento-tile,
          .bento-tile.is-featured { grid-column: span 1; min-height: 280px; }
          .bento-tile { min-height: 200px !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Closing block: LiquidMetal shader + Akza CTA ────────────── */

function PortfolioCloseCTA() {
  return (
    <Reveal as="div" delay={0.2}>
      <div
        className="liquid-cta"
        style={{
          marginTop: 28,
          position: "relative",
          borderRadius: 32,
          overflow: "hidden",
          minHeight: 320,
          border: "1px solid rgba(127,182,164,0.22)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.55), 0 0 80px rgba(127,182,164,0.10), inset 0 1px 0 rgba(255,255,255,0.08)",
          isolation: "isolate",
        }}
      >
        {/* Solid base color so the shader has something to layer over */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(31,74,62,0.95), rgba(7,14,16,0.98) 75%)",
            zIndex: 0,
          }}
        />

        {/* LiquidMetal shader — Akza-green tint, slow drift */}
        <Suspense fallback={null}>
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0.55, scale: 1 }}
            animate={{ opacity: 0.75, scale: 1.04, rotate: 1.5 }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "mirror" }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          >
            <LiquidMetal
              style={{ width: "100%", height: "100%", filter: "blur(8px)" }}
              colorBack="hsl(0, 0%, 0%, 0)"
              colorTint="hsl(165, 38%, 52%)"
              repetition={4}
              softness={0.6}
              shiftRed={0.10}
              shiftBlue={0.18}
              distortion={0.12}
              contour={1}
              shape="plane"
              offsetX={0}
              offsetY={0}
              scale={1}
              rotation={25}
              speed={1.6}
            />
          </motion.div>
        </Suspense>

        {/* Soft vignette + grain to blend the shader into the brand palette */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "radial-gradient(ellipse 80% 90% at 50% 60%, transparent 0%, rgba(7,14,16,0.55) 80%)",
            pointerEvents: "none",
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            opacity: 0.05,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            pointerEvents: "none",
          }}
        />

        {/* Glass content card */}
        <div
          className="liquid-cta-content"
          style={{
            position: "relative",
            zIndex: 3,
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            alignItems: "center",
            gap: 32,
            padding: "44px 48px",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(7,12,14,0.55)",
                border: "1px solid rgba(127,182,164,0.30)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--mint-200)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#7fb6a4",
                  boxShadow: "0 0 8px #7fb6a4",
                }}
              />
              Próximos passos
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(26px, 3.4vw, 44px)",
                color: "var(--fg-1)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: "16px 0 0",
                maxWidth: 580,
                textShadow: "0 2px 14px rgba(0,0,0,0.55)",
              }}
            >
              Pronto para construir o{" "}
              <span className="text-gradient-akza">próximo projeto</span>?
            </h3>
            <p
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "rgba(232,243,239,0.78)",
                lineHeight: 1.6,
                margin: "16px 0 0",
                maxWidth: 520,
                textShadow: "0 1px 6px rgba(0,0,0,0.55)",
              }}
            >
              Diagnóstico estratégico, plano de ação e execução integrada —
              comunicação, tecnologia e estratégia em uma única parceria.
            </p>
          </div>

          <div
            className="liquid-cta-actions"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-start",
              justifySelf: "end",
            }}
          >
            <a
              href="#contato"
              data-cursor="hover"
              className="liquid-cta-primary"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 14,
                background: "linear-gradient(135deg, #e8f3ef 0%, #bbe0d2 100%)",
                color: "var(--bg-0)",
                border: "none",
                padding: "16px 28px",
                borderRadius: 999,
                textDecoration: "none",
                minHeight: 44,
                overflow: "hidden",
                boxShadow:
                  "0 16px 36px rgba(127,182,164,0.45), inset 0 1px 0 rgba(255,255,255,0.55)",
                transition: "box-shadow 320ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <span aria-hidden="true" className="lcp-sweep" />
              <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 10 }}>
                Agendar Diagnóstico Estratégico
                <span aria-hidden="true" className="lcp-arrow">→</span>
              </span>
            </a>
            <a
              href="#servicos"
              data-cursor="hover"
              className="liquid-cta-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--mint-200)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "8px 0",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 18,
                  height: 1,
                  background: "var(--mint-300)",
                }}
              />
              Ou ver serviços
            </a>
          </div>
        </div>

        <style>{`
          .liquid-cta-primary:hover {
            box-shadow:
              0 26px 56px rgba(127,182,164,0.75),
              0 0 0 1px rgba(187,224,210,0.55),
              inset 0 1px 0 rgba(255,255,255,0.7);
            transform: translate3d(0, -3px, 0) scale(1.02);
          }
          .liquid-cta-primary:active { transform: translate3d(0, 0, 0) scale(0.98); }
          .liquid-cta-primary .lcp-sweep {
            position: absolute;
            inset: 0;
            background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
            background-size: 220% 100%;
            background-position: 200% 0;
            opacity: 0;
            transition: opacity 280ms ease;
            pointer-events: none;
            mix-blend-mode: overlay;
          }
          .liquid-cta-primary:hover .lcp-sweep {
            opacity: 1;
            animation: lcpSweep 0.9s cubic-bezier(0.22,1,0.36,1);
          }
          @keyframes lcpSweep {
            0%   { background-position: 200% 0; }
            100% { background-position: -100% 0; }
          }
          .liquid-cta-primary .lcp-arrow {
            display: inline-block;
            transition: transform 380ms cubic-bezier(0.22,1,0.36,1);
          }
          .liquid-cta-primary:hover .lcp-arrow { transform: translateX(5px); }
          .liquid-cta-secondary:hover { color: var(--fg-1); }
          @media (max-width: 880px) {
            .liquid-cta-content {
              grid-template-columns: 1fr !important;
              padding: 32px 28px !important;
              gap: 24px !important;
            }
            .liquid-cta-actions { justify-self: start !important; }
          }
        `}</style>
      </div>
    </Reveal>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

export default function Proof() {
  return (
    <section
      id="portfolio"
      aria-label="Provas e portfólio"
      style={{ padding: "20px 24px 100px", maxWidth: 1280, margin: "0 auto", position: "relative" }}
    >
      {/* Soft Akza glow behind the section */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 60,
          right: -100,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(127,182,164,0.10), transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="proof-header"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 32,
          alignItems: "end",
        }}
      >
        <div>
          <Reveal>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--fg-3)",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 1,
                  background: "var(--mint-300)",
                }}
              />
              Projetos e produções
            </span>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.1}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--fg-1)",
              margin: "12px 0 0",
              maxWidth: 720,
            }}
          >
            Projetos e produções{" "}
            <span className="text-gradient-akza">realizadas</span>.
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "var(--fg-2)",
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 460,
              justifySelf: "end",
            }}
          >
            Cada categoria abaixo concentra entregas reais — vídeos, sites,
            sistemas e identidades — que ajudam empresas a sustentar uma
            presença digital consistente.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <StatsStrip />
      </Reveal>

      <BentoGrid />

      <PortfolioCloseCTA />

      <style>{`
        @media (max-width: 880px) {
          .proof-header { grid-template-columns: 1fr !important; gap: 16px !important; align-items: start !important; }
          .proof-header > div:nth-child(2) p { justify-self: start !important; }
          .proof-stats {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 20px 22px !important;
          }
          .proof-stats > div[aria-hidden] {
            width: 100% !important;
            height: 1px !important;
            background: linear-gradient(90deg, transparent, rgba(127,182,164,0.3), transparent) !important;
          }
        }
      `}</style>
    </section>
  );
}
