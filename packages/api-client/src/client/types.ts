import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { PrettifyDeep } from '../types/prettify';

export type ApiErrorBody = {
	error?: string;
	message?: string;
	statusCode?: number;
};

export type ApiError = AxiosError<ApiErrorBody>;

export type ApiResponse<T> = AxiosResponse<T>;

/** Response body type with aliases expanded for IntelliSense. */
export type ApiData<T> = ApiResponse<PrettifyDeep<T>>;

export type TokenStorage = {
	getToken: () => string | null;
	setToken: (token: string | null) => void;
};

export type ApiClientConfig = {
	baseURL: string;
	tokenStorage?: TokenStorage;
};

export type HttpClient = AxiosInstance;
