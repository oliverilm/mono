import type { ClubCreate, SkipTake, UserIdObject } from '@monorepo/utils';
import { type Club, ClubRole } from '@prisma/client';
import { prisma } from '../utils/db';
import { slugifyString } from '../utils/string';

export type SlugOrId =
	| {
			id: string;
	  }
	| { slug: string };

export const ClubService = {
	isClubAdmin: async (
		userId: string,
		clubId: string,
	): Promise<boolean> => (
			(await prisma.clubAdmin.count({
				where: {
					userId,
					clubId,
				},
			})) > 0
		),
	getClubByIdOrSlug: (
		slugOrId: SlugOrId,
	): Promise<Club | null> | null => {
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
	getClubList: ({ take = 25, skip = 0 }: SkipTake): Promise<Club[]> => prisma.club.findMany({
			take: Number(take),
			skip: Number(skip),
			orderBy: {
				id: 'desc',
			},
		}),
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
};
