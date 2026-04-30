import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    return () => document.documentElement.classList.remove("has-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: target.x, y: target.y };
    let scale = 1;
    let isHover = false;

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      scale += ((isHover ? 1.8 : 1) - scale) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onOver = (e) => {
      const t = e.target;
      isHover = !!(
        t.closest?.("a, button, [role='button'], input, textarea, [data-cursor='hover']")
      );
    };
    const onOut = () => {
      isHover = false;
    };
    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          background: "var(--sage-100)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      <div
        ref={ring}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(187, 201, 199, 0.45)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition: "opacity 250ms ease",
        }}
      />
    </>
  );
}
