import { addDays, appealDeadlines, appealLetter, formatDate } from "./appeal";

const base = {
  fullName: "Jane Doe",
  insurer: "Acme Health",
  service: "an MRI of the lower back",
  denialDate: "2026-11-01",
  reasonGiven: "not medically necessary",
  doctorName: "Dr. Smith",
  alreadyReceived: false,
  urgent: false,
  whyNeeded: "I have had back pain for 6 months.",
};

describe("appeal helpers", () => {
  it("adds days across month and year boundaries", () => {
    expect(addDays("2026-11-01", 180)).toBe("2027-04-30");
    expect(addDays("bad", 10)).toBeNull();
  });

  it("formats dates and handles blanks", () => {
    expect(formatDate("2027-04-30")).toBe("April 30, 2027");
    expect(formatDate(null)).toBe("—");
  });

  it("uses 30 days for pre-service and 60 for post-service decisions", () => {
    expect(appealDeadlines(base).insurerDecisionWithinDays).toBe(30);
    expect(appealDeadlines({ ...base, alreadyReceived: true }).insurerDecisionWithinDays).toBe(60);
    expect(appealDeadlines(base).fileInternalBy).toBe("2027-04-30");
  });

  it("fills the letter and only adds expedited language when urgent", () => {
    const letter = appealLetter(base);
    expect(letter).toContain("Acme Health's decision to deny coverage for an MRI of the lower back");
    expect(letter).not.toContain("EXPEDITED");
    expect(appealLetter({ ...base, urgent: true })).toContain("EXPEDITED");
  });

  it("leaves placeholders when fields are empty", () => {
    const letter = appealLetter({ ...base, fullName: "", insurer: "" });
    expect(letter).toContain("[Your full name]");
    expect(letter).toContain("[Insurance company]");
  });
});
