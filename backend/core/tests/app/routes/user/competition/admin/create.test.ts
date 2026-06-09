import { beforeEach, describe, expect, it } from "vitest";
import { Users } from "../../../../../fixtures/users";
import { userRequest } from "../../../../../integration-init";
import { prisma } from "../../../../../../src/app/utils/db";
import { CompetitionRole } from "@prisma/client";
import { Competitions } from "../../../../../fixtures/competitions";

describe('POST /user/competition/admin/create', () => {

    beforeEach(async () => {
        await prisma.competitionAdmin.createMany({
            data: {
                competitionId: Competitions.EstonianOpen.id,
                userId: Users.Oliver.id,
                role: CompetitionRole.OWNER,
            },
        })
    })
	it('should create a competition admin if user is competition owner', async () => {
		const response = await userRequest(Users.Oliver, {
			method: 'POST',
			url: '/user/competition/admin/',
			payload: {
				competitionId: Competitions.EstonianOpen.id,
				userId: Users.John.id,
				role: CompetitionRole.MANAGER,
			},
		});

        expect(response.statusCode).toBe(200);
        expect(response.json()).toStrictEqual(
          {
            "competitionId": Competitions.EstonianOpen.id,
            "createdAt": expect.any(String),
            "id": expect.any(Number),
            "role": CompetitionRole.MANAGER,
            "updatedAt": expect.any(String),
            "userId": Users.John.id,
          }
        )
	});
});