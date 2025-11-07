import type { SkipTake } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';

export namespace Admin {
	/**
	 * Get all available models for CRUD operations
	 * @returns Promise resolving to an object containing an array of model names
	 * @route GET /admin/crud
	 */
	export function getModels(): Promise<AxiosResponse<{ models: string[] }>> {
		return client.get<{ models: string[] }>('/admin/crud');
	}

	/**
	 * Get form schema for a specific model
	 * @param model - Model name
	 * @returns Promise resolving to form schema with column definitions
	 * @route GET /admin/crud/:model/form
	 */
	export function getModelForm(
		model: string,
	): Promise<
		AxiosResponse<{ form: { columns: { name: string; type: string }[] } }>
	> {
		return client.get(`/admin/crud/${model}/form`);
	}

	/**
	 * Get list of items for a specific model with pagination
	 * @param model - Model name
	 * @param skipTake - Pagination parameters (skip and take)
	 * @returns Promise resolving to an array of model items
	 * @route GET /admin/crud/:model
	 */
	export function getModelList(
		model: string,
		skipTake: SkipTake,
	): Promise<AxiosResponse<unknown[]>> {
		return client.get(`/admin/crud/${model}`, { params: { skipTake } });
	}

	/**
	 * Get a single model item by ID
	 * @param model - Model name
	 * @param id - Item identifier (can be CUID, slug, or numeric ID)
	 * @returns Promise resolving to the model item
	 * @route GET /admin/crud/:model/:id
	 */
	export function getModelItem(
		model: string,
		id: string,
	): Promise<AxiosResponse<unknown>> {
		return client.get(`/admin/crud/${model}/${id}`);
	}

	/**
	 * Create a new model item
	 * @param model - Model name
	 * @param data - Item creation data
	 * @returns Promise resolving to the created item
	 * @route POST /admin/crud/:model
	 */
	export function createModelItem(
		model: string,
		data: unknown,
	): Promise<AxiosResponse<unknown>> {
		return client.post(`/admin/crud/${model}`, data);
	}

	/**
	 * Update a model item by ID
	 * @param model - Model name
	 * @param id - Item identifier (can be CUID, slug, or numeric ID)
	 * @param data - Item update data
	 * @returns Promise resolving to the updated item
	 * @route PATCH /admin/crud/:model/:id
	 */
	export function updateModelItem(
		model: string,
		id: string,
		data: unknown,
	): Promise<AxiosResponse<unknown>> {
		return client.patch(`/admin/crud/${model}/${id}`, data);
	}

	/**
	 * Delete a model item by ID
	 * @param model - Model name
	 * @param id - Item identifier (can be CUID, slug, or numeric ID)
	 * @returns Promise resolving to the deletion result
	 * @route DELETE /admin/crud/:model/:id
	 */
	export function deleteModelItem(
		model: string,
		id: string,
	): Promise<AxiosResponse<unknown>> {
		return client.delete(`/admin/crud/${model}/${id}`);
	}

	/**
	 * Patch (partial update) a model item by ID
	 * @param model - Model name
	 * @param id - Item identifier (can be CUID, slug, or numeric ID)
	 * @param data - Item patch data
	 * @returns Promise resolving to the patched item
	 * @route PATCH /admin/crud/:model/:id
	 */
	export function patchModelItem(
		model: string,
		id: string,
		data: unknown,
	): Promise<AxiosResponse<unknown>> {
		return client.patch(`/admin/crud/${model}/${id}`, data);
	}
}
