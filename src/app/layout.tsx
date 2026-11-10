import type { Metadata } from "next";
import { Outfit, Playfair_Display, Caveat, Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/components/cart-provider";
import { SavedProvider } from "@/components/saved-provider";
import { absoluteUrl, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ALMOND MOM | Organic Luxury Kitchen",
    template: "%s | Almond Mom",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "ALMOND MOM | Organic Luxury Kitchen",
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/hero.png", alt: "Almond Mom organic luxury kitchen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALMOND MOM | Organic Luxury Kitchen",
    description: DEFAULT_DESCRIPTION,
    images: ["/images/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inject global organization Schema.org JSON-LD structured data
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo.png"),
    sameAs: [
      "https://esteban.almondmom.online",
      "https://github.com/esteban64lemus-cmd/almond-mom-kitchen",
      "https://instagram.com/a_bagel_hater",
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
        <SEOHandler schemaData={orgSchema} />
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
