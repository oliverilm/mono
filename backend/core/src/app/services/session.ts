import crypto from 'node:crypto';
import type { Session } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from '../utils/db';

export namespace SessionService {
	export function createSession(userId: string): Promise<Session> {
		return prisma.session.create({
			data: {
				expiresAt: dayjs().add(3, 'day').toDate(),
				token: crypto.randomBytes(32).toString('base64'),
				userId,
			},
		});
	}

	export function getUserSessionFromToken(token: string): Promise<Session | null> {
		return prisma.session.findFirst({
			where: {
				token,
				expiresAt: {
					gt: new Date(),
				},
			},
		});
	}
};
