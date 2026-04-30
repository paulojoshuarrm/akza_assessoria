import { useEffect, useRef } from "react";

/**
 * 3D tilt + cursor-follow gradient on hover.
 * Sets CSS vars --mx, --my (0..1 within element) on the ref.
 */
export function useTilt({ max = 6, scale = 1.015 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    const cur = { rx: 0, ry: 0, s: 1, mx: 0.5, my: 0.5 };
    const target = { rx: 0, ry: 0, s: 1, mx: 0.5, my: 0.5 };

    const tick = () => {
      const lerp = (a, b, k) => a + (b - a) * k;
      cur.rx = lerp(cur.rx, target.rx, 0.14);
      cur.ry = lerp(cur.ry, target.ry, 0.14);
      cur.s = lerp(cur.s, target.s, 0.14);
      cur.mx = lerp(cur.mx, target.mx, 0.18);
      cur.my = lerp(cur.my, target.my, 0.18);
      el.style.transform = `perspective(900px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) scale(${cur.s})`;
      el.style.setProperty("--mx", `${cur.mx * 100}%`);
      el.style.setProperty("--my", `${cur.my * 100}%`);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      target.ry = (x - 0.5) * 2 * max;
      target.rx = -(y - 0.5) * 2 * max;
      target.mx = x;
      target.my = y;
      target.s = scale;
    };
    const onLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.s = 1;
      target.mx = 0.5;
      target.my = 0.5;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, scale]);

  return ref;
}
