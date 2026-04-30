import { useEffect, useState } from "react";

/**
 * Returns normalized mouse offset (-1..1) from the window center.
 * Smoothed with linear interpolation.
 */
export function useMouseParallax(strength = 1) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const cur = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      setPos({ x: cur.x * strength, y: cur.y * strength });
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [strength]);

  return pos;
}
