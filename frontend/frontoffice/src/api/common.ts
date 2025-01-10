import type { AxiosResponse } from 'axios';
import { client } from './client';
import type { Category } from './utils/common-types';

export const CampsAPI = {
	createCamp: () => {},
	updateCamp: () => {},
	getCamp: () => {},
};

export const CommonAPI = {
	getCategories: (): Promise<AxiosResponse<Category[]>> =>
		client.get('/public/common/categories'),
};
