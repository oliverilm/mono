import type { HttpTransport } from '../client/HttpTransport';
import type { ApiData } from '../client/types';

export abstract class BaseResource {
	constructor(protected readonly http: HttpTransport) {}

	protected doGet<T>(url: string): Promise<ApiData<T>> {
		return this.http.client.get<T>(url) as Promise<ApiData<T>>;
	}

	protected doPost<T>(url: string, body?: unknown): Promise<ApiData<T>> {
		return this.http.client.post<T>(url, body) as Promise<ApiData<T>>;
	}

	protected doPatch<T>(url: string, body?: unknown): Promise<ApiData<T>> {
		return this.http.client.patch<T>(url, body) as Promise<ApiData<T>>;
	}

	protected doPut<T>(url: string, body?: unknown): Promise<ApiData<T>> {
		return this.http.client.put<T>(url, body) as Promise<ApiData<T>>;
	}

	protected doDelete<T>(url: string): Promise<ApiData<T>> {
		return this.http.client.delete<T>(url) as Promise<ApiData<T>>;
	}
}
