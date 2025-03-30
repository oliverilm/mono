import type {
	CompetitionVisibility,
	CreateCompetition,
	CreateCompetitionAdmin,
	CreateCompetitionCategory,
	CreateCompetitionLink,
	CreateCompetitor,
	DeleteCompetitor,
	UpdateCompetition,
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import {
	PrivateCompetitor,
	CompetitionListItem,
	CompetitionCategory,
	Competitor,
} from '../../utils/common-types';

// POST /user/competition/category/create
// GET /user/competition/category/list/:slug
// POST /user/competition/competitor/competitors
// DELETE /user/competition/competitor/delete
// POST /user/competition/link/create
export class UserCompetition {
	// POST /user/competition/admin/

	// GET /user/competition/competitor/get-personal/:slug
	static getPersonalCompetitors(
		slug?: string,
	): Promise<AxiosResponse<PrivateCompetitor[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/competition/competitor/get-personal/${slug}`);
	}

	// POST /user/competition/
	static createCompetition(
		data: CreateCompetition,
	): Promise<AxiosResponse<CompetitionListItem>> {
		return client.post('/user/competitions', data);
	}

	// PATCH /user/competition/
	static updateCompetition(
		data: UpdateCompetition,
	): Promise<AxiosResponse<CompetitionListItem>> {
		return client.patch('/user/competitions', data);
	}
	static getCompetitorExport(slug: string) {
		return client.post(`/user/competitions/export/${slug}`);
	}
	static createCompetitionAdmin(slug: string, data: CreateCompetitionAdmin) {
		return client.post(`/user/competitions/${slug}/admins`, data);
	}
	static createCompetitionLink(data: CreateCompetitionLink) {
		return client.post(`/user/competition/link/create`, data);
	}
	static deleteCompetitor(data: DeleteCompetitor) {
		return client.post('/user/competition/competitor/delete', data);
	}
	static getPrivateCompetitions(): Promise<
		AxiosResponse<CompetitionListItem[]>
	> {
		return client.get('/user/competition/get-private');
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

	static createCompetitor(
		slug: string,
		data: CreateCompetitor,
	): Promise<AxiosResponse<Competitor>> {
		return client.post(`/user/competition/competitor/create`, data);
	}

	static updateCompetitionCategory() {
		throw new Error('Method not implemented.');
	}
	static deleteCompetitionCategory() {
		throw new Error('Method not implemented.');
	}
}
