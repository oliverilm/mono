import type { QueryParams } from '../../client/query';
import { withQuery } from '../../client/query';
import type { ApiData } from '../../client/types';
import type { UserIdObject } from '../../types';
import type {
	AdminCrudFormResponse,
	AdminImpersonateResponse,
	AdminUserCrudItemResponse,
	AdminUserCrudListResponse,
	AdminUserCrudModel,
	AdminUserListResponse,
} from '../../types/responses';
import { BaseResource } from '../BaseResource';

export class AdminUserCrudResource extends BaseResource {
	constructor(
		http: ConstructorParameters<typeof BaseResource>[0],
		private readonly basePath: string,
	) {
		super(http);
	}

	/** GET /admin/user/crud/:model/form */
	getForm(
		model: AdminUserCrudModel,
	): Promise<ApiData<AdminCrudFormResponse>> {
		return this.doGet(`${this.basePath}/crud/${model}/form`);
	}

	/** GET /admin/user/crud/:model */
	list(
		model: AdminUserCrudModel,
		query: QueryParams,
	): Promise<ApiData<AdminUserCrudListResponse>> {
		return this.doGet(withQuery(`${this.basePath}/crud/${model}`, query));
	}

	/** GET /admin/user/crud/:model/:id */
	getById(
		model: AdminUserCrudModel,
		id: string,
	): Promise<ApiData<AdminUserCrudItemResponse>> {
		return this.doGet(`${this.basePath}/crud/${model}/${id}`);
	}

	/** POST /admin/user/crud/:model */
	create(
		model: AdminUserCrudModel,
		input: Record<string, unknown>,
	): Promise<ApiData<AdminUserCrudItemResponse>> {
		return this.doPost(`${this.basePath}/crud/${model}`, input);
	}

	/** PUT /admin/user/crud/:model/:id */
	replace(
		model: AdminUserCrudModel,
		id: string,
		input: Record<string, unknown>,
	): Promise<ApiData<AdminUserCrudItemResponse>> {
		return this.doPut(`${this.basePath}/crud/${model}/${id}`, input);
	}

	/** PATCH /admin/user/crud/:model/:id */
	patch(
		model: AdminUserCrudModel,
		id: string,
		input: Record<string, unknown>,
	): Promise<ApiData<AdminUserCrudItemResponse>> {
		return this.doPatch(`${this.basePath}/crud/${model}/${id}`, input);
	}

	/** DELETE /admin/user/crud/:model/:id */
	delete(
		model: AdminUserCrudModel,
		id: string,
	): Promise<ApiData<AdminUserCrudItemResponse>> {
		return this.doDelete(`${this.basePath}/crud/${model}/${id}`);
	}
}

export class AdminUserResource extends BaseResource {
	private readonly prefix = '/admin/user';

	readonly crud: AdminUserCrudResource;

	constructor(http: ConstructorParameters<typeof BaseResource>[0]) {
		super(http);
		this.crud = new AdminUserCrudResource(http, this.prefix);
	}

	/** GET /admin/user/list */
	list(query: QueryParams): Promise<ApiData<AdminUserListResponse>> {
		return this.doGet(withQuery(`${this.prefix}/list`, query));
	}

	/** POST /admin/user/impersonate */
	impersonate(
		input: UserIdObject,
	): Promise<ApiData<AdminImpersonateResponse>> {
		return this.doPost(`${this.prefix}/impersonate`, input);
	}
}
