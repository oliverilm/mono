import { describe, expect, it } from 'vitest';
import { testServer } from '../../../integration-init';

describe('POST /public/auth/login', () => {
	it('should receive the login request', async () => {
		const response = await testServer.inject({
			method: 'POST',
			url: '/public/auth/login',
			payload: {
				email: 'test@example.com',
				password: 'testpassword',
			},
		});

		// Validate that the server received the request (not a 500 or 404)
		expect(response.statusCode).not.toBe(404);
		expect(response.statusCode).not.toBe(500);
	});
});
