import type { UserPatch } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client, addSkipTakeSearch } from '../../client';
import { NationalIdSearchResult, Profile } from '../../utils/common-types';
export interface UserSearchResult { email: string; id: string, userProfile: {
	firstName: string | null;
	lastName: string | null;
	club: {
		name: string
	}
} }
export class UserAuth {
	static getUserByNationalId(
		nationalId: string,
	): Promise<AxiosResponse<NationalIdSearchResult | null>> {
		return client.get(`/user/user-by-national-id?search=${nationalId}`);
	}

	static getUserByEmail(
		email: string,
	): Promise<AxiosResponse<UserSearchResult>> {
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
}
