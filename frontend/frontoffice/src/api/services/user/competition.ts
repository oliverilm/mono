/* eslint-disable @typescript-eslint/no-namespace */
import type {
	CreateCompetition,
	CreateCompetitionAdmin,
	CreateCompetitionCategory,
	CreateCompetitionLink,
	CreateCompetitor,
	DeleteCompetitor,
	UpdateCompetition
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import type {
	CompetitionCategory,
	CompetitionListItem,
	Competitor,
	PrivateCompetitor,
} from '../../utils/common-types';

export namespace UserCompetition {
	const prefix = "/user/competition"

	// GET /user/competition/competitor/get-personal/:slug
	export function getPersonalCompetitors(
		slug?: string,
	): Promise<AxiosResponse<PrivateCompetitor[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`${prefix}/competitor/get-personal/${slug}`);
	}

	// POST /user/competition/
	export function createCompetition(
		data: CreateCompetition,
	): Promise<AxiosResponse<CompetitionListItem>> {
		return client.post(prefix, data);
	}

	// PATCH /user/competition/
	export function updateCompetition(
		data: UpdateCompetition,
	): Promise<AxiosResponse<CompetitionListItem>> {
		return client.patch(prefix, data);
	}
	export function getCompetitorExport(slug: string) {
		return client.post(`${prefix}/export/${slug}`);
	}
	export function createCompetitionAdmin(slug: string, data: CreateCompetitionAdmin) {
		return client.post(`${prefix}/${slug}/admins`, data);
	}
	export function createCompetitionLink(data: CreateCompetitionLink) {
		return client.post(`${prefix}/link/create`, data);
	}
	export function deleteCompetitor(data: DeleteCompetitor) {
		return client.post(`${prefix}/competitor/delete`, data);
	}
	export function getPrivateCompetitions(): Promise<
		AxiosResponse<CompetitionListItem[]>
	> {
		return client.get(`${prefix}/get-private`);
	}

	export function createCompetitionCategory(
		slug: string,
		data: CreateCompetitionCategory,
	): Promise<AxiosResponse<CompetitionCategory>> {
		return client.post(`${prefix}/${slug}/categories`, data);
	}

	export function createCompetitor(
		_slug: string,
		data: CreateCompetitor,
	): Promise<AxiosResponse<Competitor>> {
		return client.post(`${prefix}/get-private/competitor/create`, data);
	}

	export function updateCompetitionCategory() {
		throw new Error('Method not implemented.');
	}
	export function deleteCompetitionCategory() {
		throw new Error('Method not implemented.');
	}
}
