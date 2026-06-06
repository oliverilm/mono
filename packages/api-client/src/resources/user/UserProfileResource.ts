import { withQuery } from '../../client/query';
import type { ApiData } from '../../client/types';
import type { Search, UserPatch } from '../../types';
import type { UserProfile } from '../../types/entities';
import type {
	UserSearchByEmailResponse,
	UserSearchByNationalIdResponse,
} from '../../types/responses';
import { BaseResource } from '../BaseResource';

export class UserProfileResource extends BaseResource {
	/** GET /user/profile */
	get(): Promise<ApiData<UserProfile | null>> {
		return this.doGet('/user/profile');
	}

	/** PATCH /user/profile */
	update(input: UserPatch): Promise<ApiData<UserProfile | null>> {
		return this.doPatch('/user/profile', input);
	}

	/** GET /user/user-by-email */
	getByEmail(
		query: Search,
	): Promise<ApiData<UserSearchByEmailResponse | undefined>> {
		return this.doGet(withQuery('/user/user-by-email', query));
	}

	/** GET /user/user-by-national-id */
	getByNationalId(
		query: Search,
	): Promise<ApiData<UserSearchByNationalIdResponse | null>> {
		return this.doGet(withQuery('/user/user-by-national-id', query));
	}
}
