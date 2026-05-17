import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Layout, PageHero, CTA } from "@/components/site/Layout";
import { products, type ProductSpec } from "@/data/products";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/systems/$slug")({
  head: ({ params }) => {
    const p = products[params.slug];
    return {
      meta: [
        { title: p ? `${p.name} — Induxtron` : "System — Induxtron" },
        { name: "description", content: p?.sub ?? "Induxtron AI system" },
      ],
    };
  },
  loader: ({ params }): { product: ProductSpec } => {
    const product = products[params.slug];
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-4xl font-bold">System not found</h1>
        <Link to="/systems" className="inline-block mt-6 text-primary">
          ← Back to all systems
        </Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ error }) => (
    <Layout>
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
      </div>
    </Layout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const p = products[slug]!;

  return (
    <Layout>
      <PageHero
        tag={p.tag}
        title={p.headline}
        highlight={p.highlight}
        sub={p.sub}
        stats={p.stats}
      />

      {/* Problem / Solution */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 sm:gap-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="text-xs tracking-[0.3em] text-destructive mb-3">THE PROBLEM</div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{p.problem}</p>
          </div>
          <div className="glass-card rounded-2xl p-6 sm:p-8" style={{ borderColor: "var(--gold)" }}>
            <div className="text-xs tracking-[0.3em] text-gold mb-3">THE SOLUTION</div>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">{p.solution}</p>
          </div>
        </div>
      </section>

      {/* Flow */}
      {p.flow && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">How it works.</h2>
            <ol className="space-y-4">
              {p.flow.map((step, i) => (
                <li key={i} className="glass-card rounded-xl p-6 flex gap-5 items-start">
                  <div className="font-mono text-2xl text-gradient shrink-0">0{i + 1}</div>
                  <p className="text-foreground/90 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything your team needs.
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {p.capabilities.map((c, i) => (
              <div key={i} className="glass-card rounded-xl p-5 sm:p-6 flex gap-4">
                <Check className="text-primary shrink-0 mt-0.5" size={20} />
                <p className="text-sm sm:text-base text-foreground/90">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table */}
      {p.table && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{p.table.title}</h2>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/40">
                      {p.table.headers.map((h) => (
                        <th key={h} className="text-left px-6 py-4 font-semibold text-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.table.rows.map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        {row.map((cell, j) => (
                          <td key={j} className="px-6 py-4 text-muted-foreground">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Impact */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs tracking-[0.3em] text-gold mb-6">REVENUE IMPACT</div>
          <div className="font-display text-5xl md:text-7xl font-bold text-gradient mb-4">
            {p.impact.value}
          </div>
          <p className="text-xl text-foreground mb-6">{p.impact.label}</p>
          {p.impact.details.map((d, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mt-3">{d}</p>
          ))}
        </div>
      </section>

      {/* Other systems */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs tracking-[0.3em] text-gold mb-6">OTHER SYSTEMS</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(products)
              .filter((o) => o.slug !== p.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  to="/systems/$slug"
                  params={{ slug: o.slug }}
                  className="glass-card rounded-xl p-5 group"
                >
                  <div className="text-gold text-xs tracking-[0.2em] mb-1">{o.name.toUpperCase()}</div>
                  <div className="font-semibold mb-3">{o.tag.split("—")[1]?.trim() ?? ""}</div>
                  <span className="inline-flex items-center gap-2 text-primary text-sm group-hover:gap-3 transition-all">
                    View <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTA />
    </Layout>
  );
}
