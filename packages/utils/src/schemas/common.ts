import { z } from 'zod';

const stringOrNumberSchema = z.union([z.number(), z.string()]);

export const skipTakeSchema = z.object({
	skip: stringOrNumberSchema.optional().default(0),
	take: stringOrNumberSchema.optional().default(10),
});

export type SkipTake = z.infer<typeof skipTakeSchema>;

export const searchSchema = z.object({
	search: z.string().optional(),
});
export type Search = z.infer<typeof searchSchema>;

export const slugSchema = z.object({
	slug: z.string(),
});

export const idSchema = z.object({
	id: z.string(),
});

export type Slug = z.infer<typeof slugSchema>;
