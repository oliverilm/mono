import type { QueryParams } from '../../client/query';
import { withQuery } from '../../client/query';
import type { ApiData } from '../../client/types';
import type { Search } from '../../types';
import type { Competition, CompetitionCategory } from '../../types/entities';
import type {
	CompetitionMetadataResponse,
	PublicCompetitorsResponse,
} from '../../types/responses';
import { BaseResource } from '../BaseResource';

export class PublicCompetitionResource extends BaseResource {
	private readonly prefix = '/public/competition';

	/** GET /public/competition/ */
	list(query: QueryParams & Search): Promise<ApiData<Competition[]>> {
		return this.doGet(withQuery(`${this.prefix}/`, query));
	}

	/** GET /public/competition/:slug */
	getBySlug(slug: string): Promise<ApiData<Competition>> {
		return this.doGet(`${this.prefix}/${slug}`);
	}

	/** GET /public/competition/get-categories/:slug */
	getCategories(slug: string): Promise<ApiData<CompetitionCategory[]>> {
		return this.doGet(`${this.prefix}/get-categories/${slug}`);
	}

	/** GET /public/competition/get-competitors/:slug */
	getCompetitors(
		slug: string,
		query: QueryParams,
	): Promise<ApiData<PublicCompetitorsResponse>> {
		return this.doGet(withQuery(`${this.prefix}/get-competitors/${slug}`, query));
	}

	/** GET /public/competition/metadata/:slug */
	getMetadata(slug: string): Promise<ApiData<CompetitionMetadataResponse>> {
		return this.doGet(`${this.prefix}/metadata/${slug}`);
	}
}
