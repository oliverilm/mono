import { z } from 'zod';

export const invitatationCreateSchema = z.object({
	profileId: z.string(),
});

export type InvitationCreate = z.infer<typeof invitatationCreateSchema>;

export const invitationQueryParamSchema = z.object({
	id: z.number(),
});

export type InvitationQueryParam = z.infer<typeof invitationQueryParamSchema>;

export const invitationDecideSchema = z.object({
	isAccepted: z.boolean(),
});

export type InvitationDecide = z.infer<typeof invitationDecideSchema>;
