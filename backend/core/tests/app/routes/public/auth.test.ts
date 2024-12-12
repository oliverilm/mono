import { registerTestUserAndRetrieveToken, TEST_EMAIL, TEST_PASSWORD, testServer } from '../../../integration-init';
import { describe, test, expect } from "vitest"

describe('Public auth related endpoints', () => {
  test('should respond with error if user is not registered', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/public/auth/login',
      payload: {
        email: 'randome@neveruse.ee',
        password: 'some random password',
      },
    });

    expect(response.json()).toStrictEqual({
      error: 'Internal Server Error',
      message: 'Invalid credentials',
      statusCode: 500,
    });
  });

  test('Should create a new user', async () => {
    const email = `${new Date().getTime()}@email.com`;
    const response = await testServer.inject({
      url: '/public/auth/register',
      method: 'POST',
      payload: {
        email,
        password: 'testPassword',
      },
    });

    expect(response.json()).toStrictEqual({
      profile: {
        belt: null,
        clubId: null,
        createdAt: expect.any(String),
        dateOfBirth: null,
        id: expect.any(String),
        nationalId: null,
        nationalIdType: null,
        updatedAt: expect.any(String),
        userId: expect.any(String),
      },
      token: expect.any(String),
    });
  });

  test('should not allow duplicate email user to register', async () => {
    await registerTestUserAndRetrieveToken()
    const response = await testServer.inject({
      url: '/public/auth/register',
      method: 'POST',
      payload: {

        password: TEST_PASSWORD,
        email: TEST_EMAIL,
      },

    });

    expect(response.json()).toStrictEqual({
      error: 'Internal Server Error',
      message: 'Email already used',
      statusCode: 500,
    });
  });

  test('should be able to log in with a valid user', async () => {
    await registerTestUserAndRetrieveToken()
    const response = await testServer.inject({
      url: '/public/auth/login',
      method: 'POST',
      payload: {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      },
    });

    expect(response.json()).toStrictEqual(
      {
        profile: {
          belt: null,
          clubId: null,
          createdAt: expect.any(String),
          dateOfBirth: null,
          id: expect.any(String),
          nationalId: null,
          nationalIdType: null,
          updatedAt: expect.any(String),
          userId: expect.any(String),
        },
        token: expect.any(String),
      },
      
    );
  });
});
