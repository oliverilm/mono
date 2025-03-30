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
	static getPublicCompetitions(
		skipTake: SkipTake & Search,
	): Promise<AxiosResponse<CompetitionListItem[]>> {
		return client.get(addSkipTakeSearch('/public/competition', skipTake));
	}

	static getCompetition(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competition/${slug}`);
	}
	static getCompetitionMetadata(
		slug?: string,
	): Promise<AxiosResponse<CompetitionMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competition/metadata/${slug}`);
	}
	static getCompetitionCategories(
		slug?: string,
	): Promise<AxiosResponse<CompetitionCategory[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/competition/get-categories/${slug}`);
	}

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
