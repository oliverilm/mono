import { describe, expect, it } from 'vitest';
import { testServer } from '../../../integration-init';

describe('GET /public/club/get-by-slug/:slug', () => {
	it('should receive the get club by slug request', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club/get-by-slug/test-slug',
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});