/* eslint-disable @typescript-eslint/no-namespace */
import type { LoginCredentials } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import type { AuthResponse } from '../../utils/common-types';

export namespace PublicAuth {
	const PREFIX = "/public/auth"
	
	export function login(data: LoginCredentials): Promise<AxiosResponse<AuthResponse>> {
		return client.post(`${PREFIX}/login`, data);
	}

	export function createUser(
		data: LoginCredentials,
	): Promise<AxiosResponse<AuthResponse>> {
		return client.post(`${PREFIX}/register`, data);
	}
}
