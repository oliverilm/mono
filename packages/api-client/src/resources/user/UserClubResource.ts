import type { ApiData } from '../../client/types';
import type { ClubCreate, CreateMember } from '../../types';
import type { Competition, UserProfile } from '../../types/entities';
import type { CreateClubResponse } from '../../types/responses';
import { BaseResource } from '../BaseResource';

export class UserClubResource extends BaseResource {
	private readonly prefix = '/user/club';

	/** POST /user/club/create */
	create(input: ClubCreate): Promise<ApiData<CreateClubResponse>> {
		return this.doPost(`${this.prefix}/create`, input);
	}

	/** POST /user/club/members/:slug */
	createMember(
		slug: string,
		input: CreateMember,
	): Promise<ApiData<UserProfile>> {
		return this.doPost(`${this.prefix}/members/${slug}`, input);
	}

	/** GET /user/club/:slug/members */
	getMembers(slug: string): Promise<ApiData<UserProfile[]>> {
		return this.doGet(`${this.prefix}/${slug}/members`);
	}

	/** GET /user/club/:slug/competitions */
	getCompetitions(slug: string): Promise<ApiData<Competition[]>> {
		return this.doGet(`${this.prefix}/${slug}/competitions`);
	}
}
