import { prisma } from 'src/app/utils/db';

export class ClubRepository {
	static getClubCompetitions(clubId: string) {
		return prisma.competition.findMany({
			where: {
				clubId,
			},
		});
	}

	static getClubBySlug(slug: string) {
		return prisma.club.findFirst({
			where: {
				slug,
			},
		});
	}

	static getClubIdBySlug(slug: string) {
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

	static getClubById(id: string) {
		return prisma.club.findFirst({
			where: {
				id,
			},
		});
	}
}
