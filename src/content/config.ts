import { z, defineCollection } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortcut: z.string(),
    excerpt: z.string(),
    author: z.string().default('Anonymous'),
    date: z.date(),
  }),
});

export const collections = {
  'posts': posts,
};