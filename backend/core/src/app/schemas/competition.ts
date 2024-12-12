import { z } from "zod";

export const createCompetitionSchema = z.object({
    name: z.string(),
})
export type CreateCompetition = z.infer<typeof createCompetitionSchema>
