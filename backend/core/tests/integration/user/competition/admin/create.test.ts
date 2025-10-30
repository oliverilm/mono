import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../../../integration-init';

describe('POST /user/competition/admin/create', () => {
	it('should receive the create admin request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'POST',
			url: '/user/competition/admin',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			payload: {
				competitionId: 'test-id',
				userId: 'test-user-id',
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
