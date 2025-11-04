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
	// GET  /public/competition/
	export function getPublicCompetitions(
		skipTake: SkipTake & Search,
	): Promise<AxiosResponse<CompetitionListItem[]>> {
		return client.get(addSkipTakeSearch(PREFIX, skipTake));
	}

	// GET  /public/competition/:slug
	export function getCompetition(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/${slug}`);
	}

	// GET  /public/competition/metadata/:slug
	export function getCompetitionMetadata(
		slug?: string,
	): Promise<AxiosResponse<CompetitionMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/metadata/${slug}`);
	}

	// GET  /public/competition/get-categories/:slug
	export function getCompetitionCategories(
		slug?: string,
	): Promise<AxiosResponse<CompetitionCategory[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`${PREFIX}/get-categories/${slug}`);
	}

	// GET  /public/competition/get-competitors/:slug
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
