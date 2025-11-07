/* eslint-disable @typescript-eslint/no-namespace */
import type { LoginCredentials } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import type { AuthResponse } from '../../utils/common-types';

export namespace PublicAuth {
	const PREFIX = "/public/auth"
	
	/**
	 * Login with credentials
	 * @param data - Login credentials (email and password)
	 * @returns Promise resolving to authentication response
	 * @route POST /public/auth/login
	 */
	export function login(data: LoginCredentials): Promise<AxiosResponse<AuthResponse>> {
		return client.post(`${PREFIX}/login`, data);
	}

	/**
	 * Register a new user
	 * @param data - User registration credentials (email and password)
	 * @returns Promise resolving to authentication response
	 * @route POST /public/auth/register
	 */
	export function createUser(
		data: LoginCredentials,
	): Promise<AxiosResponse<AuthResponse>> {
		return client.post(`${PREFIX}/register`, data);
	}
}
