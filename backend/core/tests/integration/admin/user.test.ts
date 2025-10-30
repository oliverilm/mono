import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../integration-init';

describe('GET /admin/user', () => {
	it('should receive the admin user list request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'GET',
			url: '/admin/user/list',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
