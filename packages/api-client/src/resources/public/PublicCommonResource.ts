import type { ApiData } from '../../client/types';
import type { Category } from '../../types/entities';
import { BaseResource } from '../BaseResource';

export class PublicCommonResource extends BaseResource {
	private readonly prefix = '/public/common';

	/** GET /public/common/categories */
	getCategories(): Promise<ApiData<Category[]>> {
		return this.doGet(`${this.prefix}/categories`);
	}
}
