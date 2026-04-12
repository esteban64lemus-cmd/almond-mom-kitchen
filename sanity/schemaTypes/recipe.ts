import { defineType, defineField } from 'sanity';

export const recipe = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'dietaryTags',
      title: 'Dietary Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'timeMetrics',
      title: 'Time Metrics',
      type: 'object',
      fields: [
        { name: 'prepTime', title: 'Prep Time (mins)', type: 'number' },
        { name: 'cookTime', title: 'Cook Time (mins)', type: 'number' }
      ]
    }),
    defineField({
      name: 'macros',
      title: 'Macros',
      type: 'object',
      fields: [
        { name: 'calories', title: 'Calories', type: 'number' },
        { name: 'protein', title: 'Protein (g)', type: 'number' },
        { name: 'carbs', title: 'Carbs (g)', type: 'number' },
        { name: 'fat', title: 'Fat (g)', type: 'number' }
      ]
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'unit', title: 'Unit (e.g., cups, oz)', type: 'string' },
            { name: 'ingredientName', title: 'Ingredient Name', type: 'string' },
            { name: 'isCleanSwap', title: 'Is Clean Swap (Almond Mom)', type: 'boolean', initialValue: false },
            { name: 'affiliateUrl', title: 'Affiliate URL', type: 'url' }
          ]
        }
      ]
    }),
  ],
});
