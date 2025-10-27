import type { Search, SkipTake } from '@monorepo/utils';
import axios from 'axios';
import { LS_TOKEN_KEY } from '../constants';


export const client = axios.create({
	baseURL: 'http://localhost:3000',
});

client.interceptors.request.use((config) => {
	const token = localStorage.getItem(LS_TOKEN_KEY);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

client.interceptors.response.use(
	(data) => data,
	(error) => {
		// TODO: handle error
		console.log(error);

		throw error;
	},
);

export function addSkipTakeSearch(url: string, query: SkipTake & Search) {
	const { skip, take, search } = query;
	const parts = [];
	if (skip !== undefined) parts.push(`skip=${skip}`);
	if (take !== undefined) parts.push(`take=${take}`);
	if (search !== undefined) parts.push(`search=${search}`);
	if (parts.length > 0) {
		return url.concat(`?${parts.join('&')}`);
	}
	return url;
}
