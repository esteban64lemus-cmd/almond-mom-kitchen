import Link from "next/link";
import { AFFILIATE_DISCLOSURE } from "@/lib/Affiliate-Engine";

const navLinks = [
  { href: "/mission", label: "Mission" },
  { href: "/blog", label: "Recipes" },
  { href: "/journal", label: "Journal" },
  { href: "/desk", label: "Desk" },
];

export function MarketingNav({
  ctaHref = "/desk#book",
  ctaLabel = "Book Desk",
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-ink/5 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/welcome" className="font-serif text-2xl font-bold tracking-tighter text-ink">
          ALMOND<span className="text-sage italic">MOM</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ink/10 transition-transform hover:scale-105 active:scale-95"
          >
            {ctaLabel}
          </Link>
        </div>
        <Link
          href={ctaHref}
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white md:hidden"
        >
          {ctaLabel}
        </Link>
      </div>
    </nav>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-ink/5 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <Link href="/welcome" className="font-serif text-xl font-bold text-ink">
          ALMOND<span className="text-sage italic">MOM</span>
        </Link>
        <div className="text-center text-sm font-medium text-ink/40">
          &copy; {new Date().getFullYear()} Almond Mom Kitchen. Organic luxury living.
          <span className="mt-1 block max-w-md text-[11px] tracking-wide text-ink/30">
            {AFFILIATE_DISCLOSURE}
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          <Link
            href="/mission"
            className="text-xs font-bold tracking-widest text-ink/60 uppercase transition-colors hover:text-ink"
          >
            Mission
          </Link>
          <Link
            href="/journal"
            className="text-xs font-bold tracking-widest text-ink/60 uppercase transition-colors hover:text-ink"
          >
            Journal
          </Link>
          <Link
            href="/desk#book"
            className="text-xs font-bold tracking-widest text-sage uppercase transition-colors hover:text-ink"
          >
            Desk by Seb
          </Link>
          {[
            { href: "/contact", label: "Contact" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold tracking-widest text-ink/60 uppercase transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://instagram.com/a_bagel_hater"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold tracking-widest text-ink/60 uppercase transition-colors hover:text-ink"
          >
            Instagram
          </a>
          <a
            href="https://esteban.almondmom.online"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold tracking-widest text-ink/60 uppercase transition-colors hover:text-ink"
          >
            Esteban
          </a>
        </div>
      </div>
    </footer>
  );
}
