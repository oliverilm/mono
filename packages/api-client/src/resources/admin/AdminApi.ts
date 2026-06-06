import type { HttpTransport } from '../../client/HttpTransport';
import { AdminCrudResource } from './AdminCrudResource';
import { AdminUserResource } from './AdminUserResource';

export class AdminApi {
	readonly user: AdminUserResource;
	readonly crud: AdminCrudResource;

	constructor(http: HttpTransport) {
		this.user = new AdminUserResource(http);
		this.crud = new AdminCrudResource(http, '/admin/crud');
	}
}
