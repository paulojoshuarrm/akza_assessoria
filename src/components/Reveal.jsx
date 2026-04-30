import { useEffect, useRef, useState } from "react";

/**
 * Reveal — IntersectionObserver-based fade/translate-up wrapper.
 * Uses a CSS keyframe (.akza-reveal in index.css) to avoid pulling Framer
 * Motion into above-the-fold work. Respects prefers-reduced-motion.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  threshold = 0.15,
  children,
  className = "",
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`${shown ? "akza-reveal" : ""} ${className}`.trim()}
      style={{ ...style, animationDelay: `${delay}s`, opacity: shown ? undefined : 0 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
