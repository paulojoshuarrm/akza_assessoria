import { useEffect, useRef } from "react";

/**
 * 3D tilt + cursor-follow gradient on hover.
 *
 * Sets CSS vars `--mx` / `--my` (0..100%) on the ref so descendants can read
 * them in plain CSS without any React-side updates. The RAF loop self-suspends
 * when the lerp settles, then resumes on the next mouse event — so cards that
 * aren't being interacted with cost zero per-frame work.
 */
export function useTilt({ max = 6, scale = 1.015 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const cur = { rx: 0, ry: 0, s: 1, mx: 0.5, my: 0.5 };
    const target = { rx: 0, ry: 0, s: 1, mx: 0.5, my: 0.5 };

    const apply = () => {
      el.style.transform = `perspective(900px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) scale(${cur.s})`;
      el.style.setProperty("--mx", `${cur.mx * 100}%`);
      el.style.setProperty("--my", `${cur.my * 100}%`);
    };

    const settled = () =>
      Math.abs(cur.rx - target.rx) < 0.01 &&
      Math.abs(cur.ry - target.ry) < 0.01 &&
      Math.abs(cur.s - target.s) < 0.0005 &&
      Math.abs(cur.mx - target.mx) < 0.001 &&
      Math.abs(cur.my - target.my) < 0.001;

    const tick = () => {
      const lerp = (a, b, k) => a + (b - a) * k;
      cur.rx = lerp(cur.rx, target.rx, 0.14);
      cur.ry = lerp(cur.ry, target.ry, 0.14);
      cur.s = lerp(cur.s, target.s, 0.14);
      cur.mx = lerp(cur.mx, target.mx, 0.18);
      cur.my = lerp(cur.my, target.my, 0.18);
      apply();
      if (settled()) {
        raf = 0;
        return; // stop until next event
      }
      raf = requestAnimationFrame(tick);
    };

    const ensureRAF = () => {
      if (!raf) raf = requestAnimationFrame(tick);
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
      ensureRAF();
    };
    const onLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.s = 1;
      target.mx = 0.5;
      target.my = 0.5;
      ensureRAF();
    };

    // Apply initial CSS vars once so descendant rules don't flicker
    apply();

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, scale]);

  return ref;
}
