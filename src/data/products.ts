export type ProductSpec = {
  slug: string;
  name: string;
  tag: string;
  headline: string;
  highlight: string;
  sub: string;
  stats: string[];
  problem: string;
  solution: string;
  flow?: string[];
  capabilities: string[];
  impact: { value: string; label: string; details: string[] };
  // optional data table
  table?: { title: string; headers: string[]; rows: string[][] };
};

export const products: Record<string, ProductSpec> = {
  quotegpt: {
    slug: "quotegpt",
    name: "QuoteGPT",
    tag: "QUOTEGPT — QUOTE ACCELERATION",
    headline: "From RFQ email to drafted quote in",
    highlight: "under 60 seconds.",
    sub: "Industrial sales run on speed. While your competitor is still reading the email, QuoteGPT has already drafted, priced, and staged your response for approval.",
    stats: ["< 60 Seconds", "Win Rate 18% → 35%", "₹85 Lakhs / yr additional revenue"],
    problem: "Your team reads the RFQ email, checks specs, checks stock, writes a quote — and replies 24–48 hours later. Three competitors have already responded. Speed wins in B2B every time.",
    solution: "QuoteGPT monitors your inbox. The moment an RFQ arrives, AI extracts all technical parameters, matches your catalogue, drafts a complete quote, and sends an instant buyer acknowledgement. Your rep reviews and approves in one click.",
    flow: [
      "RFQ email or WhatsApp arrives — instant acknowledgement to buyer",
      "AI extracts 12+ technical fields — material, grade, tolerance, quantity, certification",
      "Matched against your product catalogue in Supabase",
      "Complete quote draft generated with line items, pricing, GST, delivery terms",
      "Sales rep gets WhatsApp alert — reviews dashboard — one-tap approve",
      "Professional PDF sent to buyer — quote tracked in dashboard",
    ],
    capabilities: [
      "Reads RFQ emails and extracts 12+ structured technical fields automatically",
      "Handles PDF, DXF, and engineering drawing attachments via AI vision",
      "Auto-drafts complete quote with line items, pricing, and delivery terms",
      "Sends buyer instant acknowledgement within 60 seconds of RFQ receipt",
      "Prioritises high-value RFQs — flags to sales head via WhatsApp immediately",
      "Tracks quote-to-order conversion rate by product, client, and sales rep",
    ],
    impact: {
      value: "₹85 Lakhs / yr",
      label: "Additional revenue on a ₹5 Cr pipeline",
      details: [
        "Win rate improves from 18% to 35% when response time drops from 48 hours to under 60 seconds.",
        "Build time: 4–6 Weeks · Response time: < 60 Seconds · Win rate uplift: 18% → 35%",
      ],
    },
    table: {
      title: "Works with the software you already use.",
      headers: ["Platform", "Integration", "How It Works", "Timeline"],
      rows: [
        ["Vyapar", "PDF Export Match", "Template-identical PDF, one-click Vyapar import", "V1 Live"],
        ["Zoho CRM", "API Push", "Approved quotes pushed as Zoho Quote records", "V2"],
        ["Tally", "XML Export", "Tally-compatible XML voucher generation", "V2"],
        ["SAP B1", "REST API", "Push as Draft Sales Order via SAP API", "V3 Enterprise"],
        ["WhatsApp", "Native", "Input via WhatsApp, output PDF via WhatsApp", "V1 Live"],
      ],
    },
  },
  certalert: {
    slug: "certalert",
    name: "CertAlert",
    tag: "CERTALERT — RECURRING REVENUE PROTECTION",
    headline: "Never let a calibration certificate",
    highlight: "expire again.",
    sub: "Every expired certificate is a client who called your competitor first. CertAlert makes sure that never happens — automatically, at scale, without your team lifting a finger.",
    stats: ["Renewal Rate 65% → 88%", "₹34.5 Lakhs ARR", "Pays for itself in Month 1"],
    problem: "Calibration certificates expire silently. Your client looks for the renewal reminder that never came — and calls a competitor instead. By the time you notice, the relationship is gone.",
    solution: "CertAlert tracks every certificate across your client base. A 3-touch personalised reminder sequence fires automatically. Renewals convert before the expiry date — every time.",
    flow: [
      "90 days before: Personalised WhatsApp + email — 'Your {instrument} calibration is due in 90 days'",
      "30 days before: Follow-up with renewal link — one-click creates service ticket",
      "7 days before: Urgent reminder — 'Action required by {date}'",
    ],
    capabilities: [
      "Centralised certificate expiry tracking for 1,000+ clients on a live dashboard",
      "ARR dashboard — rupee value expiring this month, this quarter, this year",
      "Renewal revenue forecast with month-by-month projection",
      "Client-specific personalisation — references exact instrument and last calibration date",
      "One-click renewal creates service ticket instantly in your system",
      "Win-back campaigns for lapsed clients — automated reactivation sequence",
    ],
    impact: {
      value: "₹34.5 Lakhs / yr",
      label: "Additional ARR for a lab with 1,000 clients",
      details: [
        "Renewal rate jumps from 65% to 88% with the automated 3-touch reminder sequence.",
        "Build time: 3–5 Weeks · Renewal Rate: 65% → 88% · Revenue Type: Pure Recurring",
      ],
    },
  },
  industrialbot: {
    slug: "industrialbot",
    name: "IndustrialBot",
    tag: "INDUSTRIALBOT — SALES & LEAD CONVERSION",
    headline: "Turn your website into a",
    highlight: "24×7 AI sales agent.",
    sub: "A visitor arrives needing a plug gauge for a 12mm bore at Grade 1 tolerance. IndustrialBot answers them instantly — in Hindi or English — qualifies the lead, and fires a WhatsApp alert to your sales rep in real time.",
    stats: ["0.5% → 8% Website Conversion", "24×7×365 Availability", "1-Line Code Install"],
    problem: "Most industrial websites convert at under 1%. Visitors arrive with technical questions at 11 PM. Nobody answers. They leave. The lead is gone.",
    solution: "IndustrialBot understands your products natively — metrology, HVAC, pharma, industrial. It answers in Hindi or English, qualifies leads, and routes hot ones to your sales rep on WhatsApp.",
    capabilities: [
      "Understands precision metrology, HVAC, pharma, and industrial terminology natively",
      "Answers technical product queries 24×7 in Hindi and English (Hinglish supported)",
      "Qualifies leads by industry segment, tolerance requirements, and order volume",
      "Auto-creates CRM leads with complete conversation transcript attached",
      "Escalates hot leads to sales rep via WhatsApp with full conversation summary",
      "Monthly conversion report: top queries, chat-to-quote rate, revenue attributed",
      "Learns from past conversations to improve answer accuracy over time",
    ],
    impact: {
      value: "₹8 Lakhs / mo",
      label: "For a site with 2,000 monthly visitors",
      details: [
        "Website conversion improves from 0.5% to 5–8%. At ₹50,000 average deal value, that is 16 additional deals per month from a single AI widget.",
        "Build time: 3–4 Weeks · Install: 1-Line Code · Availability: 24×7×365",
      ],
    },
  },
  tenderradar: {
    slug: "tenderradar",
    name: "TenderRadar",
    tag: "TENDERRADAR — MARKET INTELLIGENCE",
    headline: "Never miss a GeM or government tender",
    highlight: "relevant to your products.",
    sub: "Government procurement through GeM crossed ₹4 Lakh Crore in FY2024. Most MSMEs miss 80% of opportunities they are qualified to win. TenderRadar changes that.",
    stats: ["15+ Portals Daily", "₹135 L / yr", "WhatsApp Alerts"],
    problem: "Tender portals are fragmented. Listings are buried. Your team checks two of them, twice a week. Eighty percent of relevant opportunities pass by unseen.",
    solution: "TenderRadar scans 15+ national, state, and sector portals daily. AI filters by your product catalogue, eligibility, and value range. Relevant tenders ping your sales head on WhatsApp the moment they go live.",
    capabilities: [
      "Daily scan of GeM, CPPP, MAHATENDERS, IREPS, NIC, MSME and 10+ more portals",
      "AI-filtered against your product catalogue and eligibility criteria",
      "WhatsApp + email alerts within minutes of a relevant tender going live",
      "Tender deadline tracker with bid preparation timeline",
      "Win-rate analytics by portal, category, and authority",
      "Document checklist auto-generated for each tender type",
    ],
    impact: {
      value: "₹135 Lakhs / yr",
      label: "From a previously untapped channel",
      details: [
        "3 winnable tenders per month at ₹15 Lakhs average value, 25% win rate = ₹11.25 Lakhs additional monthly revenue.",
        "Build time: 5–7 Weeks · Portals: 15+ Daily · Alert: WhatsApp",
      ],
    },
    table: {
      title: "Portal coverage.",
      headers: ["National", "State", "Sector"],
      rows: [
        ["GeM (Government e-Marketplace)", "Maharashtra MAHATENDERS", "Defence (DRDO, DPSUs)"],
        ["CPPP Central Portal", "UP, MP, Rajasthan, Gujarat", "Railways — IREPS"],
        ["MSME Portal", "Karnataka, Tamil Nadu", "PSUs — ONGC, BHEL, NTPC"],
        ["NIC eProcurement", "All major state portals", "Municipal Corporations"],
      ],
    },
  },
  churnradar: {
    slug: "churnradar",
    name: "ChurnRadar",
    tag: "CHURNRADAR — CUSTOMER RETENTION AI",
    headline: "Know which clients are going silent",
    highlight: "before they actually do.",
    sub: "In B2B manufacturing, losing a key account is catastrophic. A client ordering ₹5 Lakhs per quarter simply stops — no goodbye, no complaint. The warning signs were always there. Nobody was watching. Now ChurnRadar watches.",
    stats: ["90-Day Prediction", "Churn 15% → 7%", "₹96 L / yr saved"],
    problem: "Account managers cannot watch every client every day. Churn shows up as a quarterly revenue dip — months after the warning signs first appeared.",
    solution: "ChurnRadar scores every account on order frequency, value trend, last interaction, and payment behaviour. Amber-zone accounts trigger automated outreach. Red-zone accounts page the sales head immediately.",
    flow: [
      "GREEN (60–100): Healthy — standard engagement cadence",
      "AMBER (40–60): At risk — automated personalised outreach triggered",
      "RED (0–40): Churning alert — immediate sales head intervention fired",
    ],
    capabilities: [
      "Automated Account Health Score for every client — 0–100, updated weekly",
      "ML model estimates which accounts will go inactive in next 90 days",
      "AI suggests reactivation offer based on client's specific purchase history",
      "Sales head dashboard showing total revenue at risk this month by account tier",
      "Trigger-based intervention workflows with automatic personalised outreach",
      "Win-back playbooks — tested sequences for each account tier",
    ],
    impact: {
      value: "₹96 Lakhs / yr",
      label: "For a ₹12 Cr revenue base",
      details: [
        "Churn reduction from 15% to 7% saves ₹96 Lakhs annually in pure margin with zero new sales effort required.",
        "Build time: 4–6 Weeks · Churn Reduction: 15% → 7% · Prediction window: 90 Days",
      ],
    },
  },
};
