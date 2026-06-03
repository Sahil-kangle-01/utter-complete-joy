import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Induxtron" },
      { name: "description", content: "How Induxtron collects, uses, and protects your information." },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Privacy Policy — Induxtron" },
      { property: "og:url", content: "https://induxtron.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://induxtron.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Layout>
      <PageHero tag="LEGAL" title="Privacy" highlight="Policy." sub="Last updated: June 2, 2026" />
      <section className="px-4 sm:px-6 pb-24">
        <article className="max-w-3xl mx-auto prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-gold">
          <p>
            Induxtron Business Systems ("Induxtron", "we", "us") respects your privacy. This policy
            explains what information we collect when you use our website or apply for access to our
            AI systems, and how we use it.
          </p>

          <h2>1. Information we collect</h2>
          <ul>
            <li><strong>Information you give us</strong> when submitting the Apply or Contact form: name, role, company, website, city, industry, team size, revenue range, phone, email, systems of interest, your challenge description, and how you heard about us.</li>
            <li><strong>Automatic information</strong> such as IP address, browser type, device, referrer, and pages visited, collected through standard server logs and analytics.</li>
          </ul>

          <h2>2. How we use information</h2>
          <ul>
            <li>To review your application and respond within 48 hours.</li>
            <li>To schedule demos and personalised consultations.</li>
            <li>To send transactional communication relating to your enquiry.</li>
            <li>To improve our website, content, and services.</li>
            <li>To comply with legal obligations under Indian law.</li>
          </ul>

          <h2>3. Sharing</h2>
          <p>
            We do not sell your information. We share it only with trusted service providers
            (email delivery, hosting, analytics) bound by confidentiality, and when required by law.
          </p>

          <h2>4. Storage and security</h2>
          <p>
            Data is stored on secure cloud infrastructure with industry-standard encryption in transit
            and at rest. Access is restricted to authorised Induxtron personnel.
          </p>

          <h2>5. Retention</h2>
          <p>
            We keep applications and contact messages for as long as needed to evaluate, deliver, or
            support our services, and as required by applicable law. You may request deletion at any time.
          </p>

          <h2>6. Your rights</h2>
          <p>
            You can request access, correction, or deletion of your personal information by emailing{" "}
            <a href="mailto:sahil@induxtron.com">sahil@induxtron.com</a>. We respond within 30 days.
          </p>

          <h2>7. Cookies</h2>
          <p>
            We use essential cookies and may use analytics cookies to understand site usage. You can
            disable cookies in your browser settings; some features may not work as expected.
          </p>

          <h2>8. Changes</h2>
          <p>
            We may update this policy. The "Last updated" date reflects the latest revision. Continued
            use of the site after changes constitutes acceptance.
          </p>

          <h2>9. Contact</h2>
          <p>
            Induxtron Business Systems · UDYAM-MH-04-0296135 · Chhatrapati Sambhajinagar, Maharashtra, India.
            Email: <a href="mailto:sahil@induxtron.com">sahil@induxtron.com</a>.
          </p>
        </article>
      </section>
    </Layout>
  );
}
