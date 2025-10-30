import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../integration-init';

describe('POST /user/invitation', () => {
	it('should receive the invitation request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'POST',
			url: '/user/invitation',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			payload: {
				profileId: 'test-profile-id',
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
