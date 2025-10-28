import { z } from 'zod';

const stringOrNumberSchema = z.union([z.number(), z.string()]);

export const skipTakeSchema = z
	.object({
		skip: stringOrNumberSchema
			.refine((value) => Number(value) >= 0, {
				message: 'Skip must be a positive number',
			})
			.default(0),
		take: stringOrNumberSchema
			.refine((value) => Number(value) >= 0, {
				message: 'Take must be a positive number',
			})
			.default(10),
	})
	.optional()
	.nullable()
	.default({ skip: 0, take: 10 });

export type SkipTake = z.infer<typeof skipTakeSchema>;

export const searchSchema = z.object({
	search: z.string().optional(),
});
export type Search = z.infer<typeof searchSchema>;

export const slugSchema = z.object({
	slug: z.string(),
});

export const idSchema = z.object({
	id: z.string().cuid(),
});

export type Slug = z.infer<typeof slugSchema>;
