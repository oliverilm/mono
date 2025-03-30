import type { Search, SkipTake } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client, addSkipTakeSearch } from '../../client';
import {
	CompetitionListItem,
	CompetitionMetadata,
	CompetitionCategory,
	CompetitorResponse,
} from '../../utils/common-types';

export class PublicCompetition {
	// GET  /public/competition/
	static getPublicCompetitions(
		skipTake: SkipTake & Search,
	): Promise<AxiosResponse<CompetitionListItem[]>> {
		return client.get(addSkipTakeSearch('/public/competition', skipTake));
	}

	// GET  /public/competition/:slug
	static getCompetition(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competition/${slug}`);
	}

	// GET  /public/competition/metadata/:slug
	static getCompetitionMetadata(
		slug?: string,
	): Promise<AxiosResponse<CompetitionMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competition/metadata/${slug}`);
	}

	// GET  /public/competition/get-categories/:slug
	static getCompetitionCategories(
		slug?: string,
	): Promise<AxiosResponse<CompetitionCategory[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competition/get-categories/${slug}`);
	}

	// GET  /public/competition/get-competitors/:slug
	static getCompetitors(
		slug: string,
		skipTake: SkipTake,
	): Promise<AxiosResponse<CompetitorResponse> | null> {
		return client.get(
			addSkipTakeSearch(
				`/public/competition/get-competitors/${slug}`,
				skipTake,
			),
		);
	}
}
