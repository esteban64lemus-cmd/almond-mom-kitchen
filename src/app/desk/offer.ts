export const CONTACT_EMAIL = "esteban64lemus@gmail.com";

export const SITE_URL = "https://almondmom.online/desk";

export const ENTRY = {
  id: "entry",
  name: "Entry",
  label: "Starter",
  price: "$79.99",
  cadence: "/mo",
  position: "The easy way in. Low commitment.",
  summary: "One automation. Every reply is a draft you approve.",
  choices: ["Google review replies", "Inbox follow-up", "Inquiry response"],
} as const;

export const PREMIUM = {
  id: "premium",
  name: "Premium",
  label: "Full desk",
  price: "$997",
  promoPrice: "$797",
  cadence: "/mo",
  position: "The full-service upgrade.",
  summary: "Inbox, customer follow-ups, and reviews & reputation.",
  includes: [
    "Inbox and email management",
    "Customer follow-ups",
    "Reviews and reputation",
    "Weekly written summary",
    "Async check-ins",
  ],
} as const;

export const ADD_ONS = [
  { name: "Light bookkeeping", price: "+$300/mo", note: "Monthly, on Premium" },
  {
    name: "Scheduling ownership",
    price: "+$250/mo",
    note: "Monthly, on Premium",
  },
  { name: "Cleanup sprint", price: "$499", note: "One time, on Premium" },
] as const;

export const AUDIENCES = [
  {
    name: "Salons",
    detail: "The chair is the job. The inbox can wait on a desk.",
  },
  {
    name: "Clinics",
    detail: "Front desk already has the room. Follow-ups need a place.",
  },
  {
    name: "Shops",
    detail: "Customers in the store come before the unread pile.",
  },
  { name: "Trades", detail: "You are on a job site, not sitting in email." },
] as const;
