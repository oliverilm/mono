import type {
	InvitationCreate,
	InvitationDecide,
	InvitationQueryParam,
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from './client';
import type { Invitation } from './utils/common-types';

export const InvitationApi = {
	getMyInvitations: async (): Promise<AxiosResponse<Invitation[]>> => {
		return client.get('/user/invitation/to');
	},
	getCreatedInvitations: async (): Promise<AxiosResponse<unknown>> => {
		return client.get('/user/invitation/from');
	},
	createInvitation: async (
		data: InvitationCreate,
	): Promise<AxiosResponse<unknown>> => {
		return client.post('/user/invitation', data);
	},
	decideInvitation: async (
		data: InvitationQueryParam & InvitationDecide,
	): Promise<AxiosResponse<unknown>> => {
		return client.post(`/user/invitation/decide/${data.id}`, {
			isAccepted: data.isAccepted,
		});
	},
};
