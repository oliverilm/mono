import type { SkipTake } from '@monorepo/utils';
import { prisma } from '../utils/db';

export namespace ClubDb {
	export function getAdmins(clubId: string) {
		return prisma.clubAdmin.findMany({
			where: {
				clubId,
			},
			select: {
				userId: true,
				user: {
					select: {
						id: true,
						email: true,
						userProfile: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
							},
						},
					},
				},
				role: true,
			},
		});
	}

	export function getUserClubAdminStatusCount(userId: string) {
		return prisma.clubAdmin.count({
			where: {
				userId,
			},
		});
	}

	export function getUserClubAdminStatusCountForClub(
		userId: string,
		clubId: string,
	) {
		return prisma.clubAdmin.count({
			where: {
				userId,
				clubId,
			},
		});
	}

	export function getBySlug(slug: string) {
		return prisma.club.findFirst({
			where: {
				slug,
			},
		});
	}

	export function getById(id: string) {
		return prisma.club.findUniqueOrThrow({
			where: {
				id,
			},
		});
	}

	export function getClubList({ take = 25, skip = 0 }: SkipTake) {
		return prisma.club.findMany({
			take: Number(take),
			skip: Number(skip),
			orderBy: {
				id: 'desc',
			},
		});
	}
}
