import { describe, expect, it } from 'vitest';
import { testServer } from '../../../integration-init';

describe('POST /public/auth/register', () => {
	it('should receive the register request', async () => {
		const response = await testServer.inject({
			method: 'POST',
			url: '/public/auth/register',
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