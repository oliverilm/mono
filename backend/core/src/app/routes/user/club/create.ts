import { clubCreateSchema } from "@monorepo/utils";
import { FastifyInstance } from "fastify";
import { ClubService } from "src/app/services/club";
import { tryHandleKnownErrors } from "src/app/utils/error";
import { getAssertedUserIdFromRequest } from "src/app/utils/request";

export default function (fastify: FastifyInstance) {
    fastify.post('/create', async (request) => {
		const payload = clubCreateSchema.parse(request.body);
		try {
			const response = await ClubService.create({
				...payload,
				userId: getAssertedUserIdFromRequest(request),
			});

			return response;
		} catch (error) {
			tryHandleKnownErrors(error as Error);

			throw error;
		}
	});
}