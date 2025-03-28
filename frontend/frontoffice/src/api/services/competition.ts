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
import { addSkipTakeSearch, client } from '../client';
import type {
	CompetitionCategory,
	CompetitionListItem,
	CompetitionMetadata,
	Competitor,
	CompetitorResponse,
	PrivateCompetitor,
} from '../utils/common-types';

export class Competition {
	static getPublicCompetitions(
		skipTake: SkipTake & Search,
	): Promise<AxiosResponse<CompetitionListItem[]>> {
		return client.get(addSkipTakeSearch('/public/competition', skipTake));
	}
	static updateCompetition(
		data: UpdateCompetition,
	): Promise<AxiosResponse<CompetitionListItem>> {
		return client.patch('/user/competitions', data);
	}
	static getCompetitorExport(slug: string) {
		return client.post(`/user/competitions/${slug}/export`);
	}
	static createCompetitionAdmin(slug: string, data: CreateCompetitionAdmin) {
		return client.post(`/user/competitions/${slug}/admins`, data);
	}
	static createCompetitionLink(slug: string, data: CreateCompetitionLink) {
		return client.post(`/user/competitions/${slug}/links`, data);
	}
	static deleteCompetitor(data: DeleteCompetitor) {
		return client.post('/user/delete-competitor', data);
	}
	static getPrivateCompetitions(): Promise<
		AxiosResponse<CompetitionListItem[]>
	> {
		return client.get('/user/competitions/private');
	}
	static getCompetition(competitionSlug?: string) {
		if (!competitionSlug) return Promise.resolve(null);
		return client.get(`/public/competitions/${competitionSlug}`);
	}
	static getCompetitionMetadata(
		slug?: string,
	): Promise<AxiosResponse<CompetitionMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competitions/${slug}/metadata`);
	}
	static createCompetition(
		data: CreateCompetition,
	): Promise<AxiosResponse<CompetitionListItem>> {
		return client.post('/user/competitions', data);
	}

	static getCompetitionCategories(
		slug?: string,
	): Promise<AxiosResponse<CompetitionCategory[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competitions/${slug}/categories`);
	}
	static createCompetitionCategory(
		slug: string,
		data: CreateCompetitionCategory,
	): Promise<AxiosResponse<CompetitionCategory>> {
		return client.post(`/user/competitions/${slug}/categories`, data);
	}

	// TODO: maybe this should be a patch instead and also connected with update
	static configureVisibility(slug: string, data: CompetitionVisibility) {
		return client.post(`/competitions/${slug}/configure-visibility`, data);
	}

	static getCompetitors(
		slug: string,
		skipTake: SkipTake,
	): Promise<AxiosResponse<CompetitorResponse> | null> {
		return client.get(
			addSkipTakeSearch(`/public/competitions/${slug}/competitors`, skipTake),
		);
	}

	static getPersonalCompetitors(
		slug?: string,
	): Promise<AxiosResponse<PrivateCompetitor[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/competitions/${slug}/personal-competitors`);
	}

	static createCompetitor(
		slug: string,
		data: CreateCompetitor,
	): Promise<AxiosResponse<Competitor>> {
		return client.post(`/user/competitions/${slug}/competitors`, data);
	}

	static updateCompetitionCategory() {
		throw new Error('Method not implemented.');
	}
	static deleteCompetitionCategory() {
		throw new Error('Method not implemented.');
	}
}
