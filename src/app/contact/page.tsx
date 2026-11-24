import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

const description =
  "Contact Almond Mom Kitchen for support, recipe questions, partnerships, or press.";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description,
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/contact"),
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: absoluteUrl("/contact"),
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
  },
};

const topics = [
  { label: "Support & account help", subject: "Support" },
  { label: "Recipe questions", subject: "Recipe question" },
  { label: "Partnerships & press", subject: "Partnership" },
  { label: "Privacy & data requests", subject: "Privacy request" },
];

export default function ContactPage() {
  return (
    <LegalPage eyebrow="Almond Mom · Contact" title="Say hi to the kitchen">
      <SEOHandler schemaData={schema} />
      <p>
        Almond Mom Kitchen is built in San Diego by Esteban Lemus. Email is the
        fastest way to reach us. We usually reply within two business days.
      </p>
      <ul>
        {topics.map((topic) => (
          <li key={topic.subject}>
            <strong>{topic.label}:</strong>{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(topic.subject)}`}
            >
              {CONTACT_EMAIL}
            </a>
          </li>
        ))}
      </ul>
      <p>
        Want the story behind the kitchen? Read our{" "}
        <Link href="/mission">mission</Link>.
      </p>
    </LegalPage>
  );
}
