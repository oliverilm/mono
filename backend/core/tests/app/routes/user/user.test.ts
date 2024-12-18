import {
  registerTestUserAndRetrieveToken,
  TEST_EMAIL,
  testServer,
} from '../../../integration-init';
import { describe, expect, it } from "vitest"
import { expectAnyString, expectToBeIsoTimestamp } from '../../../utils/helpers';
import { Sex } from '@prisma/client';

describe('user routes', () => {
  it('should be able to fetch user profile with authenticated session', async () => {
    const token = await registerTestUserAndRetrieveToken();
    const response = await testServer.inject({
      method: 'GET',
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.json()).toStrictEqual({
      belt: null,
      clubId: null,
      createdAt: expectToBeIsoTimestamp(),
      dateOfBirth: null,
      firstName: null,
      id: expectAnyString(),
      lastName: null,
      nationalId: null,
      nationalIdType: null,
      sex: Sex.Male,
      updatedAt: expectToBeIsoTimestamp(),
      userId: expectAnyString(),
    });
  });

  it('should be able to update user profile', async () => {
    const token = await registerTestUserAndRetrieveToken();
    const response = await testServer.inject({
      method: 'PATCH',
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        dateOfBirth: new Date(1995, 8, 7).toISOString(),
        nationalId: '39509071411',
        nationalIdType: 'estid',
        firstName: 'oliver',
        lastName: 'Smith',
      },
    });

    expect(response.json()).toStrictEqual(
      {
        "belt": null,
        "clubId": null,
        "createdAt": expectToBeIsoTimestamp(),
        "dateOfBirth": "1995-09-06T00:00:00.000Z",
        "firstName": "Oliver",
        "id": expectAnyString(),
        "lastName": "Smith",
        "nationalId": "39509071411",
        "nationalIdType": "estid",
        "sex": Sex.Male,
        "updatedAt": expectToBeIsoTimestamp(),
        "userId": expectAnyString(),
      }
    );
  });

  it('should not be able to update user profile with an incorrect birth day', async () => {
    const token = await registerTestUserAndRetrieveToken();
    const response = await testServer.inject({
      method: 'PATCH',
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        dateOfBirth: new Date(1995, 1, 7).toISOString(),
        nationalId: '39509071411',
        nationalIdType: 'estid',
        firstName: 'oliver',
        lastName: 'Smith',
      },
    });

    expect(response.json()).toStrictEqual({
      error: 'Internal Server Error',
      message: 'Date of birth does not match the national id code',
      statusCode: 500,
    });
  });

  it('should not be able to update user profile with an incorrect national id', async () => {
    const token = await registerTestUserAndRetrieveToken();
    const response = await testServer.inject({
      method: 'PATCH',
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        dateOfBirth: new Date(1995, 9, 7).toISOString(),
        nationalId: '39509071411',
        nationalIdType: 'finid',
        firstName: 'oliver',
        lastName: 'Smith',
      },
    });

    expect(response.json()).toStrictEqual({
      error: 'Internal Server Error',
      message: 'Invalid finnish id code',
      statusCode: 500,
    });
  });

  it('should not be able to update user profile with a duplicate national id', async () => {
    const token = await registerTestUserAndRetrieveToken();
    await testServer.inject({
      method: 'PATCH',
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        dateOfBirth: new Date(1995, 9, 7).toISOString(),
        nationalId: '39509071411',
        nationalIdType: 'estid',
        firstName: 'oliver',
        lastName: 'Smith',
      },
    });
    const second = await registerTestUserAndRetrieveToken({
      email: 'test@second.com',
    });

    const response = await testServer.inject({
      method: 'PATCH',
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${second}`,
      },
      payload: {
        dateOfBirth: new Date(1995, 9, 7).toISOString(),
        nationalId: '39509071411',
        nationalIdType: 'estid',
        firstName: 'oliver',
        lastName: 'Smith',
      },
    });

    expect(response.json()).toStrictEqual(
      {
        "error": "Internal Server Error",
        "message": "Date of birth does not match the national id code",
        "statusCode": 500,
      }
    );
  });

  it("should return the test user as the result when searched with exact email", async () => {
    const token = await registerTestUserAndRetrieveToken();
    const response = await testServer.inject({
      method: "GET",
      url: "/user/user-by-email",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        search: TEST_EMAIL,
      },
    });

    expect(response.json()).toStrictEqual(
      {
        "email": TEST_EMAIL,
        "id": expectAnyString(),
      }
    );
  })

  it("should not return any users when email is incorrect", async () => {
    const token = await registerTestUserAndRetrieveToken();
    const response = await testServer.inject({
      method: "GET",
      url: "/user/user-by-email",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        search: "incorrect@gmail.com",
      },
    });

    expect(response.json()).toStrictEqual(null);
  })
});
