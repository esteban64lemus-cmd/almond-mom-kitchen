import type { Metadata } from "next";
import { Outfit, Playfair_Display, Caveat, Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { SEOHandler } from "@/components/global/SEO-Handler";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/components/cart-provider";
import { SavedProvider } from "@/components/saved-provider";

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
  title: "ALMOND MOM | Organic Luxury Kitchen",
  description:
    "Experience the rebirth of clean eating. Advanced AI recipe rescue and high-protein gourmet essentials.",
  openGraph: {
    title: "ALMOND MOM | Organic Luxury Kitchen",
    description: "Convert recipes into clean versions instantly.",
    url: "https://almondmom.online",
    siteName: "Almond Mom Kitchen",
    images: [{ url: "/images/hero.png" }],
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
    name: "Almond Mom Kitchen",
    url: "https://almondmom.online",
    logo: "https://almondmom.online/logo.png",
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
