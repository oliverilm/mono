import type {
	CreateCompetition,
	CreateCompetitionAdmin,
	CreateCompetitionCategory,
	CreateCompetitionLink,
	CreateCompetitor, SkipTake,
	UpdateCompetition
} from '@monorepo/utils';
import {
	type Competition,
	type CompetitionCategory,
	CompetitionCategorySex,
	CompetitionRole,
	type Competitor,
	Sex,
	type UserProfile,
} from '@prisma/client';
import { LRUCache } from 'lru-cache';
import { prisma } from '../utils/db';
import { tryHandleKnownErrors } from '../utils/error';
import { convertSkipTake } from '../utils/object';
import { slugifyString } from '../utils/string';
import { ClubService } from './club';
import { UserService } from './user';
import { getSetReturn } from '../utils/cache';
import { hours } from '../utils/time';

const isAdminCache = new LRUCache<string, boolean>({
	ttl: hours(1),
	max: 1000,
});

const competitionIdBySlugCache = new LRUCache<string, string>({
	ttl: hours(1),
	max: 1000,
});

function queryActiveParticipations({
	competition,
	categories,
	userId,
	clubId,
}: {
	competition: Competition;
	clubId?: string;
	userId?: string;
	categories: CompetitionCategory[];
}) {
	return prisma.userProfile.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			sex: true,
			dateOfBirth: true,
			participations: {
				where: {
					competitionId: competition.id,
				},
				select: {
					id: true,
					weight: true,
					seed: true,
					competitionCategory: {
						select: {
							id: true,
							categoryName: true,
						},
					},
				},
			},
		},
		where: {
			...(clubId ? { clubId } : {}),
			...(userId ? { userId } : {}),
			OR: categories.map(({ sex, smallestYearAllowed, largestYearAllowed }) => {
				let smallest: Date;
				let largest: Date;

				if (smallestYearAllowed < largestYearAllowed) {
					smallest = new Date(smallestYearAllowed, 0, 1, 0, 0, 0);
					largest = new Date(largestYearAllowed, 11, 31, 23, 59, 59);
				} else {
					largest = new Date(smallestYearAllowed, 0, 1, 0, 0, 0);
					smallest = new Date(largestYearAllowed, 11, 31, 23, 59, 59);
				}

				const filter = {
					dateOfBirth: {
						lte: largest,
						gte: smallest,
					},
				};

				const categorySexAsProfileSex = (() => {
					if (sex === CompetitionCategorySex.Male) {
						return Sex.Male;
					}

					if (sex === CompetitionCategorySex.Female) {
						return Sex.Female;
					}
				})();

				if (categorySexAsProfileSex) {
					Object.assign(filter, { sex: categorySexAsProfileSex });
				}

				return filter;
			}),
		},
	});
}

async function getUserClubName(clubId?: string | null) {
	if (!clubId) return 'Individual';

	const club = await prisma.club.findUnique({
		where: {
			id: clubId,
		},
		select: {
			name: true,
		},
	});

	if (!club) return 'Individual';
	return club.name;
}

export const CompetitionService = {
	getCompetitorExport: async (
		{ format }: { format: 'JSON' | 'CSV' },
		userId: string,
		slug: string,
	) => {
		const competitionId =
			await CompetitionService.getCompetitionIdFromSlug(slug);
		const userIsAdmin = await CompetitionService.isAdmin(competitionId, userId);

		if (!userIsAdmin) {
			throw new Error('Unauthorized');
		}

		const competitors = await prisma.competitor.findMany({
			where: {
				competitionId,
			},
			select: {
				clubName: true,
				firstName: true,
				lastName: true,
				seed: true,
				weight: true,
				id: true,
				competitionCategory: {
					select: {
						categoryName: true,
						category: {
							select: {
								value: true,
							},
						},
					},
				},
			},
		});

		const flat = competitors.map((competitor) => ({
			...competitor,
			competitionCategory: competitor.competitionCategory.categoryName,
			competitionCategoryValue: competitor.competitionCategory.category.value,
		}));

		if (format === 'JSON') {
			return flat;
		}
		if (format === 'CSV') {
			const header = Object.keys(flat[0]).join(',');
			const rows = flat.map((row) => Object.values(row).join(','));
			return `${header}\n${rows.join('\n')}`;
		}
		return null;
	},
	getPersonalCompetitors: async ({
		slug,
		userId,
	}: {
		slug: string;
		userId: string;
	}) => {
		// prerequisite: is competition slug valid and competition is open
		const competition = await CompetitionService.get(slug);

		if (!competition) {
			throw new Error('Can not fetch entities, competition slug is invalid');
		}

		const categories = await CompetitionService.getCompetitionCategories(slug);

		// 1. check get user club and club role
		const profile = await UserService.getUserProfile(userId);

		if (!profile) {
			throw new Error('User profile not found');
		}

		if (!profile.clubId) {
			// wants to register as individual
			return queryActiveParticipations({
				competition,
				categories,
				userId,
			});
		}

		const isClubAdmin = await ClubService.isClubAdmin(userId, profile.clubId);

		if (!isClubAdmin) {
			// also wants to register as an individual
			return queryActiveParticipations({
				competition,
				categories,
				userId,
			});
		}

		return queryActiveParticipations({
			competition,
			categories,
			clubId: profile.clubId,
		});
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
	getCompetitionCategories: async (slug: string) =>
		prisma.competitionCategory.findMany({
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
		const clubName = await getUserClubName(userProfile?.clubId);
		// TODO: validate if this judoka even can be registered here. 
		// Otherwise this method could be abused.
		// could possibly use the method defined above
		// just insert the competitor id to the where clause.
		// check if response is not empty, if so, then the competitor is valid.

		if (userProfile.id === data.competitorId) {
			return prisma.competitor.create({
				data: {
					competitionId: data.competitionId,
					competitionCategoryId: data.competitionCategoryId,
					weight: data.weight,
					seed: data.seed,

					profileId: userProfile.id,
					clubId: userProfile.clubId,
					clubName,
					firstName: userProfile.firstName ?? 'unknown',
					lastName: userProfile.lastName ?? 'unknown',
					competitionSlug: competition.slug,
					competitionName: competition.name,
				},
			});
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

		try {
			const competitor = await prisma.competitor.create({
				data: {
					competitionId: data.competitionId,
					profileId: data.competitorId,
					competitionCategoryId: data.competitionCategoryId,
					weight: data.weight,
					seed: data.seed,

					clubId: potentialCompetitor.clubId,
					clubName,
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
		const competitors = prisma.competitor.findMany({
			where: {
				competitionSlug: slug,
			},
			...convertSkipTake(skipTake),
			select: {
				firstName: true,
				id: true,
				lastName: true,
				clubName: true,
				competitionCategoryId: true,
				weight: true,
			},
		});

		const metadata = prisma.competitor.count({
			where: {
				competitionSlug: slug,
			},
		});

		const [awaitedCompetitors, awaitedMetadata] = await Promise.all([
			competitors,
			metadata,
		]);

		return {
			competitors: awaitedCompetitors,
			metadata: {
				count: awaitedMetadata,
			},
		};
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
		data: CreateCompetitionAdmin,
		competitionAdminId: string,
	) => {
		const isAdmin = await getSetReturn(isAdminCache, `${data.competitionId}-${competitionAdminId}`, (await prisma.competitionAdmin.findFirst({
			where: {
				userId: competitionAdminId,
				competitionId: data.competitionId,
			},
			select: {
				role: true,
			},
		}))?.role === CompetitionRole.OWNER);

		if (!isAdmin) {
			throw new Error('You are not an admin of this competition');
		}

		const newCompetitionAdmin = await prisma.competitionAdmin.create({
			data: {
				...data,
				role: CompetitionRole.MANAGER,
			},
		});

		isAdminCache.set(`${data.competitionId}-${data.userId}`, true)
		return newCompetitionAdmin
	},

	isAdmin: async (competitionId: string, userId: string) => {
		return getSetReturn(isAdminCache, `${competitionId}-${userId}`, (await prisma.competitionAdmin.count({
			where: {
				competitionId,
				userId,
			},
		})) > 0)
	},

	getCompetitionIdFromSlug: async (competitionSlug: string) => {
		return getSetReturn(competitionIdBySlugCache, competitionSlug, (await prisma.competition.findFirst({
			where: {
				slug: competitionSlug,
			},
			select: {
				id: true,
			},
		}))?.id ?? '');
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
				...data,
				club: {
					connect: {
						id: userProfile.clubId,
					},
				},

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

		competitionIdBySlugCache.set(competition.slug, competition.id);
		isAdminCache.set(`${competition.id}-${userProfile.userId}`, true)

		return competition;
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
		if (data.registrationEndAt) {
			Object.assign(data, {
				registrationEndAt: new Date(data.registrationEndAt),
			});
		}

		try {
			const competition = await prisma.competition.update({
				where: {
					id: data.id,
				},
				data,
			});

			competitionIdBySlugCache.set(competition.slug, competition.id);
			return competition;
		} catch (error) {
			tryHandleKnownErrors(error as Error);
		}
	},
};
