import type { LoginCredentials, UserPatch } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from '../client';
import {
	AuthResponse,
	NationalIdSearchResult,
	Profile,
} from '../utils/common-types';

export class Auth {
	static login(data: LoginCredentials): Promise<AxiosResponse<AuthResponse>> {
		return client.post('/public/auth/login', data);
	}

	static getUserByNationalId(
		nationalId: string,
	): Promise<AxiosResponse<NationalIdSearchResult | null>> {
		return client.get(`/user/user-by-national-id?search=${nationalId}`);
	}

	static getUserByEmail(
		email: string,
	): Promise<AxiosResponse<{ email: string; id: string }>> {
		return client.get(
			addSkipTakeSearch('/user/user-by-email', { search: email }),
		);
	}

	static updateUser(data: UserPatch): Promise<AxiosResponse<Profile>> {
		return client.patch('/user/profile', data);
	}

	static getProfile(): Promise<AxiosResponse<Profile>> {
		return client.get('/user/profile');
	}

	static createUser(
		data: LoginCredentials,
	): Promise<AxiosResponse<AuthResponse>> {
		return client.post('/public/auth/register', data);
	}
}
