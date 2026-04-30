import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { useTilt } from "../hooks/useTilt";

/* ─── Glass icon container ─────────────────────────────────────── */

function GlassImageIcon({ src, alt }) {
  return (
    <div
      className="service-icon"
      style={{
        width: 108,
        height: 108,
        borderRadius: 26,
        position: "relative",
        background:
          "radial-gradient(120% 120% at 30% 20%, rgba(187,224,210,0.32) 0%, rgba(95,162,142,0.20) 45%, rgba(20,42,40,0.85) 100%)",
        border: "1px solid rgba(187,224,210,0.22)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.4), 0 18px 36px rgba(0,0,0,0.48), 0 0 30px rgba(127,182,164,0.20)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition:
          "transform 600ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms ease, filter 400ms ease",
      }}
    >
      {/* gloss highlight */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "radial-gradient(80% 60% at 30% 0%, rgba(255,255,255,0.40), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* moving glow halo — CSS keyframe rotation (GPU, no React updates) */}
      <span
        aria-hidden="true"
        className="service-icon-glow"
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: "inherit",
          background:
            "conic-gradient(from 0deg, rgba(127,182,164,0.0) 0%, rgba(127,182,164,0.55) 30%, rgba(187,224,210,0.0) 60%, rgba(127,182,164,0.55) 90%, rgba(127,182,164,0.0) 100%)",
          opacity: 0.7,
          filter: "blur(10px)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      {/* bright center halo */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "12%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,243,239,0.32) 0%, rgba(187,224,210,0.12) 50%, transparent 75%)",
          filter: "blur(8px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* the actual realistic glass image — CSS keyframe float */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="service-icon-img"
        style={{
          position: "relative",
          zIndex: 2,
          width: "84%",
          height: "84%",
          objectFit: "contain",
          mixBlendMode: "screen",
          filter:
            "brightness(1.28) contrast(1.06) drop-shadow(0 6px 14px rgba(0,0,0,0.55)) drop-shadow(0 0 22px rgba(187,224,210,0.55))",
          willChange: "transform",
        }}
      />
    </div>
  );
}

/* ─── Subtle decorative SVG patterns per card ──────────────────── */

function CardPattern({ kind }) {
  // each card gets a unique faint backdrop
  const common = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    opacity: 0.5,
  };
  if (kind === "dots") {
    return (
      <svg aria-hidden="true" style={common}>
        <defs>
          <pattern id="p-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.6" cy="1.6" r="1.1" fill="rgba(127,182,164,0.25)" />
          </pattern>
          <radialGradient id="p-dots-mask" cx="0.7" cy="0.2" r="0.9">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="p-dots-fade">
            <rect width="100%" height="100%" fill="url(#p-dots-mask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#p-dots)" mask="url(#p-dots-fade)" />
      </svg>
    );
  }
  if (kind === "grid") {
    return (
      <svg aria-hidden="true" style={common}>
        <defs>
          <pattern id="p-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(127,182,164,0.18)" strokeWidth="0.6" />
          </pattern>
          <radialGradient id="p-grid-mask" cx="0.7" cy="0.15" r="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="p-grid-fade">
            <rect width="100%" height="100%" fill="url(#p-grid-mask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#p-grid)" mask="url(#p-grid-fade)" />
      </svg>
    );
  }
  if (kind === "diagonal") {
    return (
      <svg aria-hidden="true" style={common}>
        <defs>
          <pattern id="p-diag" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(127,182,164,0.18)" strokeWidth="1" />
          </pattern>
          <radialGradient id="p-diag-mask" cx="0.7" cy="0.2" r="0.95">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="p-diag-fade">
            <rect width="100%" height="100%" fill="url(#p-diag-mask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#p-diag)" mask="url(#p-diag-fade)" />
      </svg>
    );
  }
  // circles
  return (
    <svg aria-hidden="true" style={common}>
      <defs>
        <radialGradient id="p-rings-grad" cx="0.85" cy="0.15" r="1">
          <stop offset="0%" stopColor="rgba(127,182,164,0.30)" />
          <stop offset="60%" stopColor="rgba(127,182,164,0.0)" />
        </radialGradient>
      </defs>
      <circle cx="92%" cy="6%" r="44" fill="none" stroke="rgba(127,182,164,0.16)" strokeWidth="0.8" />
      <circle cx="92%" cy="6%" r="76" fill="none" stroke="rgba(127,182,164,0.10)" strokeWidth="0.6" />
      <circle cx="92%" cy="6%" r="116" fill="none" stroke="rgba(127,182,164,0.06)" strokeWidth="0.5" />
      <rect width="100%" height="100%" fill="url(#p-rings-grad)" />
    </svg>
  );
}

/* ─── Service definitions ──────────────────────────────────────── */

const SERVICES = [
  {
    n: "01",
    cat: "OPS",
    linkCat: "content",
    title: "Comunicação e\nProdução de Conteúdo",
    desc: "Criamos conteúdos que posicionam a empresa com profissionalismo e autoridade.",
    image: "/materiais/glass-megaphone.webp",
    alt: "Megafone de vidro representando comunicação",
    tags: ["Branding", "Vídeo", "Copy"],
    metric: "+47%",
    metricLabel: "Engajamento médio",
    pattern: "dots",
  },
  {
    n: "02",
    cat: "STUDIO",
    linkCat: "video",
    title: "Gestão de\nRedes Sociais",
    desc: "Transformamos redes em canal consistente de posicionamento e relacionamento.",
    image: "/materiais/glass-camera.webp",
    alt: "Câmera de vidro representando produção visual",
    tags: ["Reels", "Foto", "Stories"],
    metric: "30+",
    metricLabel: "Posts/mês por marca",
    pattern: "grid",
  },
  {
    n: "03",
    cat: "TECH",
    linkCat: "web",
    title: "Estrutura Digital\ne Tecnologia",
    desc: "Organizamos toda a base tecnológica para sustentar a presença digital.",
    image: "/materiais/glass-cloud-gear.webp",
    alt: "Nuvem e engrenagem de vidro representando tecnologia",
    tags: ["Web", "Cloud", "Automation"],
    metric: "99.9%",
    metricLabel: "Uptime garantido",
    pattern: "diagonal",
  },
  {
    n: "04",
    cat: "GROWTH",
    linkCat: "strategy",
    title: "Gestão\nEstratégica",
    desc: "Acompanhamos o crescimento digital com visão estratégica e indicadores claros.",
    image: "/materiais/glass-brain-chart.webp",
    alt: "Cérebro e gráfico de vidro representando estratégia",
    tags: ["KPIs", "Insights", "Growth"],
    metric: "ROI",
    metricLabel: "Mensurável e claro",
    pattern: "circles",
  },
];

/* ─── Card with mouse-driven spotlight + tilt ──────────────────── */

function ServiceCard({ service, index }) {
  // useTilt already publishes `--mx` / `--my` on the card via direct DOM —
  // the spotlight reads those CSS vars without any React/framer overhead.
  const tiltRef = useTilt({ max: 8, scale: 1.02 });

  return (
    <Reveal as="div" delay={0.1 + index * 0.08}>
      <Link
        to={`/projetos#${service.linkCat}`}
        ref={tiltRef}
        data-cursor="hover"
        aria-label={`Ver projetos de ${service.title.replace("\n", " ")}`}
        className="service-card"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,33,35,0.92) 0%, rgba(15,21,22,0.92) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 28,
          padding: "26px 24px 22px",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)",
          willChange: "transform",
          transition: "border-color 500ms ease, box-shadow 500ms ease",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {/* unique decorative pattern */}
        <CardPattern kind={service.pattern} />

        {/* mouse-following spotlight — uses --mx/--my CSS vars set by useTilt */}
        <span
          aria-hidden="true"
          className="card-spotlight"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(127,182,164,0.22), transparent 55%)",
            opacity: 0,
            transition: "opacity 320ms ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Akza-green corner glow (always-on) */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -70,
            right: -70,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(127,182,164,0.20), transparent 65%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        {/* Top row: category tag + arrow */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              color: "var(--mint-300)",
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(127,182,164,0.10)",
              border: "1px solid rgba(127,182,164,0.20)",
            }}
          >
            {service.cat}
          </span>
          <span
            aria-hidden="true"
            className="card-arrow"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "1px solid rgba(127,182,164,0.25)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--mint-200)",
              background: "rgba(7,12,14,0.5)",
              transition:
                "transform 320ms cubic-bezier(0.22,1,0.36,1), background 320ms ease, color 320ms ease",
            }}
          >
            ↗
          </span>
        </div>

        <div style={{ position: "relative", zIndex: 2, marginTop: 22 }}>
          <GlassImageIcon src={service.image} alt={service.alt} />
        </div>

        {/* Number + title */}
        <div style={{ position: "relative", zIndex: 2, marginTop: 28 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--mint-300)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 18,
                height: 1,
                background: "var(--mint-300)",
                display: "inline-block",
              }}
            />
            {service.n}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--fg-1)",
              letterSpacing: "-0.015em",
              marginTop: 8,
              whiteSpace: "pre-line",
              lineHeight: 1.2,
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--fg-2)",
              lineHeight: 1.55,
              marginTop: 12,
            }}
          >
            {service.desc}
          </p>
        </div>

        {/* Tag pills */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: 18,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {service.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.06em",
                color: "var(--fg-2)",
                padding: "5px 10px",
                borderRadius: 999,
                background: "rgba(15,21,22,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Metric strip — fills the bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: "auto",
            paddingTop: 20,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              height: 1,
              width: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(127,182,164,0.30), transparent)",
              marginBottom: 14,
            }}
          />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span
              className="text-gradient-akza"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {service.metric}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--fg-3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {service.metricLabel}
            </span>
          </div>
        </div>

        {/* Animated scan line that appears on hover */}
        <span
          aria-hidden="true"
          className="card-scan"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: -2,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(187,224,210,0.85), transparent)",
            opacity: 0,
            transition: "opacity 280ms ease",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </Link>
    </Reveal>
  );
}

/* ─── Section ──────────────────────────────────────────────────── */

export default function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      style={{
        padding: "100px 24px 60px",
        maxWidth: 1280,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        className="services-header"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 32,
          alignItems: "end",
          marginBottom: 48,
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
              O que fazemos
            </span>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.1}
            id="servicos-title"
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
            Estruturamos toda a sua{" "}
            <span className="text-gradient-akza">presença digital</span>.
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
            Quatro pilares integrados — comunicação, estúdio, tecnologia e
            estratégia — operando em conjunto numa única parceria. Cada card
            reúne entregas reais e métricas concretas.
          </p>
        </Reveal>
      </div>

      <div
        style={{
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} service={s} index={i} />
        ))}
      </div>

      <style>{`
        /* CSS-driven continuous animations — GPU-accelerated, no JS per frame */
        @keyframes svcHaloSpin { to { transform: rotate(360deg); } }
        .service-icon-glow { animation: svcHaloSpin 22s linear infinite; }

        @keyframes svcImgFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        .service-icon-img { animation: svcImgFloat 4.5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .service-icon-glow,
          .service-icon-img { animation: none !important; }
        }

        .service-card:hover {
          border-color: rgba(127,182,164,0.32) !important;
          box-shadow:
            0 36px 80px rgba(0,0,0,0.65),
            0 0 50px rgba(127,182,164,0.14),
            inset 0 1px 0 rgba(255,255,255,0.10) !important;
          transform: translate3d(0, -3px, 0);
        }
        .service-card:hover .card-spotlight { opacity: 1; }
        .service-card:hover .service-icon {
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.30),
            0 22px 44px rgba(0,0,0,0.55),
            0 0 36px rgba(127,182,164,0.30);
          filter: brightness(1.10);
        }
        .service-card:hover .card-arrow {
          transform: rotate(45deg) translate(2px, 2px);
          background: rgba(127,182,164,0.20);
          color: #e8f3ef;
          border-color: rgba(187,224,210,0.45);
        }
        .service-card:hover .card-scan {
          opacity: 1;
          animation: cardScan 1.4s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes cardScan {
          0%   { top: 0; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @media (max-width: 880px) {
          .services-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            align-items: start !important;
          }
          .services-header > div:nth-child(2) p {
            justify-self: start !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card:hover { transform: none; }
          .card-scan { display: none; }
        }
      `}</style>
    </section>
  );
}
