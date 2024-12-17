import { z } from 'zod';

const stringOrNumberSchema = z.union([z.number(), z.string()]);

export const skipTakeSchema = z.object({
	skip: stringOrNumberSchema.optional(),
	take: stringOrNumberSchema.optional(),
});
export type SkipTake = z.infer<typeof skipTakeSchema>;

export const searchSchema = z.object({
	search: z.string().optional(),
});
export type Search = z.infer<typeof searchSchema>;

export const slugSchema = z.object({
	slug: z.string(),
});
export type Slug = z.infer<typeof slugSchema>;
