/* eslint-disable @typescript-eslint/no-namespace */
import type { UserPatch } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from '../../client';
import type { NationalIdSearchResult, Profile } from '../../utils/common-types';

export interface UserSearchResult {
	email: string;
	id: string;
	userProfile: {
		firstName: string | null;
		lastName: string | null;
		club: {
			name: string;
		};
	};
}

export namespace UserAuth {
	export function getUserByNationalId(
		nationalId: string,
	): Promise<AxiosResponse<NationalIdSearchResult | null>> {
		return client.get(`/user/user-by-national-id?search=${nationalId}`);
	}

	export function getUserByEmail(
		email: string,
	): Promise<AxiosResponse<UserSearchResult>> {
		return client.get(
			addSkipTakeSearch('/user/user-by-email', {
				skip: 0,
				take: 10,
				search: email,
			}),
		);
	}

	export function updateUser(data: UserPatch): Promise<AxiosResponse<Profile>> {
		return client.patch('/user/profile', data);
	}

	export function getProfile(): Promise<AxiosResponse<Profile>> {
		return client.get('/user/profile');
	}
}
