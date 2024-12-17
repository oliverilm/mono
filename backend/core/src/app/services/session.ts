import { Session } from '@prisma/client';
import dayjs from 'dayjs';
import crypto from 'crypto';
import { prisma } from '../utils/db';

export const SessionService = {
	createSession(userId: string): Promise<Session> {
		return prisma.session.create({
			data: {
				expiresAt: dayjs().add(3, 'day').toDate(),
				token: crypto.randomBytes(32).toString('base64'),
				userId,
			},
		});
	},

	getUserSessionFromToken(token: string): Promise<Session | null> {
		return prisma.session.findFirst({
			where: {
				token,
				expiresAt: {
					gt: new Date(),
				},
			},
		});
	},
};
