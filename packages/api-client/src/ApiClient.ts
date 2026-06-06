import { HttpTransport } from './client/HttpTransport';
import type { ApiClientConfig } from './client/types';
import { AdminApi } from './resources/admin/AdminApi';
import { PublicApi } from './resources/public/PublicApi';
import { UserApi } from './resources/user/UserApi';

export class ApiClient {
	readonly http: HttpTransport;
	readonly public: PublicApi;
	readonly user: UserApi;
	readonly admin: AdminApi;

	constructor(config: ApiClientConfig) {
		this.http = new HttpTransport(config);
		this.public = new PublicApi(this.http);
		this.user = new UserApi(this.http);
		this.admin = new AdminApi(this.http);
	}

	setTokenStorage(storage: Parameters<HttpTransport['setTokenStorage']>[0]): void {
		this.http.setTokenStorage(storage);
	}
}

export function createApiClient(config: ApiClientConfig): ApiClient {
	return new ApiClient(config);
}