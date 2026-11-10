import type { Metadata } from "next";
import { Suspense } from "react";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { KickoffForm } from "./kickoff-form";
import {
  ADD_ONS,
  AUDIENCES,
  CONTACT_EMAIL,
  ENTRY,
  PREMIUM,
  SITE_URL,
  promoMonthLabel,
} from "./offer";

const description =
  "Admin desk for San Diego salons, clinics, shops, and trades. Entry $79.99/mo for one approved automation, or Premium $997/mo for inbox, follow-ups, and reviews.";

export const metadata: Metadata = {
  metadataBase: new URL("https://almondmom.online"),
  title: "Desk by Seb | Admin for San Diego local businesses",
  description,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Desk by Seb",
    description,
    url: SITE_URL,
    siteName: "Desk by Seb",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desk by Seb",
    description,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Desk by Seb",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  areaServed: { "@type": "AdministrativeArea", name: "San Diego" },
  description,
  makesOffer: [
    {
      "@type": "Offer",
      name: "Entry",
      price: "79.99",
      priceCurrency: "USD",
      description: ENTRY.summary,
    },
    {
      "@type": "Offer",
      name: "Premium",
      price: "997",
      priceCurrency: "USD",
      description: `${PREMIUM.summary} First month ${PREMIUM.promoPrice} when you book a kickoff this month.`,
    },
  ],
};

const nav = [
  { href: "#included", label: "What’s included" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export default function DeskPage() {
  const month = promoMonthLabel();

  return (
    <div id="top" className="bg-cream text-ink min-h-screen">
      <SEOHandler schemaData={schema} />
      <a
        href="#main"
        className="focus:bg-ink focus:text-cream sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header className="border-border/80 bg-cream/90 sticky top-0 z-20 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <a
            href="#top"
            className="font-serif text-xl tracking-tight sm:text-2xl"
          >
            Desk by Seb
          </a>
          <nav
            className="text-muted-foreground hidden items-center gap-6 text-sm md:flex"
            aria-label="On this page"
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#book"
            aria-label="Book a 15-min kickoff"
            className="bg-ink text-cream hover:bg-ink/90 inline-flex min-h-10 items-center justify-center rounded-full px-4 text-sm font-semibold"
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book a 15-min kickoff</span>
          </a>
        </div>
      </header>

      <main id="main">
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end md:py-20">
          <div>
            <p className="text-coral-strong text-xs font-semibold tracking-[0.18em] uppercase">
              San Diego local businesses
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl">
              A written admin desk for the work between customers.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Desk by Seb handles inbox, follow-ups, and reviews for salons,
              clinics, shops, and trades. Day-to-day stays in writing. A phone
              call is not required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#book"
                className="bg-ink text-cream hover:bg-ink/90 inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold"
              >
                Book a 15-min kickoff
              </a>
              <a
                href="#pricing"
                className="text-ink text-sm font-semibold underline-offset-4 hover:underline"
              >
                Compare Entry and Premium
              </a>
            </div>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Premium first month {PREMIUM.promoPrice} if you book in {month}.{" "}
              <a
                className="text-ink font-medium underline-offset-4 hover:underline"
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Desk by Seb — 15-min kickoff")}`}
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div className="grid gap-3">
            <a
              href={`?tier=${ENTRY.id}#book`}
              className="border-border hover:border-ink rounded-[28px] border bg-white p-5 shadow-[var(--shadow-card)] transition-colors"
            >
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                {ENTRY.label} · {ENTRY.name}
              </p>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="font-serif text-4xl tracking-tight">
                  {ENTRY.price}
                </span>
                <span className="text-muted-foreground text-sm">
                  {ENTRY.cadence}
                </span>
              </p>
              <p className="text-ink mt-2 text-sm leading-relaxed">
                {ENTRY.summary}
              </p>
              <p className="mt-3 text-sm font-semibold">Start with Entry</p>
            </a>
            <a
              href={`?tier=${PREMIUM.id}#book`}
              className="border-coral-strong/40 ring-coral-soft hover:border-coral-strong rounded-[28px] border bg-white p-5 shadow-[var(--shadow-card)] ring-1 transition-colors"
            >
              <p className="text-coral-strong text-xs font-semibold tracking-[0.16em] uppercase">
                {PREMIUM.label} · {PREMIUM.name}
              </p>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="font-serif text-4xl tracking-tight">
                  {PREMIUM.price}
                </span>
                <span className="text-muted-foreground text-sm">
                  {PREMIUM.cadence}
                </span>
              </p>
              <p className="text-ink mt-2 text-sm leading-relaxed">
                {PREMIUM.summary}
              </p>
              <p className="text-muted-foreground mt-3 text-sm">
                First month {PREMIUM.promoPrice} if you book a kickoff in{" "}
                {month}.
              </p>
              <p className="mt-3 text-sm font-semibold">Book Premium</p>
            </a>
          </div>
        </section>

        <section id="problem" className="border-border border-y bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3 md:py-16">
            <h2 className="font-serif text-3xl leading-tight tracking-tight md:col-span-1">
              The replies wait until you are done with the person in front of
              you.
            </h2>
            <div className="md:col-span-2 md:pl-8">
              <p className="text-lg leading-relaxed">
                Inbox, follow-ups, and reviews pile up between appointments,
                customers, and job sites. Desk by Seb is Esteban Lemus’s written
                desk for that gap — for San Diego–area businesses that would
                rather stay with the work in the room.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["Inbox", "Email sits until after close."],
                  ["Follow-ups", "The next note depends on memory."],
                  ["Reviews", "Replies wait for a quiet hour."],
                ].map(([title, detail]) => (
                  <li key={title} className="bg-cream rounded-2xl px-4 py-4">
                    <p className="font-semibold">{title}</p>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="included"
          className="mx-auto max-w-6xl scroll-mt-16 px-5 py-16 md:py-20"
        >
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            What’s included
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Entry is one automation and a draft you approve. Premium is the full
            retainer.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="border-border rounded-[28px] border bg-white p-6 md:p-8">
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                {ENTRY.label}
              </p>
              <h3 className="mt-2 font-serif text-3xl">{ENTRY.name}</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {ENTRY.position}
              </p>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-serif text-5xl tracking-tight">
                  {ENTRY.price}
                </span>
                <span className="text-muted-foreground">{ENTRY.cadence}</span>
              </p>
              <p className="mt-4 leading-relaxed">
                You pick one automation. Each reply is drafted for your
                approval. Nothing is posted or sent as a finished reply without
                you.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {ENTRY.choices.map((choice) => (
                  <li key={choice} className="flex gap-2">
                    <span aria-hidden className="text-coral-strong mt-0.5">
                      ·
                    </span>
                    <span>{choice}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="border-coral-strong/30 ring-coral-soft rounded-[28px] border bg-white p-6 ring-1 md:p-8">
              <p className="text-coral-strong text-xs font-semibold tracking-[0.16em] uppercase">
                {PREMIUM.label}
              </p>
              <h3 className="mt-2 font-serif text-3xl">{PREMIUM.name}</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {PREMIUM.position}
              </p>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-serif text-5xl tracking-tight">
                  {PREMIUM.price}
                </span>
                <span className="text-muted-foreground">{PREMIUM.cadence}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                First month {PREMIUM.promoPrice} if you book a kickoff in{" "}
                {month}. Then {PREMIUM.price}
                {PREMIUM.cadence}.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {PREMIUM.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-coral-strong mt-0.5">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section
          id="how"
          className="border-border scroll-mt-16 border-y bg-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Both tiers start with a 15-minute kickoff so you can see which
              desk fits. Premium then runs on the working rhythm below.
            </p>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                [
                  "01",
                  "15-min kickoff",
                  "Map the inbox, follow-ups, and reviews you want covered.",
                ],
                [
                  "02",
                  "Access you choose",
                  "Share the inbox and review tools you want the desk to use.",
                ],
                [
                  "03",
                  "Written rhythm",
                  "A weekly written summary, plus async check-ins. No phone required.",
                ],
              ].map(([step, title, detail]) => (
                <li key={step} className="bg-cream rounded-[28px] p-6">
                  <p className="text-coral-strong font-serif text-2xl">
                    {step}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {detail}
                  </p>
                </li>
              ))}
            </ol>
            <p className="text-muted-foreground mt-6 max-w-3xl text-sm leading-relaxed">
              On Entry, the desk stays on the one automation you picked. Drafts
              come back for your approval before anything goes out. Premium
              covers the full retainer: inbox, customer follow-ups, and reviews
              & reputation.
            </p>
          </div>
        </section>

        <section
          id="add-ons"
          className="mx-auto max-w-6xl scroll-mt-16 px-5 py-16 md:py-20"
        >
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Add-ons
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Optional, and only on Premium. Entry stays one automation at{" "}
            {ENTRY.price}
            {ENTRY.cadence}.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {ADD_ONS.map((addon) => (
              <li
                key={addon.name}
                className="border-border rounded-[28px] border bg-white p-6"
              >
                <p className="text-muted-foreground text-sm">{addon.note}</p>
                <h3 className="mt-2 text-lg font-semibold">{addon.name}</h3>
                <p className="mt-4 font-serif text-4xl tracking-tight">
                  {addon.price}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="who"
          className="border-border scroll-mt-16 border-y bg-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Who it’s for
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              San Diego–area local businesses that want the admin work in
              writing.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCES.map((audience) => (
                <li key={audience.name} className="bg-cream rounded-[28px] p-5">
                  <h3 className="font-serif text-2xl">{audience.name}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {audience.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="pricing"
          className="mx-auto max-w-6xl scroll-mt-16 px-5 py-16 md:py-20"
        >
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Pricing
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Two monthly desks. Cancel either one anytime with 14 days’ notice.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="border-border flex flex-col rounded-[28px] border bg-white p-6 md:p-8">
              <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                {ENTRY.label}
              </p>
              <h3 className="mt-2 font-serif text-4xl">{ENTRY.name}</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-serif text-5xl tracking-tight">
                  {ENTRY.price}
                </span>
                <span className="text-muted-foreground">{ENTRY.cadence}</span>
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {ENTRY.position}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm leading-relaxed">
                <li>One automation only — you choose which.</li>
                <li>
                  Google review replies, inbox follow-up, or inquiry response.
                </li>
                <li>Drafts for your approval. Not hands-off posting.</li>
                <li>Cancel anytime with 14 days’ notice.</li>
              </ul>
              <a
                href={`?tier=${ENTRY.id}#book`}
                className="border-ink hover:bg-ink hover:text-cream mt-8 inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-sm font-semibold"
              >
                Book a 15-min kickoff
              </a>
            </article>

            <article className="border-coral-strong/40 bg-ink text-cream flex flex-col rounded-[28px] border p-6 md:p-8">
              <p className="text-coral text-xs font-semibold tracking-[0.16em] uppercase">
                {PREMIUM.label}
              </p>
              <h3 className="mt-2 font-serif text-4xl">{PREMIUM.name}</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-serif text-5xl tracking-tight">
                  {PREMIUM.price}
                </span>
                <span className="text-cream/70">{PREMIUM.cadence}</span>
              </p>
              <p className="text-cream/80 mt-3 text-sm leading-relaxed">
                First month {PREMIUM.promoPrice} if you book a kickoff in{" "}
                {month}. Then {PREMIUM.price}
                {PREMIUM.cadence}. {PREMIUM.position}
              </p>
              <ul className="text-cream/90 mt-6 flex-1 space-y-3 text-sm leading-relaxed">
                {PREMIUM.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                <li>15-min kickoff, then the tools you choose to share.</li>
                {ADD_ONS.map((addon) => (
                  <li key={addon.name}>
                    {addon.name} {addon.price}
                  </li>
                ))}
                <li>Cancel anytime with 14 days’ notice.</li>
              </ul>
              <a
                href={`?tier=${PREMIUM.id}#book`}
                className="bg-cream text-ink mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold hover:bg-white"
              >
                Book a 15-min kickoff
              </a>
            </article>
          </div>
        </section>

        <section
          id="book"
          className="border-border scroll-mt-16 border-t bg-white"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-20">
            <div>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
                Book a 15-min kickoff
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Tell Esteban whether you want Entry at {ENTRY.price}
                {ENTRY.cadence} or Premium at {PREMIUM.price}
                {PREMIUM.cadence}. The note opens in your email app. Written
                replies from there — no phone required for day-to-day.
              </p>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                Premium’s first month is {PREMIUM.promoPrice} when you book a
                kickoff in {month}. Either tier can be canceled with 14 days’
                notice.
              </p>
              <p className="mt-6">
                <a
                  className="font-semibold underline-offset-4 hover:underline"
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Desk by Seb — 15-min kickoff")}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <Suspense
              fallback={
                <p className="text-muted-foreground text-sm">
                  Loading the kickoff form…
                </p>
              }
            >
              <KickoffForm />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink font-serif text-lg">Desk by Seb</p>
          <p>
            San Diego · written admin for local businesses · {CONTACT_EMAIL}
          </p>
        </div>
      </footer>
    </div>
  );
}
