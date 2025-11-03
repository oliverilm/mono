import type { SkipTake } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';

export namespace Admin {
	export function getModels(): Promise<AxiosResponse<{ models: string[] }>> {
		return client.get<{ models: string[] }>('/admin/crud');
	}

	export function getModelForm(
		model: string,
	): Promise<
		AxiosResponse<{ form: { columns: { name: string; type: string }[] } }>
	> {
		return client.get(`/admin/crud/${model}/form`);
	}

	export function getModelList(
		model: string,
		skipTake: SkipTake,
	): Promise<AxiosResponse<unknown[]>> {
		return client.get(`/admin/crud/${model}`, { params: { skipTake } });
	}

	export function getModelItem(
		model: string,
		id: string,
	): Promise<AxiosResponse<unknown>> {
		return client.get(`/admin/crud/${model}/${id}`);
	}

	export function createModelItem(
		model: string,
		data: unknown,
	): Promise<AxiosResponse<unknown>> {
		return client.post(`/admin/crud/${model}`, data);
	}

	export function updateModelItem(
		model: string,
		id: string,
		data: unknown,
	): Promise<AxiosResponse<unknown>> {
		return client.patch(`/admin/crud/${model}/${id}`, data);
	}

	export function deleteModelItem(
		model: string,
		id: string,
	): Promise<AxiosResponse<unknown>> {
		return client.delete(`/admin/crud/${model}/${id}`);
	}

	export function patchModelItem(
		model: string,
		id: string,
		data: unknown,
	): Promise<AxiosResponse<unknown>> {
		return client.patch(`/admin/crud/${model}/${id}`, data);
	}
}
