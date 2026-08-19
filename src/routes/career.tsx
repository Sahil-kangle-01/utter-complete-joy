import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Layout, PageHero } from "@/components/site/Layout";
import { useState } from "react";
import { ArrowRight, CheckCircle2, MapPin, Briefcase } from "lucide-react";
import { submitJobApplication } from "@/lib/jobs.functions";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers — Induxtron AI Systems" },
      { name: "description", content: "Join the team building AI systems for industrial businesses across India." },
      { name: "keywords", content: "Induxtron careers, jobs, AI systems India" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Careers — Induxtron AI Systems" },
      { property: "og:description", content: "Join the team building AI systems for industrial businesses across India." },
      { property: "og:url", content: "https://induxtron.com/career" },
    ],
    links: [{ rel: "canonical", href: "https://induxtron.com/career" }],
  }),
  component: CareerPage,
});

const openRoles = [
  { title: "AI Systems Engineer", location: "Pune / Remote", type: "Full-time" },
  { title: "Client Success Associate", location: "Pune", type: "Full-time" },
  { title: "Content & Growth Intern", location: "Remote", type: "Internship" },
];

const positions = openRoles.map((r) => r.title).concat("Other / General Application");

function CareerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const send = useServerFn(submitJobApplication);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      await send({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          position: String(fd.get("position") ?? ""),
          resume_url: String(fd.get("resume_url") ?? ""),
          linkedin_url: String(fd.get("linkedin_url") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center fade-up">
            <CheckCircle2 className="mx-auto text-[#7C5CFF] mb-6" size={56} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">Application received.</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-3">
              We'll review your application and reach out if there's a fit.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              Meanwhile, check out our <a href="/case-studies" className="text-primary hover:underline">case studies</a>.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        tag="JOIN THE TEAM"
        title="Build the future of"
        highlight="industrial AI."
        sub="We're a small team solving real operational problems for Indian manufacturers, dealers, and service businesses. If that excites you, apply below."
      />

      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {openRoles.map((role) => (
            <div key={role.title} className="glass-card rounded-xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg">{role.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {role.location}</span>
                  <span className="flex items-center gap-1"><Briefcase size={14} /> {role.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-24">
        <form
          onSubmit={onSubmit}
          className="max-w-3xl mx-auto glass-card rounded-2xl p-6 sm:p-8 md:p-12 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <Input label="Full Name" name="name" required />
            <Input label="Email" name="email" type="email" required />
            <Input label="Phone" name="phone" type="tel" required />
            <Select label="Position" name="position" required options={positions} />
            <Input label="Resume Link (Drive/Dropbox)" name="resume_url" type="url" required />
            <Input label="LinkedIn Profile" name="linkedin_url" type="url" />
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-2">
              WHY DO YOU WANT TO JOIN INDUXTRON?
            </label>
            <textarea
              name="message"
              rows={5}
              className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-[#7C5CFF] resize-none"
              placeholder="Tell us a bit about yourself and why you'd be a good fit."
            />
          </div>

          {error && <div className="text-sm text-red-400 text-center">{error}</div>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-md bg-[#7C5CFF] text-white font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Sending…" : <>Submit Application <ArrowRight size={18} /></>}
          </button>
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
        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-[#7C5CFF]"
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
        className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-[#7C5CFF]"
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
