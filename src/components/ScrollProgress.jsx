import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        ref={ref}
        style={{
          height: "100%",
          background: "linear-gradient(90deg, transparent 0%, var(--mint-300) 30%, var(--mint-200) 100%)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
