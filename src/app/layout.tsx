import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SEOHandler } from "@/components/global/SEO-Handler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Almond Mom Kitchen",
  description: "Advanced AI recipe converter and pro-wellness platform.",
  openGraph: {
    title: "Almond Mom Kitchen",
    description: "Convert recipes into clean versions instantly.",
    url: "https://almondmomkitchen.dev",
    siteName: "Almond Mom Kitchen",
    images: [{ url: "/og-image.jpg" }]
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <SEOHandler schemaData={orgSchema} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
