/* eslint-disable @typescript-eslint/no-namespace */
import type { Search, SkipTake } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from '../../client';
import type { Club, ClubMetadata } from '../../utils/common-types';

export namespace PublicClub {
	const PREFIX = "/public/club";

	/**
	 * Get club by slug
	 * @param slug - Club slug identifier
	 * @returns Promise resolving to the club or null if slug is not provided
	 * @route GET /public/club/get-by-slug/:slug
	 */
	export function getClub(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/get-by-slug/${slug}`);
	}

	/**
	 * Get public clubs with pagination and search
	 * @param query - Query parameters including skip, take, and search
	 * @returns Promise resolving to an array of clubs
	 * @route GET /public/club
	 */
	export function getPublicClubs(
		query: SkipTake & Search,
	): Promise<AxiosResponse<Club[]>> {
		return client.get(addSkipTakeSearch(`${PREFIX}`, query));
	}

	/**
	 * Get club by ID
	 * @param id - Club ID identifier
	 * @returns Promise resolving to the club or null if id is not provided
	 * @route GET /public/club/get-by-id/:id
	 */
	export function getClubById(id?: string | null): Promise<AxiosResponse<Club> | null> {
		if (!id) return Promise.resolve(null);
		return client.get(`${PREFIX}/get-by-id/${id}`);
	}

	/**
	 * Get club metadata by slug
	 * @param slug - Club slug identifier
	 * @returns Promise resolving to club metadata or null if slug is not provided
	 * @route GET /public/club/metadata/:slug
	 */
	export function getClubMetadata(
		slug?: string,
	): Promise<AxiosResponse<ClubMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/metadata/${slug}`);
	}
}
