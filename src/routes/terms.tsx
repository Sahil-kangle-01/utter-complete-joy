import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Induxtron" },
      { name: "description", content: "The terms that govern use of the Induxtron website and AI systems." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Terms of Service — Induxtron" },
      { property: "og:url", content: "https://induxtron.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://induxtron.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Layout>
      <PageHero tag="LEGAL" title="Terms of" highlight="Service." sub="Last updated: June 2, 2026" />
      <section className="px-4 sm:px-6 pb-24">
        <article className="max-w-3xl mx-auto prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-gold">
          <p>
            These Terms govern your use of induxtron.com and any Induxtron AI system delivered to you.
            By using the site or submitting an application, you accept these Terms.
          </p>

          <h2>1. About us</h2>
          <p>
            Induxtron Business Systems ("Induxtron") is registered under UDYAM-MH-04-0296135, based in
            Chhatrapati Sambhajinagar, Maharashtra, India.
          </p>

          <h2>2. Application-only access</h2>
          <p>
            Access to our systems (QuoteGPT, CertAlert, IndustrialBot, TenderRadar, ChurnRadar, and
            future systems) is by application. We reserve the right to accept or decline any application
            at our discretion.
          </p>

          <h2>3. Acceptable use</h2>
          <ul>
            <li>Provide accurate information in forms and applications.</li>
            <li>Do not attempt to disrupt, reverse-engineer, or probe the website or systems.</li>
            <li>Do not use our services for unlawful, harmful, or infringing purposes.</li>
          </ul>

          <h2>4. Intellectual property</h2>
          <p>
            All content, branding, code, designs, and AI systems on this site are owned by Induxtron
            or its licensors. No rights are granted except as expressly set out in a written agreement.
          </p>

          <h2>5. Engagement terms</h2>
          <p>
            A separate written agreement governs any paid engagement, including scope, fees, deliverables,
            confidentiality, and ownership of deliverables. These Terms do not create such an agreement.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            The website and any preliminary materials are provided "as is" without warranties of any kind.
            We do not guarantee uninterrupted availability or accuracy of information published.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Induxtron is not liable for any indirect, incidental,
            special, or consequential damages arising from use of the website. Our total liability for
            anything related to website use is limited to ₹1,000.
          </p>

          <h2>8. Privacy</h2>
          <p>
            Your use is also governed by our <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These Terms are governed by the laws of India. Courts in Chhatrapati Sambhajinagar,
            Maharashtra have exclusive jurisdiction.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these Terms: <a href="mailto:sahil@induxtron.com">sahil@induxtron.com</a>.
          </p>
        </article>
      </section>
    </Layout>
  );
}
