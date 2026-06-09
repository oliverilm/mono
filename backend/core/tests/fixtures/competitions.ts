import { prisma } from "../../src/app/utils/db";
import { createId } from "./utils/cuid";

const Competitions = {
    EstonianOpen: {
        id: createId(),
        name: "Estonian Open",
        slug: "estonian-open",
    },
    EstonianChampionships: {
        id: createId(),
        name: "Estonian Championships",
        slug: "estonian-championships",
    },
    EstonianCup: {
        id: createId(),
        name: "Estonian Cup",
        slug: "estonian-cup",
    },
    EstonianQualifier: {
        id: createId(),
        name: "Estonian Qualifier",
        slug: "estonian-qualifier",
    },
    LatvianOpen: {
        id: createId(),
        name: "Latvian Open",
        slug: "latvian-open",
    },
    LatvianChampionships: {
        id: createId(),
        name: "Latvian Championships",
        slug: "latvian-championships",
    },
}

function populateCompetitions() {
    return prisma.competition.createMany({data: [
        ...Object.values(Competitions),
    ]})
}

export { Competitions, populateCompetitions }