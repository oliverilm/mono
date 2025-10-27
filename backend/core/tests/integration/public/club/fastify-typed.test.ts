import { describe, expect, it, vi } from 'vitest';
import * as clubListRoute from '../../../../src/app/routes/public/club/list';
import { registerTestUserAndRetrieveToken, testServer } from '../../../integration-init';

describe('Fastify-Typed Integration Tests', () => {
	it('should validate that fastify-typed correctly validates and passes query parameters to handler', async () => {
		// Create a user with a club to have some data
		await registerTestUserAndRetrieveToken({ addons: { withClub: true } });

		// Spy on the handler function to verify it's called with correct parameters
		const mockHandler = vi.spyOn(clubListRoute, 'handler').mockResolvedValue([]);

		// Test with valid query parameters
		await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=0&take=10',
		});

		// Verify the handler was called with the correct validated parameters
		expect(mockHandler).toHaveBeenCalledWith({
			query: {
				skip: 0,
				take: 10,
			},
		});
	});

	it('should validate that fastify-typed correctly handles string-to-number conversion', async () => {
		// Spy on the handler function
		const mockHandler = vi.spyOn(clubListRoute, 'handler').mockResolvedValue([]);

		// Test with string parameters (should be converted to numbers by Zod)
		await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=5&take=20',
		});

		// Verify the handler was called with converted parameters
		expect(mockHandler).toHaveBeenCalledWith({
			query: {
				skip: 5,
				take: 20,
			},
		});
	});

	it('should validate that fastify-typed correctly handles undefined optional parameters', async () => {
		// Spy on the handler function
		const mockHandler = vi.spyOn(clubListRoute, 'handler').mockResolvedValue([]);

		// Test without query parameters
		await testServer.inject({
			method: 'GET',
			url: '/public/club/list',
		});

		// Verify the handler was called with undefined parameters
		expect(mockHandler).toHaveBeenCalledWith({
			query: {
				skip: undefined,
				take: undefined,
			},
		});
	});

	it('should validate that fastify-typed returns validation errors for invalid parameters', async () => {
		// Test with invalid skip parameter
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=invalid&take=10',
		});

		// Verify validation error response
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

	it('should validate that fastify-typed prevents handler execution on validation errors', async () => {
		// Spy on the handler function
		const mockHandler = vi.spyOn(clubListRoute, 'handler').mockResolvedValue([]);

		// Test with invalid parameters that should prevent handler execution
		await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=invalid&take=invalid',
		});

		// Verify the handler was NOT called due to validation errors
		expect(mockHandler).not.toHaveBeenCalled();
	});

	it('should validate that fastify-typed correctly types the request object', async () => {
		// Spy on the handler function
		const mockHandler = vi.spyOn(clubListRoute, 'handler').mockResolvedValue([]);

		// Test with valid parameters
		await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=0&take=10',
		});

		// Verify the handler was called with properly typed request object
		expect(mockHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				query: expect.objectContaining({
					skip: expect.any(Number),
					take: expect.any(Number),
				}),
			})
		);
	});

	it('should validate that fastify-typed works with the skipTakeSchema validation', async () => {
		// Test that the schema validation is working correctly
		const validParams = { skip: 0, take: 10 };
		const invalidParams = { skip: 'invalid', take: 10 };

		// Test valid parameters
		const validResponse = await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=0&take=10',
		});

		expect(validResponse.statusCode).toBe(200);

		// Test invalid parameters
		const invalidResponse = await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=invalid&take=10',
		});

		expect(invalidResponse.statusCode).toBe(400);
		expect(invalidResponse.json()).toHaveProperty('error', 'Validation Error');
	});

	it('should validate that fastify-typed correctly handles mixed valid/invalid parameters', async () => {
		// Test with one valid and one invalid parameter
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=0&take=invalid',
		});

		// Should return validation error
		expect(response.statusCode).toBe(400);
		expect(response.json()).toHaveProperty('error', 'Validation Error');
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
});




