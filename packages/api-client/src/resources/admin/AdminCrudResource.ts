import type { QueryParams } from '../../client/query';
import { withQuery } from '../../client/query';
import type { ApiData } from '../../client/types';
import type {
	AdminCrudFormResponse,
	AdminCrudItemResponse,
	AdminCrudListResponse,
	AdminCrudModel,
	AdminCrudModelsResponse,
} from '../../types/responses';
import { BaseResource } from '../BaseResource';

export class AdminCrudResource extends BaseResource {
	constructor(
		http: ConstructorParameters<typeof BaseResource>[0],
		private readonly basePath: string,
	) {
		super(http);
	}

	/** GET /admin/crud/ */
	listModels(): Promise<ApiData<AdminCrudModelsResponse>> {
		return this.doGet(`${this.basePath}/`);
	}

	/** GET /admin/crud/:model/form */
	getForm(model: AdminCrudModel): Promise<ApiData<AdminCrudFormResponse>> {
		return this.doGet(`${this.basePath}/${model}/form`);
	}

	/** GET /admin/crud/:model */
	list(
		model: AdminCrudModel,
		query: QueryParams,
	): Promise<ApiData<AdminCrudListResponse>> {
		return this.doGet(withQuery(`${this.basePath}/${model}`, query));
	}

	/** GET /admin/crud/:model/:id */
	getById(
		model: AdminCrudModel,
		id: string,
	): Promise<ApiData<AdminCrudItemResponse>> {
		return this.doGet(`${this.basePath}/${model}/${id}`);
	}

	/** POST /admin/crud/:model */
	create(
		model: AdminCrudModel,
		input: Record<string, unknown>,
	): Promise<ApiData<AdminCrudItemResponse>> {
		return this.doPost(`${this.basePath}/${model}`, input);
	}

	/** PUT /admin/crud/:model/:id */
	replace(
		model: AdminCrudModel,
		id: string,
		input: Record<string, unknown>,
	): Promise<ApiData<AdminCrudItemResponse>> {
		return this.doPut(`${this.basePath}/${model}/${id}`, input);
	}

	/** PATCH /admin/crud/:model/:id */
	patch(
		model: AdminCrudModel,
		id: string,
		input: Record<string, unknown>,
	): Promise<ApiData<AdminCrudItemResponse>> {
		return this.doPatch(`${this.basePath}/${model}/${id}`, input);
	}

	/** DELETE /admin/crud/:model/:id */
	delete(
		model: AdminCrudModel,
		id: string,
	): Promise<ApiData<AdminCrudItemResponse>> {
		return this.doDelete(`${this.basePath}/${model}/${id}`);
	}
}
