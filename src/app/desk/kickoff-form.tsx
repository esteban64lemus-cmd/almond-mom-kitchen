"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CONTACT_EMAIL, ENTRY, PREMIUM } from "./offer";

const TIERS = [
  { id: ENTRY.id, label: `${ENTRY.name} · ${ENTRY.price}/mo` },
  { id: PREMIUM.id, label: `${PREMIUM.name} · ${PREMIUM.price}/mo` },
] as const;

type TierId = (typeof TIERS)[number]["id"];

function isTier(value: string | null): value is TierId {
  return value === ENTRY.id || value === PREMIUM.id;
}

export function KickoffForm() {
  const requested = useSearchParams().get("tier");
  return (
    <KickoffFields
      key={requested ?? "none"}
      initialTier={isTier(requested) ? requested : ""}
    />
  );
}

function KickoffFields({ initialTier }: { initialTier: TierId | "" }) {
  const [tier, setTier] = useState<TierId | "">(initialTier);
  const [opened, setOpened] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const chosen = TIERS.find((item) => item.id === tier);
    const subject = "Desk by Seb — 15-min kickoff";
    const body = [
      `Name: ${name}`,
      `Business: ${business}`,
      `Tier: ${chosen?.label ?? ""}`,
      "",
      note || "I would like to book a 15-minute kickoff.",
    ].join("\n");
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
    window.location.href = href;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm font-medium">
          <span>Your name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="border-border text-ink focus:border-ink focus:ring-ink/15 w-full rounded-2xl border bg-white px-4 py-3 text-base font-normal outline-none focus:ring-2"
          />
        </label>
        <label className="block space-y-2 text-sm font-medium">
          <span>Business</span>
          <input
            name="business"
            required
            autoComplete="organization"
            className="border-border text-ink focus:border-ink focus:ring-ink/15 w-full rounded-2xl border bg-white px-4 py-3 text-base font-normal outline-none focus:ring-2"
          />
        </label>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Which tier do you want to talk through?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {TIERS.map((item) => {
            const selected = tier === item.id;
            return (
              <label
                key={item.id}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${
                  selected ? "border-ink bg-white" : "border-border bg-cream"
                }`}
              >
                <input
                  type="radio"
                  name="tier"
                  value={item.id}
                  required
                  checked={selected}
                  onChange={() => setTier(item.id)}
                  className="accent-ink size-4"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="block space-y-2 text-sm font-medium">
        <span>Note (optional)</span>
        <textarea
          name="note"
          rows={4}
          maxLength={1000}
          placeholder="What should the desk take off your plate?"
          className="border-border text-ink focus:border-ink focus:ring-ink/15 w-full resize-y rounded-2xl border bg-white px-4 py-3 text-base font-normal outline-none focus:ring-2"
        />
      </label>

      <button
        type="submit"
        className="bg-ink text-cream hover:bg-ink/90 focus-visible:outline-ink inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
      >
        Book a 15-min kickoff
      </button>

      {opened ? (
        <p
          className="text-muted-foreground text-sm leading-relaxed"
          role="status"
        >
          Your email app should open with a message to {CONTACT_EMAIL}. Send it
          to request the kickoff. If it does not open, email that address
          directly.
        </p>
      ) : (
        <p className="text-muted-foreground text-sm leading-relaxed">
          This opens an email to {CONTACT_EMAIL}. Nothing is sent until you hit
          send.
        </p>
      )}
    </form>
  );
}
