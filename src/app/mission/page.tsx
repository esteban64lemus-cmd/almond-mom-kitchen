import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/components/marketing/site-chrome";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { ConversionCta } from "@/components/marketing/conversion-cta";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const title = "Our Mission | Almond Mom Clean Eating";
const description =
  "Almond Mom believes luxury is knowing what's inside. Seed oil free kitchens, elite protein, and AI that turns clean eating into a family habit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/mission") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/mission"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const pillars = [
  "Zero Seed Oils Policy",
  "Elite Protein Optimization",
  "Transparent Traceability",
  "Chef-Curated AI Intelligence",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: title,
  url: absoluteUrl("/mission"),
  description,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
};

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SEOHandler schemaData={schema} />
      <MarketingNav />

      <section className="relative overflow-hidden px-6 pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(156,175,136,0.22),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,139,92,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-5xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage/25 bg-sage/10 px-4 py-1.5 text-xs font-bold tracking-widest text-sage uppercase">
            <Sparkles className="h-3 w-3" /> The Manifesto
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] font-bold md:text-7xl">
            Luxury is <span className="text-sage italic">knowing</span> what&apos;s inside.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl">
            In a world of ultra-processed convenience, Almond Mom returns standard to the home.
            Your kitchen should be a sanctuary — and your food your greatest investment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/desk#book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white"
            >
              Book Desk by Seb <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-7 py-3.5 text-sm font-bold text-ink"
            >
              Browse recipes &amp; shop
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">What we stand for</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              We built Almond Mom for health-conscious families who want clean-label cooking without
              the research spiral. Snap the fridge, upgrade the grocery list, and cook seed oil free
              dinners that still feel luxurious.
            </p>
            <ul className="mt-8 space-y-3">
              {pillars.map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium text-sage">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[36px] shadow-[0_24px_60px_rgba(61,41,20,0.12)]">
            <Image
              src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1000"
              alt="Clean label ingredients for an almond mom kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-bold md:text-5xl">
            Clean eating, powered by calm intelligence
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Fridge Rescue audits your pantry. Shop Upgrader swaps for organic, high-protein
            alternatives. The recipe journal shows what almond mom clean eating looks like on a
            Tuesday night.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/desk#book"
              className="inline-flex items-center gap-2 rounded-full bg-sage px-8 py-4 text-sm font-bold text-ink"
            >
              Hire Desk by Seb <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white"
            >
              Launch the app
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-6 py-16">
        <ConversionCta
          source="mission"
          headline="Cook the mission"
          body="Browse seed oil free recipes with shoppable Amazon links, or open the app for Fridge Rescue."
        />
        <NewsletterForm source="mission" />
      </section>

      <MarketingFooter />
    </main>
  );
}
