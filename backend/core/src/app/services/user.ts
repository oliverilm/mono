import type { LoginCredentials, UserPatch } from '@monorepo/utils';
import { type Session, Sex, type UserProfile } from '@prisma/client';
import { prisma } from '../utils/db';
import { tryHandleKnownErrors } from '../utils/error';
import { validateNationalIdAndDobOrThrow } from '../utils/national-id';
import { capitalizeFirstLetter } from '../utils/string';
import { ClubService } from './club';
import { SecurityService } from './securify';
import { SessionService } from './session';

export interface AuthenticationPayload {
	profile: UserProfile;
	token: Session['token'];
}

export namespace UserService {
	export async function createUser({
		email,
		password,
	}: LoginCredentials): Promise<AuthenticationPayload | undefined> {
		try {
			const isEmailUnique =
				(await prisma.user.count({
					where: {
						email,
					},
				})) === 0;

			if (!isEmailUnique) {
				throw new Error('something went wrong');
			}

			const user = await prisma.user.create({
				data: {
					email,
					password: SecurityService.hashPassword(password),
				},
			});

			const [profile, session] = await Promise.all([
				prisma.userProfile.create({
					data: {
						userId: user.id,
					},
				}),
				SessionService.createSession(user.id),
			]);

			return {
				profile,
				token: session.token,
			};
		} catch (error) {
			// @ts-expect-error --un
			if (error.message.includes('Unique constraint')) {
				throw new Error('Email already used');
			}

			throw error;
		}
	}

	export async function login({
		email,
		password,
	}: LoginCredentials): Promise<AuthenticationPayload> {
		const user = await prisma.user.findFirstOrThrow({
			where: {
				email,
				password: SecurityService.hashPassword(password),
			},
		});

		console.log({user})

		const profile = await prisma.userProfile.findFirstOrThrow({
			where: {
				userId: user.id,
			},
		});

		const token = (await SessionService.createSession(user.id)).token;

		return {
			profile,
			token,
		};
	}
	export async function getUserProfile(
		userId: string,
	): Promise<UserProfile | null> {
		const profile = await prisma.userProfile.findUnique({
			where: {
				userId,
			},
		});

		return profile;
	}
	export async function updateUserProfile(
		payload: UserPatch,
	): Promise<UserProfile | null> {
		const { userId, ...rest } = payload;

		const idDetails = validateNationalIdAndDobOrThrow({
			nationalId: rest.nationalId,
			nationalIdType: rest.nationalIdType,
			dob: rest.dateOfBirth,
		});

		const existingUserProfile = await prisma.userProfile.findUnique({
			where: {
				nationalId: rest.nationalId,
				nationalIdType: rest.nationalIdType,
			},
		});

		// check wether to join profile to a user if the profile has been registered already
		if (existingUserProfile) {
			if (existingUserProfile.userId && existingUserProfile.userId !== userId) {
				throw new Error('National ID already in use by someone else');
			}
			// delete the originally created user profile
			await prisma.userProfile.delete({
				where: {
					userId,
				},
			});

			// reassign existing profile to the current user
			const profile = await prisma.userProfile.update({
				where: {
					id: existingUserProfile.id,
				},
				data: {
					userId,
					firstName: capitalizeFirstLetter(rest.firstName),
					lastName: capitalizeFirstLetter(rest.lastName),
					nationalId: rest.nationalId,
					nationalIdType: rest.nationalIdType,
					dateOfBirth: new Date(rest.dateOfBirth),
				},
			});

			return profile;
		}

		// existing user profile was not found, continue with default logic
		try {
			const profile = await prisma.userProfile.update({
				where: {
					userId,
				},
				data: {
					sex: idDetails.meta.gender === 'm' ? Sex.Male : Sex.Female,
					firstName: capitalizeFirstLetter(rest.firstName),
					lastName: capitalizeFirstLetter(rest.lastName),
					nationalId: rest.nationalId,
					nationalIdType: rest.nationalIdType,
					dateOfBirth: new Date(rest.dateOfBirth),
				},
			});

			return profile;
		} catch (error) {
			tryHandleKnownErrors(error as Error);
			return null;
		}
	}

	export function getUserProfileByUserId(id: string) {
		return prisma.userProfile.findUnique({ where: { userId: id } });
	}

	export function getUserProfileByProfileId(
		profileId: string,
	): Promise<UserProfile | null> {
		return prisma.userProfile.findUnique({
			where: {
				id: profileId,
			},
		});
	}

	export function searchByEmailExactMatch(email: string) {
		// perhaps can add caching here but maybe not important
		return prisma.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
				email: true,
				userProfile: {
					select: {
						firstName: true,
						lastName: true,
						club: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});
	}

	export async function searchByNationalIdExactMatch(
		nationalId: string,
		userId: string,
	) {
		const isAdmin = await ClubService.isAnyClubAdmin(userId);

		if (!isAdmin) {
			throw new Error('You are not an admin of any club');
		}
		// TODO validate if national id is in correct format
		// perhaps can add caching here but maybe not important
		return prisma.userProfile.findUnique({
			where: {
				nationalId,
			},
			select: {
				userId: true,
				nationalId: true,
				firstName: true,
				lastName: true,
				id: true,
				club: {
					select: {
						name: true,
						id: true,
					},
				},
				dateOfBirth: true,
				nationalIdType: true,
				sex: true,
			},
		});
	}
}
