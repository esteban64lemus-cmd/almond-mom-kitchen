import { cn } from "@/lib/utils";
import AlmondMomVoice from "@/components/almond-mom-voice";

interface ScrapPaperNoteProps {
  note: string;
  signature?: string;
  className?: string;
}

/** A handwritten note on torn scrap paper, with a read-aloud button. */
export default function ScrapPaperNote({ note, signature = "— Almond Mom", className }: ScrapPaperNoteProps) {
  return (
    <figure
      className={cn(
        "relative -rotate-1 bg-scrap-paper px-7 pt-8 pb-6 shadow-[0_8px_24px_rgba(139,125,107,0.18)]",
        // Faint ruled lines + a torn top edge
        "bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_31px,rgba(139,125,107,0.15)_32px)]",
        "[clip-path:polygon(0_6px,6%_0,14%_5px,23%_1px,31%_6px,42%_0,53%_5px,61%_1px,72%_6px,81%_0,90%_5px,100%_1px,100%_100%,0_100%)]",
        className,
      )}
    >
      <blockquote className="font-hand text-2xl leading-8 text-stone-700">{note}</blockquote>
      <figcaption className="mt-3 flex items-center justify-between gap-4">
        <span className="font-hand text-xl text-terracotta">{signature}</span>
        <AlmondMomVoice text={note} label="Read to me" />
      </figcaption>
    </figure>
  );
}
