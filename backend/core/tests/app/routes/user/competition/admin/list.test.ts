import { describe, it, expect, beforeEach } from "vitest";
import { userRequest } from "../../../../../integration-init";
import { prisma } from "../../../../../../src/app/utils/db";
import { CompetitionRole } from "@prisma/client";
import { Users } from "../../../../../fixtures/users";
import { Competitions } from "../../../../../fixtures/competitions";

const competitionAdminData = [
    {
        competitionId: Competitions.EstonianOpen.id,
        userId: Users.Oliver.id,
        role: CompetitionRole.OWNER,
    },
    {
        competitionId: Competitions.EstonianChampionships.id,
        userId: Users.Oliver.id,
        role: CompetitionRole.MANAGER,
    },
    {
        competitionId: Competitions.EstonianOpen.id,
        userId: Users.John.id,
        role: CompetitionRole.MANAGER,
    },
    {
        competitionId: Competitions.EstonianChampionships.id,
        userId: Users.Mary.id,
        role: CompetitionRole.MANAGER,
    }
]

describe('GET /user/competition/admin/list', () => {

    beforeEach(async () => {
        await prisma.competitionAdmin.createMany({
            data: competitionAdminData,
        })
    })
    it("must fetch the list of competitionAdmins for the user", async () => {
        const response = await userRequest(Users.Oliver, {
            method: 'GET',
            url: '/user/competition/admin/',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toStrictEqual(
          [
            {
              "competition": {
                "additionalInfo": null,
                "clubId": null,
                "clubName": null,
                "createdAt": expect.any(String),
                "description": null,
                "id": Competitions.EstonianOpen.id,
                "isArchived": false,
                "isPublished": false,
                "location": null,
                "name": "Estonian Open",
                "registrationEndAt": null,
                "slug": "estonian-open",
                "startingAt": null,
                "updatedAt": expect.any(String),
              },
              "role": CompetitionRole.OWNER,
            },
            {
              "competition": {
                "additionalInfo": null,
                "clubId": null,
                "clubName": null,
                "createdAt": expect.any(String),
                "description": null,
                "id": Competitions.EstonianChampionships.id,
                "isArchived": false,
                "isPublished": false,
                "location": null,
                "name": "Estonian Championships",
                "registrationEndAt": null,
                "slug": "estonian-championships",
                "startingAt": null,
                "updatedAt": expect.any(String),
              },
              "role": CompetitionRole.MANAGER,
            },
          ]
        )
    })


})