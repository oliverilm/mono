import { ApiClient, createApiClient } from './ApiClient';
import type { ApiClientConfig, TokenStorage } from './client/types';

export { ApiClient, createApiClient };

export { HttpTransport, getErrorMessage } from './client/HttpTransport';
export { buildQueryString, withId, withQuery, withSlug } from './client/query';
export type { QueryParams } from './client/query';

export type {
	ApiClientConfig,
	ApiData,
	ApiError,
	ApiErrorBody,
	ApiResponse,
	HttpClient,
	TokenStorage,
} from './client/types';

export * from './types';

export { BaseResource } from './resources/BaseResource';
export * from './resources/public';
export * from './resources/user';
export * from './resources/admin';

/** Singleton instance — assign via {@link configureApiClient}. */
export let api: ApiClient;

let pendingTokenStorage: TokenStorage | null = null;

export function configureApiClient(config: ApiClientConfig): ApiClient {
	api = createApiClient({
		...config,
		tokenStorage: config.tokenStorage ?? pendingTokenStorage ?? undefined,
	});
	pendingTokenStorage = null;
	return api;
}

export function configureTokenStorage(storage: TokenStorage): void {
	if (api) {
		api.setTokenStorage(storage);
		return;
	}
	pendingTokenStorage = storage;
}

export function getApiClient(): ApiClient {
	if (!api) {
		throw new Error(
			'[@monorepo/api-client] Call configureApiClient({ baseURL }) before using the API.',
		);
	}
	return api;
}
