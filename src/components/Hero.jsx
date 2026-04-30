import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * ElegantShape — soft elongated capsule with Akza-tinted gradient + blur.
 * Adapted from the HeroGeometric pattern; uses inline styles + framer-motion.
 */
function ElegantShape({
  ready = true,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient,
  depth = 1,
  mx,
  my,
  style = {},
}) {
  // Mouse-driven parallax. Each shape gets a depth weighting so closer
  // shapes (depth > 1) drift further than distant ones.
  const px = useTransform(mx, (v) => v * depth * 42);
  const py = useTransform(my, (v) => v * depth * 28);
  const tilt = useTransform(mx, (v) => v * depth * 2.4);

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={ready ? { opacity: 1, y: 0, rotate } : { opacity: 0, y: -150, rotate: rotate - 15 }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      style={{ position: "absolute", ...style }}
    >
      {/* Mouse-parallax layer — translates + tilts in response to cursor */}
      <motion.div
        style={{ x: px, y: py, rotate: tilt, willChange: "transform" }}
      >
        {/* Continuous float layer */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ width, height, position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 9999,
              background: gradient,
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              border: "2px solid rgba(187,224,210,0.18)",
              boxShadow:
                "0 8px 32px 0 rgba(127,182,164,0.18), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 9999,
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22), transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function HeroBackdrop() {
  // Ambient layer — green blobs covering all four corners + base wash + soft grid.
  return (
    <div aria-hidden="true" className="hero-backdrop">
      {/* Full-screen base wash so no corner ever falls to flat black */}
      <div className="hero-wash" />
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />
      <div className="hero-blob hero-blob-4" />
      <div className="hero-grid" />
      <style>{`
        .hero-backdrop { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .hero-wash {
          position: absolute; inset: 0;
          background:
            radial-gradient(80% 70% at 50% 50%, rgba(95,162,142,0.10), transparent 80%),
            linear-gradient(180deg, rgba(15,42,40,0.30) 0%, rgba(7,14,16,0.50) 100%);
        }
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.85;
          will-change: transform;
        }
        .hero-blob-1 {
          top: -20%; left: -10%; width: 60vw; max-width: 900px; height: 60vw; max-height: 900px;
          background: radial-gradient(circle, rgba(127,182,164,0.50), transparent 65%);
          animation: akzaFloat 18s ease-in-out infinite;
        }
        .hero-blob-2 {
          top: 5%; right: -12%; width: 65vw; max-width: 980px; height: 65vw; max-height: 980px;
          background: radial-gradient(circle, rgba(95,162,142,0.42), transparent 65%);
          animation: akzaFloat 22s ease-in-out infinite reverse;
        }
        .hero-blob-3 {
          bottom: -20%; right: 8%; width: 55vw; max-width: 820px; height: 55vw; max-height: 820px;
          background: radial-gradient(circle, rgba(187,224,210,0.26), transparent 65%);
          animation: akzaFloat 26s ease-in-out infinite;
        }
        .hero-blob-4 {
          bottom: -18%; left: -8%; width: 60vw; max-width: 880px; height: 60vw; max-height: 880px;
          background: radial-gradient(circle, rgba(127,182,164,0.38), transparent 65%);
          animation: akzaFloat 24s ease-in-out infinite reverse;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(127,182,164,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,182,164,0.06) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 75% at 50% 50%, #000 10%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 80% 75% at 50% 50%, #000 10%, transparent 85%);
          opacity: 0.45;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-blob { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function HeroShapes({ ready }) {
  // Shared mouse motion values (-1..1 across the viewport), smoothed by a
  // spring so the shapes don't jitter directly with the raw pointer.
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18, mass: 0.6 });

  // Mobile detection — drop to a slimmer arrangement that keeps the
  // capsules anchored to the viewport edges, never crossing the title.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mxRaw.set(x);
      myRaw.set(y);
    };
    const onTouch = (e) => {
      const t = e.targetTouches?.[0];
      if (!t) return;
      const x = (t.clientX / window.innerWidth - 0.5) * 2;
      const y = (t.clientY / window.innerHeight - 0.5) * 2;
      mxRaw.set(x);
      myRaw.set(y);
    };
    const onLeave = () => {
      mxRaw.set(0);
      myRaw.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [mxRaw, myRaw]);

  // Two layouts:
  //   • Desktop (≥721px): five capsules spread across the hero with depth.
  //   • Mobile (≤720px): three smaller capsules pinned to opposite edges
  //     so they read as decorative accents instead of clutter behind text.
  const SHAPES_DESKTOP = [
    { delay: 0.3, width: 600, height: 140, rotate: 12,  depth: 1.4, gradient: "linear-gradient(to right, rgba(127,182,164,0.22), transparent)", style: { left:  "-5%",  top:    "20%" } },
    { delay: 0.5, width: 500, height: 120, rotate: -15, depth: 1.2, gradient: "linear-gradient(to right, rgba(95,162,142,0.22), transparent)", style: { right: "-2%",  top:    "72%" } },
    { delay: 0.4, width: 300, height: 80,  rotate: -8,  depth: 0.7, gradient: "linear-gradient(to right, rgba(187,224,210,0.20), transparent)", style: { left:  "10%",  bottom: "10%" } },
    { delay: 0.6, width: 200, height: 60,  rotate: 20,  depth: 1.6, gradient: "linear-gradient(to right, rgba(159,199,186,0.20), transparent)", style: { right: "18%",  top:    "14%" } },
    { delay: 0.7, width: 150, height: 40,  rotate: -25, depth: 0.5, gradient: "linear-gradient(to right, rgba(232,243,239,0.14), transparent)", style: { left:  "26%",  top:    "8%"  } },
  ];

  const SHAPES_MOBILE = [
    { delay: 0.35, width: 260, height: 60, rotate: 12,  depth: 1.0, gradient: "linear-gradient(to right, rgba(127,182,164,0.20), transparent)", style: { left:  "-35%", top:    "8%"  } },
    { delay: 0.55, width: 240, height: 56, rotate: -15, depth: 1.0, gradient: "linear-gradient(to right, rgba(95,162,142,0.20), transparent)", style: { right: "-32%", bottom: "12%" } },
    { delay: 0.45, width: 140, height: 38, rotate: -8,  depth: 0.6, gradient: "linear-gradient(to right, rgba(187,224,210,0.18), transparent)", style: { right: "-10%", top:    "44%" } },
  ];

  const shapes = isMobile ? SHAPES_MOBILE : SHAPES_DESKTOP;

  return (
    <div aria-hidden="true" className="hero-shapes">
      {shapes.map((s, i) => (
        <ElegantShape
          key={`${isMobile ? "m" : "d"}-${i}`}
          ready={ready}
          delay={s.delay}
          width={s.width}
          height={s.height}
          rotate={s.rotate}
          depth={s.depth}
          mx={mx}
          my={my}
          gradient={s.gradient}
          style={s.style}
        />
      ))}
      <style>{`
        .hero-shapes { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
      `}</style>
    </div>
  );
}

function StaggeredHeading({ ready }) {
  const lines = [
    ["Estruturamos", "e"],
    ["amplificamos", "a"],
    ["presença", "*digital*"],
  ];
  let idx = 0;
  return (
    <h1
      id="hero-title"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "clamp(40px, 7vw, 80px)",
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        color: "var(--fg-1)",
        margin: 0,
      }}
    >
      {lines.map((row, ri) => (
        <span
          key={ri}
          style={{
            display: "block",
            overflow: "hidden",
            paddingBottom: "0.22em",
            marginBottom: "-0.15em",
          }}
        >
          {row.map((word, wi) => {
            const isItalic = word.startsWith("*");
            const text = isItalic ? word.replace(/\*/g, "") : word;
            const delay = 0.08 * idx++ + 0.15;
            return (
              <span
                key={wi}
                className={`hero-word ${isItalic ? "text-gradient-akza" : ""}`}
                style={{
                  display: "inline-block",
                  marginRight: wi === row.length - 1 ? 0 : "0.28em",
                  animation: `akzaWordIn 0.95s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
                  animationPlayState: ready ? "running" : "paused",
                  fontFamily: isItalic ? "var(--font-serif)" : undefined,
                  fontStyle: isItalic ? "italic" : undefined,
                  fontWeight: isItalic ? 400 : undefined,
                }}
              >
                {text}
              </span>
            );
          })}
        </span>
      ))}
      <style>{`
        @keyframes akzaWordIn {
          from { transform: translate3d(0, 110%, 0); opacity: 0; }
          to   { transform: translate3d(0, 0, 0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-word { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </h1>
  );
}

/**
 * ShinyButton — adapted from the magicui ShinyButton spec.
 * Animates a CSS variable --x continuously to drive a shimmer mask + border shine.
 */
const shinyAnimation = {
  initial: { "--x": "100%" },
  animate: { "--x": "-100%" },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
  },
};

function ShinyButton({ children, href }) {
  return (
    <motion.a
      {...shinyAnimation}
      href={href}
      data-cursor="hover"
      whileHover={{
        scale: 1.03,
        y: -2,
        transition: { type: "spring", stiffness: 320, damping: 18 },
      }}
      whileTap={{
        scale: 0.97,
        transition: { type: "spring", stiffness: 600, damping: 20 },
      }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "15px 28px",
        minHeight: 44,
        borderRadius: 999,
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 14,
        textDecoration: "none",
        color: "var(--bg-0)",
        background: "linear-gradient(135deg, #e8f3ef 0%, #bbe0d2 100%)",
        boxShadow:
          "0 16px 36px rgba(127,182,164,0.35), inset 0 1px 0 rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflow: "hidden",
        transition: "box-shadow 280ms ease",
      }}
      className="shiny-cta"
    >
      <span
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          maskImage:
            "linear-gradient(-75deg, #000 calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #000 calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg, #000 calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #000 calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      {/* Shiny border sweep — pixel-thin gradient ring with mask-composite cut */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          borderRadius: "inherit",
          padding: 1,
          background:
            "linear-gradient(-75deg, rgba(127,182,164,0.18) calc(var(--x) + 20%), rgba(127,182,164,0.85) calc(var(--x) + 25%), rgba(127,182,164,0.18) calc(var(--x) + 100%))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />
      {/* Glow ring — pulses on hover */}
      <span
        aria-hidden="true"
        className="shiny-glow"
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: "inherit",
          background:
            "radial-gradient(circle, rgba(127,182,164,0.55), transparent 65%)",
          opacity: 0,
          filter: "blur(14px)",
          pointerEvents: "none",
          zIndex: -1,
          transition: "opacity 320ms ease",
        }}
      />
      <style>{`
        .shiny-cta:hover {
          box-shadow:
            0 24px 56px rgba(127,182,164,0.65),
            0 0 0 1px rgba(187,224,210,0.55),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }
        .shiny-cta:hover .shiny-glow { opacity: 1; }
        .shiny-cta .cta-arrow {
          display: inline-block;
          transition: transform 380ms cubic-bezier(0.22,1,0.36,1);
        }
        .shiny-cta:hover .cta-arrow { transform: translateX(5px); }
      `}</style>
    </motion.a>
  );
}

function OutlineCTA({ children, href }) {
  return (
    <motion.a
      href={href}
      data-cursor="hover"
      whileHover={{
        y: -2,
        transition: { type: "spring", stiffness: 320, damping: 18 },
      }}
      whileTap={{ scale: 0.97 }}
      className="outline-cta"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: 14,
        background: "transparent",
        color: "var(--fg-1)",
        border: "1px solid rgba(127,182,164,0.30)",
        padding: "14px 26px",
        minHeight: 44,
        borderRadius: 999,
        textDecoration: "none",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: "border-color 280ms ease, background 280ms ease, box-shadow 320ms ease",
        overflow: "hidden",
      }}
    >
      {/* Sweep light on hover */}
      <span
        aria-hidden="true"
        className="outline-sweep"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, transparent 30%, rgba(187,224,210,0.18) 50%, transparent 70%)",
          backgroundSize: "220% 100%",
          backgroundPosition: "200% 0",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 320ms ease",
        }}
      />
      <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 8 }}>
        {children}
        <span aria-hidden="true" className="outline-arrow">→</span>
      </span>
      <style>{`
        .outline-cta:hover {
          border-color: rgba(187,224,210,0.65);
          background: rgba(127,182,164,0.10);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.10),
            0 12px 28px rgba(127,182,164,0.18);
        }
        .outline-cta:hover .outline-sweep {
          opacity: 1;
          animation: outlineSweep 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes outlineSweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }
        .outline-cta .outline-arrow {
          display: inline-block;
          width: 0;
          opacity: 0;
          transform: translateX(-6px);
          overflow: hidden;
          transition:
            width 360ms cubic-bezier(0.22,1,0.36,1),
            opacity 280ms ease,
            transform 360ms cubic-bezier(0.22,1,0.36,1);
        }
        .outline-cta:hover .outline-arrow {
          width: 14px;
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </motion.a>
  );
}

function StatusPill({ ready }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px 8px 12px",
        borderRadius: 999,
        background: "rgba(7,12,14,0.6)",
        border: "1px solid rgba(127,182,164,0.25)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--mint-200)",
        letterSpacing: "0.05em",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#7fb6a4",
          boxShadow: "0 0 0 4px rgba(127,182,164,0.18), 0 0 12px #7fb6a4",
          animation: "akzaPulse 2.4s ease-in-out infinite",
        }}
      />
      AGENDA · ABERTA PARA NOVOS PROJETOS
    </motion.div>
  );
}

function HeroChips({ ready }) {
  const chips = [
    { label: "Studio Audiovisual", icon: "video" },
    { label: "Engenharia Web", icon: "code" },
    { label: "Brand Strategy", icon: "spark" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.9, delay: 1.0, ease: [0.25, 0.4, 0.25, 1] }}
      className="hero-chips"
      style={{
        marginTop: 36,
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "center",
      }}
    >
      {chips.map((c) => (
        <div
          key={c.label}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 999,
            background: "rgba(15,21,22,0.55)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-2)",
            letterSpacing: "0.04em",
          }}
        >
          <span aria-hidden="true" style={{ color: "var(--mint-300)", display: "inline-flex" }}>
            {c.icon === "video" && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="14" height="12" rx="2" />
                <path d="M17 10l4-2v8l-4-2z" />
              </svg>
            )}
            {c.icon === "code" && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            )}
            {c.icon === "spark" && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v4" />
                <path d="M12 17v4" />
                <path d="M3 12h4" />
                <path d="M17 12h4" />
                <path d="M5.6 5.6l2.8 2.8" />
                <path d="M15.6 15.6l2.8 2.8" />
                <path d="M5.6 18.4l2.8-2.8" />
                <path d="M15.6 8.4l2.8-2.8" />
              </svg>
            )}
          </span>
          {c.label}
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero({ ready = true }) {
  const subRef = useRef(null);
  const ctasRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const els = [
      { el: subRef.current, delay: 600 },
      { el: ctasRef.current, delay: 850 },
      { el: scrollRef.current, delay: 1300 },
    ];
    const timers = els.map(({ el, delay }) => {
      if (!el) return null;
      return setTimeout(() => el.classList.add("is-in"), delay);
    });
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [ready]);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero-section"
      style={{
        position: "relative",
        // Pull up so the hero's backdrop covers the area behind the
        // floating Nav header — keeps the green atmosphere unbroken.
        marginTop: "-120px",
        paddingTop: "180px",
        paddingBottom: "80px",
        minHeight: "calc(100vh + 120px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <HeroBackdrop />
      <HeroShapes ready={ready} />
      {/* Soft top vignette only — keeps the page floor washed in green, no dark band */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5,9,10,0.55) 0%, transparent 20%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: 760,
          margin: "0 auto",
          padding: "24px 24px 0",
          zIndex: 2,
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <StatusPill ready={ready} />
        </div>
        <StaggeredHeading ready={ready} />
        <p
          ref={subRef}
          className="hero-fade"
          style={{
            marginTop: 28,
            fontSize: "clamp(15px, 1.6vw, 17px)",
            color: "var(--fg-2)",
            lineHeight: 1.6,
            maxWidth: 580,
            marginInline: "auto",
          }}
        >
          Empresas que se destacam hoje possuem comunicação forte, presença digital consistente e processos
          organizados. A AKZA integra <span style={{ color: "var(--mint-200)" }}>conteúdo</span>,{" "}
          <span style={{ color: "var(--mint-200)" }}>tecnologia</span> e{" "}
          <span style={{ color: "var(--mint-200)" }}>estratégia</span> para acelerar seu crescimento.
        </p>
        <div
          ref={ctasRef}
          className="hero-fade"
          style={{
            marginTop: 36,
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <ShinyButton href="#contato">
            Agendar Diagnóstico Estratégico{" "}
            <span aria-hidden="true" className="cta-arrow">→</span>
          </ShinyButton>
          <OutlineCTA href="#servicos">Ver serviços</OutlineCTA>
        </div>

        <HeroChips ready={ready} />

        <div
          ref={scrollRef}
          className="hero-fade"
          style={{
            marginTop: 48,
            color: "var(--fg-3)",
            fontSize: 12,
            fontFamily: "var(--font-mono)",
          }}
          aria-hidden="true"
        >
          scroll
          <div
            style={{
              marginTop: 10,
              width: 22,
              height: 36,
              border: "1px solid rgba(127,182,164,0.30)",
              borderRadius: 999,
              marginInline: "auto",
              position: "relative",
              boxShadow: "0 0 16px rgba(127,182,164,0.10)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--mint-300)",
                boxShadow: "0 0 8px rgba(127,182,164,0.7)",
                animation: "akzaScrollDot 1.6s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
      <style>{`
        .hero-fade { opacity: 0; transform: translate3d(0, 16px, 0); transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1); }
        .hero-fade.is-in { opacity: 1; transform: translate3d(0, 0, 0); }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
