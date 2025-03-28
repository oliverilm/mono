import type {
	InvitationCreate,
	InvitationDecide,
	InvitationQueryParam,
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../client';
import type { Invitation } from '../utils/common-types';

export class InvitationApi {
	static getMyInvitations(): Promise<AxiosResponse<Invitation[]>> {
		return client.get('/user/invitation/to');
	}

	static getCreatedInvitations(): Promise<AxiosResponse<unknown>> {
		return client.get('/user/invitation/from');
	}

	static createInvitation(
		data: InvitationCreate,
	): Promise<AxiosResponse<unknown>> {
		return client.post('/user/invitation', data);
	}

	static decideInvitation(
		data: InvitationQueryParam & InvitationDecide,
	): Promise<AxiosResponse<unknown>> {
		return client.post(`/user/invitation/decide/${data.id}`, {
			isAccepted: data.isAccepted,
		});
	}
}
