// Federal ACA appeal timelines for non-grandfathered plans.
// Sources: healthcare.gov/appeal-insurance-company-decision/internal-appeals
//          healthcare.gov/appeal-insurance-company-decision/external-review
// Some plans (grandfathered, some employer/self-funded, Medicare, Medi-Cal)
// follow different rules, so the UI always tells people to check their letter.

export const INTERNAL_APPEAL_DAYS = 180;
export const PRE_SERVICE_DECISION_DAYS = 30;
export const POST_SERVICE_DECISION_DAYS = 60;
export const EXTERNAL_REVIEW_MONTHS = 4;

export interface AppealInput {
  fullName: string;
  insurer: string;
  service: string;
  denialDate: string; // YYYY-MM-DD, date the denial notice was received
  reasonGiven: string;
  doctorName: string;
  alreadyReceived: boolean;
  urgent: boolean;
  whyNeeded: string;
}

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function addDays(value: string, days: number): string | null {
  const date = parseDate(value);
  if (!date) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function formatDate(value: string | null): string {
  const date = value ? parseDate(value) : null;
  if (!date) return "—";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function appealDeadlines(input: Pick<AppealInput, "denialDate" | "alreadyReceived">) {
  return {
    fileInternalBy: addDays(input.denialDate, INTERNAL_APPEAL_DAYS),
    insurerDecisionWithinDays: input.alreadyReceived
      ? POST_SERVICE_DECISION_DAYS
      : PRE_SERVICE_DECISION_DAYS,
  };
}

const blank = (value: string, fallback: string) => value.trim() || fallback;

export function appealLetter(input: AppealInput): string {
  const name = blank(input.fullName, "[Your full name]");
  const insurer = blank(input.insurer, "[Insurance company]");
  const service = blank(input.service, "[test, treatment, or medication]");
  const doctor = blank(input.doctorName, "[Doctor's name]");
  const reason = blank(input.reasonGiven, "[reason stated in the denial letter]");
  const why = blank(
    input.whyNeeded,
    "[In your own words: your symptoms, how long you've had them, what you've already tried, and how this affects your daily life.]",
  );

  const lines = [
    formatDate(new Date().toISOString().slice(0, 10)),
    "",
    `${insurer}`,
    "Appeals Department",
    "[Address from your denial letter]",
    "",
    `RE: ${input.urgent ? "EXPEDITED " : ""}Request for internal appeal`,
    `Member: ${name}`,
    "Member ID: [from your insurance card]",
    "Claim or reference number: [from your denial letter]",
    `Denial notice received: ${formatDate(input.denialDate)}`,
    "",
    "To the Appeals Department:",
    "",
    `I am writing to appeal ${insurer}'s decision to deny coverage for ${service}, which was ordered by ${doctor}. The denial letter states the reason as: "${reason}." I am asking for a full and fair review of this decision.`,
    "",
    why,
    "",
    `${doctor} has recommended ${service} as medically necessary for my care. I have enclosed supporting documents, including a letter from my doctor and relevant medical records.`,
    "",
    "Please send me a copy of all documents, records, and criteria used in making this decision, including the name and credentials of the reviewer. If this appeal is denied, please explain the specific reason and how to request an external review by an independent reviewer.",
  ];

  if (input.urgent) {
    lines.push(
      "",
      "Because a delay could seriously harm my health, I am requesting an expedited (urgent) review, and I am requesting an external review at the same time.",
    );
  }

  lines.push(
    "",
    "Thank you for your prompt attention.",
    "",
    "Sincerely,",
    name,
    "[Phone] · [Email]",
    "",
    "Enclosures: denial letter, letter of medical necessity from my doctor, relevant medical records",
  );

  return lines.join("\n");
}
