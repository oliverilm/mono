import type {
	CreateCompetition,
	CreateCompetitionAdmin,
	CreateCompetitionCategory,
	CreateCompetitionLink,
	CreateCompetitor,
	SkipTake,
	UpdateCompetition,
} from '@monorepo/utils';
import {
	CompetitionRole,
	type Competitor,
	type UserProfile,
} from '@prisma/client';
import { ClubDb } from '../db/club.db';
import { CompetitionDb } from '../db/competition.db';
import { createCache } from '../utils/cache';
import { prisma } from '../utils/db';
import { tryHandleKnownErrors } from '../utils/error';
import { convertSkipTake } from '../utils/object';
import { slugifyString } from '../utils/string';
import { hours } from '../utils/time';
import { ClubService } from './club';
import { UserService } from './user';

const { set: setAdminCacheValue, withCache: withAdminCache } =
	createCache<boolean>({ ttl: hours(5) });
const { set: setCompetitionCacheValue, withCache: withCompetitionCache } =
	createCache<string>({ ttl: hours(1) });

async function getUserClubName(clubId?: string | null) {
	if (!clubId) return 'Individual';

	// todo: could only get clubs name
	const club = await ClubDb.getById(clubId);

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

		const competitors = await CompetitionDb.getCompetitors(competitionId);

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
		const competition = await CompetitionDb.getCompetitionBySlug(slug);
		const categories = await CompetitionDb.getCompetitionCategoriesBySlug(slug);

		// 1. check get user club and club role
		const profile = await UserService.getUserProfile(userId);

		if (!profile) {
			throw new Error('User profile not found');
		}

		if (!profile.clubId) {
			// wants to register as individual
			return CompetitionDb.queryActiveParticipations({
				competition,
				categories,
				userId,
			});
		}

		const isClubAdmin = await ClubService.isClubAdmin(userId, profile.clubId);

		if (!isClubAdmin) {
			// also wants to register as an individual
			return CompetitionDb.queryActiveParticipations({
				competition,
				categories,
				userId,
			});
		}

		return CompetitionDb.queryActiveParticipations({
			competition,
			categories,
			clubId: profile.clubId,
		});
	},

	createCompetitionLink: async function (
		data: CreateCompetitionLink,
		userId: string,
	) {
		const { competitionId } = data;
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
	createCompetitionCategory: async (data: CreateCompetitionCategory) => {
		try {
			return await CompetitionDb.createCompetitionCategory(data);
		} catch (error) {
			tryHandleKnownErrors(error as Error);
			throw error;
		}
	},

	createCompetitor: async (
		data: CreateCompetitor,
		userId: string,
	): Promise<null | Competitor> => {
		// TODO: throw everything from here to a transaction maybe
		const userProfile = await UserService.getUserProfile(userId);

		if (!userProfile) {
			throw new Error('User profile not found');
		}

		const competition =
			await CompetitionDb.getOpenCompetitionForRegistrationById(
				data.competitionId,
			);

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

	createCompetitionAdmin: async (
		data: CreateCompetitionAdmin,
		competitionAdminId: string,
	) => {
		const isAdmin = await withAdminCache(
			`${data.competitionId}-${competitionAdminId}`,
			(
				await prisma.competitionAdmin.findFirst({
					where: {
						userId: competitionAdminId,
						competitionId: data.competitionId,
					},
					select: {
						role: true,
					},
				})
			)?.role === CompetitionRole.OWNER,
		);

		if (!isAdmin) {
			throw new Error('You are not an admin of this competition');
		}

		const newCompetitionAdmin = await prisma.competitionAdmin.create({
			data: {
				...data,
				role: CompetitionRole.MANAGER,
			},
		});

		setAdminCacheValue(`${data.competitionId}-${data.userId}`, true);
		return newCompetitionAdmin;
	},

	isAdmin: async (competitionId: string, userId: string) => {
		return withAdminCache(
			`${competitionId}-${userId}`,
			CompetitionDb.isUserCompetitionAdmin(userId, competitionId),
		);
	},

	getCompetitionIdFromSlug: async (competitionSlug: string) => {
		return withCompetitionCache(
			competitionSlug,
			await CompetitionDb.getCompetitionIdBySlug(competitionSlug),
		);
	},
	getCompetitionLinks: async function (competitionSlug: string) {
		const competitionId = await this.getCompetitionIdFromSlug(competitionSlug);
		return CompetitionDb.getCompetitionExternalLinks(competitionId);
	},

	getCompetitionAdmins: async function (
		competitionSlug: string,
		userId?: string,
	) {
		if (!userId) return {};

		const competitionId = await this.getCompetitionIdFromSlug(competitionSlug);
		const isAdmin = await this.isAdmin(competitionId, userId);

		if (isAdmin) {
			const admins = await CompetitionDb.getCompetitionAdmins(competitionId);

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

	createCompetition: async ({
		data,
		userProfile,
	}: { data: CreateCompetition; userProfile: UserProfile }) => {
		if (!userProfile.userId) {
			throw new Error('User not found');
		}

		if (!userProfile.clubId) {
			throw new Error('User does not belong to a club');
		}

		const competition = await CompetitionDb.create({
			...data,
			userId: userProfile.userId,
			clubId: userProfile.clubId,
		});

		if (!competition) {
			throw new Error('Something went wrong');
		}

		setCompetitionCacheValue(competition.slug, competition.id);
		setAdminCacheValue(`${competition.id}-${userProfile.userId}`, true);

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

			setCompetitionCacheValue(competition.slug, competition.id);
			return competition;
		} catch (error) {
			tryHandleKnownErrors(error as Error);
		}
	},
};
