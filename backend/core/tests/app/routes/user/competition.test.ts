import {
  registerTestUserAndRetrieveToken,
  TEST_CLUB_NAME,
  TEST_EMAIL,
  testServer,
} from '../../../integration-init';
import { describe, it, expect } from "vitest"
import { expectAnyString, expectToBeIsoTimestamp } from '../../../utils/helpers';
import { CreateCompetition } from '@monorepo/utils';
import { CompetitionRole } from '@prisma/client';
import { createCompetitionWithName, createManyCompetitionsWithNames } from '../../../utils/competition';

describe('Competition related actions', () => {
  it('should be able to create a competition', async () => {
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
        "registrationEndAt": null,
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

  it("should fetch only private competitions", async () => {
    const token = await registerTestUserAndRetrieveToken({
      addons: { withClub: true },
    });


    await createManyCompetitionsWithNames(["test 1", "test 2"])
    await createCompetitionWithName("test 3")

    const response = await testServer.inject({
      method: 'GET',
      url: `/user/competitions/private`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.json()).toStrictEqual(
      [
        {
          "additionalInfo": null,
          "clubName": "test_club",
          "createdAt": expectToBeIsoTimestamp(),
          "description": null,
          "id": expectAnyString(),
          "isArchived": false,
          "isPublished": false,
          "registrationEndAt": null,
          "location": null,
          "name": "test 3",
          "slug": "test-3",
          "startingAt": null,
          "updatedAt":expectToBeIsoTimestamp(),
        },
      ]
    )
  })

  describe("Competitor creation flows", () => {
    it.todo("should be able to create a competitor successfully", () => {
      expect(true).toBe(true)
    })

    it.todo("should not be able to create a competitor if the competition is not published", () => {
      expect(true).toBe(true)
    })

    it.todo("should not be able to create a competitor if the competition is archived", () => {
      expect(true).toBe(true)
    })

    it.todo("should not be able to create a competitor if the competition registration end date has surpassed", () => {
      expect(true).toBe(true)
    })

    
  })
});
