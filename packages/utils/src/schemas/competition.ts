import { z } from "zod";

export const createCompetitionSchema = z.object({
    name: z.string(),
})
export type CreateCompetition = z.infer<typeof createCompetitionSchema>


export const updateCompetitionSchema = z.object({
    name: z.string().optional(),
    isPublished: z.boolean().optional(),
    isArchived: z.boolean().optional(),
    description: z.string().optional(),
    startingAt: z.date().optional(),
    location: z.string().optional(),
})

export type UpdateCompetition = z.infer<typeof updateCompetitionSchema>