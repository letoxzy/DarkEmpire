import { useEffect, useRef } from "react";

/* Hook — attach to any element for scroll-reveal */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* Fade-up wrapper */
export function Reveal({ children, className = "", delay = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`de-reveal ${delay} ${className}`}>
      {children}
    </div>
  );
}

/* Slide-in-from-right wrapper */
export function RevealRight({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`de-reveal-right ${className}`}>
      {children}
    </div>
  );
}
