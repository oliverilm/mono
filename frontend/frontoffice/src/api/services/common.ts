import type { AxiosResponse } from 'axios';
import { client } from '../client';
import type { Category } from '../utils/common-types';

export class CommonAPI {
	static getCategories(): Promise<AxiosResponse<Category[]>> {
		return client.get('/public/common/categories');
	}
}
