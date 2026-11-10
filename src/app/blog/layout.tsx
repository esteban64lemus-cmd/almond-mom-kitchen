import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const title = "Almond Mom Recipes | Seed Oil Free Clean Eating";
const description =
  "Browse almond mom recipes for clean eating family meals — high protein, seed oil free, and ready for weeknights.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/blog"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
