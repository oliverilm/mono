import { describe, expect, it, vi } from 'vitest';
import * as clubListRoute from '../../../../src/app/routes/public/club/list';
import { registerTestUserAndRetrieveToken, testServer } from '../../../integration-init';

describe('GET /public/club/list', () => {
	it.only('should call handler with correct query params when valid skip and take are provided', async () => {
		// Create a user with a club to have some data
		await registerTestUserAndRetrieveToken({ addons: { withClub: true } });

		// Spy on the handler function
		const mockHandler = vi.spyOn(clubListRoute, 'handler').mockResolvedValue([
			{ 
				id: '1', 
				name: 'Test Club', 
				country: 'EE', 
				slug: 'test-club', 
				description: 'Test Description', 
				createdAt: new Date(), 
				updatedAt: new Date() 
			}
		]);

		await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=0&take=10',
		});

		expect(mockHandler).toHaveBeenCalledWith({
			query: {
				skip: 0,
				take: 10,
			},
		});
		
	});

	it('should call handler with correct query params when skip and take are provided as strings', async () => {
		// Spy on the handler function
		const mockHandler = vi.spyOn(clubListRoute, 'handler').mockResolvedValue([]);

		await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=5&take=20',
		});

		expect(mockHandler).toHaveBeenCalledWith({
			query: {
				skip: 5,
				take: 20,
			},
		});
	});

	it('should call handler with undefined query params when no skip and take are provided', async () => {
		// Spy on the handler function
		const mockHandler = vi.spyOn(clubListRoute, 'handler').mockResolvedValue([]);

		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club/list',
		});

		expect(response.statusCode).toBe(200);
		expect(mockHandler).toHaveBeenCalledWith({
			query: {
				skip: undefined,
				take: undefined,
			},
		});
	});

	it('should return 400 error for invalid skip parameter', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club/list?skip=invalid&take=10',
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
			url: '/public/club/list?skip=0&take=invalid',
		});

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
			url: '/public/club/list?skip=invalid&take=invalid',
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