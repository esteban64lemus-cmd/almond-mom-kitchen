"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  appealDeadlines,
  appealLetter,
  EXTERNAL_REVIEW_MONTHS,
  formatDate,
  type AppealInput,
} from "@/lib/appeal";

const empty: AppealInput = {
  fullName: "",
  insurer: "",
  service: "",
  denialDate: "",
  reasonGiven: "",
  doctorName: "",
  alreadyReceived: false,
  urgent: false,
  whyNeeded: "",
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-base text-ink outline-none focus:border-sage";

export function AppealForm() {
  const [form, setForm] = useState<AppealInput>(empty);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof AppealInput>(key: K, value: AppealInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const deadlines = useMemo(() => appealDeadlines(form), [form]);
  const letter = useMemo(() => appealLetter(form), [form]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const text = (key: keyof AppealInput, label: string, placeholder: string) => (
    <label className="block text-sm font-semibold text-ink">
      {label}
      <input
        className={fieldClass}
        value={form[key] as string}
        placeholder={placeholder}
        onChange={(e) => set(key, e.target.value as never)}
      />
    </label>
  );

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-2">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {text("fullName", "Your name", "Jane Doe")}
        {text("insurer", "Insurance company", "e.g. Blue Shield of California")}
        {text("service", "What was denied", "e.g. an MRI of my lower back")}
        {text("doctorName", "Doctor who ordered it", "e.g. Dr. Patel")}
        {text("reasonGiven", "Reason on the denial letter", "e.g. not medically necessary")}
        <label className="block text-sm font-semibold text-ink">
          Date you got the denial notice
          <input
            type="date"
            className={fieldClass}
            value={form.denialDate}
            onChange={(e) => set("denialDate", e.target.value)}
          />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Why you need it, in your own words
          <textarea
            rows={5}
            className={fieldClass}
            value={form.whyNeeded}
            placeholder="Your symptoms, how long you've had them, what you've already tried, and how it affects your life."
            onChange={(e) => set("whyNeeded", e.target.value)}
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={form.alreadyReceived}
            onChange={(e) => set("alreadyReceived", e.target.checked)}
          />
          I already received this care (the bill was denied)
        </label>
        <label className="flex items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={form.urgent}
            onChange={(e) => set("urgent", e.target.checked)}
          />
          Waiting could seriously harm my health (ask for an urgent review)
        </label>
        <p className="text-xs text-ink/50">
          Nothing you type here is saved or sent anywhere. It stays in your browser.
        </p>
      </form>

      <div className="space-y-6">
        <section className="rounded-3xl border border-ink/10 bg-white p-6">
          <h2 className="font-serif text-2xl font-bold">Your deadlines</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink/75">
            <li>
              <strong className="text-ink">File your appeal by:</strong>{" "}
              {formatDate(deadlines.fileInternalBy)} (180 days from the notice)
            </li>
            <li>
              <strong className="text-ink">Insurer must decide within:</strong>{" "}
              {form.urgent
                ? "as fast as your condition requires (urgent)"
                : `${deadlines.insurerDecisionWithinDays} days`}
            </li>
            <li>
              <strong className="text-ink">If they still say no:</strong> request an
              independent external review within {EXTERNAL_REVIEW_MONTHS} months of the
              final denial.
            </li>
          </ul>
          <p className="mt-4 text-xs text-ink/50">
            These are the federal rules for most ACA plans. Some employer, Medicare, and
            Medi-Cal plans use different timelines, so always check the deadline printed on
            your denial letter.
          </p>
        </section>

        <section className="rounded-3xl border border-ink/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold">Your appeal letter</h2>
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink/80">
            {letter}
          </pre>
        </section>
      </div>
    </div>
  );
}
