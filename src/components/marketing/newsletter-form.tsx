"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({
  source = "site",
  heading = "Get clean kitchen notes",
  subcopy = "Seed-oil swaps, almond mom weeknight recipes, and preventive kitchen habits — one short email.",
}: {
  source?: string;
  heading?: string;
  subcopy?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not subscribe");
      }
      setStatus("ok");
      setMessage("You're on the list. Welcome to the kitchen.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <div className="rounded-[28px] border border-sage/25 bg-sage/10 p-6 md:p-8">
      <h3 className="font-serif text-2xl font-bold text-ink">{heading}</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/65">{subcopy}</p>
      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`newsletter-${source}`}>
          Email address
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full flex-1 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm outline-none ring-coral/30 focus:ring-2"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink/90 disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Join the list"}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-destructive" : "text-success"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
