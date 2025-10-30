import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../../../integration-init';

describe('GET /user/competition/competitor/get-personal', () => {
	it('should receive the get personal competitor request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'GET',
			url: '/user/competition/competitor/get-personal/test-slug',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
