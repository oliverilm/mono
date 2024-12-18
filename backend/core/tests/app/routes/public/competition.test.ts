import { createManyCompetitionsWithNames } from '../../../utils/competition';
import { TEST_CLUB_NAME, testServer } from '../../../integration-init';
import { describe, it, expect } from "vitest"
import { expectAnyString, expectToBeIsoTimestamp } from '../../../utils/helpers';

describe('Competition related actions', () => {
  it('should retrieve a list of competitions', async () => {
    await createManyCompetitionsWithNames([
      'first competition',
      'second competition',
      'third competition',
      'fourth competition',
    ]);
    const response = await testServer.inject({
      method: 'GET',
      url: '/public/competitions',
      query: {
        skip: '0',
        take: '25',
      },
    });

    const commonCompetitionData = {
      clubName: TEST_CLUB_NAME,
      id: expect.any(String),
      isArchived: false,
      isPublished: false,
      additionalInfo: null,
      createdAt: expectToBeIsoTimestamp(),
      updatedAt: expectToBeIsoTimestamp(),
    };

    const common = {
      createdAt: expectToBeIsoTimestamp(),
      updatedAt: expectToBeIsoTimestamp(),
      id: expectAnyString(),
      additionalInfo: null,
      clubName: "test_club",
      description: null,
      isArchived: false,
      isPublished: true,
      location: null,
      startingAt: null,

    }
    expect(response.json()).toStrictEqual(
      [
        {
          ...common,
          "name": "first competition",
          "slug": "first-competition",
        },
        {
          ...common,
          "name": "second competition",
          "slug": "second-competition",
        },
        {
          ...common,
          "name": "third competition",
          "slug": "third-competition",
        },
        {
          ...common,
          "name": "fourth competition",
          "slug": "fourth-competition",
        },
      ]
    );
  });

  it('should apply skip and take with competitions list', async () => {
    await createManyCompetitionsWithNames([
      'first competition',
      'second competition',
      'third competition',
      'fourth competition',
    ]);


    const response = await testServer.inject({
      method: 'GET',
      url: '/public/competitions',
      query: {
        skip: '0',
        take: '1',
      },
    });

    expect(response.json().length).toBe(1);
  });

  it("should not fetch competition metadata when not authenticated", async () => {
    await createManyCompetitionsWithNames([
      'first competition',
    ]);

    const response = await testServer.inject({
      method: 'GET',
      url: '/public/competitions/first-competition/metadata',
    });

    expect(response.json()).toMatchInlineSnapshot(`{}`)


  })
});
