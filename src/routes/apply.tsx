import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply for Access — Induxtron" },
      { name: "description", content: "Apply for access to Induxtron AI Systems. We review every application personally. 48-hour response." },
    ],
  }),
  component: ApplyPage,
});

const systems = ["QuoteGPT", "CertAlert", "IndustrialBot", "TenderRadar", "ChurnRadar"];
const industriesList = [
  "HVAC & Refrigeration", "Pharma Manufacturing", "Auto Components",
  "Calibration Laboratory", "Industrial Equipment Dealer", "Cold Chain & Logistics", "Other",
];
const teamSizes = ["1–5", "6–20", "21–50", "50+"];
const revenue = ["Under ₹1 Cr", "₹1–5 Cr", "₹5–25 Cr", "₹25 Cr+"];
const sources = ["LinkedIn", "Referral", "Web search", "Industry event", "Other"];

function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (s: string) =>
    setSelected((arr) => (arr.includes(s) ? arr.filter((x) => x !== s) : [...arr, s]));

  if (submitted) {
    return (
      <Layout>
        <section className="pt-40 pb-32 px-6">
          <div className="max-w-2xl mx-auto text-center fade-up">
            <CheckCircle2 className="mx-auto text-gold mb-6" size={56} />
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Application received.</h1>
            <p className="text-lg text-muted-foreground mb-3">
              We will review and respond within 48 hours.
            </p>
            <p className="text-muted-foreground">
              In the meantime, explore our <a href="/case-studies" className="text-primary hover:underline">case studies</a>.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        tag="REQUEST ACCESS"
        title="Apply for Access to"
        highlight="Induxtron AI Systems."
        sub="We review every application personally. We work with those who are serious about transformation — not just those looking for a tool."
      />

      <section className="px-6 pb-24">
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="max-w-3xl mx-auto glass-card rounded-2xl p-8 md:p-12 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Full Name" name="name" required />
            <Input label="Designation / Role" name="role" required />
            <Input label="Company Name" name="company" required />
            <Input label="Company Website" name="website" type="url" />
            <Input label="City" name="city" required />
            <Select label="Industry" name="industry" required options={industriesList} />
            <Select label="Team Size" name="team" required options={teamSizes} />
            <Select label="Annual Revenue Range" name="revenue" required options={revenue} />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-3">
              WHICH SYSTEMS INTEREST YOU MOST? *
            </label>
            <div className="flex flex-wrap gap-2">
              {systems.map((s) => {
                const on = selected.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(s)}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      on
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-2">
              DESCRIBE YOUR BIGGEST OPERATIONAL CHALLENGE *
            </label>
            <textarea
              required
              rows={5}
              className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary resize-none"
              placeholder="The more specific, the better."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Select label="How did you hear about Induxtron?" name="source" options={sources} />
            <Input label="Phone (WhatsApp preferred)" name="phone" type="tel" required />
            <Input label="Email" name="email" type="email" required />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-md bg-gold text-gold-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Submit My Application <ArrowRight size={18} />
          </button>

          <div className="text-center text-xs text-muted-foreground space-y-1 pt-2">
            <p>We review every application within 48 hours.</p>
            <p>If selected, you will receive a personalised demo.</p>
            <p>No spam. No sales calls without your permission.</p>
          </div>
        </form>
      </section>
    </Layout>
  );
}

function Input({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-2" htmlFor={name}>
        {label.toUpperCase()}{required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary"
      />
    </div>
  );
}

function Select({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-2" htmlFor={name}>
        {label.toUpperCase()}{required && " *"}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
