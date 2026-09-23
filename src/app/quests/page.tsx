import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ChevronLeft } from "lucide-react";
import QuestBoard from "@/components/quest-board";
import ScrapPaperNote from "@/components/scrap-paper-note";
import { getDailyNote, toDateKey } from "@/lib/quests";

export const metadata: Metadata = {
  title: "Daily Quests | Almond Mom",
  description: "Sleep-aware stamina and gentle micro-quests for your day.",
};

export default async function QuestsPage() {
  // Render per request so the note rotates daily (server date is close
  // enough for a daily saying and keeps this a server component).
  await connection();
  const note = getDailyNote(toDateKey(new Date()));

  return (
    <div className="min-h-screen bg-ivory px-6 py-8">
      <div className="mx-auto w-full max-w-2xl pb-24">
        <nav className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase hover:text-stone-700"
          >
            <ChevronLeft size={14} aria-hidden />
            Hub
          </Link>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-stone-800 italic">Daily Quests</h1>
          <p className="mt-3 max-w-md text-stone-500">
            Tell me how you slept and I&apos;ll size today to fit. Every quest is optional — rest counts too.
          </p>
        </header>

        <ScrapPaperNote note={note} className="mb-10" />
        <QuestBoard />
      </div>
    </div>
  );
}
