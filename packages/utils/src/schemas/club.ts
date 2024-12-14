import { z } from "zod";


// TODO: add country codes
export const clubCreateSchema = z.object({
    name: z.string(),
    country: z.string(),
})

export type ClubCreate = z.infer<typeof clubCreateSchema>