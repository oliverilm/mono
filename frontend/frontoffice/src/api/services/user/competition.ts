/* eslint-disable @typescript-eslint/no-namespace */
import type {
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
import type {
	CompetitionCategory,
	CompetitionListItem,
	Competitor,
	PrivateCompetitor,
} from '../../utils/common-types';

export namespace UserCompetition {
	const prefix = '/user/competition';

	/**
	 * Get personal competitors for a competition
	 * @param slug - Competition slug identifier
	 * @returns Promise resolving to an array of private competitors or null if slug is not provided
	 * @route GET /user/competition/competitor/get-personal/:slug
	 */
	export function getPersonalCompetitors(
		slug?: string,
	): Promise<AxiosResponse<PrivateCompetitor[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`${prefix}/competitor/get-personal/${slug}`);
	}

	/**
	 * Create a new competition
	 * @param data - Competition creation data
	 * @returns Promise resolving to the created competition
	 * @route POST /user/competition/
	 */
	export function createCompetition(
		data: CreateCompetition,
	): Promise<AxiosResponse<CompetitionListItem>> {
		return client.post(prefix, data);
	}

	/**
	 * Update an existing competition
	 * @param data - Competition update data
	 * @returns Promise resolving to the updated competition
	 * @route PATCH /user/competition/
	 */
	export function updateCompetition(
		data: UpdateCompetition,
	): Promise<AxiosResponse<CompetitionListItem>> {
		return client.patch(prefix, data);
	}

	/**
	 * Export competitors data for a competition
	 * @param slug - Competition slug identifier
	 * @returns Promise resolving to the export data
	 * @route POST /user/competition/export/:slug
	 */
	export function getCompetitorExport(slug: string) {
		return client.post(`${prefix}/export/${slug}`);
	}

	/**
	 * Create a competition admin
	 * @param slug - Competition slug identifier
	 * @param data - Competition admin creation data
	 * @returns Promise resolving to the created competition admin
	 * @route POST /user/competition/:slug/admins
	 */
	export function createCompetitionAdmin(
		slug: string,
		data: CreateCompetitionAdmin,
	) {
		return client.post(`${prefix}/${slug}/admins`, data);
	}

	/**
	 * Create a competition link
	 * @param data - Competition link creation data
	 * @returns Promise resolving to the created competition link
	 * @route POST /user/competition/link/create
	 */
	export function createCompetitionLink(data: CreateCompetitionLink) {
		return client.post(`${prefix}/link/create`, data);
	}

	/**
	 * Delete a competitor from a competition
	 * @param data - Competitor deletion data
	 * @returns Promise resolving to the deletion result
	 * @route POST /user/competition/competitor/delete
	 */
	export function deleteCompetitor(data: DeleteCompetitor) {
		return client.post(`${prefix}/competitor/delete`, data);
	}

	/**
	 * Get all private competitions for the authenticated user
	 * @returns Promise resolving to an array of private competitions
	 * @route GET /user/competition/get-private
	 */
	export function getPrivateCompetitions(): Promise<
		AxiosResponse<CompetitionListItem[]>
	> {
		return client.get(`${prefix}/get-private`);
	}

	/**
	 * Create a competition category
	 * @param data - Competition category creation data
	 * @returns Promise resolving to the created competition category
	 * @route POST /user/competition/category/create
	 */
	export function createCompetitionCategory(
		data: CreateCompetitionCategory,
	): Promise<AxiosResponse<CompetitionCategory>> {
		return client.post(`${prefix}/category/create`, data);
	}

	/**
	 * Create a competitor in a competition
	 * @param _slug - Competition slug identifier (currently unused)
	 * @param data - Competitor creation data
	 * @returns Promise resolving to the created competitor
	 * @route POST /user/competition/competitor/create
	 */
	export function createCompetitor(
		_slug: string,
		data: CreateCompetitor,
	): Promise<AxiosResponse<Competitor>> {
		return client.post(`${prefix}/competitor/create`, data);
	}

	/**
	 * Update a competition category
	 * @throws Error - Method not implemented
	 */
	export function updateCompetitionCategory() {
		throw new Error('Method not implemented.');
	}

	/**
	 * Delete a competition category
	 * @throws Error - Method not implemented
	 */
	export function deleteCompetitionCategory() {
		throw new Error('Method not implemented.');
	}
}
