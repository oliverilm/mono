import type {
	ClubCreate,
	CompetitionVisibility,
	CreateCompetition,
	CreateCompetitionAdmin,
	CreateCompetitionCategory,
	CreateCompetitionLink,
	CreateCompetitor,
	CreateMember,
	DeleteCompetitor,
	Search,
	SkipTake,
	UpdateCompetition,
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import type { Profile } from './auth';
import { addSkipTakeSearch, client } from './client';

export interface Club {
	id: string;
	name: string;
	slug: string;
}

export interface ClubMetadataAdmin {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	userId: string;
}

export interface ClubMetadata {
	isAdmin: boolean;
	admins: ClubMetadataAdmin[];
}

function getPublicClubs(
	query: SkipTake & Search,
): Promise<AxiosResponse<Club[]>> {
	return client.get(addSkipTakeSearch('/public/clubs', query));
}

function createClub(data: ClubCreate) {
	return client.post('/user/club/create', data);
}

function getClub(slug?: string) {
	if (!slug) return Promise.resolve(null);
	return client.get(`/public/club/${slug}`);
}

export const ClubAPI = {
	getClub,
	createClub,
	getClubMembers: (slug?: string): Promise<AxiosResponse<Profile[]> | null> => {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/club/${slug}/members`);
	},
	createMember: (data: CreateMember, slug?: string) => {
		if (!slug) return Promise.resolve(null);
		return client.post(`/user/club/${slug}/members`, data);
	},
	getPublicClubs,
	getClubById: (id?: string | null): Promise<AxiosResponse<Club> | null> => {
		if (!id) return Promise.resolve(null);
		return client.get(`/public/clubs/${id}`);
	},
	getClubMetadata: (
		slug?: string,
	): Promise<AxiosResponse<ClubMetadata> | null> => {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/club/${slug}/metadata`);
	},
	updateClub: () => {},
	getProfilesInClub: () => {},
	applyToClub: () => {},

	acceptApplicationToClub: () => {},
	declineApplicationToClub: () => {},

	createGhostProfileToClub: () => {},
	removeGhostProfileFromClub: () => {},
};

export interface CompetitionListItem {
	id: string;
	name: string;
	slug: string;
	clubName: string;
	isPublished: boolean;
	isArchived: boolean;
	description: string;
	startingAt: Date;
	location: string;
	registrationEndAt: string;
	additionalInfo: JSON;
	createdAt: string;
	updatedAt: string;
}

export interface CompetitionMetadata {
	competitionAdmins: {
		id: number;
		userId: string;
		email: string;
		role: string;
	}[];
	competitionLinks: {
		id: number;
		url: string;
		label: string;
	}[];
}

function getPublicCompetitions(
	query: SkipTake & Search,
): Promise<AxiosResponse<CompetitionListItem[]>> {
	return client.get(addSkipTakeSearch('/public/competitions', query));
}

function createCompetition(
	data: CreateCompetition,
): Promise<AxiosResponse<CompetitionListItem>> {
	return client.post('/user/competitions', data);
}

function updateCompetition(
	data: UpdateCompetition,
): Promise<AxiosResponse<CompetitionListItem>> {
	return client.patch('/user/competitions', data);
}

export interface CompetitionCategory {
	id: number;
	weights: string[];
	largestYearAllowed: number;
	smallestYearAllowed: number;
	sex: string;
	competitionId: string;
	competitionName: string;
	competitionSlug: string;
	categoryId: number;
	categoryName: string;
}

export interface PrivateCompetitor {
	id: string;
	firstName: string;
	lastName: string;
	sex: string;
	dateOfBirth: string;
	participations: {
		id: number;
		weight: string;
		seed: number;
		competitionCategory: {
			id: string;
			competitionName: string;
		};
	}[];
}

export interface Competitor {
	id: number;
	clubName: string;
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
	updatedAt: string;
}
export interface Metadata {
	count: number;
}

export interface CompetitorResponse {
	competitors: Competitor[];
	metadata: Metadata;
}

export interface CreateCompetitorResponse {
	competitionCategoryId: number;
	competitionId: string;
	competitorId: string;
	weight: string;
	seed: number;
}

export const CompetitionAPI = {
	createCompetitionAdmin: (slug: string, data: CreateCompetitionAdmin) => {
		return client.post(`/user/competitions/${slug}/admins`, data);
	},
	createCompetitionLink: (slug: string, data: CreateCompetitionLink) => {
		return client.post(`/user/competitions/${slug}/links`, data);
	},
	deleteCompetitor: async (data: DeleteCompetitor) =>
		client.post('/user/delete-competitor', data),
	getPublicCompetitions,
	createCompetition,
	updateCompetition,
	getPrivateCompetitions: (): Promise<AxiosResponse<CompetitionListItem[]>> =>
		client.get('/user/competitions/private'),
	getCompetition: (competitionSlug?: string) => {
		if (!competitionSlug) return Promise.resolve(null);
		return client.get(`/public/competitions/${competitionSlug}`);
	},
	getCompetitionMetadata: (
		slug?: string,
	): Promise<AxiosResponse<CompetitionMetadata> | null> => {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competitions/${slug}/metadata`);
	},

	getCompetitionCategories: (
		slug?: string,
	): Promise<AxiosResponse<CompetitionCategory[]> | null> => {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competitions/${slug}/categories`);
	},
	createCompetitionCategory: (
		slug: string,
		data: CreateCompetitionCategory,
	): Promise<AxiosResponse<CompetitionCategory>> => {
		return client.post(`/user/competitions/${slug}/categories`, data);
	},

	// TODO: maybe this should be a patch instead and also connected with update
	configureVisibility: (slug: string, data: CompetitionVisibility) => {
		return client.post(`/competitions/${slug}/configure-visibility`, data);
	},
	updateCompetitionCategory: () => {},
	deleteCompetitionCategory: () => {},

	getCompetitors: (
		slug: string,
		skipTake: SkipTake,
	): Promise<AxiosResponse<CompetitorResponse> | null> => {
		return client.get(
			addSkipTakeSearch(`/public/competitions/${slug}/competitors`, skipTake),
		);
	},

	getPersonalCompetitors: (
		slug?: string,
	): Promise<AxiosResponse<PrivateCompetitor[]> | null> => {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/competitions/${slug}/personal-competitors`);
	},

	createCompetitor: (
		slug: string,
		data: CreateCompetitor,
	): Promise<AxiosResponse<Competitor>> => {
		return client.post(`/user/competitions/${slug}/competitors`, data);
	},
};

function getPublicCamps(query: SkipTake & Search) {
	return client.get(addSkipTakeSearch('/public/camps', query));
}

export const CampsAPI = {
	getPublicCamps,
	createCamp: () => {},
	updateCamp: () => {},
	getCamp: () => {},
};

export interface Category {
	id: number;
	value: string;
}
export const CommonAPI = {
	getCategories: (): Promise<AxiosResponse<Category[]>> =>
		client.get('/public/common/categories'),
};
