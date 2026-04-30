import { useEffect, useRef } from "react";

/**
 * Magnetic hover — element pulls toward cursor when hovered.
 * Strength = 0.35 means it travels 35% of distance to cursor center.
 */
export function useMagnetic({ strength = 0.35, radius = 120 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    let cur = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        target.x = dx * strength;
        target.y = dy * strength;
      } else {
        target.x = 0;
        target.y = 0;
      }
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius]);

  return ref;
}
