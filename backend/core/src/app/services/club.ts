import type {
	ClubCreate,
	CreateMember,
	SkipTake,
	UserIdObject,
} from '@monorepo/utils';
import { type Club, ClubRole, Sex } from '@prisma/client';
import { LRUCache } from 'lru-cache';
import { prisma } from '../utils/db';
import { validateNationalIdAndDobOrThrow } from '../utils/national-id';
import { slugifyString } from '../utils/string';
import { getSetReturn } from '../utils/cache';

const adminCache = new LRUCache<string, boolean>({
	max: 500,
	ttl: 1000 * 60 * 60 * 24,
});

const idCache = new LRUCache<string, string>({
	max: 500,
	ttl: 1000 * 60 * 60 * 24,
});

export type SlugOrId =
	| {
			id: string;
	  }
	| { slug: string };

export const ClubService = {
	getClubAdmins: async (clubId: string) => {
		const admins = await prisma.clubAdmin.findMany({
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

		return admins.map((admin) => ({
			email: admin.user.email,
			firstName: admin.user.userProfile?.firstName,
			lastName: admin.user.userProfile?.lastName,
			role: admin.role,
			userId: admin.userId,
		}));
	},
	isAnyClubAdmin: async (userId: string): Promise<boolean> => {
		return getSetReturn(
			adminCache,
			userId,
			(await prisma.clubAdmin.count({
				where: {
					userId,
				},
			})) > 0,
		);
	},
	isClubAdmin: async (
		userId: string,
		clubId?: string | null,
	): Promise<boolean> => {
		if (!clubId) return Promise.resolve(false);

		return getSetReturn(
			adminCache,
			`${userId}-${clubId}`,
			(await prisma.clubAdmin.count({
				where: {
					userId,
					clubId,
				},
			})) > 0,
		);
	},

	getClubIdBySlug: async (slug: string) =>
		getSetReturn(
			idCache,
			slug,
			(
				await prisma.club.findFirst({
					where: {
						slug,
					},
				})
			)?.id ?? '',
		),
	getClubByIdOrSlug: (slugOrId: SlugOrId): Promise<Club | null> | null => {
		if ('id' in slugOrId) {
			return prisma.club.findUnique({
				where: {
					id: slugOrId.id,
				},
			});
		}
		if ('slug' in slugOrId) {
			return prisma.club.findFirst({
				where: {
					slug: slugOrId.slug,
				},
			});
		}
		return null;
	},
	getClubList: ({ take = 25, skip = 0 }: SkipTake): Promise<Club[]> =>
		prisma.club.findMany({
			take: Number(take),
			skip: Number(skip),
			orderBy: {
				id: 'desc',
			},
		}),

	createMember: async (data: CreateMember, userId: string, clubId: string) => {
		// member is not already a part of some other club
		// if user exists, dont allow to create the member
		// 	the user should be presented with a button to invite them / automatically added to the club
		// 	if user is not a part of some other club

		const idDetails = validateNationalIdAndDobOrThrow({
			nationalId: data.nationalId,
			nationalIdType: data.nationalIdType,
			dob: data.dateOfBirth,
		});

		const isAdmin = await ClubService.isClubAdmin(userId, clubId);

		if (!isAdmin) {
			throw new Error('You are not an admin of any club');
		}

		const userProfile = await prisma.userProfile.findUnique({
			where: {
				userId,
			},
			select: {
				clubId: true,
			},
		});

		if (!userProfile) {
			throw new Error('userProfile does not exist');
		}

		// TODO: validate target profiles availability

		const existingUserProfile = await prisma.userProfile.findFirst({
			where: {
				nationalId: data.nationalId,
				nationalIdType: data.nationalIdType,
				dateOfBirth: new Date(data.dateOfBirth),
			},
		});

		if (existingUserProfile) {
			throw new Error(
				'User already exists, invite them instead of creating them',
			);
		}

		return prisma.userProfile.create({
			data: {
				...data,
				sex: idDetails.meta.gender === 'm' ? Sex.Male : Sex.Female,
				clubId: userProfile.clubId,
			},
		});
	},
	create: async ({
		name,
		country,
		userId,
	}: ClubCreate & UserIdObject): Promise<Club | null> => {
		// PS: this action should require a subscription later on
		// if user is subscribed then allow them to create a club

		// the price should be dependant on the avg hosting bill in zone or something like that

		const user = await prisma.userProfile.findUnique({
			where: {
				userId,
			},
		});

		if (user?.clubId !== null) {
			throw new Error('User already belongs to a club');
		}

		const slug = slugifyString(name);

		if (!slug) {
			throw new Error('name must contain letters and or numbers');
		}

		const club = await prisma.club.create({
			data: {
				name,
				country,
				slug,
				description: '',
				clubAdmins: {
					create: {
						userId,
						role: ClubRole.OWNER,
					},
				},
				clubMetadata: { create: {} },
			},
		});

		if (!club) {
			throw new Error('Failed to create club');
		}

		await prisma.userProfile.update({
			where: {
				userId,
			},
			data: {
				clubId: club.id,
			},
		});

		return club || null;
	},

	createClubAdmin: async (userId: string, clubId: string) => {
		const isAdmin = await ClubService.isClubAdmin(userId, clubId);

		if (!isAdmin) {
			throw new Error('You are not an admin of any club');
		}

		const admin = await prisma.clubAdmin.create({
			data: {
				userId,
				clubId,
				role: ClubRole.ADMIN,
			},
		});

		if (admin) {
			adminCache.set(`${userId}-${clubId}`, true);
			adminCache.set(userId, true);
		}
	},
};
