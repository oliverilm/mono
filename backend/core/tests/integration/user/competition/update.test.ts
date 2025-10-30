import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../../integration-init';

describe('PUT /user/competition/update', () => {
	it('should receive the update competition request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'PATCH',
			url: '/user/competition',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			payload: {
				id: 'test-id',
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
