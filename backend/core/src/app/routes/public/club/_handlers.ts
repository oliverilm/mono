import type { slugSchema } from '@monorepo/utils';
import type { z } from 'zod';
import { ClubService } from '../../../services/club';
import { prisma } from '../../../utils/db';
import type { RequestWithParams } from '../../../utils/fastify-typed';
import { requestUserId } from '../../../utils/request';

export namespace PublicClubHandlers {
	export async function getPublicClubMetadata(
		request: RequestWithParams<z.infer<typeof slugSchema>>,
	) {
		const { id: clubId } = await prisma.club.findFirstOrThrow({
			where: request.params,
			select: {
				id: true,
			},
		});

		const userId = requestUserId(request);

		const [isAdmin, admins] = await Promise.all([
			userId ? ClubService.isClubAdmin(userId, clubId) : false,
			ClubService.getClubAdmins(clubId),
		]);

		return {
			isAdmin,
			admins,
		};
	}
}
