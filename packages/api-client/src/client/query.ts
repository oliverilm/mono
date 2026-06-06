import type { Search, SkipTake } from '@monorepo/utils';

export type QueryParams = Partial<NonNullable<SkipTake>> & Partial<Search>;

export function buildQueryString(query: QueryParams): string {
	const params = new URLSearchParams();

	if (query.skip !== undefined) params.set('skip', String(query.skip));
	if (query.take !== undefined) params.set('take', String(query.take));
	if (query.search !== undefined) params.set('search', query.search);

	const serialized = params.toString();
	return serialized ? `?${serialized}` : '';
}

export function withQuery(path: string, query: QueryParams): string {
	return `${path}${buildQueryString(query)}`;
}

export function withSlug(path: string, slug: string): string {
	return path.replace(':slug', slug);
}

export function withId(path: string, id: string): string {
	return path.replace(':id', id);
}
