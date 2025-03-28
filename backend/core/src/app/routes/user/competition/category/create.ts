import { createCompetitionCategorySchema } from "@monorepo/utils";
import { FastifyInstance } from "fastify";
import { CompetitionService } from "src/app/services/competition";
import { getAssertedUserIdFromRequest } from "src/app/utils/request";
import { FastifyRequest } from 'fastify';
import { z } from 'zod';

type RequestHandler<T> = (request: FastifyRequest & { body: T }) => Promise<any>;

function validateSchema<T extends z.ZodType>(
  schema: T,
  callback: RequestHandler<z.infer<T>>
) {
  return async (request: FastifyRequest) => {
    const validatedBody = schema.parse(request.body);
    return callback({
      ...request,
      body: validatedBody,
    });
  };
}

export default function (fastify: FastifyInstance) {
    fastify.post("/create", validateSchema(createCompetitionCategorySchema, async (request) => {
        const userId = getAssertedUserIdFromRequest(request);

        const isAdmin = await CompetitionService.isAdmin(request.body.competitionId, userId);

        if (!isAdmin) {
            throw new Error('User is not an admin');
        }

        return CompetitionService.createCompetitionCategory(request.body);
    })
) 
}