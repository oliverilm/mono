/* eslint-disable @typescript-eslint/no-namespace */
import type { Search, SkipTake } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from '../../client';
import type { Club, ClubMetadata } from '../../utils/common-types';

export namespace PublicClub {
	const PREFIX = "/public/club";

	export function getClub(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/get-by-slug/${slug}`);
	}

	export function getPublicClubs(
		query: SkipTake & Search,
	): Promise<AxiosResponse<Club[]>> {
		return client.get(addSkipTakeSearch(`${PREFIX}`, query));
	}

	export function getClubById(id?: string | null): Promise<AxiosResponse<Club> | null> {
		if (!id) return Promise.resolve(null);
		return client.get(`${PREFIX}/get-by-id/${id}`);
	}

	export function getClubMetadata(
		slug?: string,
	): Promise<AxiosResponse<ClubMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/metadata/${slug}`);
	}
}
