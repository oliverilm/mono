import { searchSchema, userPatchSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { UserService } from '../../services/user';
import { getAssertedUserIdFromRequest } from '../../utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/profile', (request) => {
		return UserService.getUserProfile(getAssertedUserIdFromRequest(request));
	});

	fastify.patch('/profile', (request) => {
		const payload = userPatchSchema.parse(request.body);
		return UserService.updateUserProfile({
			...payload,
			userId: getAssertedUserIdFromRequest(request),
		});
	});

	fastify.get('/user-by-email', (request) => {
		const searchParam = searchSchema.parse(request.query);
		if (!searchParam.search) {
			return;
		}
		return UserService.searchByEmailExactMatch(searchParam.search);
	});
}
