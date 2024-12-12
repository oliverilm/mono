import { CreateCompetition } from '../../../../src/app/services/competition';
import {
  registerTestUserAndRetrieveToken,
  testServer,
} from '../../../integration-init';
import { describe, test, expect } from "vitest"

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
      url: '/user/competition/create',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload,
    });

    expect(response.json()).toStrictEqual(
      {
        "clubName": "test_club",
        "id": expect.any(String),
        "isArchived": false,
        "isPublished": false,
        "name": "test_competition",
        "slug": "testcompetition",
      }
    );
  });
});
