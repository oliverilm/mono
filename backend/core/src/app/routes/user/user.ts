import { searchSchema, userPatchSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { UserService } from '../../services/user';
import { requestUserId } from '../../utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/profile', (request) => {
		return UserService.getUserProfile(requestUserId(request));
	});

	fastify.patch('/profile', (request) => {
		const payload = userPatchSchema.parse(request.body);
		return UserService.updateUserProfile({
			...payload,
			userId: requestUserId(request),
		});
	});

	fastify.get('/user-by-email', (request) => {
		const searchParam = searchSchema.parse(request.query);
		if (!searchParam.search) {
			return;
		}
		return UserService.searchByEmailExactMatch(searchParam.search);
	});

	fastify.get('/user-by-national-id', (request) => {
		const searchParam = searchSchema.parse(request.query);
		if (!searchParam.search) {
			throw new Error('No national id provided');
		}
		return UserService.searchByNationalIdExactMatch(
			searchParam.search,
			requestUserId(request),
		);
	});
}
