import { describe, expect, it } from 'vitest';
import { testServer } from '../../../integration-init';

describe('GET /public/competition/list', () => {
	it('should receive the list competitions request', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/competition',
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
