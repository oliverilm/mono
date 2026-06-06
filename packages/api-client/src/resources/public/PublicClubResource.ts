import type { QueryParams } from '../../client/query';
import { withQuery } from '../../client/query';
import type { ApiData } from '../../client/types';
import type { Search } from '../../types';
import type { Club } from '../../types/entities';
import type { ClubMetadataResponse } from '../../types/responses';
import { BaseResource } from '../BaseResource';

export class PublicClubResource extends BaseResource {
	private readonly prefix = '/public/club';

	/** GET /public/club/ */
	list(query: QueryParams & Search): Promise<ApiData<Club[]>> {
		return this.doGet(withQuery(`${this.prefix}/`, query));
	}

	/** GET /public/club/get-by-id/:id */
	getById(id: string): Promise<ApiData<Club>> {
		return this.doGet(`${this.prefix}/get-by-id/${id}`);
	}

	/** GET /public/club/get-by-slug/:slug */
	getBySlug(slug: string): Promise<ApiData<Club>> {
		return this.doGet(`${this.prefix}/get-by-slug/${slug}`);
	}

	/** GET /public/club/metadata/:slug */
	getMetadata(slug: string): Promise<ApiData<ClubMetadataResponse>> {
		return this.doGet(`${this.prefix}/metadata/${slug}`);
	}
}
