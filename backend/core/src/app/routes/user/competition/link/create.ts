import { slugSchema, createCompetitionLinkSchema } from "@monorepo/utils";
import { FastifyInstance } from "fastify";
import { CompetitionService } from "src/app/services/competition";
import { getAssertedUserIdFromRequest } from "src/app/utils/request";


export default function (fastify: FastifyInstance) {
    fastify.post("/create", (request) => {
        const slug = slugSchema.parse(request.params); // TODO: not sure what to do with this
		const userId = getAssertedUserIdFromRequest(request);
		const data = createCompetitionLinkSchema.parse(request.body);

        // TODO: slug is not required in this request, just accept the id with the body
		return CompetitionService.createCompetitionLink(data, userId, slug.slug);
    })
}