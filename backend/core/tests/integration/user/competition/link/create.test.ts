import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../../../integration-init';

describe('POST /user/competition/link/create', () => {
	it('should receive the create link request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'POST',
			url: '/user/competition/link/create',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			payload: {
				competitionId: 'test-id',
				url: 'https://example.com',
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
