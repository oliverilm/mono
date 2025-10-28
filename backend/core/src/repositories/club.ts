import { prisma } from 'src/app/utils/db';

export namespace ClubRepository {
	export function getClubCompetitions(clubId: string) {
		return prisma.competition.findMany({
			where: {
				clubId,
			},
		});
	}

	export function getClubBySlug(slug: string) {
		return prisma.club.findFirst({
			where: {
				slug,
			},
		});
	}

	export function getClubIdBySlug(slug: string) {
		return prisma.club
			.findFirst({
				where: {
					slug,
				},
				select: {
					id: true,
				},
			})
			.then((club) => club?.id);
	}

	export function getClubById(id: string) {
		return prisma.club.findFirst({
			where: {
				id,
			},
		});
	}
}
