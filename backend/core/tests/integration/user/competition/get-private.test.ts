import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../../integration-init';

describe('GET /user/competition/get-private', () => {
	it('should receive the get private competition request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'GET',
			url: '/user/competition/get-private',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
