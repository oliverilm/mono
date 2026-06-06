import type { ApiData } from '../../client/types';
import type { UserMetadataResponse } from '../../types/responses';
import { BaseResource } from '../BaseResource';

export class UserMetadataResource extends BaseResource {
	/** GET /user/metadata */
	get(): Promise<ApiData<UserMetadataResponse>> {
		return this.doGet('/user/metadata');
	}
}
