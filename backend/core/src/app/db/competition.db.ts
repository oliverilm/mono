import { randomUUID } from 'node:crypto';
import type {
	CreateCompetition,
	CreateCompetitionCategory,
} from '@monorepo/utils';
import {
	type Competition,
	type CompetitionCategory,
	CompetitionCategorySex,
	CompetitionRole,
	Sex,
} from '@prisma/client';
import { prisma } from '../utils/db';
import { slugifyString } from '../utils/string';

export namespace CompetitionDb {
	export async function queryActiveParticipations({
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
				OR: categories.map(
					({ sex, smallestYearAllowed, largestYearAllowed }) => {
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
					},
				),
			},
		});
	}

	export function getCompetitors(competitionId: string) {
		return prisma.competitor.findMany({
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
	}

	export function createCompetitionCategory(data: CreateCompetitionCategory) {
		return prisma.competitionCategory.create({
			data: {
				category: {
					connect: {
						id: data.categoryId,
					},
				},
				competition: {
					connect: {
						id: data.competitionId,
					},
				},
				sex: data.sex,
				largestYearAllowed: data.largestYearAllowed,
				smallestYearAllowed: data.smallestYearAllowed,
				weights: data.weights,
			},
		});
	}

	export function getCompetitionCategoriesBySlug(competitionSlug: string) {
		return prisma.competitionCategory.findMany({
			where: {
				competitionSlug,
			},
		});
	}

	export function getOpenCompetitionForRegistrationById(id: string) {
		return prisma.competition.findUnique({
			where: {
				id,
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
	}

	export function getCompetitionExternalLinks(competitionId: string) {
		return prisma.competitionLink.findMany({
			where: {
				competitionId,
			},
			select: {
				id: true,
				label: true,
				url: true,
			},
		});
	}

	export async function getCompetitionIdBySlug(slug: string) {
		const competition = await prisma.competition.findUniqueOrThrow({
			where: {
				slug,
			},
			select: {
				id: true,
			},
		});
		return competition.id;
	}

	export async function isUserCompetitionAdmin(
		userId: string,
		competitionId: string,
	) {
		const count = await prisma.competitionAdmin.count({
			where: {
				competitionId,
				userId,
			},
		});

		return count > 0;
	}

	export function getCompetitionAdmins(competitionId: string) {
		return prisma.competitionAdmin.findMany({
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
	}

	export function getCompetitionBySlug(slug: string) {
		return prisma.competition.findUniqueOrThrow({
			where: {
				slug,
			},
		});
	}

	/**
	 * probably an overkill method of getting a unique slug
	 * @param name
	 * @returns
	 */
	export async function getUniqueSlug(name: string): Promise<string> {
		const uniqueValueStack = ['', new Date().getFullYear().toString()]; // add members
		let uniqueSlug: string | undefined;
		let index = 0;

		do {
			if (!uniqueValueStack.at(index)) {
				break;
			}

			const slug = slugifyString(
				[name, ...uniqueValueStack.slice(0, index)].join('_'),
			);
			const isUniqueSlug = await prisma.competition.count({ where: { slug } });

			if (isUniqueSlug) {
				return slug;
			}
			index++;
		} while (uniqueSlug === undefined);

		return randomUUID().toString();
	}

	export async function create({
		userId,
		clubId,
		...data
	}: CreateCompetition & { clubId: string; userId: string }) {
		const slug = await getUniqueSlug(data.name);

		return prisma.competition.create({
			data: {
				slug,
				...data,
				club: {
					connect: {
						id: clubId,
					},
				},

				competitionAdmins: {
					create: {
						userId: userId,
						role: CompetitionRole.OWNER,
					},
				},
			},
		});
	}

	export async function getAdminPrivateCompetitions(userId: string) {
		const result = await prisma.competitionAdmin.findMany({
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

		return result.map(({ competition }) => competition);
	}

	export async function isUserCompetitionOwner(
		userId: string,
		competitionId: string,
	) {
		return (
			(await prisma.competitionAdmin.count({
				where: {
					userId,
					competitionId,
					role: CompetitionRole.OWNER,
				},
			})) > 0
		);
	}
}
