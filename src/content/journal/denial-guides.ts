import type { JournalPost } from "./posts";

// Patient-advocacy guides that feed /appeal. General information only — no
// diagnosis or treatment advice. Federal timelines: healthcare.gov appeal pages.
const hero = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const denialGuides: JournalPost[] = [
  {
    slug: "insurance-denied-mri-what-to-do",
    title: "Insurance Denied Your MRI? Here's What to Do Next",
    description:
      "Your doctor ordered an MRI and insurance said no. Learn why imaging gets denied, what to ask for, and how to appeal step by step.",
    date: "2026-11-27",
    tags: ["insurance denial", "MRI", "prior authorization", "appeal"],
    readingMinutes: 5,
    heroImage: hero("photo-1512621776951-a57141f2eefd"),
    sections: [
      {
        heading: "Why MRIs get denied so often",
        body: [
          "Imaging is one of the most common things insurers require **prior authorization** for. A denial usually means the paperwork didn't show what the plan wanted to see, like how long you've had symptoms or what you've already tried. It doesn't mean you don't need it.",
        ],
      },
      {
        heading: "Step 1: Get the reason in writing",
        body: [
          "Ask the insurer for the written denial notice. It must list the reason and how to appeal. Write down the claim or reference number and the date you got it.",
        ],
      },
      {
        heading: "Step 2: Ask your doctor's office for a peer-to-peer",
        body: [
          "Many plans let your doctor talk directly with the insurer's reviewer. Call your doctor's office and ask: \"Can you request a peer-to-peer review for my denied MRI?\" This sometimes fixes it in days.",
        ],
      },
      {
        heading: "Step 3: File a written appeal",
        body: [
          "For most ACA plans you have **180 days** from the denial notice to file an internal appeal. Include a letter of medical necessity from your doctor, your symptom timeline, and anything you've already tried (physical therapy, medications, X-rays).",
          "Use our free [appeal letter helper](/appeal) to get your deadlines and a ready-to-send letter in a few minutes.",
        ],
      },
      {
        heading: "If they still say no",
        body: [
          "You can request an **independent external review** within 4 months of the final denial. A reviewer outside the insurance company decides. If waiting could seriously harm your health, ask for an urgent review.",
        ],
      },
    ],
  },
  {
    slug: "specialist-referral-denied",
    title: "Specialist Referral Denied: How to Get In Anyway",
    description:
      "Referral to a specialist denied or stuck? What HMO and PPO rules mean, the questions to ask, and how to appeal a denied referral.",
    date: "2026-11-27",
    tags: ["insurance denial", "referral", "specialist", "appeal"],
    readingMinutes: 5,
    heroImage: hero("photo-1490645935967-10de6ba17061"),
    sections: [
      {
        heading: "First, know your plan type",
        body: [
          "**HMO** plans usually need a referral from your primary care doctor and an in-network specialist. **PPO** plans often let you see a specialist without one, but cost more out of network. Check your member handbook or call the number on your card.",
        ],
      },
      {
        heading: "Questions to ask the insurer",
        body: [
          "\"What exactly is missing for this referral to be approved?\" \"Is there an in-network specialist for this?\" \"If no one in network can treat this, how do I request an out-of-network exception?\" Write down the rep's name and a call reference number.",
        ],
      },
      {
        heading: "Questions to ask your doctor",
        body: [
          "\"Can you resubmit the referral with my symptom history and what we've already tried?\" \"Can you write a short letter explaining why I need this specialist?\"",
        ],
      },
      {
        heading: "Appeal if it's still denied",
        body: [
          "A denied referral can be appealed like any other denial. Most ACA plans give you **180 days** to file. Our [appeal letter helper](/appeal) builds the letter and shows your deadlines.",
          "Free help also exists: your state's Consumer Assistance Program can file the appeal for you. In California, the DMHC Help Center handles many HMO complaints.",
        ],
      },
    ],
  },
  {
    slug: "prescription-denied-by-insurance",
    title: "Prescription Denied by Insurance? 5 Ways to Get Your Medication",
    description:
      "Pharmacy says your prescription isn't covered? Learn what formulary, prior authorization, and step therapy mean, and how to push back.",
    date: "2026-11-27",
    tags: ["insurance denial", "prescription", "formulary", "appeal"],
    readingMinutes: 5,
    heroImage: hero("photo-1542838132-92c53300491e"),
    sections: [
      {
        heading: "Decode the pharmacy's message",
        body: [
          "**Not on formulary** means the drug isn't on the plan's covered list. **Prior authorization required** means your doctor has to send paperwork first. **Step therapy** means the plan wants you to try a cheaper drug first.",
        ],
      },
      {
        heading: "5 ways to get it covered",
        body: [
          "1. Ask the pharmacist exactly what the rejection says and whether a covered alternative exists.",
          "2. Ask your doctor to submit the prior authorization, or a **formulary exception** if the drug isn't on the list.",
          "3. If you already tried the cheaper drug, ask your doctor to document that so you can skip step therapy.",
          "4. Ask for a temporary or emergency supply while the request is reviewed.",
          "5. File an appeal if the exception is denied. Use our [appeal letter helper](/appeal) to draft it.",
        ],
      },
      {
        heading: "Don't stop a medication on your own",
        body: [
          "If you can't get a medication you already take, call your doctor before stopping or switching. Some medications are unsafe to stop suddenly.",
        ],
      },
    ],
  },
];
