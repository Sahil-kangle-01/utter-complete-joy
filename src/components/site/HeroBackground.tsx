import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle field — stand-in for the heavy Three.js scene.
 * Drifting particles + connecting lines on a hex/grid backdrop.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 60 : 140;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      r: Math.random() * 1.6 + 0.4,
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = 0.5, my = 0.5;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // parallax offset
      const ox = (mx - 0.5) * 30;
      const oy = (my - 0.5) * 30;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }

      // lines
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x * w + ox;
        const ay = a.y * h + oy;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x * w + ox;
          const by = b.y * h + oy;
          const dx = ax - bx;
          const dy = ay - by;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const alpha = (1 - d2 / 14000) * 0.25;
            ctx.strokeStyle = `rgba(0, 102, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        const px = p.x * w + ox;
        const py = p.y * h + oy;
        ctx.fillStyle = "rgba(168, 196, 240, 0.85)";
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />
      {/* floating geometric shapes */}
      <div className="absolute top-1/4 right-[12%] w-32 h-32 border border-primary/40 rotate-45 float-slow" />
      <div className="absolute bottom-1/4 left-[10%] w-20 h-20 border border-gold/40 rounded-full float-slow"
           style={{ animationDelay: "-4s" }} />
      <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary/30 float-slow"
           style={{ animationDelay: "-8s", clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
    </div>
  );
}
