import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../../../integration-init';

describe('DELETE /user/competition/competitor/delete', () => {
	it('should receive the delete competitor request', async () => {
		const token = await registerTestUserAndRetrieveToken();
		const response = await testServer.inject({
			method: 'POST',
			url: '/user/competition/competitor/delete',
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
