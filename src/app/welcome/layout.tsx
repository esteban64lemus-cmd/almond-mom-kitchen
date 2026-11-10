import type { Metadata } from "next";
import { absoluteUrl, DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Welcome | Almond Mom Clean Eating Kitchen",
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/welcome") },
  openGraph: {
    title: "Welcome | Almond Mom",
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/welcome"),
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
