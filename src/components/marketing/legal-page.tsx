import type { ReactNode } from "react";
import {
  MarketingFooter,
  MarketingNav,
} from "@/components/marketing/site-chrome";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-cream text-ink min-h-screen">
      <MarketingNav />
      <article className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sage text-xs font-bold tracking-[0.28em] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight font-bold md:text-5xl">
            {title}
          </h1>
          {updated ? (
            <p className="text-ink/45 mt-4 text-xs font-medium">
              Last updated {updated}
            </p>
          ) : null}
          <div className="text-ink/75 [&_a]:text-sage [&_h2]:text-ink [&_strong]:text-ink mt-10 space-y-5 text-base leading-relaxed [&_a]:font-medium [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </article>
      <MarketingFooter />
    </main>
  );
}
