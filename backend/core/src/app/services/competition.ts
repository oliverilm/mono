import { CompetitionRole, Competitor, UserProfile } from '@prisma/client';
import { slugifyString } from '../utils/string';
import { convertSkipTake } from '../utils/object';
import { tryHandleKnownErrors } from '../utils/error';
import { prisma } from '../utils/db';
import {
	CreateCompetition,
	CreateCompetitor,
	Search,
	SkipTake,
	Slug,
	UpdateCompetition,
} from '@monorepo/utils';
import { LRUCache } from 'lru-cache';
import { UserService } from './user';
import { ClubService } from './club';

const cache = new LRUCache({
	ttl: 1000 * 60 * 60, // 1 hour
	max: 1000,
});

export const CompetitionService = {
	getCompetitionCategories: async function (slug: string) {
		return prisma.competitionCategory.findMany({
			where: {
				competitionSlug: slug,
			},
		});
	},
	createCompetitor: async function (
		data: CreateCompetitor,
		userId: string,
	): Promise<null | Competitor> {
		// TODO: throw everything from here to a transaction maybe
		const userProfile = await UserService.getUserProfile(userId);

		if (!userProfile) {
			throw new Error('User profile not found');
		}

		const competition = await prisma.competition.findUnique({
			where: {
				id: data.competitionId,
				isPublished: true,
				isArchived: false,
				registrationEndAt: {
					gt: new Date(),
				},
			},
			select: {
				name: true,
				slug: true,
			},
		});

		if (!competition) {
			throw new Error('Competition not found');
		}

		if (userProfile?.userId === userId) {
			// person registers themselves to the competition
			// TODO: handle this
			return null;
		}

		if (!userProfile.clubId) {
			throw new Error(
				'Insufficent permissions, user does not belong to a club',
			);
		}

		const potentialCompetitor = await UserService.getUserProfileByProfileId(
			data.competitorId,
		);

		if (!potentialCompetitor) {
			throw new Error('Competitor not found');
		}

		if (userProfile.clubId !== potentialCompetitor.clubId) {
			throw new Error(
				'Insufficent permissions, competitor does not belong to the same club as the user',
			);
		}

		// check user club role
		const isClubAdmin = await ClubService.isClubAdmin(
			userId,
			userProfile.clubId,
		);

		if (!isClubAdmin) {
			throw new Error('Insufficent permissions, user is not a club admin');
		}

		// check if competitor is already registred in the competition with

		const club = await prisma.club.findUnique({
			where: {
				id: userProfile.clubId,
			},
			select: {
				name: true,
			},
		});

		if (!club) {
			// impossible scenario
			throw new Error('Club not found');
		}

		try {
			const competitor = await prisma.competitor.create({
				data: {
					competitionId: data.competitionId,
					profileId: data.competitorId,
					weight: '',
					clubName: club.name ?? 'individual',
					competitionCategoryId: data.competitionCategoryId,
					firstName: potentialCompetitor.firstName ?? 'unknown',
					lastName: potentialCompetitor.lastName ?? 'unknown',
					competitionSlug: competition.slug,
					competitionName: competition.name,
				},
			});
			return competitor;
		} catch (error) {
			tryHandleKnownErrors(error as Error);

			throw error;
		}
	},
	listCompetitors: async function (slug: string, skipTake: SkipTake) {
		// TODO: add more searching fields here
		return prisma.competitor.findMany({
			where: {
				competitionSlug: slug,
			},
			...convertSkipTake(skipTake),
		});
	},
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

		const isAdmin =
			(await prisma.competitionAdmin.count({
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
			return competition;
		} catch (error) {
			tryHandleKnownErrors(error as Error);
		}
	},
};
