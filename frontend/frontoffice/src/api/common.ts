import {
	CreateCompetition,
	Search,
	SkipTake,
	ClubCreate,
	UpdateCompetition,
	CreateCompetitionCategory,
	CreateCompetitionLink,
} from '@monorepo/utils';
import { addSkipTakeSearch, client } from './client';
import { AxiosResponse } from 'axios';

export interface Club {
	id: string;
	name: string;
	slug: string;
}

function getPublicClubs(
	query: SkipTake & Search,
): Promise<AxiosResponse<Club[]>> {
	return client.get(addSkipTakeSearch('/public/clubs', query));
}

function createClub(data: ClubCreate) {
	return client.post('/user/club/create', data);
}

function getClub(slug: string) {
	return client.get(`/public/club/${slug}`);
}

export const ClubAPI = {
	getClub,
	createClub,
	getPublicClubs,
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
	return client.patch(`/user/competitions`, data);
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

export const CompetitionAPI = {
	createCompetitionLink: (slug: string, data: CreateCompetitionLink) => {
		return client.post(`/user/competitions/${slug}/links`, data);
	},
	getPublicCompetitions,
	createCompetition,
	updateCompetition,
	getPrivateCompetitions: function (): Promise<
		AxiosResponse<CompetitionListItem[]>
	> {
		return client.get('/user/competitions/private');
	},
	getCompetition: function (competitionSlug?: string) {
		if (!competitionSlug) return Promise.resolve(null);
		return client.get(`/public/competitions/${competitionSlug}`);
	},
	getCompetitionMetadata: function (
		slug?: string,
	): Promise<AxiosResponse<CompetitionMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competitions/${slug}/metadata`);
	},

	getCompetitionCategories: (
		slug: string,
	): Promise<AxiosResponse<CompetitionCategory[]>> => {
		return client.get(`/public/competitions/${slug}/categories`);
	},
	createCompetitionCategory: (
		slug: string,
		data: CreateCompetitionCategory,
	): Promise<AxiosResponse<CompetitionCategory>> => {
		return client.post(`/user/competitions/${slug}/categories`, data);
	},
	updateCompetitionCategory: () => {},
	deleteCompetitionCategory: () => {},

	getCompetitors: (slug: string): Promise<AxiosResponse<unknown[]>> => {
		return Promise.resolve({ data: [] } as AxiosResponse);
	},
	createCompetitor: () => {},
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
	getCategories: function (): Promise<AxiosResponse<Category[]>> {
		return client.get('/public/common/categories');
	},
};
