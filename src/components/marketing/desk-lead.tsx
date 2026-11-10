import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Compact Desk by Seb lead block for marketing surfaces. */
export function DeskLeadCta({
  source = "marketing",
}: {
  source?: string;
}) {
  const deskHref = `/desk?utm_source=almondmom&utm_medium=site&utm_campaign=this_week&utm_content=${encodeURIComponent(source)}#book`;

  return (
    <aside
      className="rounded-[28px] border border-ink/10 bg-ink px-6 py-8 text-cream md:px-8"
      aria-label="Desk by Seb"
    >
      <p className="text-[11px] font-bold tracking-[0.22em] text-sage uppercase">
        Desk by Seb · San Diego
      </p>
      <h2 className="mt-3 font-serif text-2xl font-bold leading-tight md:text-3xl">
        Inbox, follow-ups, and reviews — handled in writing.
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
        Entry from $79.99/mo for one approved automation, or Premium at $997/mo
        (first month $797 when you book a kickoff this month). Soft start: a
        15-minute written kickoff, no phone required day-to-day.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={deskHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-6 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Book a 15-min kickoff <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/desk#pricing"
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-cream/80 underline-offset-4 hover:text-cream hover:underline"
        >
          Compare Entry &amp; Premium
        </Link>
      </div>
    </aside>
  );
}
