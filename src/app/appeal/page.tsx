import type { Metadata } from "next";
import { MarketingFooter, MarketingNav } from "@/components/marketing/site-chrome";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { AppealForm } from "./appeal-form";

const title = `Insurance Denial Appeal Letter Helper | ${SITE_NAME}`;
const description =
  "Insurance said no? Get your appeal deadlines and a ready-to-send appeal letter in minutes. Free, private, nothing saved.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/appeal") },
  openGraph: { title, description, url: absoluteUrl("/appeal") },
};

export default function AppealPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <MarketingNav />
      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.28em] text-sage uppercase">
            Denial appeal helper
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-bold md:text-5xl">
            Insurance said no. You can say no back.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            Most people never appeal a denial. Fill this in and get your deadlines plus an
            appeal letter you can print, sign, and send today.
          </p>
          <AppealForm />
          <div className="mt-14 max-w-3xl space-y-3 text-sm text-ink/60">
            <p>
              <strong className="text-ink">Make it stronger:</strong> ask your doctor for a
              short &quot;letter of medical necessity&quot; and attach it. Keep copies of
              everything and write down the date you mailed it.
            </p>
            <p>
              <strong className="text-ink">Free help:</strong> your state&apos;s Consumer
              Assistance Program can file the appeal for you. Find it at{" "}
              <a
                className="text-sage underline-offset-4 hover:underline"
                href="https://www.healthcare.gov/appeal-insurance-company-decision/"
                target="_blank"
                rel="noopener noreferrer"
              >
                healthcare.gov
              </a>
              . In California, the DMHC Help Center can also help.
            </p>
            <p className="text-xs text-ink/45">
              Almond Mom is not a law firm or medical provider. This tool gives general
              information, not legal or medical advice.
            </p>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
