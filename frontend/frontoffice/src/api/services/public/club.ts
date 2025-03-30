import type { Search, SkipTake } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client, addSkipTakeSearch } from '../../client';
import { Club, ClubMetadata } from '../../utils/common-types';

export class PublicClub {
	static getClub(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/club/get-by-slug/${slug}`);
	}

	static getPublicClubs(
		query: SkipTake & Search,
	): Promise<AxiosResponse<Club[]>> {
		return client.get(addSkipTakeSearch('/public/clubs', query));
	}

	static getClubById(id?: string | null): Promise<AxiosResponse<Club> | null> {
		if (!id) return Promise.resolve(null);
		return client.get(`/public/clubs/get-by-id/${id}`);
	}

	static getClubMetadata(
		slug?: string,
	): Promise<AxiosResponse<ClubMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/clubs/${slug}/metadata`);
	}
}
