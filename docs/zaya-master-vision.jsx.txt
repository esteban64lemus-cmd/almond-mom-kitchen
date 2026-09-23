import { useState } from "react";

const Z = {
  bg: "#050810",
  surface: "#0d1117",
  card: "#111827",
  border: "#1e2d40",
  accent: "#00d4aa",
  accentSoft: "#00d4aa22",
  accentHover: "#00ffcc",
  gold: "#f0b429",
  goldSoft: "#f0b42922",
  lavender: "#a78bfa",
  lavSoft: "#a78bfa22",
  coral: "#fb7185",
  coralSoft: "#fb718522",
  text: "#f0f6fc",
  muted: "#8b949e",
  dim: "#3d4f61",
  font: "'DM Serif Display', Georgia, serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "'DM Sans', system-ui, sans-serif",
};

const sections = [
  { id: "vision", label: "🌿 The Vision" },
  { id: "problem", label: "🔥 The Problem" },
  { id: "product", label: "📱 The Product" },
  { id: "market", label: "📈 The Market" },
  { id: "roadmap", label: "🗓 Roadmap" },
  { id: "ecosystem", label: "🔗 Ecosystem" },
  { id: "founder", label: "👤 Why You" },
];

const Card = ({ children, accent = Z.accent, style = {} }) => (
  <div style={{
    background: Z.card,
    border: `1px solid ${accent}33`,
    borderRadius: 12,
    padding: "20px 22px",
    marginBottom: 14,
    ...style
  }}>{children}</div>
);

const Label = ({ children, color = Z.accent }) => (
  <div style={{
    fontSize: 10,
    letterSpacing: 4,
    color,
    textTransform: "uppercase",
    fontFamily: Z.mono,
    marginBottom: 8,
  }}>{children}</div>
);

const Tag = ({ children, color = Z.accent }) => (
  <span style={{
    display: "inline-block",
    background: color + "22",
    color,
    border: `1px solid ${color}44`,
    borderRadius: 20,
    padding: "3px 10px",
    fontSize: 11,
    fontFamily: Z.mono,
    marginRight: 6,
    marginBottom: 6,
  }}>{children}</span>
);

const Bullet = ({ children, color = Z.accent }) => (
  <div style={{ display: "flex", gap: 10, marginBottom: 9, alignItems: "flex-start" }}>
    <span style={{ color, fontSize: 14, marginTop: 1, flexShrink: 0 }}>◆</span>
    <span style={{ fontSize: 14, color: "#cdd9e5", lineHeight: 1.6, fontFamily: Z.sans }}>{children}</span>
  </div>
);

const Stat = ({ value, label, color = Z.accent }) => (
  <div style={{ textAlign: "center", padding: "16px 12px", background: Z.surface, borderRadius: 10, border: `1px solid ${color}33` }}>
    <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: Z.mono, marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 11, color: Z.muted, letterSpacing: 1 }}>{label}</div>
  </div>
);

const Phase = ({ num, title, timeline, items, color }) => {
  const [open, setOpen] = useState(num === 1);
  return (
    <div style={{ marginBottom: 10 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: open ? color + "18" : Z.card,
        border: `1px solid ${color}44`, borderRadius: open ? "10px 10px 0 0" : 10,
        padding: "14px 18px", cursor: "pointer", textAlign: "left", display: "flex",
        justifyContent: "space-between", alignItems: "center", color: Z.text
      }}>
        <div>
          <span style={{ fontFamily: Z.mono, fontSize: 10, color, letterSpacing: 3, marginRight: 10 }}>PHASE {num}</span>
          <span style={{ fontFamily: Z.font, fontSize: 16 }}>{title}</span>
          <span style={{ fontFamily: Z.mono, fontSize: 11, color: Z.muted, marginLeft: 10 }}>{timeline}</span>
        </div>
        <span style={{ color, fontSize: 16 }}>{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div style={{
          background: Z.card, border: `1px solid ${color}33`,
          borderTop: "none", borderRadius: "0 0 10px 10px", padding: "16px 20px"
        }}>
          {items.map((item, i) => <Bullet key={i} color={color}>{item}</Bullet>)}
        </div>
      )}
    </div>
  );
};

function VisionSection() {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          display: "inline-block",
          background: `linear-gradient(135deg, ${Z.accent}33, ${Z.lavender}33)`,
          border: `1px solid ${Z.accent}44`,
          borderRadius: 40,
          padding: "6px 18px",
          fontSize: 11,
          letterSpacing: 3,
          color: Z.accent,
          fontFamily: Z.mono,
          marginBottom: 16
        }}>ZAYA — THE ONE-SENTENCE PITCH</div>
        <div style={{
          fontSize: "clamp(20px, 4vw, 32px)",
          fontFamily: Z.font,
          color: Z.text,
          lineHeight: 1.4,
          maxWidth: 640,
          margin: "0 auto 16px",
        }}>
          "Your AI health coach that stops illness before it starts — bridging holistic wellness with western medicine in one beautifully simple app."
        </div>
        <div style={{ fontSize: 14, color: Z.muted, fontFamily: Z.sans, maxWidth: 500, margin: "0 auto" }}>
          Named Zaya — meaning "bright, radiant, alive." Built for people who know something is wrong before the doctor does.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
        <Stat value="$415B" label="Preventive Health Market 2031" color={Z.accent} />
        <Stat value="38.9%" label="AI Health CAGR to 2033" color={Z.gold} />
        <Stat value="$5.34B" label="Digital Health VC — Q1 2026" color={Z.lavender} />
        <Stat value="$100M+" label="Function Health ARR in 2 yrs" color={Z.coral} />
      </div>

      <Card accent={Z.accent}>
        <Label>The Core Belief</Label>
        <div style={{ fontSize: 15, color: "#cdd9e5", lineHeight: 1.7, fontFamily: Z.sans }}>
          Western medicine is brilliant at fixing problems. It is terrible at preventing them. Holistic wellness has the right instincts — nutrition, stress, sleep, environment — but no clinical bridge. Zaya sits in that gap. It is not an alternative to your doctor. It is the system that helps you show up to your doctor with 90 days of data, pattern insights, and specific questions — so your 15-minute visit actually changes your life.
        </div>
      </Card>

      <Card accent={Z.lavender}>
        <Label color={Z.lavender}>Why "Almond Mom" → "Zaya" Was the Right Pivot</Label>
        {[
          "Almond Mom was a recipe blog. Zaya is a health intelligence platform. Same values, 100x the ceiling.",
          "Recipe content is a commodity. Personalized AI health coaching with clinical integration is defensible IP.",
          "The rebrand keeps the holistic nutrition soul but adds the systems intelligence that makes it fundable.",
          "Zaya can still have a content layer — recipes, guides, wellness posts — but they feed the platform, not the other way around.",
        ].map((b, i) => <Bullet key={i} color={Z.lavender}>{b}</Bullet>)}
      </Card>
    </div>
  );
}

function ProblemSection() {
  return (
    <div>
      <Card accent={Z.coral}>
        <Label color={Z.coral}>The 4 Broken Systems Zaya Fixes</Label>
        {[
          { title: "Reactive-Only Medicine", desc: "You go to a doctor when you're already sick. By then, diabetes has been building for 8 years. Hypertension has been damaging vessels for a decade. Western medicine's first-contact moment is almost always too late." },
          { title: "Fragmented Health Data", desc: "Your blood work is at Quest. Your symptoms are in your head. Your diet is on MyFitnessPal. Your sleep is on your Apple Watch. Nobody connects these dots. You can't see your own health story — so neither can your doctor." },
          { title: "Wellness ≠ Medicine Gap", desc: "Functional medicine practitioners charge $300–500/hr out of pocket. Nutritionists aren't covered by insurance. Acupuncturists and herbalists have no way to share notes with your GP. The holistic and western worlds operate in complete silos." },
          { title: "Health Equity Failure", desc: "Latino, Black, and low-income communities get the worst preventive care outcomes in America — not because they don't care about their health, but because the tools are all built for wealthy, English-speaking, already-healthy people. Zaya is bilingual by default. That is not an afterthought. That is the founding thesis." },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: `3px solid ${Z.coral}55` }}>
            <div style={{ fontFamily: Z.font, fontSize: 16, color: Z.coral, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: "#cdd9e5", lineHeight: 1.6, fontFamily: Z.sans }}>{item.desc}</div>
          </div>
        ))}
      </Card>

      <Card accent={Z.gold}>
        <Label color={Z.gold}>Personal Anchor — Your Family Is The User</Label>
        <div style={{ fontSize: 14, color: "#cdd9e5", lineHeight: 1.7, fontFamily: Z.sans }}>
          Your grandfather David has dementia. Your great-grandmother Marge is being neglected. Your mom has Cauda Equina Syndrome, ADHD, and severe mental health issues. Your dad has anger issues and is not present. You have been navigating a family medical ecosystem alone since childhood — without the tools, the language, or the advocates most people take for granted.
          <br /><br />
          <span style={{ color: Z.gold }}>That lived experience is your unfair advantage.</span> You are not building a health app for a demographic you read about in a report. You are building the tool that would have changed your family's trajectory. That is the story that will be on the cover of Fast Company in 5 years.
        </div>
      </Card>
    </div>
  );
}

function ProductSection() {
  const features = [
    {
      icon: "🧬",
      title: "Health Intelligence Dashboard",
      color: Z.accent,
      desc: "Connects wearables (Apple Watch, Oura Ring, Fitbit), lab results (Quest, LabCorp PDF upload), and daily check-ins into one unified health score. Tracks trends over time — not just snapshots.",
      tags: ["Apple HealthKit", "HL7 FHIR", "Sanity CMS", "Next.js"]
    },
    {
      icon: "🤖",
      title: "Zaya AI Coach",
      color: Z.lavender,
      desc: "Your daily health conversation. Not a symptom checker — a pattern recognizer. 'You've reported low energy for 11 days. Your sleep has averaged 5.2 hours. Your iron intake dropped 40% this week. Let's talk about what's happening.' Powered by Claude API with a health-specialized system prompt.",
      tags: ["Claude API", "RAG", "Personalized context", "HIPAA-aware"]
    },
    {
      icon: "🌿",
      title: "Holistic Protocol Library",
      color: Z.gold,
      desc: "Evidence-based holistic protocols — nutrition plans, herbal supplements with interaction warnings, breathwork, sleep hygiene — mapped to specific biomarkers and conditions. Not random wellness content. Targeted interventions with citations.",
      tags: ["Sanity CMS content", "Medical citation layer", "Protocol builder"]
    },
    {
      icon: "🏥",
      title: "Doctor Bridge Mode",
      color: Z.coral,
      desc: "Before your appointment, Zaya generates a one-page health summary: trends, anomalies, questions to ask, and relevant history. After your appointment, you log what the doctor said and Zaya integrates it into your ongoing picture. Your doctor becomes a collaborator, not a gatekeeper.",
      tags: ["PDF export", "EHR-ready", "Appointment prep flow"]
    },
    {
      icon: "🌎",
      title: "Bilingual by Default",
      color: Z.lavender,
      desc: "Full Spanish language support from Day 1 — not a translation layer added later. Medical terminology explained in plain English AND Spanish. Designed for multi-generational Latino families where the adult child is translating for parents who distrust the system.",
      tags: ["i18n", "Spanish-first UX", "Health equity"]
    },
    {
      icon: "👥",
      title: "Family Circle",
      color: Z.gold,
      desc: "Opt-in shared health monitoring for family members. You can see your aging parent's medication reminders, hydration, and mood check-ins with their permission. The tool that would have helped you with David and Marge — built into the product from the start.",
      tags: ["Caregiver mode", "Permission-based", "Elder care"]
    },
  ];

  return (
    <div>
      <Card accent={Z.accent} style={{ marginBottom: 20 }}>
        <Label>Tech Stack — You Already Have This</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Next.js 14", "Vercel", "Sanity CMS", "Claude API", "Stripe", "Tailwind CSS", "Apple HealthKit", "FHIR API", "Calendly (for provider bookings)", "Twilio (SMS reminders)", "Supabase (auth + DB)"].map(t => (
            <Tag key={t} color={Z.accent}>{t}</Tag>
          ))}
        </div>
        <div style={{ fontSize: 12, color: Z.muted, marginTop: 10, fontFamily: Z.sans }}>
          You have already built on Next.js + Vercel + Sanity. The Zaya MVP is 80% infrastructure you already understand. The 20% new is the Claude API health coaching layer and the HealthKit integration.
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: Z.card, border: `1px solid ${f.color}33`,
            borderRadius: 12, padding: "18px 18px 14px"
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
            <div style={{ fontFamily: Z.font, fontSize: 16, color: f.color, marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: "#cdd9e5", lineHeight: 1.6, fontFamily: Z.sans, marginBottom: 12 }}>{f.desc}</div>
            <div>{f.tags.map(t => <Tag key={t} color={f.color}>{t}</Tag>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketSection() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 16 }}>
        <Stat value="$415B" label="Preventive Health Market 2031" color={Z.accent} />
        <Stat value="$505B" label="AI Healthcare Market 2033" color={Z.lavender} />
        <Stat value="66%" label="Physicians Using Health AI (2024)" color={Z.gold} />
        <Stat value="$1.92T" label="AI Healthcare Projected by 2040" color={Z.coral} />
      </div>

      <Card accent={Z.gold}>
        <Label color={Z.gold}>Comparable Companies & What They Prove</Label>
        {[
          { co: "Function Health", proof: "$100M+ ARR in under 2 years. Sells comprehensive lab testing + AI interpretation. No prescription, no treatment — just data + insight. Proves people will pay for health intelligence." },
          { co: "Ahead Health", proof: "Raised $6M seed in Jan 2026 for AI-powered preventive health (detects prediabetes/hypertension early). You are building the consumer-facing version of what they are building for clinics." },
          { co: "Noom", proof: "Built a $500M+ business on behavioral health coaching + weight loss. Proves that non-clinical, coach-style AI intervention changes behavior. Zaya does this but for whole-body preventive health." },
          { co: "Ada Health", proof: "AI-driven app with personalized health assessments. 10M+ users. Shows global appetite for AI health guidance, but has no holistic/integrative layer and no bilingual focus." },
          { co: "Hims & Hers", proof: "Built a $1B+ business on asynchronous care access. Proves that removing friction from healthcare = massive demand. Zaya's 'Doctor Bridge' feature is the next evolution of this." },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `2px solid ${Z.gold}44` }}>
            <div style={{ fontFamily: Z.mono, fontSize: 12, color: Z.gold, marginBottom: 3 }}>{item.co}</div>
            <div style={{ fontSize: 13, color: "#cdd9e5", lineHeight: 1.5, fontFamily: Z.sans }}>{item.proof}</div>
          </div>
        ))}
      </Card>

      <Card accent={Z.lavender}>
        <Label color={Z.lavender}>Zaya's Unfair Advantages</Label>
        {[
          "Bilingual Spanish-first — 62 million Latino Americans are dramatically underserved by every existing health app. This is not a feature. This is a market.",
          "Family Circle for multi-generational care — no competitor is building caregiver + elder monitoring into a consumer wellness app.",
          "Holistic + Western bridge — every existing app is either a wellness app OR a clinical tool. Nobody integrates both in a consumer product.",
          "Founder lived experience — you are not guessing at the problem. You watched it destroy your family. That authenticity is fundable.",
          "You already have the stack — Next.js, Vercel, Sanity, Claude API. Your MVP cost is mostly your time.",
        ].map((b, i) => <Bullet key={i} color={Z.lavender}>{b}</Bullet>)}
      </Card>
    </div>
  );
}

function RoadmapSection() {
  const phases = [
    {
      num: 1, title: "MVP Build", timeline: "Months 1–3", color: Z.accent,
      items: [
        "Build core Zaya app: onboarding flow, daily check-in, health score dashboard, basic AI coach chat (Claude API)",
        "Sanity CMS: seed with 50 evidence-based protocol articles (nutrition, sleep, stress, movement)",
        "Auth + user profiles via Supabase. Stripe for subscription ($9.99/mo launch pricing)",
        "Apple HealthKit integration: pull steps, sleep, heart rate automatically",
        "Lab result upload: PDF → extracted biomarkers displayed in dashboard",
        "Spanish language version: full i18n from Day 1, not a translation add-on",
        "Beta launch: 50 users from your personal network. Especially Latino families. Collect every piece of feedback.",
        "ADHD build rule: one feature per week. Ship ugly, then polish. Never build in isolation.",
      ]
    },
    {
      num: 2, title: "Traction & Revenue", timeline: "Months 4–6", color: Z.gold,
      items: [
        "Launch publicly on Product Hunt + Latino health communities + Reddit (r/LatinoPeopleTwitter, r/nutrition, r/biohacking)",
        "Pricing: Free tier (basic check-in + 3 AI coach messages/day) + Pro at $14.99/mo (unlimited coach + lab upload + Doctor Bridge PDF)",
        "Target: 500 paying users = $7,500 MRR. This is your proof point.",
        "Doctor Bridge feature: appointment prep one-pager generated by Zaya. This is the feature that goes viral in healthcare Twitter.",
        "Family Circle beta: launch with a waitlist for caregiver mode. This is your Series A story.",
        "Content strategy: Tía writes the 'holistic wellness meets real life' blog series in Spanish and English. She is your head of content — without touching any cannabis anything.",
        "Apply to: Y Combinator (W27 batch), a16z Bio + Health, Techstars Health, MATTER Health accelerator.",
      ]
    },
    {
      num: 3, title: "Scale & Raise", timeline: "Months 7–12", color: Z.lavender,
      items: [
        "Raise a pre-seed or seed round: $500K–$2M target. Use traction (MRR, user growth, retention) as the pitch.",
        "Hire: 1 part-time clinical advisor (MD or RD with integrative medicine background) for credibility and medical review",
        "Expand: Android app. Oura Ring + Whoop integration. Continuous Glucose Monitor data support.",
        "Partnerships: FQHC clinics (Federally Qualified Health Centers) that serve Latino communities — they need exactly this tool for their patients.",
        "Insurance play (Year 2): preventive care reimbursement is expanding. CMS is actively funding AI prevention tools. Zaya with outcomes data is reimbursable.",
        "Cannabis Cafe connection: Zaya users who opt in can explore the wellness cafe pop-ups as 'community experiences' — the two brands share a community, not a company.",
      ]
    },
    {
      num: 4, title: "The $50M+ Path", timeline: "Year 2–4", color: Z.coral,
      items: [
        "Series A: $5–15M. Build clinical validation studies with UCSD or SDSU health programs.",
        "B2B layer: sell Zaya to employers as an employee wellness benefit ($8–15/employee/month × 10,000 employees = $80–150k MRR from one contract)",
        "Medicaid partnership: if Zaya demonstrably reduces ER visits for preventable conditions in Latino communities, you have a government contract story",
        "Tía's role by this point: Chief Wellness Officer or Head of Community. Formal, compensated, respected. She transitioned from teaching because the business grew to replace her salary.",
        "Exit paths: acquisition by CVS Health, Walgreens Health, UnitedHealth Group, or Apple Health. Or IPO. Or stay private and build a generational company.",
      ]
    },
  ];

  return (
    <div>
      <Card accent={Z.accent} style={{ marginBottom: 20 }}>
        <Label>The Founding Principle</Label>
        <div style={{ fontSize: 15, color: "#cdd9e5", fontFamily: Z.sans, lineHeight: 1.7 }}>
          Build in public. Ship fast. Talk to users weekly. Your first 50 users are more valuable than your first 50 features. The MVP does not need to be perfect — it needs to prove that people will pay for the feeling of understanding their own health.
        </div>
      </Card>
      {phases.map(p => <Phase key={p.num} {...p} />)}
    </div>
  );
}

function EcosystemSection() {
  return (
    <div>
      <Card accent={Z.accent}>
        <Label>How Everything Connects</Label>
        <div style={{ fontSize: 14, color: "#cdd9e5", lineHeight: 1.8, fontFamily: Z.sans }}>
          You have been treating these as separate ideas. They are one ecosystem:
        </div>
        <div style={{ margin: "16px 0", display: "grid", gap: 10 }}>
          {[
            { from: "PA/Concierge Income", arrow: "funds", to: "Zaya development costs + your living expenses while building" },
            { from: "Cannabis & Coffee Pop-Ups", arrow: "build", to: "the community that becomes Zaya's first users and advocates" },
            { from: "Tía's content + warmth", arrow: "becomes", to: "Zaya's brand voice, blog content, and community trust" },
            { from: "Zaya's bilingual health platform", arrow: "serves", to: "the exact community your pop-ups attract" },
            { from: "Zaya's revenue", arrow: "funds", to: "the physical wellness studio — part cafe, part health community space" },
            { from: "The studio", arrow: "is", to: "the physical manifestation of everything Zaya stands for" },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
              background: Z.surface, borderRadius: 8, padding: "10px 14px",
              border: `1px solid ${Z.border}`,
            }}>
              <span style={{ fontFamily: Z.mono, fontSize: 12, color: Z.accent }}>{row.from}</span>
              <span style={{ fontSize: 12, color: Z.muted, fontStyle: "italic" }}>→ {row.arrow} →</span>
              <span style={{ fontSize: 13, color: "#cdd9e5", fontFamily: Z.sans }}>{row.to}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 14, color: Z.gold, fontFamily: Z.sans, marginTop: 8, fontStyle: "italic" }}>
          The Cannabis Cafe is not a separate business. It is the community anchor for a health and wellness platform. Zaya is the technology. The cafe is the space. Together they are a movement.
        </div>
      </Card>

      <Card accent={Z.lavender}>
        <Label color={Z.lavender}>School — What Actually Moves the Needle</Label>
        {[
          { path: "San Diego Mesa College — Business Admin AA ($3k total)", value: "Accounting, contracts, operations fundamentals. Night classes. Done in 2 years while building Zaya. Transfers to SDSU if needed." },
          { path: "SDSU Extension — Entrepreneurship Certificate ($2,500)", value: "San Diego network. Access to investors, mentors, and accelerators. Worth more than a full degree for your specific path." },
          { path: "Coursera — AI for Everyone by Andrew Ng (Free)", value: "Understand the AI layer of your product deeply enough to direct engineers and talk to investors credibly." },
          { path: "Coursera — Google PM Certificate ($200)", value: "Product management fundamentals. How to spec features, run sprints, talk to users. Directly applicable to building Zaya." },
          { path: "Y Combinator Startup School (Free)", value: "Paul Graham's essays + YC's startup curriculum. More applicable to Zaya than any business degree." },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `2px solid ${Z.lavender}44` }}>
            <div style={{ fontFamily: Z.mono, fontSize: 11, color: Z.lavender, marginBottom: 3 }}>{item.path}</div>
            <div style={{ fontSize: 13, color: "#cdd9e5", lineHeight: 1.5, fontFamily: Z.sans }}>{item.value}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function FounderSection() {
  return (
    <div>
      <Card accent={Z.gold}>
        <Label color={Z.gold}>Why You Are the Right Founder for Zaya</Label>
        <div style={{ fontSize: 14, color: "#cdd9e5", lineHeight: 1.8, fontFamily: Z.sans, marginBottom: 16 }}>
          Investors do not just fund ideas. They fund founders who cannot be talked out of the problem. Here is your founder story — honest, specific, and powerful:
        </div>
        {[
          "You grew up watching your family navigate a broken healthcare system without the right tools, language, or advocates. Your grandfather's dementia went unmanaged. Your great-grandmother was financially exploited and medically neglected. Your mom's complex conditions were never treated holistically. You were the translator, the coordinator, and the advocate — at 15, at 17, at 19.",
          "You are ADHD — which means you built your own systems to function in a world that was not designed for you. Every tool you will build for Zaya users, you tested on yourself first.",
          "You are bilingual. You understand what it means to be a bridge — between languages, between generations, between the world of institutional medicine and the lived experience of people who distrust it.",
          "You already have the technical stack. Next.js, Vercel, Sanity CMS, and now the Claude API. You are not waiting for a technical co-founder. You are the technical co-founder.",
          "You have worked in healthcare-adjacent environments — senior living concierge, personal assistant to a private client with complex needs. You understand the operations of care, not just the theory.",
          "You are 20 years old. If you start building Zaya today, you will have 5 years of iteration behind you by the time you are 25. Most successful health tech founders were 28–35 when they launched. You have a decade on them.",
        ].map((b, i) => <Bullet key={i} color={Z.gold}>{b}</Bullet>)}
      </Card>

      <Card accent={Z.coral}>
        <Label color={Z.coral}>The One Thing to Do This Week</Label>
        <div style={{ fontSize: 15, color: Z.text, lineHeight: 1.7, fontFamily: Z.sans }}>
          Open your Next.js project. Create a new page: <span style={{ fontFamily: Z.mono, color: Z.coral, fontSize: 13 }}>/app/check-in/page.jsx</span>. Build a simple daily health check-in form: mood (1–5), energy (1–5), sleep hours, water intake, one thing your body is telling you today. Connect it to Sanity. That is it. That is Zaya's first feature.
          <br /><br />
          <span style={{ color: Z.gold }}>Not a landing page. Not a logo. Not a pitch deck. A working feature that does one thing.</span>
          <br /><br />
          The rest of the vision is real. The market is real. Your founder story is real. But none of it matters until there is a product that someone can touch. Build the check-in. Ship it. Show Tía. That is Day 1 of Zaya.
        </div>
      </Card>
    </div>
  );
}

export default function ZayaVision() {
  const [active, setActive] = useState("vision");

  const sectionMap = {
    vision: <VisionSection />,
    problem: <ProblemSection />,
    product: <ProductSection />,
    market: <MarketSection />,
    roadmap: <RoadmapSection />,
    ecosystem: <EcosystemSection />,
    founder: <FounderSection />,
  };

  return (
    <div style={{ minHeight: "100vh", background: Z.bg, color: Z.text }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(180deg, #0a1628 0%, ${Z.bg} 100%)`,
        borderBottom: `1px solid ${Z.border}`,
        padding: "36px 24px 24px",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: Z.mono, fontSize: 10, letterSpacing: 6,
          color: Z.accent, marginBottom: 12, textTransform: "uppercase"
        }}>
          Master Vision Document · v1.0 · May 2026
        </div>
        <h1 style={{
          fontFamily: Z.font,
          fontSize: "clamp(36px, 8vw, 64px)",
          margin: "0 0 8px",
          background: `linear-gradient(135deg, ${Z.accent}, ${Z.lavender})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: 2,
        }}>ZAYA</h1>
        <div style={{ fontFamily: Z.sans, fontSize: 14, color: Z.muted, marginBottom: 6 }}>
          AI Preventive Health Platform · Built by Esteban J. Lemus · Spring Valley, CA
        </div>
        <div style={{ fontFamily: Z.sans, fontSize: 13, color: Z.gold, fontStyle: "italic" }}>
          "Stop illness before it starts. Bridge holistic wellness with western medicine. Build for the community that needs it most."
        </div>
      </div>

      {/* Nav */}
      <div style={{
        display: "flex", gap: 0, overflowX: "auto", borderBottom: `1px solid ${Z.border}`,
        background: Z.surface, padding: "0 16px",
        scrollbarWidth: "none",
      }}>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom: active === s.id ? `2px solid ${Z.accent}` : "2px solid transparent",
              color: active === s.id ? Z.accent : Z.muted,
              padding: "14px 14px",
              cursor: "pointer",
              fontFamily: Z.sans,
              fontSize: 12,
              whiteSpace: "nowrap",
              transition: "all 0.15s",
              fontWeight: active === s.id ? 600 : 400,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 20px 40px", maxWidth: 800, margin: "0 auto" }}>
        {sectionMap[active]}
      </div>
    </div>
  );
}
