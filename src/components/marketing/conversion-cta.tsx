import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DeskLeadCta } from "./desk-lead";

/** Consumer + paid-lead conversion stack for journal/mission. */
export function ConversionCta({
  source,
  headline = "Next step",
  body = "Hire the admin desk this week, shop clean ingredients, or open the Almond Mom app.",
}: {
  source: string;
  headline?: string;
  body?: string;
}) {
  return (
    <div className="space-y-6">
      <DeskLeadCta source={source} />
      <div className="rounded-[24px] border border-ink/10 bg-white p-6">
        <h3 className="font-serif text-xl font-bold">{headline}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">{body}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
          >
            Browse recipes &amp; shop <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 px-5 py-3 text-sm font-bold text-ink"
          >
            Launch the app
          </Link>
        </div>
      </div>
    </div>
  );
}
