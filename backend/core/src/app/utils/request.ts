import { FastifyRequest } from "fastify";
import typia from "typia";
import { userIdSchema } from "../schemas/auth";

export function getAssertedUserIdFromRequest(request: FastifyRequest): string {
    return userIdSchema.parse({userId: request.userId}).userId
}