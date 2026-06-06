import type { NationalId } from '@monorepo/utils';

export type Sex = 'Male' | 'Female';

export type ClubRole = 'OWNER' | 'ADMIN';

export type CompetitionRole = 'OWNER' | 'MANAGER';

export type CompetitionCategorySex = 'Male' | 'Female' | 'Unisex';

export type User = {
	id: string;
	email: string;
	password?: string;
	isAdmin: boolean;
	createdAt: string;
	updatedAt: string;
};

export type UserProfile = {
	id: string;
	firstName: string | null;
	lastName: string | null;
	nationalId: string | null;
	nationalIdType: NationalId | string | null;
	dateOfBirth: string | null;
	sex: Sex;
	userId: string | null;
	clubId: string | null;
	belt: string | null;
	createdAt: string;
	updatedAt: string;
};

export type Club = {
	id: string;
	name: string;
	slug: string;
	description: string;
	country: string;
	createdAt: string;
	updatedAt: string;
};

export type Category = {
	id: number;
	value: string;
	createdAt?: string;
	updatedAt?: string;
};

export type Competition = {
	id: string;
	name: string;
	slug: string;
	isPublished: boolean;
	isArchived: boolean;
	clubId: string | null;
	clubName: string | null;
	description: string | null;
	location: string | null;
	additionalInfo: Record<string, unknown> | null;
	registrationEndAt: string | null;
	startingAt: string | null;
	createdAt: string;
	updatedAt: string;
};

export type CompetitionCategory = {
	id: number;
	weights: string[];
	largestYearAllowed: number;
	smallestYearAllowed: number;
	sex: CompetitionCategorySex;
	competitionId: string;
	competitionName: string;
	competitionSlug: string;
	categoryId: number;
	categoryName: string;
	createdAt?: string;
	updatedAt?: string | null;
};

export type Competitor = {
	id: number;
	clubId: string | null;
	clubName: string | null;
	profileId: string;
	firstName: string;
	lastName: string;
	competitionCategoryId: number;
	competitionId: string;
	competitionName: string;
	competitionSlug: string;
	weight: string;
	seed: number;
	createdAt: string;
	updatedAt: string | null;
};

export type CompetitionAdmin = {
	id: number;
	competitionId: string;
	userId: string;
	role: CompetitionRole;
	createdAt: string;
	updatedAt: string;
};

export type CompetitionLink = {
	id: number;
	url: string;
	label: string;
	competitionId: string;
	createdAt: string;
	updatedAt: string | null;
};

export type ClubAdmin = {
	id: number;
	clubId: string;
	userId: string;
	role: ClubRole;
	createdAt: string;
	updatedAt: string;
};

export type Invitation = {
	id: number;
	clubId: string;
	clubName: string;
	isAccepted: boolean | null;
	profileId: string;
	invitedById: string;
	createdAt?: string;
	updatedAt?: string;
};

export type Session = {
	id: string;
	token: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
};
