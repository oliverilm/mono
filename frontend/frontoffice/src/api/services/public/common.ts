/* eslint-disable @typescript-eslint/no-namespace */
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import type { Category } from '../../utils/common-types';

export namespace PublicCommon {
	const PREFIX = "/public/common"
	
	/**
	 * Get all competition categories
	 * @returns Promise resolving to an array of categories
	 * @route GET /public/common/categories
	 */
	export function getCategories(): Promise<AxiosResponse<Category[]>> {
		return client.get(`${PREFIX}/categories`);
	}
}
