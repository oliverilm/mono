import { CompetitionRole, UserProfile } from '@prisma/client';
import { slugifyString } from '../utils/string';
import { convertSkipTake } from '../utils/object';
import { tryHandleKnownErrors } from '../utils/error';
import { prisma } from '../utils/db';
import {
	CreateCompetition,
	Search,
	SkipTake,
	UpdateCompetition,
} from '@monorepo/utils';
import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
	ttl: 1000 * 60 * 60, // 1 hour
	max: 1000,
});

export const CompetitionService = {
	privateCompetitions: async function (userId: string) {
		const adminInCompetitions = await prisma.competitionAdmin.findMany({
			where: {
				userId,
				competition: {
					isArchived: false,
					isPublished: false,
				},
			},
			select: {
				competition: true,
			},
		});

		return adminInCompetitions.map(({ competition }) => competition);
	},

	createCompetitionAdmin: async function (
		data: { competitionId: string; userId: string; role: CompetitionRole },
		competitionAdminId: string,
	) {
		const admin = await prisma.competitionAdmin.findFirst({
			where: {
				userId: competitionAdminId,
				competitionId: data.competitionId,
			},
			select: {
				role: true,
			},
		});

		const isAdmin = admin?.role === 'OWNER';

		if (!isAdmin) {
			throw new Error('You are not an admin of this competition');
		}

		return prisma.competitionAdmin.create({ data });
	},

	isAdmin: async function (competitionId: string, userId: string) {
		const cacheKey = `${competitionId}-${userId}`;
		const cachedResult = cache.get(cacheKey);
		
		if (cachedResult !== undefined) {
			return cachedResult as boolean;
		}
	
		const isAdmin = (await prisma.competitionAdmin.count({
			where: {
				competitionId,
				userId,
			},
		})) > 0;
	
		cache.set(cacheKey, isAdmin);
		return isAdmin;
	},

	getCompetitionIdFromSlug: async function (competitionSlug: string) {
		if (cache.get(competitionSlug)) {
			return cache.get(competitionSlug) as string;
		}

		const competition = await prisma.competition.findUnique({
			where: {
				slug: competitionSlug,
			},
			select: {
				id: true,
			},
		});

		if (!competition) {
			throw new Error('Competition not found');
		}

		cache.set(competitionSlug, competition.id);
		return competition.id;
	},
	getMetadata: async function (competitionSlug: string, userId?: string) {
		if (!userId) return {};

		const competitionId = await this.getCompetitionIdFromSlug(competitionSlug);
		const isAdmin = await this.isAdmin(competitionId, userId);

		if (isAdmin) {
			const admins = await prisma.competitionAdmin.findMany({
				where: {
					competitionId,
				},
				select: {
					id: true,
					user: {
						select: {
							id: true,
							email: true,
						},
					},
					role: true,
				},
			});
			return {
				competitionAdmins: admins.map((admin) => {
					return {
						id: admin.id,
						userId: admin.user.id,
						email: admin.user.email,
						role: admin.role,
					};
				}),
			};
		}

		return {
			competitionAdmins: [],
		};
	},
	get: async function (competitionSlug: string) {
		// TODO: could add caching here aswell
		return prisma.competition.findUnique({
			where: {
				slug: competitionSlug,
			},
		});
	},

	createCompetition: async function ({
		data,
		userProfile,
	}: { data: CreateCompetition; userProfile: UserProfile }) {
		const slug = slugifyString(data.name);

		if (!userProfile.userId) {
			throw new Error('User not found');
		}

		if (!userProfile.clubId) {
			throw new Error('User does not belong to a club');
		}

		const club = await prisma.club.findUnique({
			where: {
				id: userProfile.clubId,
			},
			select: {
				name: true,
			},
		});

		if (!club) {
			throw new Error('Invalid club');
		}

		const competition = await prisma.competition.create({
			data: {
				slug,
				clubName: club?.name,
				...data,

				competitionAdmins: {
					create: {
						userId: userProfile.userId,
						role: CompetitionRole.OWNER,
					},
				},
			},
		});

		if (!competition) {
			throw new Error('Something went wrong');
		}

		cache.set(competition.slug, competition.id);
		return competition;
	},

	list: async function ({ search, ...skipTake }: SkipTake & Search) {
		return prisma.competition.findMany({
			where: {
				isArchived: false,
				isPublished: true,
				...(search
					? {
							name: {
								contains: search,
							},
						}
					: {}),
			},
			...convertSkipTake(skipTake),
		});
	},

	updateCompetition: async function ({
		data,
		userId,
	}: { data: UpdateCompetition; userId: string }) {
		const isAdmin = this.isAdmin(data.id, userId);

		if (!isAdmin) {
			throw new Error('You are not an admin of this competition');
		}

		if (data.name) {
			Object.assign(data, { slug: slugifyString(data.name) });
		}
		if (data.startingAt) {
			Object.assign(data, { startingAt: new Date(data.startingAt) });
		}

		try {

			const competition = await prisma.competition.update({
				where: {
					id: data.id,
				},
				data,
			});

			cache.set(competition.slug, competition.id);
			return competition
		} catch (error) {
			tryHandleKnownErrors(error as Error);
		}
	},
};
