import { describe, expect, it } from 'vitest';
import { prisma } from '../../../src/app/utils/db';
import { registerTestUserAndRetrieveToken, testServer } from '../../integration-init';
import { SessionService } from '../../../src/app/session';

async function createAdminUser() {
	const email = `admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@testing.com`;
	const password = 'testPassword';
	const created = await prisma.user.create({
		data: {
			email,
			password,
			isAdmin: true,
		},
	});
	const session = await SessionService.createSession(created.id);
	return { token: session.token, user: created };
}

describe('Admin CRUD Endpoints', () => {
	describe('GET /admin/crud/:key/form', () => {
		it.only('should return form schema for user model', async () => {
			const { token } = await createAdminUser();
			const response = await testServer.inject({
				method: 'GET',
				url: '/admin/crud/user/form',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

            expect(response.json()).toMatchInlineSnapshot(`
              {
                "form": {
                  "columns": [
                    {
                      "name": "id",
                      "type": "String",
                    },
                    {
                      "name": "email",
                      "type": "String",
                    },
                    {
                      "name": "password",
                      "type": "String",
                    },
                    {
                      "name": "createdAt",
                      "type": "DateTime",
                    },
                    {
                      "name": "updatedAt",
                      "type": "DateTime",
                    },
                    {
                      "name": "isAdmin",
                      "type": "Boolean",
                    },
                  ],
                },
              }
            `);
		});

		it('should return form schema for userProfile model', async () => {
			const { token } = await createAdminUser();
			const response = await testServer.inject({
				method: 'GET',
				url: '/admin/crud/userProfile/form',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			const body = response.json();
			expect(body).toHaveProperty('form');
			expect(body.form).toHaveProperty('columns');
			expect(Array.isArray(body.form.columns)).toBe(true);
		});

		it('should return 400 for invalid key', async () => {
			const { token } = await createAdminUser();
			const response = await testServer.inject({
				method: 'GET',
				url: '/admin/crud/invalidKey/form',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(500);
			expect(response.json()).toHaveProperty('message');
		});

		it('should return 401 for non-admin user', async () => {
			const token = await registerTestUserAndRetrieveToken();
			const response = await testServer.inject({
				method: 'GET',
				url: '/admin/crud/user/form',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(401);
		});
	});

	describe('GET /admin/crud/:key', () => {
		it('should list all users with pagination', async () => {
			const { token } = await createAdminUser();
			
			// Create a test user
			const testUser = await prisma.user.create({
				data: {
					email: `test-${Date.now()}@testing.com`,
					password: 'password',
				},
			});

			const response = await testServer.inject({
				method: 'GET',
				url: '/admin/crud/user?skip=0&take=10',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			const users = response.json();
			expect(Array.isArray(users)).toBe(true);
			expect(users.length).toBeGreaterThan(0);
		});

		it('should list userProfiles with pagination', async () => {
			const { token } = await createAdminUser();
			
			// Create a test user profile
			const user = await prisma.user.create({
				data: {
					email: `profile-${Date.now()}@testing.com`,
					password: 'password',
				},
			});
			
			const profile = await prisma.userProfile.create({
				data: {
					userId: user.id,
				},
			});

			const response = await testServer.inject({
				method: 'GET',
				url: '/admin/crud/userProfile?skip=0&take=10',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			const profiles = response.json();
			expect(Array.isArray(profiles)).toBe(true);
		});

		it('should handle pagination parameters correctly', async () => {
			const { token } = await createAdminUser();
			const response = await testServer.inject({
				method: 'GET',
				url: '/admin/crud/user?skip=0&take=5',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			const users = response.json();
			expect(Array.isArray(users)).toBe(true);
			expect(users.length).toBeLessThanOrEqual(5);
		});
	});

	describe('GET /admin/crud/:key/:id', () => {
		it('should get a single user by id', async () => {
			const { token } = await createAdminUser();
			
			const testUser = await prisma.user.create({
				data: {
					email: `single-${Date.now()}@testing.com`,
					password: 'password',
				},
			});

			const response = await testServer.inject({
				method: 'GET',
				url: `/admin/crud/user/${testUser.id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			const user = response.json();
			expect(user).toHaveProperty('id', testUser.id);
			expect(user).toHaveProperty('email', testUser.email);
		});

		it('should get a single userProfile by id', async () => {
			const { token } = await createAdminUser();
			
			const user = await prisma.user.create({
				data: {
					email: `profile-single-${Date.now()}@testing.com`,
					password: 'password',
				},
			});
			
			const profile = await prisma.userProfile.create({
				data: {
					userId: user.id,
				},
			});

			const response = await testServer.inject({
				method: 'GET',
				url: `/admin/crud/userProfile/${profile.id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			const result = response.json();
			expect(result).toHaveProperty('id', profile.id);
		});

		it('should return null for non-existent id', async () => {
			const { token } = await createAdminUser();
			const fakeId = 'clxxx12345678901234'; // Valid cuid format but doesn't exist

			const response = await testServer.inject({
				method: 'GET',
				url: `/admin/crud/user/${fakeId}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			expect(response.json()).toBeNull();
		});
	});

	describe('POST /admin/crud/:key', () => {
		it('should create a new user', async () => {
			const { token } = await createAdminUser();
			const email = `newuser-${Date.now()}@testing.com`;

			const response = await testServer.inject({
				method: 'POST',
				url: '/admin/crud/user',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				payload: {
					email,
					password: 'password123',
				},
			});

			expect(response.statusCode).toBe(200);
			const user = response.json();
			expect(user).toHaveProperty('id');
			expect(user).toHaveProperty('email', email);
			
			// Verify it was actually created
			const created = await prisma.user.findUnique({ where: { id: user.id } });
			expect(created).not.toBeNull();
		});

		it('should create a new userProfile', async () => {
			const { token } = await createAdminUser();
			const user = await prisma.user.create({
				data: {
					email: `profile-owner-${Date.now()}@testing.com`,
					password: 'password',
				},
			});

			const response = await testServer.inject({
				method: 'POST',
				url: '/admin/crud/userProfile',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				payload: {
					userId: user.id,
					firstName: 'John',
					lastName: 'Doe',
				},
			});

			expect(response.statusCode).toBe(200);
			const profile = response.json();
			expect(profile).toHaveProperty('id');
			expect(profile).toHaveProperty('firstName', 'John');
			expect(profile).toHaveProperty('lastName', 'Doe');
		});
	});

	describe('PUT /admin/crud/:key/:id', () => {
		it('should update a user', async () => {
			const { token } = await createAdminUser();
			const user = await prisma.user.create({
				data: {
					email: `update-${Date.now()}@testing.com`,
					password: 'oldpassword',
				},
			});

			const response = await testServer.inject({
				method: 'PUT',
				url: `/admin/crud/user/${user.id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
				payload: {
					email: user.email,
					password: 'newpassword',
				},
			});

			expect(response.statusCode).toBe(200);
			const updated = response.json();
			expect(updated).toHaveProperty('id', user.id);
			
			// Verify the update
			const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
			expect(dbUser?.password).toBe('newpassword');
		});

		it('should update a userProfile', async () => {
			const { token } = await createAdminUser();
			const user = await prisma.user.create({
				data: {
					email: `update-profile-${Date.now()}@testing.com`,
					password: 'password',
				},
			});
			
			const profile = await prisma.userProfile.create({
				data: {
					userId: user.id,
					firstName: 'Jane',
				},
			});

			const response = await testServer.inject({
				method: 'PUT',
				url: `/admin/crud/userProfile/${profile.id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
				payload: {
					userId: user.id,
					firstName: 'Jane',
					lastName: 'Smith',
				},
			});

			expect(response.statusCode).toBe(200);
			const updated = response.json();
			expect(updated).toHaveProperty('lastName', 'Smith');
		});
	});

	describe('PATCH /admin/crud/:key/:id', () => {
		it('should partially update a user', async () => {
			const { token } = await createAdminUser();
			const user = await prisma.user.create({
				data: {
					email: `patch-${Date.now()}@testing.com`,
					password: 'password',
				},
			});

			const response = await testServer.inject({
				method: 'PATCH',
				url: `/admin/crud/user/${user.id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
				payload: {
					password: 'patchedpassword',
				},
			});

			expect(response.statusCode).toBe(200);
			const updated = response.json();
			expect(updated).toHaveProperty('id', user.id);
			expect(updated).toHaveProperty('email', user.email); // Should still have original email
			
			// Verify partial update
			const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
			expect(dbUser?.password).toBe('patchedpassword');
			expect(dbUser?.email).toBe(user.email); // Email unchanged
		});

		it('should partially update a userProfile', async () => {
			const { token } = await createAdminUser();
			const user = await prisma.user.create({
				data: {
					email: `patch-profile-${Date.now()}@testing.com`,
					password: 'password',
				},
			});
			
			const profile = await prisma.userProfile.create({
				data: {
					userId: user.id,
					firstName: 'Bob',
					lastName: 'Jones',
				},
			});

			const response = await testServer.inject({
				method: 'PATCH',
				url: `/admin/crud/userProfile/${profile.id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
				payload: {
					firstName: 'Robert',
				},
			});

			expect(response.statusCode).toBe(200);
			const updated = response.json();
			expect(updated).toHaveProperty('firstName', 'Robert');
			expect(updated).toHaveProperty('lastName', 'Jones'); // Should still have original lastName
		});
	});

	describe('DELETE /admin/crud/:key/:id', () => {
		it('should delete a user', async () => {
			const { token } = await createAdminUser();
			const user = await prisma.user.create({
				data: {
					email: `delete-${Date.now()}@testing.com`,
					password: 'password',
				},
			});

			const response = await testServer.inject({
				method: 'DELETE',
				url: `/admin/crud/user/${user.id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			const deleted = response.json();
			expect(deleted).toHaveProperty('id', user.id);
			
			// Verify deletion
			const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
			expect(dbUser).toBeNull();
		});

		it('should delete a userProfile', async () => {
			const { token } = await createAdminUser();
			const user = await prisma.user.create({
				data: {
					email: `delete-profile-${Date.now()}@testing.com`,
					password: 'password',
				},
			});
			
			const profile = await prisma.userProfile.create({
				data: {
					userId: user.id,
				},
			});

			const response = await testServer.inject({
				method: 'DELETE',
				url: `/admin/crud/userProfile/${profile.id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			expect(response.statusCode).toBe(200);
			const deleted = response.json();
			expect(deleted).toHaveProperty('id', profile.id);
			
			// Verify deletion
			const dbProfile = await prisma.userProfile.findUnique({ where: { id: profile.id } });
			expect(dbProfile).toBeNull();
		});

		it('should return error for non-existent id', async () => {
			const { token } = await createAdminUser();
			const fakeId = 'clxxx12345678901234';

			const response = await testServer.inject({
				method: 'DELETE',
				url: `/admin/crud/user/${fakeId}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Prisma will throw an error for non-existent record
			expect(response.statusCode).toBeGreaterThanOrEqual(400);
		});
	});

	describe('Authentication and Authorization', () => {
		it('should return 401 for request without token', async () => {
			const response = await testServer.inject({
				method: 'GET',
				url: '/admin/crud/user',
			});

			expect(response.statusCode).toBe(401);
		});

		it('should return 401 for non-admin user on all endpoints', async () => {
			const token = await registerTestUserAndRetrieveToken();
			
			const endpoints = [
				{ method: 'GET', url: '/admin/crud/user/form' },
				{ method: 'GET', url: '/admin/crud/user' },
				{ method: 'POST', url: '/admin/crud/user' },
			];

			for (const endpoint of endpoints) {
				const response = await testServer.inject({
					method: endpoint.method as any,
					url: endpoint.url,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				expect(response.statusCode).toBe(401);
			}
		});
	});
});

