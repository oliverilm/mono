import { PrismaClient } from "@prisma/client"
import { testServer } from "../../../integration-init"
import { slugifyString } from "../../../../src/app/utils/string"
import { describe, test, expect } from "vitest"

describe("Public auth", () => {

    test("Should fetch the list of clubs", async () => {
        const prisma = new PrismaClient()

        await prisma.club.createMany({
            data: [
                {
                    name: "club 1",
                    country: "EE",
                    slug: slugifyString("club 1"),
                    description: ""
                }, {
                    name: "club 2",
                    country: "FI",
                    slug: slugifyString("club 2"),
                    description: ""
                }
            ]
        })

        { // regular request without any pagination
            const response = await testServer.inject({
                method: 'GET',
                url: '/public/club',
            })

            expect(response.json().length).toBe(2)
        }

        { // only skip parameter
            const response = await testServer.inject({
                method: 'GET',
                url: '/public/club',
                query: {
                    skip: "1",
                }
            })

            expect(response.json().length).toBe(1)
            expect(response.json().at(0).name).toBe("club 1")
        }

        { // only take parameter
            const response = await testServer.inject({
                method: 'GET',
                url: '/public/club',
                query: {
                    take: "1",
                }
            })

            expect(response.json().length).toBe(1)
            expect(response.json().at(0).name).toBe("club 2")
        }
    })
})