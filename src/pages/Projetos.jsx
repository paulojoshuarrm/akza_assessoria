import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Reveal from "../components/Reveal";
import NeuralNoise from "../components/NeuralNoise";

const LiquidMetal = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({ default: m.LiquidMetal }))
);

/* ─── Project mocks ────────────────────────────────────────────── */

const CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "video", label: "Audiovisual" },
  { key: "web", label: "Web" },
  { key: "brand", label: "Brand" },
  { key: "content", label: "Conteúdo" },
  { key: "strategy", label: "Estratégia" },
];

const CAT_COLOR = {
  video:    "#7fb6a4",
  web:      "#bbe0d2",
  brand:    "#9fc7ba",
  content:  "#5fa28e",
  strategy: "#e8f3ef",
};

const PROJECTS = [
  {
    id: 1,
    title: "Site Akza Digital Strategy",
    client: "Akza · Interno",
    year: 2026,
    cat: "web",
    tags: ["Vite", "R3F", "Framer"],
    visual: "browser",
    featured: true,
    desc: "Site institucional com loading cinematográfico, liquid glass effect e portfólio bento.",
  },
  {
    id: 2,
    title: "Vídeo Institucional Akza",
    client: "Akza · Interno",
    year: 2026,
    cat: "video",
    tags: ["Studio", "4K", "Direção"],
    visual: "video",
  },
  {
    id: 3,
    title: "Plataforma Advance Precatórios",
    client: "Advance · Akza Tech",
    year: 2025,
    cat: "web",
    tags: ["React", "Supabase", "Admin"],
    visual: "browser",
  },
  {
    id: 4,
    title: "Reels Brasília Tecnogame",
    client: "Tecnogame 2026",
    year: 2025,
    cat: "video",
    tags: ["Reels", "Captação", "Edit"],
    visual: "video",
  },
  {
    id: 5,
    title: "Brandbook Cadastral Digital",
    client: "Cadastral",
    year: 2025,
    cat: "brand",
    tags: ["Identidade", "Tipografia", "Cor"],
    visual: "brand",
  },
  {
    id: 6,
    title: "Site IECAP Ouvidoria",
    client: "IECAP",
    year: 2025,
    cat: "web",
    tags: ["Vite", "Acessibilidade"],
    visual: "browser",
  },
  {
    id: 7,
    title: "Identidade Union Vision",
    client: "Union",
    year: 2025,
    cat: "brand",
    tags: ["Logo", "Sistema", "Voz"],
    visual: "brand",
  },
  {
    id: 8,
    title: "Site Tecnogame 2026",
    client: "Brasília Tecnogame",
    year: 2025,
    cat: "web",
    tags: ["React", "Animações"],
    visual: "browser",
  },
  {
    id: 9,
    title: "Editorial Estratégia Akza",
    client: "Akza · Conteúdo",
    year: 2025,
    cat: "content",
    tags: ["Editorial", "Design", "PDF"],
    visual: "editorial",
  },
  {
    id: 10,
    title: "Diagnóstico Estratégico IECAP",
    client: "IECAP",
    year: 2025,
    cat: "strategy",
    tags: ["Discovery", "KPIs"],
    visual: "cases",
  },
  {
    id: 13,
    title: "Campanha Conteúdo Tecnogame",
    client: "Brasília Tecnogame",
    year: 2025,
    cat: "content",
    tags: ["Posts", "Reels", "Stories"],
    visual: "editorial",
  },
  {
    id: 14,
    title: "Reels Cadastral Digital",
    client: "Cadastral",
    year: 2025,
    cat: "video",
    tags: ["Reels", "Brand Film"],
    visual: "video",
  },
  {
    id: 15,
    title: "Crescimento Advance",
    client: "Advance",
    year: 2025,
    cat: "strategy",
    tags: ["Growth", "Funnel"],
    visual: "cases",
  },
  {
    id: 16,
    title: "Identidade Brasília Tecnogame",
    client: "Brasília Tecnogame",
    year: 2025,
    cat: "brand",
    tags: ["Logo", "Sistema"],
    visual: "brand",
  },
];

/* ─── Project visual SVGs (varied per category) ────────────────── */

function ProjectVisual({ visual }) {
  const common = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  };
  if (visual === "video") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 150" style={common}>
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
      <svg aria-hidden="true" viewBox="0 0 200 150" style={common}>
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
  if (visual === "browser") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 150" style={common}>
        <rect x="20" y="24" width="160" height="104" rx="6" fill="rgba(10,18,22,0.85)" stroke="rgba(127,182,164,0.25)" />
        <rect x="20" y="24" width="160" height="14" rx="6" fill="rgba(20,32,34,0.95)" />
        <circle cx="30" cy="31" r="1.8" fill="#ff6a5a" />
        <circle cx="36" cy="31" r="1.8" fill="#f7c95c" />
        <circle cx="42" cy="31" r="1.8" fill="#7fb6a4" />
        <rect x="60" y="27" width="100" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
        <text x="65" y="33" fontSize="5" fontFamily="monospace" fill="rgba(127,182,164,0.8)">akza.tech</text>
        <rect x="32" y="50" width="80" height="6" fill="rgba(232,243,239,0.85)" />
        <rect x="32" y="60" width="60" height="4" fill="rgba(232,243,239,0.45)" />
        <rect x="32" y="68" width="50" height="4" fill="rgba(232,243,239,0.30)" />
        <rect x="32" y="80" width="32" height="10" rx="3" fill="#7fb6a4" />
        <rect x="124" y="50" width="44" height="44" rx="4" fill="rgba(127,182,164,0.18)" stroke="rgba(127,182,164,0.40)" />
        <circle cx="146" cy="68" r="6" fill="rgba(232,243,239,0.7)" />
        <path d="M132 90 L142 78 L152 86 L165 70 L165 94 L132 94 Z" fill="rgba(232,243,239,0.50)" />
      </svg>
    );
  }
  if (visual === "brand") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 150" style={common}>
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
  // cases — chart
  return (
    <svg aria-hidden="true" viewBox="0 0 200 150" style={common}>
      <rect x="22" y="28" width="156" height="98" rx="6" fill="rgba(10,18,22,0.7)" stroke="rgba(127,182,164,0.25)" />
      <line x1="34" y1="100" x2="166" y2="100" stroke="rgba(255,255,255,0.10)" />
      <line x1="34" y1="80" x2="166" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="2,3" />
      <line x1="34" y1="60" x2="166" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="2,3" />
      <path d="M34 92 L54 84 L74 78 L94 64 L114 56 L134 50 L154 38 L166 32 L166 100 L34 100 Z" fill="url(#caseGradP)" opacity="0.65" />
      <path d="M34 92 L54 84 L74 78 L94 64 L114 56 L134 50 L154 38 L166 32" fill="none" stroke="#7fb6a4" strokeWidth="1.5" />
      <defs>
        <linearGradient id="caseGradP" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb6a4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7fb6a4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x="34" y="46" fontSize="6" fontFamily="monospace" fill="rgba(127,182,164,0.9)">+47% growth</text>
      <text x="34" y="118" fontSize="5" fontFamily="monospace" fill="rgba(232,243,239,0.5)">jan · fev · mar · abr</text>
    </svg>
  );
}

/* ─── Project tile with liquid glass treatment ─────────────────── */

function ProjectTile({ project, index }) {
  const cat = CATEGORIES.find((c) => c.key === project.cat);
  const accent = CAT_COLOR[project.cat] || "#7fb6a4";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{
        duration: 0.55,
        delay: 0.04 * (index % 6),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`project-tile ${project.featured ? "is-featured" : ""}`}
      data-cursor="hover"
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid rgba(127,182,164,0.18)",
        background:
          "linear-gradient(180deg, rgba(20,30,32,0.85) 0%, rgba(15,21,22,0.92) 100%)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition:
          "border-color 400ms ease, box-shadow 500ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
      }}
    >
      {/* Visual area */}
      <div
        style={{
          position: "relative",
          height: project.featured ? 280 : 180,
          backgroundImage:
            "url('/materiais/bg-glass-panel.jpg'), linear-gradient(135deg, rgba(31,74,62,0.85), rgba(7,14,16,0.95))",
          backgroundSize: "cover, auto",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          overflow: "hidden",
          borderBottom: "1px solid rgba(127,182,164,0.12)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(7,12,14,0.10) 0%, rgba(7,12,14,0.65) 100%)",
            zIndex: 1,
          }}
        />
        <ProjectVisual visual={project.visual} />

        {/* corner glow */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}33, transparent 65%)`,
            filter: "blur(28px)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* category accent pill */}
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 3,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(7,9,10,0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${accent}55`,
            borderRadius: 999,
            padding: "5px 11px",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: accent,
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
              background: accent,
              boxShadow: `0 0 8px ${accent}`,
            }}
          />
          {cat?.label}
        </span>

        {/* year badge */}
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 3,
            background: "rgba(7,9,10,0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 999,
            padding: "5px 11px",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--fg-2)",
            letterSpacing: "0.08em",
          }}
        >
          {project.year}
        </span>

        {/* hover arrow */}
        <span
          aria-hidden="true"
          className="project-arrow"
          style={{
            position: "absolute",
            bottom: 14,
            right: 14,
            zIndex: 3,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(187,224,210,0.92)",
            color: "#05090a",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            opacity: 0,
            transform: "translate(8px, 8px) scale(0.85)",
            transition:
              "opacity 320ms ease, transform 480ms cubic-bezier(0.22,1,0.36,1)",
            boxShadow: "0 8px 22px rgba(0,0,0,0.4)",
          }}
        >
          ↗
        </span>

        {/* hover shine */}
        <div
          aria-hidden="true"
          className="project-shine"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 0%, rgba(187,224,210,0.30), transparent 50%)",
            opacity: 0,
            transition: "opacity 500ms ease",
            zIndex: 2,
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: project.featured ? "26px 26px 24px" : "22px 22px 20px" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: project.featured ? "clamp(22px, 2.2vw, 28px)" : 17,
            color: "var(--fg-1)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {project.title}
        </h3>
        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
            letterSpacing: "0.06em",
          }}
        >
          {project.client}
        </div>
        {project.featured && project.desc && (
          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              color: "var(--fg-2)",
              lineHeight: 1.55,
              maxWidth: 540,
            }}
          >
            {project.desc}
          </p>
        )}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.06em",
                color: "var(--fg-2)",
                padding: "4px 9px",
                borderRadius: 999,
                background: "rgba(15,21,22,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */

export default function Projetos() {
  const location = useLocation();

  // Honour /projetos#<cat> as a deep-linkable filter.
  const initialCat = useMemo(() => {
    const hash = location.hash.replace("#", "");
    return CATEGORIES.some((c) => c.key === hash) ? hash : "all";
  }, []);
  const [active, setActive] = useState(initialCat);
  const [query, setQuery] = useState("");

  // Apply hash changes after mount too (for deep-link navigations between cards)
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (CATEGORIES.some((c) => c.key === hash)) setActive(hash);
  }, [location.hash]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const counts = useMemo(() => {
    const map = { all: PROJECTS.length };
    for (const p of PROJECTS) map[p.cat] = (map[p.cat] || 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    let list = PROJECTS;
    if (active !== "all") list = list.filter((p) => p.cat === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [active, query]);

  // Place featured first if present in current filter
  const ordered = useMemo(() => {
    const featured = filtered.find((p) => p.featured);
    if (!featured) return filtered;
    return [featured, ...filtered.filter((p) => p.id !== featured.id)];
  }, [filtered]);

  return (
    <>
      {/* Page-wide neural shader — fixed, mounted at page-shell level so it
          sits behind <main> (z-10) but above the body backdrop. Akza-tinted. */}
      <NeuralNoise
        color={[0.50, 0.78, 0.66]}
        opacity={0.45}
        speed={0.0006}
        zIndex={1}
      />

      <main id="main" className="relative z-10">
        {/* Page hero */}
      <section
        aria-labelledby="proj-title"
        style={{
          position: "relative",
          padding: "120px 0 24px",
          overflow: "hidden",
        }}
      >
        {/* Backdrop */}
        <div aria-hidden="true" className="proj-backdrop">
          <div className="proj-blob proj-blob-1" />
          <div className="proj-blob proj-blob-2" />
          <div className="proj-blob proj-blob-3" />
          <div className="proj-grid-bg" />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
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
              Galeria · Akza Studio
            </span>
          </Reveal>
          <Reveal
            as="h1"
            id="proj-title"
            delay={0.1}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px, 6.5vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--fg-1)",
              margin: "16px 0 0",
              maxWidth: 920,
            }}
          >
            Todos os{" "}
            <span className="text-gradient-akza">trabalhos</span>{" "}
            que entregamos.
          </Reveal>
          <Reveal delay={0.2}>
            <p
              style={{
                marginTop: 18,
                fontSize: "clamp(15px, 1.4vw, 17px)",
                color: "var(--fg-2)",
                lineHeight: 1.6,
                maxWidth: 640,
              }}
            >
              Filtre por categoria ou busque por marca / tecnologia. Cada
              card abaixo é um projeto real que combina comunicação,
              tecnologia e estratégia da Akza.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter strip */}
      <section
        aria-label="Filtros"
        style={{
          position: "sticky",
          top: 80,
          zIndex: 20,
          padding: "20px 24px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 16,
              padding: "12px 14px",
              borderRadius: 999,
              background: "rgba(10,18,22,0.78)",
              border: "1px solid rgba(127,182,164,0.20)",
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)",
              alignItems: "center",
            }}
            className="filter-bar"
          >
            <div
              role="tablist"
              aria-label="Filtrar por categoria"
              className="filter-chips"
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {CATEGORIES.map((c) => {
                const isActive = active === c.key;
                const count = counts[c.key] || 0;
                return (
                  <button
                    key={c.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    data-cursor="hover"
                    onClick={() => setActive(c.key)}
                    className={`filter-chip ${isActive ? "is-active" : ""}`}
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 16px",
                      borderRadius: 999,
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: 13,
                      cursor: "pointer",
                      border: isActive
                        ? "1px solid transparent"
                        : "1px solid rgba(255,255,255,0.06)",
                      background: isActive
                        ? "linear-gradient(135deg, #e8f3ef 0%, #bbe0d2 100%)"
                        : "transparent",
                      color: isActive ? "#05090a" : "var(--fg-2)",
                      transition:
                        "background 280ms ease, color 280ms ease, border-color 280ms ease, transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms ease",
                      boxShadow: isActive
                        ? "0 8px 24px rgba(127,182,164,0.35)"
                        : "none",
                    }}
                  >
                    {c.label}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        opacity: isActive ? 0.7 : 0.5,
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="filter-search"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(15,21,22,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                minWidth: 240,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mint-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar marca, stack..."
                aria-label="Buscar projetos"
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--fg-1)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  width: "100%",
                  letterSpacing: "0.04em",
                }}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Grid */}
      <section style={{ padding: "20px 24px 40px", maxWidth: 1280, margin: "0 auto" }}>
        {ordered.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color: "var(--fg-3)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          >
            Nenhum projeto encontrado para esta combinação.
          </div>
        ) : (
          <motion.div
            layout
            className="projects-grid"
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            <AnimatePresence mode="popLayout">
              {ordered.map((p, i) => (
                <div
                  key={p.id}
                  className={p.featured ? "grid-featured" : ""}
                  style={
                    p.featured
                      ? {
                          gridColumn: "span 2",
                        }
                      : {}
                  }
                >
                  <ProjectTile project={p} index={i} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Closing block — LiquidMetal CTA */}
      <section style={{ padding: "40px 24px 100px", maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div
            className="liquid-cta"
            style={{
              position: "relative",
              borderRadius: 32,
              overflow: "hidden",
              minHeight: 280,
              border: "1px solid rgba(127,182,164,0.22)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.55), 0 0 80px rgba(127,182,164,0.10), inset 0 1px 0 rgba(255,255,255,0.08)",
              isolation: "isolate",
            }}
          >
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
                  Seu projeto pode estar{" "}
                  <span className="text-gradient-akza">aqui em breve</span>.
                </h3>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.2vw, 16px)",
                    color: "rgba(232,243,239,0.78)",
                    lineHeight: 1.6,
                    margin: "16px 0 0",
                    maxWidth: 520,
                  }}
                >
                  Diagnóstico estratégico, plano de ação e execução integrada
                  — comunicação, tecnologia e estratégia em uma única
                  parceria.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  justifySelf: "end",
                }}
              >
                <a
                  href="/#contato"
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
                    Iniciar um projeto
                    <span aria-hidden="true" className="lcp-arrow">→</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <style>{`
        .proj-backdrop { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .proj-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.6; will-change: transform; }
        .proj-blob-1 {
          top: -10%; left: -8%; width: 50vw; max-width: 720px; height: 50vw; max-height: 720px;
          background: radial-gradient(circle, rgba(127,182,164,0.40), transparent 65%);
          animation: akzaFloat 22s ease-in-out infinite;
        }
        .proj-blob-2 {
          top: 40%; right: -10%; width: 55vw; max-width: 820px; height: 55vw; max-height: 820px;
          background: radial-gradient(circle, rgba(95,162,142,0.32), transparent 65%);
          animation: akzaFloat 26s ease-in-out infinite reverse;
        }
        .proj-blob-3 {
          bottom: -20%; left: 30%; width: 40vw; max-width: 620px; height: 40vw; max-height: 620px;
          background: radial-gradient(circle, rgba(187,224,210,0.20), transparent 65%);
          animation: akzaFloat 28s ease-in-out infinite;
        }
        .proj-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(127,182,164,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,182,164,0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 0%, transparent 75%);
          opacity: 0.50;
        }

        .project-tile:hover {
          transform: translate3d(0, -4px, 0);
          border-color: rgba(127,182,164,0.55);
          box-shadow:
            0 30px 70px rgba(0,0,0,0.60),
            0 0 50px rgba(127,182,164,0.18),
            inset 0 1px 0 rgba(255,255,255,0.10);
        }
        .project-tile:hover .project-arrow {
          opacity: 1 !important;
          transform: translate(0,0) scale(1) !important;
        }
        .project-tile:hover .project-shine { opacity: 1 !important; }

        .filter-chip:not(.is-active):hover {
          color: var(--mint-200);
          border-color: rgba(127,182,164,0.40) !important;
          background: rgba(127,182,164,0.08) !important;
          transform: translateY(-1px);
        }
        .filter-chip:active { transform: translateY(0) scale(0.97); }
        .filter-chip.is-active:hover {
          box-shadow: 0 12px 30px rgba(127,182,164,0.55), 0 0 0 1px rgba(187,224,210,0.55);
          transform: translateY(-1px);
        }

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

        @media (max-width: 880px) {
          .filter-bar {
            grid-template-columns: 1fr !important;
            border-radius: 22px !important;
          }
          .filter-search { min-width: 0 !important; }
          .grid-featured { grid-column: span 1 !important; }
          .liquid-cta-content {
            grid-template-columns: 1fr !important;
            padding: 32px 28px !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 540px) {
          .filter-chips { overflow-x: auto; flex-wrap: nowrap !important; }
          .filter-chips button { flex-shrink: 0; }
        }
      `}</style>
      </main>
    </>
  );
}
