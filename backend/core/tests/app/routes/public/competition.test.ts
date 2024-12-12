import { createManyCompetitionsWithNames } from '../../../utils/competition';
import { TEST_CLUB_NAME, testServer } from '../../../integration-init';
import { describe, test, expect } from "vitest"

describe('Competition related actions', () => {
  test('should retrieve a list of competitions', async () => {
    await createManyCompetitionsWithNames([
      'first competition',
      'second competition',
      'third competition',
      'fourth competition',
    ]);
    const response = await testServer.inject({
      method: 'GET',
      url: '/public/competition/list',
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
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    expect(response.json()).toStrictEqual([
      {
        ...commonCompetitionData,
        name: 'first competition',
        slug: 'first-competition',
      },
      {
        ...commonCompetitionData,
        name: 'second competition',
        slug: 'second-competition',
      },
      {
        ...commonCompetitionData,
        name: 'third competition',
        slug: 'third-competition',
      },
      {
        ...commonCompetitionData,
        name: 'fourth competition',
        slug: 'fourth-competition',
      },
     
    ]);
  });

  test('should apply skip and take with competitions list', async () => {
    await createManyCompetitionsWithNames([
      'first competition',
      'second competition',
      'third competition',
      'fourth competition',
    ]);
    const response = await testServer.inject({
      method: 'GET',
      url: '/public/competition/list',
      query: {
        skip: '0',
        take: '1',
      },
    });

    expect(response.json().length).toBe(1);
  });
});
