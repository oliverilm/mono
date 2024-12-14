import { userIdSchema } from "@monorepo/utils";
import { FastifyRequest } from "fastify";

export function getAssertedUserIdFromRequest(request: FastifyRequest): string {
    return userIdSchema.parse({userId: request.userId}).userId
}