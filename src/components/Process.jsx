import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

/* ─── Process timeline (steps + scroll-driven fill) ─────────────── */

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico\nEstratégico",
    desc: "Análise da presença digital da empresa.",
    duration: "Semana 1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Planejamento",
    desc: "Definição das estratégias digitais alinhadas ao cliente.",
    duration: "2–3 dias",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4v3h6V4" />
        <path d="M8 10h8M8 14h8M8 18h5" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Implementação",
    desc: "Produção de conteúdo, tecnologia e estrutura digital.",
    duration: "Contínuo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Acompanhamento",
    desc: "Monitoramento, indicadores e melhoria contínua.",
    duration: "Mensal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
        <circle cx="11" cy="10" r="1.6" fill="currentColor" />
        <circle cx="20" cy="9" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
];

function ProcessTimeline() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const stepGlow1 = useTransform(scrollYProgress, [0.0, 0.06], [0, 1]);
  const stepGlow2 = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const stepGlow3 = useTransform(scrollYProgress, [0.62, 0.72], [0, 1]);
  const stepGlow4 = useTransform(scrollYProgress, [0.94, 1.0], [0, 1]);
  const stepGlows = [stepGlow1, stepGlow2, stepGlow3, stepGlow4];

  const stepColor1 = useTransform(stepGlow1, [0, 1], ["#7a8f8d", "#bbc9c7"]);
  const stepColor2 = useTransform(stepGlow2, [0, 1], ["#7a8f8d", "#bbc9c7"]);
  const stepColor3 = useTransform(stepGlow3, [0, 1], ["#7a8f8d", "#bbc9c7"]);
  const stepColor4 = useTransform(stepGlow4, [0, 1], ["#7a8f8d", "#bbc9c7"]);
  const stepColors = [stepColor1, stepColor2, stepColor3, stepColor4];

  const stepStroke1 = useTransform(stepGlow1, [0, 1], [0.4, 1]);
  const stepStroke2 = useTransform(stepGlow2, [0, 1], [0.4, 1]);
  const stepStroke3 = useTransform(stepGlow3, [0, 1], [0.4, 1]);
  const stepStroke4 = useTransform(stepGlow4, [0, 1], [0.4, 1]);
  const stepStrokes = [stepStroke1, stepStroke2, stepStroke3, stepStroke4];

  const iconOpacity1 = useTransform(stepGlow1, [0, 1], [0.55, 1]);
  const iconOpacity2 = useTransform(stepGlow2, [0, 1], [0.55, 1]);
  const iconOpacity3 = useTransform(stepGlow3, [0, 1], [0.55, 1]);
  const iconOpacity4 = useTransform(stepGlow4, [0, 1], [0.55, 1]);
  const iconOpacities = [iconOpacity1, iconOpacity2, iconOpacity3, iconOpacity4];

  return (
    <div ref={trackRef}>
      {/* Section header — 2 col like Services / Portfolio */}
      <div
        className="processo-header"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 32,
          alignItems: "end",
          marginBottom: 48,
        }}
      >
        <div>
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
            Como funciona
          </span>
          <h2
            id="processo-title"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              color: "var(--fg-1)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              margin: "12px 0 0",
              maxWidth: 720,
            }}
          >
            Trabalhar com a{" "}
            <span className="text-gradient-akza">AKZA é simples</span>.
          </h2>
        </div>
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
          Quatro etapas claras, do diagnóstico ao acompanhamento mensal.
          Cada uma com escopo definido e duração prevista — sem surpresas.
        </p>
      </div>

      <ol
        className="process-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          position: "relative",
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {/* Track */}
        <div
          aria-hidden="true"
          className="process-line"
          style={{
            position: "absolute",
            top: 7,
            left: 7,
            right: 7,
            height: 2,
            borderRadius: 999,
            background: "rgba(127,182,164,0.12)",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: fillWidth,
              background:
                "linear-gradient(90deg, #5fa28e 0%, #7fb6a4 50%, #bbe0d2 100%)",
              boxShadow: "0 0 12px rgba(127,182,164,0.55)",
              borderRadius: "inherit",
            }}
          />
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: fillWidth,
              transform: "translate(-50%, -50%)",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#bbe0d2",
              boxShadow:
                "0 0 0 4px rgba(127,182,164,0.20), 0 0 14px rgba(187,224,210,0.85)",
            }}
          />
        </div>

        {STEPS.map((s, i) => (
          <li key={s.n} className="process-step" style={{ position: "relative" }}>
            {/* Bullet */}
            <div
              aria-hidden="true"
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "rgba(28,40,42,0.85)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <motion.span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -1,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 30% 30%, #bbe0d2, #5fa28e)",
                  border: "1px solid rgba(187,224,210,0.6)",
                  boxShadow:
                    "0 0 0 5px rgba(127,182,164,0.18), 0 0 18px rgba(127,182,164,0.55)",
                  opacity: stepGlows[i],
                }}
              />
            </div>

            <div
              className="process-step-card"
              style={{
                marginTop: 20,
                padding: 20,
                borderRadius: 18,
                background:
                  "linear-gradient(180deg, rgba(20,30,32,0.7) 0%, rgba(10,18,22,0.7) 100%)",
                border: "1px solid rgba(127,182,164,0.10)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition:
                  "border-color 320ms ease, transform 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <motion.span
                  className="process-icon"
                  style={{
                    display: "inline-flex",
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background:
                      "radial-gradient(120% 120% at 30% 20%, rgba(187,224,210,0.18), rgba(15,42,40,0.6))",
                    border: "1px solid rgba(127,182,164,0.20)",
                    color: "var(--mint-200)",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
                    opacity: iconOpacities[i],
                  }}
                >
                  {s.icon}
                </motion.span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "var(--mint-300)",
                    background: "rgba(127,182,164,0.10)",
                    border: "1px solid rgba(127,182,164,0.25)",
                    borderRadius: 999,
                    padding: "3px 8px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.duration}
                </span>
              </div>
              <motion.div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: stepColors[i],
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <motion.span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 1,
                    background: "var(--mint-300)",
                    opacity: stepStrokes[i],
                  }}
                />
                {s.n}
              </motion.div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "var(--fg-1)",
                  marginTop: 6,
                  whiteSpace: "pre-line",
                  lineHeight: 1.2,
                  margin: "6px 0 0",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--fg-3)",
                  marginTop: 10,
                  lineHeight: 1.55,
                  margin: "10px 0 0",
                }}
              >
                {s.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <style>{`
        .process-step:hover .process-step-card { border-color: rgba(127,182,164,0.30); transform: translate3d(0, -2px, 0); box-shadow: 0 14px 30px rgba(0,0,0,0.4), 0 0 24px rgba(127,182,164,0.10); }
        @media (max-width: 980px) {
          .processo-header { grid-template-columns: 1fr !important; gap: 16px !important; align-items: start !important; }
          .processo-header > p { justify-self: start !important; }
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 28px !important; }
          .process-line { display: none; }
        }
        @media (max-width: 540px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Testimonials slider ──────────────────────────────────────── */

const QUOTES = [
  {
    text:
      "Nossa presença digital mudou completamente depois da AKZA. Hoje temos comunicação profissional e processos organizados.",
    name: "Marta Octavo",
    role: "Diretora",
    company: "Octavo Consultoria",
    rating: 5,
  },
  {
    text:
      "Ter tudo centralizado em uma única equipe fez muita diferença na nossa rotina e nos resultados que entregamos.",
    name: "Rafael Souza",
    role: "Founder",
    company: "Souza Digital",
    rating: 5,
  },
  {
    text:
      "A entrega foi muito além do esperado. A AKZA entendeu nossa marca e construiu uma narrativa que conversa diretamente com o nosso público.",
    name: "Julia Mendes",
    role: "CMO",
    company: "TechVision",
    rating: 5,
  },
  {
    text:
      "Em 6 meses dobramos o engajamento nas redes sociais. O time é estratégico e executor ao mesmo tempo — coisa rara.",
    name: "Carlos Andrade",
    role: "CEO",
    company: "Conexão Brasil",
    rating: 5,
  },
  {
    text:
      "Os indicadores chegaram organizados e com sentido. Pela primeira vez consegui apresentar resultados claros pra diretoria.",
    name: "Patricia Lima",
    role: "Diretora de Marketing",
    company: "Verde Capital",
    rating: 5,
  },
  {
    text:
      "Site novo, identidade renovada, conteúdo consistente. Não foi um projeto pontual — virou parceria de verdade.",
    name: "Gustavo Ribeiro",
    role: "Founder",
    company: "Studio Plural",
    rating: 5,
  },
  {
    text:
      "Diagnóstico afiado, implementação rápida, acompanhamento mensal sem rodeios. AKZA é o tipo de parceria que faz diferença.",
    name: "Lara Cunha",
    role: "Head of Growth",
    company: "Núcleo Sage",
    rating: 5,
  },
];

function Stars({ n = 5 }) {
  return (
    <div
      aria-label={`Avaliação ${n} de 5`}
      style={{ display: "inline-flex", gap: 2, color: "#bbe0d2" }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: 14,
            opacity: i < n ? 1 : 0.25,
            textShadow: i < n ? "0 0 8px rgba(127,182,164,0.55)" : "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ name }) {
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [name]
  );
  return (
    <div
      aria-hidden="true"
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 30% 30%, #bbe0d2, #5fa28e 60%, #1f3531)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.30), 0 4px 12px rgba(0,0,0,0.4)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 15,
        color: "rgba(7,12,14,0.85)",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ q, isActive }) {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        borderRadius: 28,
        padding: "32px 36px 30px",
        background:
          "linear-gradient(180deg, rgba(22,32,34,0.92) 0%, rgba(14,22,26,0.92) 100%)",
        border: "1px solid rgba(127,182,164,0.20)",
        boxShadow:
          "0 28px 70px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px rgba(127,182,164,0.05)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        userSelect: "none",
      }}
    >
      {/* accent bar */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: "linear-gradient(180deg, #bbe0d2, #5fa28e)",
          opacity: isActive ? 0.85 : 0.4,
          transition: "opacity 320ms ease",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(127,182,164,0.20), transparent 65%)",
          filter: "blur(34px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 72,
            color: "var(--mint-300)",
            lineHeight: 0.7,
            textShadow: "0 0 30px rgba(127,182,164,0.55)",
          }}
        >
          "
        </span>
        <Stars n={q.rating} />
      </div>

      <blockquote
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(16px, 1.5vw, 19px)",
          color: "var(--fg-1)",
          lineHeight: 1.55,
          letterSpacing: "-0.01em",
          margin: 0,
          flex: 1,
        }}
      >
        {q.text}
      </blockquote>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingTop: 20,
          borderTop: "1px dashed rgba(127,182,164,0.18)",
        }}
      >
        <Avatar name={q.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              color: "var(--fg-1)",
            }}
          >
            {q.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--mint-300)",
              marginTop: 3,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {q.role} · {q.company}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSlider() {
  const len = QUOTES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Layout measurement — keep cardWidth and viewport width in state
  const viewportRef = useRef(null);
  const [vp, setVp] = useState({ w: 0, card: 560, gap: 24 });

  useEffect(() => {
    const update = () => {
      const w = viewportRef.current?.getBoundingClientRect().width || 0;
      // Card width: ~62% of viewport, capped at 640
      const card = Math.min(640, Math.max(280, Math.round(w * 0.62)));
      const gap = w > 720 ? 28 : 18;
      setVp({ w, card, gap });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % len);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, len]);

  const next = () => setActive((v) => (v + 1) % len);
  const prev = () => setActive((v) => (v - 1 + len) % len);

  const sidePad = Math.max(0, (vp.w - vp.card) / 2);
  const trackX = sidePad - active * (vp.card + vp.gap);

  return (
    <div
      className="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <div
        className="testimonials-header"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 32,
          alignItems: "end",
          marginBottom: 36,
        }}
      >
        <div>
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
            Depoimentos
          </span>
          <h2
            id="depoimentos-title"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              color: "var(--fg-1)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              margin: "12px 0 0",
              maxWidth: 720,
            }}
          >
            O que nossos{" "}
            <span className="text-gradient-akza">clientes</span> dizem.
          </h2>
        </div>
        <div
          className="t-controls"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Depoimento anterior"
            data-cursor="hover"
            className="t-arrow"
          >
            ←
          </button>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-3)",
              minWidth: 64,
              textAlign: "center",
              letterSpacing: "0.08em",
            }}
          >
            {String(active + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo depoimento"
            data-cursor="hover"
            className="t-arrow"
          >
            →
          </button>
        </div>
      </div>

      {/* Viewport — full width with side mask for the peek effect */}
      <div
        ref={viewportRef}
        className="t-viewport"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "12px 0",
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        }}
      >
        <motion.div
          className="t-track"
          drag="x"
          dragElastic={0.18}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            const threshold = 80;
            if (info.offset.x < -threshold) next();
            else if (info.offset.x > threshold) prev();
          }}
          animate={{ x: trackX }}
          transition={{ type: "spring", stiffness: 220, damping: 32 }}
          style={{
            display: "flex",
            gap: vp.gap,
            cursor: "grab",
            willChange: "transform",
          }}
        >
          {QUOTES.map((q, i) => {
            const isActive = i === active;
            const isAdjacent = Math.abs(i - active) === 1;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isActive ? 1 : isAdjacent ? 0.92 : 0.86,
                  opacity: isActive ? 1 : isAdjacent ? 0.55 : 0.3,
                  filter: isActive ? "blur(0px)" : "blur(0.5px)",
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => !isActive && setActive(i)}
                style={{
                  flex: `0 0 ${vp.card}px`,
                  cursor: isActive ? "grab" : "pointer",
                  willChange: "transform, opacity",
                }}
              >
                <TestimonialCard q={q} isActive={isActive} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination + progress */}
      <div
        style={{
          marginTop: 26,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          role="tablist"
          aria-label="Navegação dos depoimentos"
          style={{
            display: "flex",
            gap: 6,
          }}
        >
          {QUOTES.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Depoimento ${i + 1}`}
                data-cursor="hover"
                onClick={() => setActive(i)}
                className="t-dot"
                style={{
                  width: isActive ? 32 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  background: isActive
                    ? "linear-gradient(90deg, #bbe0d2, #7fb6a4)"
                    : "rgba(127,182,164,0.25)",
                  cursor: "pointer",
                  padding: 0,
                  transition:
                    "width 380ms cubic-bezier(0.22,1,0.36,1), background 320ms ease, opacity 240ms ease",
                  opacity: isActive ? 1 : 0.7,
                  boxShadow: isActive
                    ? "0 0 12px rgba(127,182,164,0.55)"
                    : "none",
                }}
              />
            );
          })}
        </div>
        <div
          aria-hidden="true"
          style={{
            height: 1,
            width: 220,
            background: "rgba(127,182,164,0.10)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {!paused && (
            <motion.div
              key={active}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: "linear" }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #5fa28e, #bbe0d2)",
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        .t-arrow {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background: rgba(15,21,22,0.6);
          border: 1px solid rgba(127,182,164,0.30);
          color: var(--fg-1);
          font-family: var(--font-mono);
          font-size: 16px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 240ms ease, transform 240ms ease, border-color 240ms ease;
        }
        .t-arrow:hover {
          background: rgba(127,182,164,0.18);
          transform: translateY(-1px);
          border-color: rgba(187,224,210,0.55);
        }
        .t-arrow:active { transform: translateY(0) scale(0.96); }
        .t-track:active { cursor: grabbing !important; }

        @media (max-width: 980px) {
          .testimonials-header {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            align-items: start !important;
          }
          .t-controls { justify-content: flex-start !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-track > div { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────────── */

export default function Process() {
  return (
    <section
      id="processo"
      aria-labelledby="processo-title"
      style={{
        padding: "60px 24px 100px",
        maxWidth: 1280,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* soft Akza glow */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 60,
          left: -100,
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
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 60,
          right: -100,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(127,182,164,0.08), transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative" }}>
        <Reveal>
          <ProcessTimeline />
        </Reveal>

        <div
          aria-hidden="true"
          style={{
            margin: "80px auto 64px",
            height: 1,
            width: "100%",
            maxWidth: 720,
            background:
              "linear-gradient(90deg, transparent, rgba(127,182,164,0.30), transparent)",
          }}
        />

        <Reveal delay={0.1}>
          <TestimonialsSlider />
        </Reveal>
      </div>
    </section>
  );
}
