import type {
	CompetitionVisibility,
	CreateCompetition,
	CreateCompetitionAdmin,
	CreateCompetitionCategory,
	CreateCompetitionLink,
	CreateCompetitor,
	DeleteCompetitor,
	Search,
	SkipTake,
	UpdateCompetition,
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from './client';
import type {
	CompetitionCategory,
	CompetitionListItem,
	CompetitionMetadata,
	Competitor,
	CompetitorResponse,
	PrivateCompetitor,
} from './utils/common-types';

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

export const CompetitionAPI = {
	getCompetitorExport: (slug: string) => {
		return client.post(`/user/competitions/${slug}/export`);
	},
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
