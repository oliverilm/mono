import { z } from 'zod';
import { nationalIds } from './auth';

// TODO: add country codes
export const clubCreateSchema = z.object({
	name: z.string(),
	country: z.string(),
});
export type ClubCreate = z.infer<typeof clubCreateSchema>;

export const createMemberSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	nationalIdType: z.enum(nationalIds),
	nationalId: z.string(),
	dateOfBirth: z.string(),
});
export type CreateMember = z.infer<typeof createMemberSchema>;
