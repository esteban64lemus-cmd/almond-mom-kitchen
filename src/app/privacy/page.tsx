import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const description =
  "How Almond Mom Kitchen collects, uses, and protects your information — accounts, newsletter, AI kitchen tools, and affiliate links.";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description,
  alternates: { canonical: absoluteUrl("/privacy") },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description,
    url: absoluteUrl("/privacy"),
  },
};

// Written to match what the code does as of Nov 2026. Update it whenever a new data flow ships
// (health-app sync, photo scanning, ads). Not legal advice — have it reviewed before scaling.
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Almond Mom · Legal"
      title="Privacy Policy"
      updated="November 23, 2026"
    >
      <p>
        Almond Mom Kitchen (&ldquo;Almond Mom,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;) runs almondmom.online. This policy explains what we
        collect, why, and the choices you have. We don&apos;t sell your personal
        information.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account details.</strong> If you create an account, your email
          address and a securely hashed password, handled by our authentication
          provider.
        </li>
        <li>
          <strong>Newsletter.</strong> Your email address and which page you
          signed up from.
        </li>
        <li>
          <strong>What you type into AI tools.</strong> Ingredients you enter in
          Fridge Rescue, grocery lists you paste into the Shop Upgrader, and
          text sent to the voice feature.
        </li>
        <li>
          <strong>On-device data.</strong> Saved recipes, your cart, and quest
          progress are stored in your browser&apos;s local storage, not on our
          servers.
        </li>
        <li>
          <strong>Usage data.</strong> Aggregated page views and performance
          metrics.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To run your account and the kitchen tools you ask for.</li>
        <li>To send the newsletter you signed up for (unsubscribe anytime).</li>
        <li>To understand which pages are useful and keep the site fast.</li>
      </ul>
      <p>We don&apos;t use what you enter into AI tools to target ads.</p>

      <h2>Service providers</h2>
      <p>
        We use a small set of vendors that process data only to provide their
        service to us:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — accounts and newsletter storage
        </li>
        <li>
          <strong>Vercel</strong> — hosting, Web Analytics, and Speed Insights
        </li>
        <li>
          <strong>Vercel AI Gateway / Google Gemini</strong> — generates Fridge
          Rescue and Shop Upgrader suggestions from the text you enter
        </li>
        <li>
          <strong>ElevenLabs</strong> — turns text into speech for the voice
          feature
        </li>
      </ul>

      <h2>Affiliate links</h2>
      <p>
        Some ingredient and product links go to Amazon. As an Amazon Associate,
        Almond Mom may earn from qualifying purchases at no extra cost to you.
        When you click through, Amazon&apos;s own privacy policy applies.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can ask us to access, correct, export, or delete your information by
        emailing{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20request`}>
          {CONTACT_EMAIL}
        </a>
        . California residents have rights under the CCPA/CPRA, including the
        right to know, delete, and correct personal information and to opt out
        of its sale or sharing. We don&apos;t sell or share personal information
        for cross-context behavioral advertising. Clearing your browser storage
        removes saved recipes, cart, and quest data.
      </p>

      <h2>Wellness disclaimer</h2>
      <p>
        Almond Mom offers general cooking and wellness information. It
        isn&apos;t medical advice or a medical device.
      </p>

      <h2>Children</h2>
      <p>
        Almond Mom isn&apos;t directed to children under 13, and we don&apos;t
        knowingly collect their information.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how we handle data, we&apos;ll update this page and the
        date above.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · San Diego,
        California, USA
      </p>
    </LegalPage>
  );
}
