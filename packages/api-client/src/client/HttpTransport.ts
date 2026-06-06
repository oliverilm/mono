import axios from 'axios';
import type { ApiClientConfig, HttpClient, TokenStorage } from './types';

const defaultTokenStorage: TokenStorage = {
	getToken: () => null,
	setToken: () => undefined,
};

export class HttpTransport {
	readonly client: HttpClient;
	private tokenStorage: TokenStorage;

	constructor(config: ApiClientConfig) {
		this.tokenStorage = config.tokenStorage ?? defaultTokenStorage;
		this.client = axios.create({ baseURL: config.baseURL });
		this.attachAuthInterceptor();
	}

	setTokenStorage(storage: TokenStorage): void {
		this.tokenStorage = storage;
	}

	getTokenStorage(): TokenStorage {
		return this.tokenStorage;
	}

	private attachAuthInterceptor(): void {
		this.client.interceptors.request.use((request) => {
			const token = this.tokenStorage.getToken();
			if (token) {
				request.headers.Authorization = `Bearer ${token}`;
			}
			return request;
		});
	}
}

export function getErrorMessage(error: unknown): string | undefined {
	const apiError = error as { response?: { data?: { message?: string } } };
	return apiError.response?.data?.message;
}
