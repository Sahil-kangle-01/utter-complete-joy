import React, { useEffect, useRef, ReactNode } from "react";

type Variant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleFade";

const variantClass: Record<Variant, string> = {
  fadeUp: "reveal-fade-up",
  fadeLeft: "reveal-fade-left",
  fadeRight: "reveal-fade-right",
  scaleFade: "reveal-scale-fade",
};

export function Reveal({
  children,
  as: Tag = "div",
  variant = "fadeUp",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (el as HTMLElement).style.transitionDelay = `${delay}ms`;
            el.classList.add("is-visible");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const Comp = Tag as any;
  return (
    <Comp ref={ref as any} className={`${variantClass[variant]} ${className}`}>
      {children}
    </Comp>
  );
}
