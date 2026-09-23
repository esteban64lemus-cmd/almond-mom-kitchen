"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Square, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "playing";

interface AlmondMomVoiceProps {
  text: string;
  label?: string;
  className?: string;
}

/**
 * Reads `text` aloud in Almond Mom's ElevenLabs voice via /api/voice.
 * If that's unavailable (not configured, demo mode, offline), it falls back
 * to the browser's built-in speech so the button always does something.
 */
export default function AlmondMomVoice({ text, label = "Listen", className }: AlmondMomVoiceProps) {
  const [status, setStatus] = useState<Status>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef<{ text: string; url: string } | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (cacheRef.current) URL.revokeObjectURL(cacheRef.current.url);
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  const stop = () => {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setStatus("idle");
  };

  const speakWithBrowser = () => {
    if (!("speechSynthesis" in window)) {
      setStatus("idle");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("idle");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setStatus("playing");
  };

  const play = async () => {
    if (status !== "idle") return stop();
    setStatus("loading");

    try {
      let url = cacheRef.current?.text === text ? cacheRef.current.url : null;
      if (!url) {
        const res = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        // Unauthenticated requests get redirected to /login HTML by the
        // proxy, so check the content type rather than just `res.ok`.
        if (!res.ok || !res.headers.get("content-type")?.includes("audio")) {
          return speakWithBrowser();
        }
        url = URL.createObjectURL(await res.blob());
        if (cacheRef.current) URL.revokeObjectURL(cacheRef.current.url);
        cacheRef.current = { text, url };
      }

      const audio = new Audio(url);
      audioRef.current?.pause();
      audioRef.current = audio;
      audio.onended = () => setStatus("idle");
      audio.onerror = () => setStatus("idle");
      await audio.play();
      setStatus("playing");
    } catch {
      speakWithBrowser();
    }
  };

  const Icon = status === "loading" ? Loader2 : status === "playing" ? Square : Volume2;

  return (
    <button
      type="button"
      onClick={play}
      aria-label={status === "playing" ? "Stop reading" : `${label}: ${text}`}
      aria-pressed={status === "playing"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-taupe/30 bg-ivory px-4 py-2 text-[10px] font-bold tracking-widest text-stone-600 uppercase transition-colors hover:border-sage hover:text-stone-800 focus-visible:ring-2 focus-visible:ring-sage focus-visible:outline-none",
        className,
      )}
    >
      <Icon size={14} className={cn(status === "loading" && "animate-spin")} aria-hidden />
      {status === "playing" ? "Stop" : label}
    </button>
  );
}
