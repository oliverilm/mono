import type {
	CreateCompetition,
	CreateCompetitionCategory,
	CreateCompetitionLink,
	CreateCompetitor,
	Search,
	SkipTake,
	UpdateCompetition,
} from '@monorepo/utils';
import { CompetitionRole, type Competitor, type UserProfile } from '@prisma/client';
import { LRUCache } from 'lru-cache';
import { prisma } from '../utils/db';
import { tryHandleKnownErrors } from '../utils/error';
import { convertSkipTake } from '../utils/object';
import { slugifyString } from '../utils/string';
import { ClubService } from './club';
import { UserService } from './user';

const cache = new LRUCache({
	ttl: 1000 * 60 * 60, // 1 hour
	max: 1000,
});

export const CompetitionService = {
	getPersonalCompetitors: async ({slug, userId}: {
		slug: string, userId: string
	}) => {

		// prerequisite: is competition slug valid and competition is open
		const competition = await CompetitionService.get(slug)
		
		if (!competition) {
			throw new Error('Can not fetch entities, competition slug is invalid')
		}

		const categories = await CompetitionService.getCompetitionCategories(slug)

		// 1. check get user club and club role
		
		const profile = await UserService.getUserProfile(userId)

		if (!profile) {
			throw new Error('User profile not found');
		}

		if (!profile.clubId) {
			// wants to register as individual
			return;
		}

		const isClubAdmin = await ClubService.isClubAdmin(userId, profile.clubId)

		if (!isClubAdmin) {
			// also wants to register as an individual
			return;
		}

		const profilesInTheClubThatMatchCompetitionCategoryCriteria = 
			await prisma.userProfile.findMany({
				where: {
					AND: {
						clubId: profile.clubId,
					},
					OR: 
						categories.map(({ smallestYearAllowed, largestYearAllowed}) => {
							let smallest: Date;
							let largest: Date

							if (smallestYearAllowed < largestYearAllowed) {
								smallest = new Date(smallestYearAllowed, 0, 1, 0, 0 ,0);
								largest = new Date(largestYearAllowed, 11, 31, 23, 59 ,59);
							} else {
								largest = new Date(smallestYearAllowed, 0, 1, 0, 0 ,0);
								smallest = new Date(largestYearAllowed, 11, 31, 23, 59 ,59);
							}
							
							return { dateOfBirth: {
								lte: largest,
								gte: smallest,
							}}
						})
				},
			});


			return profilesInTheClubThatMatchCompetitionCategoryCriteria
		
	},
	createCompetitionLink: async function (
		data: CreateCompetitionLink,
		userId: string,
		slug: string,
	) {
		const competitionId = await this.getCompetitionIdFromSlug(slug);
		const isAdmin = await this.isAdmin(competitionId, userId);

		if (!isAdmin) {
			throw new Error('User is not an admin');
		}
		return prisma.competitionLink.create({
			data: {
				competitionId,
				label: data.label,
				url: data.url,
			},
		});
	},
	createCompetitionCategory: async (
		slug: string,
		data: CreateCompetitionCategory,
	) => {
		try {
			const result = await prisma.competitionCategory.create({
				data: {
					category: {
						connect: {
							id: data.categoryId,
						},
					},
					competition: {
						connect: {
							slug,
						},
					},
					sex: data.sex,
					largestYearAllowed: data.largestYearAllowed,
					smallestYearAllowed: data.smallestYearAllowed,
					weights: data.weights,
				},
			});

			return result;
		} catch (error) {
			tryHandleKnownErrors(error as Error);
			throw error;
		}
	},
	getCompetitionCategories: async (slug: string) => prisma.competitionCategory.findMany({
			where: {
				competitionSlug: slug,
			},
		}),
	createCompetitor: async (
		data: CreateCompetitor,
		userId: string,
	): Promise<null | Competitor> => {
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
	listCompetitors: async (slug: string, skipTake: SkipTake) => {
		// TODO: add more searching fields here
		return prisma.competitor.findMany({
			where: {
				competitionSlug: slug,
			},
			...convertSkipTake(skipTake),
		});
	},
	privateCompetitions: async (userId: string) => {
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

	createCompetitionAdmin: async (
		data: { competitionId: string; userId: string; role: CompetitionRole },
		competitionAdminId: string,
	) => {
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

	isAdmin: async (competitionId: string, userId: string) => {
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

	getCompetitionIdFromSlug: async (competitionSlug: string) => {
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
	getCompetitionLinks: async function (competitionSlug: string) {
		const competitionId = await this.getCompetitionIdFromSlug(competitionSlug);

		const links = await prisma.competitionLink.findMany({
			where: {
				competitionId,
			},
			select: {
				id: true,
				label: true,
				url: true,
			},
		});

		return links;
	},
	getCompetitionAdmins: async function (
		competitionSlug: string,
		userId?: string,
	) {
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
	get: async (competitionSlug: string) => {
		// TODO: could add caching here aswell
		return prisma.competition.findUnique({
			where: {
				slug: competitionSlug,
			},
		});
	},

	createCompetition: async ({
		data,
		userProfile,
	}: { data: CreateCompetition; userProfile: UserProfile }) => {
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

	list: async ({ search, ...skipTake }: SkipTake & Search) => prisma.competition.findMany({
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
		}),

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
		if (data.registrationEndAt) {
			Object.assign(data, { registrationEndAt: new Date(data.registrationEndAt) });
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
