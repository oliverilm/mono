/* eslint-disable @typescript-eslint/no-namespace */
import type { Search, SkipTake } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from '../../client';
import type {
	CompetitionCategory,
	CompetitionListItem,
	CompetitionMetadata,
	CompetitorResponse,
} from '../../utils/common-types';

export namespace PublicCompetition {
	const PREFIX = '/public/competition';

	/**
	 * Get public competitions with pagination and search
	 * @param skipTake - Query parameters including skip, take, and search
	 * @returns Promise resolving to an array of competition list items
	 * @route GET /public/competition/
	 */
	export function getPublicCompetitions(
		skipTake: SkipTake & Search,
	): Promise<AxiosResponse<CompetitionListItem[]>> {
		return client.get(addSkipTakeSearch(PREFIX, skipTake));
	}

	/**
	 * Get competition by slug
	 * @param slug - Competition slug identifier
	 * @returns Promise resolving to the competition or null if slug is not provided
	 * @route GET /public/competition/:slug
	 */
	export function getCompetition(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/${slug}`);
	}

	/**
	 * Get competition metadata by slug
	 * @param slug - Competition slug identifier
	 * @returns Promise resolving to competition metadata or null if slug is not provided
	 * @route GET /public/competition/metadata/:slug
	 */
	export function getCompetitionMetadata(
		slug?: string,
	): Promise<AxiosResponse<CompetitionMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/metadata/${slug}`);
	}

	/**
	 * Get competition categories by slug
	 * @param slug - Competition slug identifier
	 * @returns Promise resolving to an array of competition categories or null if slug is not provided
	 * @route GET /public/competition/get-categories/:slug
	 */
	export function getCompetitionCategories(
		slug?: string,
	): Promise<AxiosResponse<CompetitionCategory[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/get-categories/${slug}`);
	}

	/**
	 * Get competitors for a competition with pagination
	 * @param slug - Competition slug identifier
	 * @param skipTake - Pagination parameters (skip and take)
	 * @returns Promise resolving to competitor response
	 * @route GET /public/competition/get-competitors/:slug
	 */
	export function getCompetitors(
		slug: string,
		skipTake: SkipTake,
	): Promise<AxiosResponse<CompetitorResponse> | null> {
		return client.get(
			addSkipTakeSearch(
				`${PREFIX}/get-competitors/${slug}`,
				skipTake ?? { skip: 0, take: 10 },
			),
		);
	}
}
