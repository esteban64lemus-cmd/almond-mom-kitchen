import type { Metadata } from "next";
import { Outfit, Playfair_Display, Caveat, Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/components/cart-provider";
import { SavedProvider } from "@/components/saved-provider";
import {
  absoluteUrl,
  BRAND_NAME,
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  FOUNDER_NAME,
  SAME_AS,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  X_HANDLE,
} from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

// Handwritten "Grandma's scrap paper" notes.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

// No `alternates.canonical` here on purpose: a root-layout canonical is inherited by every
// page that doesn't set its own, which would tell Google they're all duplicates of `/`.
// Each indexable page sets its own canonical instead.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: FOUNDER_NAME, url: absoluteUrl("/mission") }],
  openGraph: {
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/hero.png", alt: "Almond Mom Kitchen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/hero.png"],
    ...(X_HANDLE ? { site: X_HANDLE, creator: X_HANDLE } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Search Console → Settings → Ownership verification → HTML tag → paste the content value into Vercel env.
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global entity graph: Organization + WebSite + the web app. Name/alternateName pair is what
  // ties "Almond Mom" and "Almond Mom Kitchen" together as one entity for Google.
  // Add `logo: absoluteUrl("/logo.png")` once a square logo (>=112px) exists in /public.
  const orgId = `${SITE_URL}/#organization`;
  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        alternateName: BRAND_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        founder: { "@type": "Person", name: FOUNDER_NAME, url: SAME_AS[0] },
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: BRAND_NAME,
        url: SITE_URL,
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        alternateName: BRAND_NAME,
        url: SITE_URL,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "selection:bg-copper/20",
        outfit.variable,
        playfair.variable,
        caveat.variable,
        jakarta.variable,
        nunito.variable,
        "font-sans",
      )}
    >
      <head>
        <SEOHandler schemaData={siteSchema} />
      </head>
      <body suppressHydrationWarning className="bg-cream text-ink flex min-h-full flex-col font-sans">
        <CartProvider>
          <SavedProvider>{children}</SavedProvider>
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
