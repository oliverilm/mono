import { z } from 'zod';

export const loginCredentialSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const userIdSchema = z.object({
	userId: z.string().cuid(),
});

export type UserIdObject = z.infer<typeof userIdSchema>;
export type LoginCredentials = z.infer<typeof loginCredentialSchema>;

const nationalIds = ['finid', 'estid'] as const;

export const userPatchSchema = z.object({
	userId: userIdSchema.shape.userId.optional(),
	firstName: z.string(),
	lastName: z.string(),
	nationalIdType: z.enum(nationalIds),
	nationalId: z.string(),
	dateOfBirth: z.string(),
});

export type UserPatch = z.infer<typeof userPatchSchema>;
