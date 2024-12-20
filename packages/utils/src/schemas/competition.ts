import { z } from 'zod';

export const createCompetitionSchema = z.object({
	name: z.string(),
});
export type CreateCompetition = z.infer<typeof createCompetitionSchema>;

export const updateCompetitionSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
	isPublished: z.boolean().optional(),
	isArchived: z.boolean().optional(),
	description: z.string().optional(),
	startingAt: z.string().optional(),
	location: z.string().optional(),
});
export type UpdateCompetition = z.infer<typeof updateCompetitionSchema>;

export const createCompetitorSchema = z.object({
	competitionId: z.string(),
	competitorId: z.string(),
	competitionCategoryId: z.number(),
	weight: z.string(),
});
export type CreateCompetitor = z.infer<typeof createCompetitorSchema>;

export const createCompetitionCategorySchema = z.object({
	weights: z.array(z.string()),
	largestYearAllowed: z.number(),
	smallestYearAllowed: z.number(),
	sex: z.enum(['Male', 'Female', 'Unisex']),
	competitionId: z.string(),
	categoryId: z.number(),
});
export type CreateCompetitionCategory = z.infer<
	typeof createCompetitionCategorySchema
>;

export const createCompetitionLinkSchema = z.object({
	url: z.string(),
	label: z.string(),
});
export type CreateCompetitionLink = z.infer<typeof createCompetitionLinkSchema>;
