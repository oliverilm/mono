import {
  registerTestUserAndRetrieveToken,
  TEST_CLUB_NAME,
  TEST_EMAIL,
  testServer,
} from '../../../integration-init';
import { describe, test, expect } from "vitest"
import { expectAnyString, expectToBeIsoTimestamp } from '../../../utils/helpers';
import { CreateCompetition } from '@monorepo/utils';
import { prisma } from '../../../../src/app/utils/db';
import { CompetitionRole } from '@prisma/client';

describe('Competition related actions', () => {
  test('should be able to create a competition', async () => {
    const token = await registerTestUserAndRetrieveToken({
      addons: { withClub: true },
    });

    const payload: CreateCompetition = {
      name: 'test_competition',
    };

    const response = await testServer.inject({
      method: 'POST',
      url: '/user/competitions',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload,
    });

    expect(response.json()).toStrictEqual(
      {
        "additionalInfo": null,
        "clubName": TEST_CLUB_NAME,
        "createdAt": expectToBeIsoTimestamp(),
        "description": null,
        "id": expectAnyString(),
        "isArchived": false,
        "isPublished": false,
        "location": null,
        "name": "test_competition",
        "slug": "testcompetition",
        "startingAt": null,
        "updatedAt": expectToBeIsoTimestamp(),
      }
    );
    const competitionMeta = await testServer.inject({
      method: 'GET',
      url: `/public/competitions/${response.json().slug}/metadata`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload,
    });

    expect(competitionMeta.json()).toStrictEqual(
      {
        "competitionAdmins": [
          {
            "email": TEST_EMAIL,
            "id": expect.any(Number),
            "role": CompetitionRole.OWNER,
            "userId": expectAnyString(),
          },
        ],
      }
    );
    
  });
});
