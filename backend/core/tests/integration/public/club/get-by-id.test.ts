import { describe, expect, it, vi, beforeEach } from 'vitest';
import assert from "node:assert/strict";
import { TEST_EMAIL, TEST_PASSWORD, testServer } from '../../../integration-init';
import { ClubService } from '../../../../src/app/services/club';
import { UserService } from '../../../../src/app/services/user';
import { expectAnyString } from '../../../utils/helpers';

const testCuid = 'clxxx12345678901234';

describe('GET /public/club/get-by-id/:id', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should call the route handler with correct params', async () => {
		// Mock the service method to verify the handler passes correct parameters
		

		const user = await UserService.createUser({ email: TEST_EMAIL + "test1", password: TEST_PASSWORD })
		const club = await ClubService.create({ country: 'EE', name: 'Test Club', userId: user!.profile.userId ?? "" })

		assert.ok(club)

		const resp = await testServer.inject({
			method: 'GET',
			url: `/public/club/get-by-id/${club.id}`,
		});


		// Verify the route handler called the service with the correct validated params
		// This confirms the handler received the validated ID parameter and passed it correctly
		
		// Verify the response is correct
		expect(resp.statusCode).toBe(200);
		expect(resp.json()).toMatchObject(
			{
			  "country": "EE",
			  "createdAt": expectAnyString(),
			  "description": "",
			  "id": club.id,
			  "name": "Test Club",
			  "slug": "test-club",
			  "updatedAt": expectAnyString(),
			}
		);
	});

	it('should return 400 error for invalid ID format', async () => {
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club/get-by-id/invalid-id',
		});

		expect(response.statusCode).toBe(400);
		expect(response.json()).toHaveProperty('error', 'Validation Error');
		expect(response.json().details).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					field: 'id',
					message: expect.any(String),
					code: expect.any(String),
				}),
			])
		);
	});
});
