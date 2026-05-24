import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Induxtron — Aurangabad AI Studio" },
      { name: "description", content: "Reach Induxtron via email, phone, or WhatsApp. Based in Aurangabad, Maharashtra. We respond to every message within 24 hours." },
      { name: "keywords", content: "Induxtron contact, AI studio Aurangabad, industrial AI consultation India" },
      { property: "og:title", content: "Contact Induxtron — Aurangabad AI Studio" },
      { property: "og:description", content: "Email, phone, or WhatsApp. 24-hour response. Based in Aurangabad." },
      { property: "og:url", content: "https://induxtron.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://induxtron.lovable.app/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          mainEntity: {
            "@type": "Organization",
            name: "Induxtron",
            url: "https://induxtron.lovable.app",
            contactPoint: [{
              "@type": "ContactPoint",
              contactType: "sales",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi", "Marathi"],
            }],
            address: { "@type": "PostalAddress", addressLocality: "Aurangabad", addressRegion: "MH", addressCountry: "IN" },
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <PageHero
        tag="CONTACT"
        title="Talk to"
        highlight="Induxtron."
        sub="We respond to every message within 24 hours. For faster turnaround, WhatsApp is best."
      />

      <section className="py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-6 sm:gap-8">
          <div className="md:col-span-3 glass-card rounded-2xl p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-2xl font-bold mb-3">Message received.</div>
                <p className="text-muted-foreground">We will respond within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" name="name" required />
                  <Field label="Company" name="company" required />
                  <Field label="City" name="city" />
                  <Field label="Phone (WhatsApp preferred)" name="phone" required type="tel" />
                </div>
                <Field label="Email" name="email" type="email" required />
                <div>
                  <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-2">
                    WHICH SYSTEM?
                  </label>
                  <select className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary">
                    <option>Not sure yet</option>
                    <option>QuoteGPT</option>
                    <option>CertAlert</option>
                    <option>IndustrialBot</option>
                    <option>TenderRadar</option>
                    <option>ChurnRadar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] text-muted-foreground mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-primary resize-none"
                    placeholder="Tell us briefly about your business and what you'd like to solve."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 rounded-md bg-primary text-primary-foreground font-medium hover:glow-primary transition-shadow"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="md:col-span-2 space-y-4">
            <ContactCard Icon={Mail} label="Email" value="sahil@induxtron.com" href="mailto:sahil@induxtron.com" />
            <ContactCard Icon={Phone} label="Phone" value="+91 82370 07450" href="tel:+918237007450" />
            <ContactCard Icon={MessageCircle} label="WhatsApp" value="Chat with us" href="https://wa.me/918237007450" highlight />
            <ContactCard Icon={MapPin} label="Office" value="Chhatrapati Sambhajinagar, Maharashtra, India" />
            <div className="glass-card rounded-2xl overflow-hidden">
              <iframe
                title="Induxtron Aurangabad"
                className="w-full h-56 border-0"
                src="https://www.google.com/maps?q=Chhatrapati+Sambhajinagar+Maharashtra&output=embed"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
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

function ContactCard({ Icon, label, value, href, highlight }: { Icon: typeof Mail; label: string; value: string; href?: string; highlight?: boolean }) {
  const Inner = (
    <div className={`glass-card rounded-xl p-5 flex items-center gap-4 ${highlight ? "border-gold" : ""}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${highlight ? "bg-gold/20" : "bg-primary/15"}`}>
        <Icon className={highlight ? "text-gold" : "text-primary"} size={18} />
      </div>
      <div>
        <div className="text-xs tracking-[0.2em] text-muted-foreground">{label.toUpperCase()}</div>
        <div className="text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{Inner}</a> : Inner;
}
