import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const description =
  "The terms for using Almond Mom Kitchen, its recipes, and its AI kitchen tools.";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description,
  alternates: { canonical: absoluteUrl("/terms") },
  openGraph: {
    title: `Terms of Service | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/terms"),
  },
};

// Not legal advice — have it reviewed before taking payments.
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Almond Mom · Legal"
      title="Terms of Service"
      updated="November 23, 2026"
    >
      <p>
        By using almondmom.online (&ldquo;Almond Mom&rdquo;), you agree to these
        terms.
      </p>

      <h2>The service</h2>
      <p>
        Almond Mom offers recipes, a journal, and AI kitchen tools like Fridge
        Rescue and the Shop Upgrader. Features may change or be discontinued as
        we build.
      </p>

      <h2>Not medical or nutrition advice</h2>
      <p>
        Recipes, nutrition notes, and AI suggestions are general information. AI
        output can be wrong. Check ingredients, allergens, and cooking
        temperatures yourself, and talk to a qualified professional about
        medical or dietary needs.
      </p>

      <h2>Your account</h2>
      <p>
        Keep your login secure; you&apos;re responsible for activity on your
        account. Don&apos;t misuse the service, attempt to break it, scrape it,
        or use it to violate anyone&apos;s rights.
      </p>

      <h2>Content</h2>
      <p>
        Recipes, articles, and design on Almond Mom belong to Almond Mom
        Kitchen. You&apos;re welcome to cook from them and share links. Please
        don&apos;t republish them in full.
      </p>

      <h2>Affiliate links and third parties</h2>
      <p>
        Some links go to third-party stores such as Amazon, and we may earn a
        commission. Purchases happen on those sites under their terms. See our{" "}
        <Link href="/privacy">Privacy Policy</Link> for how data is handled.
      </p>

      <h2>Disclaimers and liability</h2>
      <p>
        Almond Mom is provided &ldquo;as is&rdquo; without warranties. To the
        extent the law allows, Almond Mom Kitchen isn&apos;t liable for
        indirect, incidental, or consequential damages from using the service.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of California.</p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </LegalPage>
  );
}
