import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/components/marketing/site-chrome";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { DeskLeadCta } from "@/components/marketing/desk-lead";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { journalPosts } from "@/content/journal/posts";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const title = "Zaya Health Journal | Preventive Kitchen Notes by Almond Mom";
const description =
  "Zaya · Health Journal by Almond Mom — preventive health habits, seed oil free grocery guidance, and almond mom clean eating notes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/journal") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/journal"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Zaya Health Journal",
  description,
  url: absoluteUrl("/journal"),
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
};

export default function JournalIndexPage() {
  const posts = [...journalPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SEOHandler schemaData={schema} />
      <MarketingNav />

      <section className="relative overflow-hidden px-6 pt-32 pb-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(156,175,136,0.2),transparent_40%),linear-gradient(180deg,#fff8f1_0%,#f6efdc_100%)]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-xs font-bold tracking-[0.28em] text-sage uppercase">
            Zaya · Health Journal by Almond Mom
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] font-bold md:text-6xl">
            Preventive health notes that end in the kitchen.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Holistic awareness meets western nutrition basics — then routes you into seed oil free
            recipes and the Almond Mom app.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-[28px] border border-ink/5 bg-white shadow-[0_16px_40px_rgba(61,41,20,0.06)]"
            >
              <div className="grid md:grid-cols-[1.1fr_1fr]">
                <div className="relative min-h-[220px]">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sage/10 px-3 py-1 text-[11px] font-bold tracking-wide text-sage uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-serif text-2xl font-bold leading-tight md:text-3xl">
                    <Link href={`/journal/${post.slug}`} className="hover:text-sage">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{post.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-ink/45">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      · {post.readingMinutes} min
                    </span>
                    <Link
                      href={`/journal/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-ink"
                    >
                      Read <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-6 pb-16">
        <DeskLeadCta source="journal-index" />
        <NewsletterForm source="journal-index" />
      </section>

      <MarketingFooter />
    </main>
  );
}
