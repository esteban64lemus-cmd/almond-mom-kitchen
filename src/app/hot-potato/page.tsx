import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import HotPotatoGame from "@/components/hot-potato-game";

export const metadata: Metadata = {
  title: "Hot Potato | Almond Mom",
  description: "The classic pass-it-fast party game for kids. Don't get caught holding the potato!",
};

export default function HotPotatoPage() {
  return (
    <div className="min-h-screen bg-ivory px-6 py-8">
      <div className="mx-auto w-full max-w-md pb-24">
        <nav className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase hover:text-stone-700"
          >
            <ChevronLeft size={14} aria-hidden />
            Hub
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-stone-800 italic">Hot Potato</h1>
          <p className="mt-3 text-stone-500">
            Pass the phone around the circle. The potato burns at a secret moment — don&apos;t be the one holding
            it!
          </p>
        </header>

        <HotPotatoGame />
      </div>
    </div>
  );
}
