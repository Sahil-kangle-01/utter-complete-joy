import { Link } from "@tanstack/react-router";
import logo from "@/assets/induxtron-logo.png";

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-deep)" }} className="border-t border-border mt-20 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        <div>
          <img src={logo} alt="Induxtron" className="h-28 w-auto mb-3" />
          <p className="mt-3 text-xs tracking-[0.2em] text-gold">
            WHERE INDUSTRY MEETS INTELLIGENCE
          </p>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            UDYAM-MH-04-0296135<br />
            Chhatrapati Sambhajinagar,<br />
            Maharashtra, India
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Systems</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/systems/quotegpt" className="hover:text-gold transition-colors">QuoteGPT</Link></li>
            <li><Link to="/systems/certalert" className="hover:text-gold transition-colors">CertAlert</Link></li>
            <li><Link to="/systems/industrialbot" className="hover:text-gold transition-colors">IndustrialBot</Link></li>
            <li><Link to="/systems/tenderradar" className="hover:text-gold transition-colors">TenderRadar</Link></li>
            <li><Link to="/systems/churnradar" className="hover:text-gold transition-colors">ChurnRadar</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link to="/industries" className="hover:text-gold transition-colors">Industries</Link></li>
            <li><Link to="/case-studies" className="hover:text-gold transition-colors">Case Studies</Link></li>
            <li><Link to="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:sahil@induxtron.com" className="hover:text-gold transition-colors">sahil@induxtron.com</a></li>
            <li><a href="tel:+918237007450" className="hover:text-gold transition-colors">+91 82370 07450</a></li>
            <li>
              <a
                href="https://wa.me/918237007450"
                className="inline-block mt-2 px-3 py-2 rounded-md border border-border hover:border-gold hover:text-gold transition-colors text-xs"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-3 justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Induxtron Business Systems. All rights reserved.</div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span className="text-gold">Made in Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
