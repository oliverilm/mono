import type { AxiosError } from 'axios';

export type AppError = AxiosError<{
	error: string;
	message: string;
	statusCode: number;
}>;

export function getErrorMessage(error: unknown | AppError) {
	const appError = error as AppError;

	if (appError.response?.data.message) {
		return appError.response.data.message;
	}
}
