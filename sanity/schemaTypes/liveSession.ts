import { defineType, defineField } from "sanity";

export const liveSession = defineType({
  name: "liveSession",
  title: "Live Session (Cohort)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Session Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isGated",
      title: "Requires Subscription (Gated)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "cohortId",
      title: "Cohort Identifier",
      type: "string",
      description:
        "Used to map back to Stripe products and specific active challenges.",
    }),
  ],
});
