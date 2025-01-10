import type { LoginCredentials, NationalId, UserPatch } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from './client';

export interface AuthResponse {
	profile: Profile;
	token: string;
}

export interface Profile {
	id: string;
	firstName: string | null;
	lastName: string | null;
	nationalId: string | null;
	nationalIdType: NationalId | null; // TODO
	dateOfBirth: string | null;
	sex: string;
	userId: string;
	clubId: string | null;
	belt: string | null;
	createdAt: string;
	updatedAt: string;
}

export async function login(
	data: LoginCredentials,
): Promise<AxiosResponse<AuthResponse>> {
	return client.post('/public/auth/login', data);
}

export async function createUser(
	data: LoginCredentials,
): Promise<AxiosResponse<AuthResponse>> {
	return client.post('/public/auth/register', data);
}

export async function getProfile(): Promise<AxiosResponse<Profile>> {
	return client.get('/user/profile');
}

export async function updateUser(
	data: UserPatch,
): Promise<AxiosResponse<Profile>> {
	return client.patch('/user/profile', data);
}

export async function getUserByEmail(
	email: string,
): Promise<AxiosResponse<{ email: string; id: string }>> {
	return client.get(
		addSkipTakeSearch('/user/user-by-email', { search: email }),
	);
}

export interface NationalIdSearchResult {
	userId: string | null;
	nationalId: string;
	firstName: string;
	lastName: string;
	club: NationalIdSearchClub;
	dateOfBirth: string;
	nationalIdType: string;
	sex: string;
	id: string;
}

export interface NationalIdSearchClub {
	name: string;
	id: string;
}

export async function getUserByNationalId(
	nationalId: string,
): Promise<AxiosResponse<NationalIdSearchResult | null>> {
	return client.get(`/user/user-by-national-id?search=${nationalId}`);
}
