import { describe, expect, it } from 'vitest';
import { registerTestUserAndRetrieveToken, testServer } from '../../../integration-init';

describe('GET /public/club/list', () => {
	it('should return clubs with valid query params', async () => {
		// Create a user with a club to have some data
		await registerTestUserAndRetrieveToken({ addons: { withClub: true } });

		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club?skip=0&take=10',
		})

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.json())).toBe(true);
	});

	it('should handle query params correctly when provided as numbers', async () => {
		// Create a user with a club
		await registerTestUserAndRetrieveToken({ addons: { withClub: true } });

		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club?skip=0&take=10',
		});

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.json())).toBe(true);
	});

	it('should return default values when no query params are provided', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club',
		});

		expect(response.statusCode).toBe(200);
		expect(response.json()).toEqual([]);
	});

	it('should return 400 error for invalid skip parameter', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club?skip=invalid&take=10',
		});

		expect(response.statusCode).toBe(400);
		expect(response.json()).toHaveProperty('error', 'Validation Error');
		expect(response.json()).toHaveProperty('message', 'Invalid request data');
		expect(response.json().details).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					field: 'skip',
					message: expect.any(String),
					code: expect.any(String),
				}),
			])
		);
	});

	it('should return 400 error for invalid take parameter', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club?skip=0&take=invalid',
		})

		expect(response.statusCode).toBe(400);
		expect(response.json()).toHaveProperty('error', 'Validation Error');
		expect(response.json()).toHaveProperty('message', 'Invalid request data');
		expect(response.json().details).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					field: 'take',
					message: expect.any(String),
					code: expect.any(String),
				}),
			])
		);
	});

	it('should return 400 error for both invalid skip and take parameters', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club?skip=invalid&take=invalid',
		});

		expect(response.statusCode).toBe(400);
		expect(response.json()).toHaveProperty('error', 'Validation Error');
		expect(response.json()).toHaveProperty('message', 'Invalid request data');
		expect(response.json().details).toHaveLength(2);
		expect(response.json().details).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					field: 'skip',
					message: expect.any(String),
					code: expect.any(String),
				}),
				expect.objectContaining({
					field: 'take',
					message: expect.any(String),
					code: expect.any(String),
				}),
			])
		);
	});
});