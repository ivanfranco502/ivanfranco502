import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    cover: z.string().optional(),
    category: z.enum(['system', 'papercut', 'website', 'tool', 'exercise']).default('tool'),
  }).refine(data => Boolean(data.url || data.repo), {
    message: 'Project must have either url or repo set',
    path: ['url'],
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    platform: z.enum(['collected-notes', 'medium']),
    publishedAt: z.coerce.date(),
    excerpt: z.string().optional(),
  }),
});

const podcast = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/podcast' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    spotifyShowId: z.string().optional(),
    platforms: z.object({
      spotify: z.string().url(),
      applePodcasts: z.string().url(),
      pocketCasts: z.string().url(),
      googlePodcasts: z.string().url().optional(),
      anchor: z.string().url(),
    }),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = { projects, articles, podcast, pages };
