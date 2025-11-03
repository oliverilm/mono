import type {
	ClubCreate,
	CreateMember,
	SkipTake,
	UserIdObject,
} from '@monorepo/utils';
import { type Club, ClubRole, Sex } from '@prisma/client';
import { ClubDb } from '../db/club.db';
import { createCache } from '../utils/cache';
import { prisma } from '../utils/db';
import { validateNationalIdAndDobOrThrow } from '../utils/national-id';
import { slugifyString } from '../utils/string';
import type { SlugOrId } from '../utils/types';

const { cache: adminCache, withCache: withAdminCache } = createCache<boolean>();
const { withCache: withIdCache } = createCache<string>();

export namespace ClubService {
	export async function getClubAdmins(clubId: string) {
		const admins = await ClubDb.getAdmins(clubId);

		return admins.map((admin) => ({
			email: admin.user.email,
			firstName: admin.user.userProfile?.firstName,
			lastName: admin.user.userProfile?.lastName,
			role: admin.role,
			userId: admin.userId,
		}));
	}
	export async function isAnyClubAdmin(userId: string): Promise<boolean> {
		return withAdminCache(
			userId,
			async () => (await ClubDb.getUserClubAdminStatusCount(userId)) > 0,
		);
	}
	export async function isClubAdmin(
		userId: string,
		clubId?: string | null,
	): Promise<boolean> {
		if (!clubId) return Promise.resolve(false);

		const getter = async () =>
			(await ClubDb.getUserClubAdminStatusCountForClub(userId, clubId)) > 0;

		return withAdminCache(`${userId}-${clubId}`, getter);
	}

	export async function getClubIdBySlug(slug: string) {
		const getter = async () => (await ClubDb.getBySlug(slug))?.id ?? '';
		return withIdCache(slug, getter);
	}

	export async function getClubByIdOrSlug(slugOrId: SlugOrId): Promise<Club> {
		return ClubDb.getClubBySlugOrId(slugOrId);
	}
	// TODO: REMOVE
	export function getClubList(input: SkipTake): Promise<Club[]> {
		return ClubDb.getClubList(input);
	}

	export async function createMember(
		data: CreateMember,
		userId: string,
		clubId: string,
	) {
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

		const userProfile = await prisma.userProfile.findUniqueOrThrow({
			where: {
				userId,
			},
			select: {
				clubId: true,
			},
		});

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
	}

	export async function create({
		name,
		country,
		userId,
	}: ClubCreate & UserIdObject): Promise<Club | null> {
		// PS: this action should require a subscription later on
		// if user is subscribed then allow them to create a club

		// the price should be dependant on the avg hosting bill in zone or something like that

		const user = await prisma.userProfile.findFirstOrThrow({
			where: {
				userId,
			},
		});

		if (user.clubId !== null) {
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
	}

	export async function createClubAdmin(userId: string, clubId: string) {
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
	}
}
