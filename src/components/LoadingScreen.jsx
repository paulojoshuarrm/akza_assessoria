import { useEffect, useRef, useState } from "react";

/**
 * LoadingScreen — cinematic Akza opener.
 * Pieces:
 *   - Letterbox bars slide in (top/bottom)
 *   - Crosshair reticle locks onto the logo
 *   - Logo zooms out from a blurred 1.4x state, while a left→right clip
 *     reveals "A" → "kza" → "Digital Strategy" in three beats
 *   - REC / SC.01 / timecode HUD across all four corners
 *   - Flash + zoom + slide-up exit
 */
export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("intro");
  const tcRef = useRef(null);

  // Live timecode counter HH:MM:SS:FF (24 fps)
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = () => {
      const ms = performance.now() - start;
      const total = ms / 1000;
      const ff = Math.floor((ms % 1000) / (1000 / 24));
      const ss = Math.floor(total) % 60;
      const mm = Math.floor(total / 60) % 60;
      const hh = Math.floor(total / 3600);
      if (tcRef.current) {
        tcRef.current.textContent =
          String(hh).padStart(2, "0") +
          ":" +
          String(mm).padStart(2, "0") +
          ":" +
          String(ss).padStart(2, "0") +
          ":" +
          String(ff).padStart(2, "0");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setPhase("done");
      onComplete?.();
      return;
    }

    const t1 = setTimeout(() => setPhase("building"), 200);
    const t2 = setTimeout(() => setPhase("revealing"), 2200);
    const t3 = setTimeout(() => setPhase("exit"), 2700);
    const t4 = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 3300);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={`akza-loading akza-loading-${phase}`} aria-hidden="true">
      {/* Atmospheric bg */}
      <div className="al-bg" />
      <div className="al-grid" />
      <div className="al-vignette" />
      <div className="al-grain" />

      {/* Letterbox bars */}
      <div className="al-letterbox al-letterbox-top" />
      <div className="al-letterbox al-letterbox-bottom" />

      {/* Cinema HUD corners */}
      <div className="al-hud al-hud-tl">
        <span className="al-rec-dot" />
        REC · 24FPS · COLOR
      </div>
      <div className="al-hud al-hud-tr">
        SC.01 / TK.001 — AKZA OPENER
      </div>
      <div className="al-hud al-hud-bl">
        <span ref={tcRef} className="al-tc">00:00:00:00</span>
        <span className="al-tc-sep">·</span>
        f / 1.4
        <span className="al-tc-sep">·</span>
        ISO 320
      </div>
      <div className="al-hud al-hud-br">AKZA STUDIO · 2026</div>

      {/* Stage */}
      <div className="al-stage">
        {/* Crosshair / lens reticle */}
        <div className="al-reticle">
          <div className="al-reticle-frame">
            <span className="al-corner al-tl" />
            <span className="al-corner al-tr" />
            <span className="al-corner al-bl" />
            <span className="al-corner al-br" />
          </div>
          <div className="al-reticle-cross" />
          <div className="al-reticle-circle" />
        </div>

        {/* Logo with zoom + clip reveal */}
        <div className="al-logo-zoom">
          {/* Halo: a single soft radial glow behind the logo — replaces the
              stacked drop-shadows that were ghosting each letter */}
          <span aria-hidden="true" className="al-logo-halo" />
          <div className="al-logo-clip">
            <img
              src="/logo-sage-light.webp"
              alt="Akza Digital Strategy"
              draggable={false}
            />
          </div>
        </div>

        {/* Tagline that types in just below */}
        <div className="al-tagline">
          <span>Comunicação</span>
          <span className="al-tag-dot">·</span>
          <span>Tecnologia</span>
          <span className="al-tag-dot">·</span>
          <span>Estratégia</span>
        </div>
      </div>

      {/* Final flash */}
      <div className="al-flash" />

      <style>{`
        .akza-loading {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: #05090a;
          overflow: hidden;
          pointer-events: none;
          font-family: var(--font-mono);
          color: rgba(232,243,239,0.55);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          will-change: transform, opacity;
        }
        .akza-loading-exit {
          animation: alExit 0.65s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }
        @keyframes alExit {
          0%   { opacity: 1; transform: scale(1); }
          40%  { opacity: 1; transform: scale(1.04); }
          100% { opacity: 0; transform: scale(1.10); }
        }

        /* Backgrounds */
        .al-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(127,182,164,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 90% 90% at 50% 50%, rgba(15,42,40,0.4) 0%, #05090a 70%);
        }
        .al-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(127,182,164,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(127,182,164,0.07) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, #000 10%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, #000 10%, transparent 80%);
          opacity: 0;
          animation: alFade 0.6s ease 0.3s forwards;
        }
        .al-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.85) 100%);
        }
        .al-grain {
          position: absolute; inset: 0;
          opacity: 0.08;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }

        /* Letterbox */
        .al-letterbox {
          position: absolute; left: 0; right: 0;
          height: 72px;
          background: #000;
          z-index: 10;
        }
        .al-letterbox-top    { top: 0;    transform: translateY(-100%); animation: alBoxInTop 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s forwards; }
        .al-letterbox-bottom { bottom: 0; transform: translateY(100%);  animation: alBoxInBot 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s forwards; }
        @keyframes alBoxInTop { to { transform: translateY(0); } }
        @keyframes alBoxInBot { to { transform: translateY(0); } }
        .akza-loading-exit .al-letterbox-top    { animation: alBoxOutTop 0.5s cubic-bezier(0.7,0,0.84,0) forwards; }
        .akza-loading-exit .al-letterbox-bottom { animation: alBoxOutBot 0.5s cubic-bezier(0.7,0,0.84,0) forwards; }
        @keyframes alBoxOutTop { to { transform: translateY(-100%); } }
        @keyframes alBoxOutBot { to { transform: translateY(100%); } }

        /* HUD corners */
        .al-hud {
          position: absolute; z-index: 11;
          padding: 22px 28px;
          display: inline-flex; align-items: center; gap: 10px;
          opacity: 0;
          animation: alFade 0.5s ease 0.65s forwards;
        }
        .al-hud-tl { top: 0;    left: 0; }
        .al-hud-tr { top: 0;    right: 0; color: var(--mint-300); }
        .al-hud-bl { bottom: 0; left: 0; }
        .al-hud-br { bottom: 0; right: 0; color: var(--mint-300); }
        .al-tc { font-variant-numeric: tabular-nums; color: rgba(232,243,239,0.85); }
        .al-tc-sep { opacity: 0.4; }
        .al-rec-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #ff5a5a;
          box-shadow: 0 0 8px #ff5a5a;
          animation: alBlink 1s ease-in-out infinite;
        }
        @keyframes alBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.25; }
        }

        /* Stage */
        .al-stage {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 5;
          gap: 24px;
        }

        /* Reticle */
        .al-reticle {
          position: absolute;
          width: clamp(320px, 42vw, 600px);
          height: clamp(120px, 16vw, 220px);
          opacity: 0;
          animation: alFade 0.4s ease 0.5s forwards;
          pointer-events: none;
        }
        .al-reticle-frame { position: absolute; inset: 0; }
        .al-corner {
          position: absolute;
          width: 22px; height: 22px;
          border: 1px solid rgba(127,182,164,0.55);
        }
        .al-corner.al-tl { top: 0;    left: 0;    border-right: none; border-bottom: none; }
        .al-corner.al-tr { top: 0;    right: 0;   border-left:  none; border-bottom: none; }
        .al-corner.al-bl { bottom: 0; left: 0;    border-right: none; border-top:    none; }
        .al-corner.al-br { bottom: 0; right: 0;   border-left:  none; border-top:    none; }
        .al-reticle-cross,
        .al-reticle-circle {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
        }
        .al-reticle-cross {
          width: 14px; height: 14px;
          background:
            linear-gradient(rgba(127,182,164,0.7), rgba(127,182,164,0.7)) center/1px 100% no-repeat,
            linear-gradient(rgba(127,182,164,0.7), rgba(127,182,164,0.7)) center/100% 1px no-repeat;
        }
        .al-reticle-circle {
          width: 30px; height: 30px;
          border: 1px dashed rgba(127,182,164,0.5);
          border-radius: 50%;
          animation: alSpin 8s linear infinite;
        }
        @keyframes alSpin { to { transform: translate(-50%,-50%) rotate(360deg); } }

        /* Logo zoom + clip-path reveal */
        .al-logo-zoom {
          width: clamp(280px, 36vw, 520px);
          transform: scale(1.18);
          filter: blur(6px);
          opacity: 0;
          animation: alLogoZoom 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          will-change: transform, filter, opacity;
          position: relative;
        }
        @keyframes alLogoZoom {
          0%   { transform: scale(1.18); filter: blur(6px); opacity: 0; }
          20%  { opacity: 1; }
          70%  { transform: scale(1);    filter: blur(0); opacity: 1; }
          100% { transform: scale(1);    filter: blur(0); opacity: 1; }
        }

        /* Soft halo behind the logo — replaces stacked drop-shadows that
           were ghosting each letter. One clean radial glow does the job. */
        .al-logo-halo {
          position: absolute;
          inset: -22% -10%;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at center,
              rgba(187,224,210,0.32) 0%,
              rgba(127,182,164,0.18) 30%,
              rgba(95,162,142,0.06) 55%,
              transparent 75%);
          filter: blur(28px);
          z-index: 0;
          opacity: 0;
          transform: scale(0.85);
          animation: alHaloIn 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
          pointer-events: none;
        }
        @keyframes alHaloIn {
          to { opacity: 1; transform: scale(1); }
        }

        .al-logo-clip {
          position: relative;
          z-index: 1;
          clip-path: inset(0 100% 0 0);
          -webkit-clip-path: inset(0 100% 0 0);
          animation: alLogoReveal 1.6s cubic-bezier(0.7, 0, 0.20, 1) 0.7s forwards;
        }
        .al-logo-clip img {
          width: 100%; height: auto; display: block;
          user-select: none;
          /* single tight shadow for crispness — the halo provides the bloom */
          filter: drop-shadow(0 4px 18px rgba(0,0,0,0.45));
        }
        /* Smooth left→right wipe — no holds, no chapter breaks */
        @keyframes alLogoReveal {
          0%   { clip-path: inset(0 100% 0 0); -webkit-clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0%   0 0); -webkit-clip-path: inset(0 0%   0 0); }
        }
        /* Scan line that travels across the logo with the reveal */
        .al-logo-zoom::after {
          content: "";
          position: absolute;
          top: -8%; bottom: -8%;
          width: 2px;
          left: 0;
          background: linear-gradient(180deg, transparent, rgba(187,224,210,0.95) 50%, transparent);
          box-shadow: 0 0 22px rgba(127,182,164,0.85);
          opacity: 0;
          z-index: 2;
          animation: alScan 1.6s cubic-bezier(0.7, 0, 0.20, 1) 0.7s forwards;
        }
        @keyframes alScan {
          0%   { left: 0%;   opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* Tagline */
        .al-tagline {
          margin-top: 20px;
          display: inline-flex;
          gap: 12px;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(232,243,239,0.55);
          letter-spacing: 0.16em;
          opacity: 0;
          transform: translateY(8px);
          animation: alFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 2.0s forwards;
        }
        .al-tag-dot { color: var(--mint-300); }

        /* Final flash */
        .al-flash {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(232,243,239,0.65) 0%, rgba(187,224,210,0.25) 30%, transparent 70%);
          opacity: 0;
          z-index: 12;
        }
        .akza-loading-revealing .al-flash {
          animation: alFlash 0.5s ease forwards;
        }
        @keyframes alFlash {
          0%   { opacity: 0; }
          40%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Generic fade helpers */
        @keyframes alFade { to { opacity: 1; } }
        @keyframes alFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile tweaks */
        @media (max-width: 720px) {
          .al-letterbox { height: 48px; }
          .al-hud { padding: 14px 16px; font-size: 10px; }
          .al-hud-tr, .al-hud-br { display: none; }
          .al-tagline { font-size: 9px; gap: 8px; padding: 0 16px; text-align: center; flex-wrap: wrap; justify-content: center; }
          .al-reticle { width: 88vw; height: 30vw; }
        }
      `}</style>
    </div>
  );
}
