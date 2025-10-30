import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../../../integration-init';

describe('GET /user/competition/category/list/:slug', () => {
	it('should receive the list categories request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'GET',
			url: '/user/competition/category/list/test-slug',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
