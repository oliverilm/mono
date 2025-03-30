import type { LoginCredentials } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import { AuthResponse } from '../../utils/common-types';

export class PublicAuth {
	static login(data: LoginCredentials): Promise<AxiosResponse<AuthResponse>> {
		return client.post('/public/auth/login', data);
	}

	static createUser(
		data: LoginCredentials,
	): Promise<AxiosResponse<AuthResponse>> {
		return client.post('/public/auth/register', data);
	}
}
