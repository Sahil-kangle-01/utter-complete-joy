import { useEffect, useState } from "react";

export function Loader() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("indux_loaded")) {
      setDone(true);
      return;
    }
    const t1 = window.setTimeout(() => setLeaving(true), 2200);
    const t2 = window.setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("indux_loaded", "1");
    }, 3000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (!mounted || done) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]"
      style={{ transform: leaving ? "translateY(-100%)" : "translateY(0)" }}
      aria-hidden="true"
    >
      <div className="text-center px-6">
        <div className="font-display text-4xl md:text-6xl font-bold tracking-[0.2em] text-white flex justify-center">
          {"INDUXTRON".split("").map((c, i) => (
            <span
              key={i}
              className="inline-block opacity-0"
              style={{
                animation: `loader-char 0.6s ${i * 0.06}s cubic-bezier(0.2,0.8,0.2,1) forwards`,
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <div
          className="mx-auto mt-6 h-px w-40 bg-gold origin-left scale-x-0"
          style={{ animation: "loader-line 0.7s 0.7s cubic-bezier(0.7,0,0.3,1) forwards" }}
        />
        <div
          className="mt-5 text-xs tracking-[0.4em] text-white/70 opacity-0"
          style={{ animation: "loader-tag 0.6s 1.1s ease-out forwards" }}
        >
          WHERE INDUSTRY MEETS INTELLIGENCE
        </div>
      </div>
      <style>{`
        @keyframes loader-char { to { opacity: 1; transform: translateY(0); } from { opacity: 0; transform: translateY(40px); } }
        @keyframes loader-line { to { transform: scaleX(1); } }
        @keyframes loader-tag { to { opacity: 1; letter-spacing: 0.4em; } from { opacity: 0; letter-spacing: 0.8em; } }
      `}</style>
    </div>
  );
}
