import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SEOHandler } from "@/components/global/SEO-Handler";

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

export const metadata: Metadata = {
  title: "ALMOND MOM | Organic Luxury Kitchen",
  description: "Experience the rebirth of clean eating. Advanced AI recipe rescue and high-protein gourmet essentials.",
  openGraph: {
    title: "ALMOND MOM | Organic Luxury Kitchen",
    description: "Convert recipes into clean versions instantly.",
    url: "https://almondmomkitchen.dev",
    siteName: "Almond Mom Kitchen",
    images: [{ url: "/images/hero.png" }]
  }
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
    "name": "Almond Mom Kitchen",
    "url": "https://almondmomkitchen.dev",
    "logo": "https://almondmomkitchen.dev/logo.png"
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased selection:bg-copper/20`}
    >
      <head>
        <SEOHandler schemaData={orgSchema} />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-obsidian">
        {children}
      </body>
    </html>
  );
}
