import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lede: z.string(),
    section: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};
