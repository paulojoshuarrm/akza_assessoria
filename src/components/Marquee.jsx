const WORDS = [
  "Comunicação",
  "Tecnologia",
  "Estratégia",
  "Conteúdo",
  "Performance",
  "Crescimento",
  "Identidade",
  "Resultado",
];

export default function Marquee() {
  const list = [...WORDS, ...WORDS, ...WORDS];
  return (
    <div
      aria-hidden="true"
      className="brand-marquee"
      style={{
        position: "relative",
        margin: "20px 0 60px",
        padding: "28px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <div className="marquee-track">
        {list.map((w, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-word">{w}</span>
            <span aria-hidden="true" className="marquee-dot">·</span>
          </span>
        ))}
      </div>
      <style>{`
        .brand-marquee:hover .marquee-track { animation-play-state: paused; }
        .marquee-track {
          display: inline-flex;
          gap: 0;
          white-space: nowrap;
          animation: akzaMarquee 38s linear infinite;
          will-change: transform;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 28px;
          padding-right: 28px;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(28px, 4vw, 48px);
          letter-spacing: -0.02em;
          color: var(--fg-3);
          transition: color 280ms ease;
        }
        .marquee-item:nth-child(3n+1) .marquee-word {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          color: var(--mint-200);
        }
        .marquee-dot { color: rgba(187,201,199,0.30); }
        @keyframes akzaMarquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-33.333%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
