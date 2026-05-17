import { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { CustomCursor } from "./CustomCursor";
import { Reveal } from "./Reveal";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Loader />
      <CustomCursor />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  tag,
  title,
  highlight,
  sub,
  stats,
}: {
  tag?: string;
  title: string;
  highlight?: string;
  sub?: string;
  stats?: string[];
}) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          {tag && (
            <div className="text-[10px] sm:text-xs tracking-[0.3em] text-gold mb-4 sm:mb-6">{tag}</div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.05]">
            {title}{" "}
            {highlight && <span className="text-gradient">{highlight}</span>}
          </h1>
          {sub && (
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {sub}
            </p>
          )}
        </Reveal>
        {stats && stats.length > 0 && (
          <Reveal delay={150}>
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-xs sm:text-sm font-mono text-text-accent">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-6 sm:gap-8">
                  <span>{s}</span>
                  {i < stats.length - 1 && <span className="text-border">|</span>}
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function CTA({
  title = "Apply for Access to Induxtron AI Systems",
  body = "We work with the few. Not the many. Every deployment is managed personally — by application only.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative py-24 overflow-hidden cta-exclusive">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">{body}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            4 businesses active. 2 application spots currently open in Aurangabad.
          </p>
          <a
            href="/apply"
            className="inline-flex items-center mt-8 px-8 py-4 rounded-md bg-gold text-gold-foreground font-semibold hover:opacity-90 hover:scale-[1.03] transition-all"
          >
            Apply for Access
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            48-hour response. No obligation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
