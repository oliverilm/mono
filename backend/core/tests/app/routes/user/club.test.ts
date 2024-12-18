import { ClubRole } from '@prisma/client';
import { prisma } from '../../../../src/app/utils/db';
import {
  registerTestUserAndRetrieveToken,
  testServer,
} from '../../../integration-init';
import { expectAnyString } from '../../../utils/helpers';
import { getTestUserProfile } from '../../../utils/user';
import { describe, test, expect } from "vitest"

describe('User Club related actions', () => {
  test('should be able to create a club with a unique name and be marked as admin of that club', async () => {
    const token = await registerTestUserAndRetrieveToken();

    const response = await testServer.inject({
      method: 'POST',
      url: '/user/club/create',
      payload: {
        name: 'unique club',
        country: 'EE',
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    {
      expect(response.json()).toStrictEqual({
        country: 'EE',
        createdAt: expect.any(String),
        description: '',
        id: expect.any(String),
        name: 'unique club',
        slug: 'unique-club',
        updatedAt: expect.any(String),
      });

      const profile = await getTestUserProfile();
      expect(profile?.clubId).toBe(response.json().id);
    }

    {
      const profile = await getTestUserProfile();
      const clubAdmins = await prisma.clubAdmin.findFirst({
        where: {
          userId: profile!.userId!,
          clubId: response.json().id
        },
      });
      expect(clubAdmins).toStrictEqual(
        {
          "clubId": expectAnyString(),
          "id": expect.any(Number),
          "role": ClubRole.OWNER,
          "userId": expectAnyString(),
        });
    }
  });

  test('should not be able to create a club if user is not logged in', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/user/club/create',
      payload: {
        name: 'unique club',
        country: 'EE',
      },
    });

    expect(response.json()).toStrictEqual(
      {
        "error": "Unauthorized",
        "message": "Unauthorized",
        "statusCode": 401,
      }
    );
  });

  test.todo('should not be able to create a club with a duplicate name');
  test.todo('should not be able to create a club if user is already in a club');

});
