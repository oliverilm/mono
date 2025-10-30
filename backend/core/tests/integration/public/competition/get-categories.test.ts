import { describe, expect, it } from 'vitest';
import { testServer } from '../../../integration-init';

describe('GET /public/competition/get-categories', () => {
	it('should receive the get categories request', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/competition/get-categories/test-slug',
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
