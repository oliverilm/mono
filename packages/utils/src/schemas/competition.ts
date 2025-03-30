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
	registrationEndAt: z.string().optional(),
	location: z.string().optional(),
});
export type UpdateCompetition = z.infer<typeof updateCompetitionSchema>;

export const createCompetitorSchema = z.object({
	competitionId: z.string(),
	competitorId: z.string(),
	competitionCategoryId: z.number(),
	weight: z.string(),
	seed: z.number(),
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
	competitionId: z.string(),
	url: z.string(),
	label: z.string(),
});
export type CreateCompetitionLink = z.infer<typeof createCompetitionLinkSchema>;

export const createCompetitionAdminSchema = z.object({
	competitionId: z.string(),
	userId: z.string(),
});

export type CreateCompetitionAdmin = z.infer<
	typeof createCompetitionAdminSchema
>;

export const deleteCompetitorSchema = z.object({
	id: z.number(),
});

export type DeleteCompetitor = z.infer<typeof deleteCompetitorSchema>;

export const competitionVisibilitySchema = z.object({
	isPublished: z.boolean().optional(),
	isArchived: z.boolean().optional(),
});
export type CompetitionVisibility = z.infer<typeof competitionVisibilitySchema>;
