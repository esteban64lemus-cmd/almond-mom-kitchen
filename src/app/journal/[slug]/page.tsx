import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/components/marketing/site-chrome";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { getAllJournalSlugs, getJournalPost, journalPosts } from "@/content/journal/posts";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Article not found" };

  const title = `${post.title} | Zaya Health Journal`;
  return {
    title,
    description: post.description,
    alternates: { canonical: absoluteUrl(`/journal/${post.slug}`) },
    openGraph: {
      title,
      description: post.description,
      url: absoluteUrl(`/journal/${post.slug}`),
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.heroImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [post.heroImage],
    },
  };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const related = journalPosts.filter((entry) => entry.slug !== post.slug).slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [post.heroImage],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Esteban Lemus",
      url: "https://esteban.almondmom.online",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(`/journal/${post.slug}`),
    keywords: post.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-cream text-ink">
      <SEOHandler schemaData={schema} />
      <MarketingNav />

      <article className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.28em] text-sage uppercase">
            Zaya · Health Journal
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight font-bold md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink/65">{post.description}</p>
          <p className="mt-4 text-xs font-medium text-ink/45">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {post.readingMinutes} min read
          </p>
        </div>

        <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-[28px]">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 900px"
            priority
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl font-bold md:text-3xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-4 text-base leading-relaxed text-ink/75">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div className="rounded-[24px] border border-ink/10 bg-white p-6">
            <h3 className="font-serif text-xl font-bold">Cook the idea</h3>
            <p className="mt-2 text-sm text-ink/65">
              Move from reading into almond mom recipes, then launch the app when you want AI fridge
              rescue or grocery upgrades.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
              >
                Browse recipes <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 px-5 py-3 text-sm font-bold text-ink"
              >
                Launch the app
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-3xl px-6 pb-10">
          <h2 className="font-serif text-2xl font-bold">Keep reading</h2>
          <ul className="mt-4 space-y-3">
            {related.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/journal/${entry.slug}`} className="font-medium text-sage hover:text-ink">
                  {entry.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <NewsletterForm source={`journal-${post.slug}`} />
      </section>

      <MarketingFooter />
    </main>
  );
}
