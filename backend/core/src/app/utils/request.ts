import { FastifyRequest } from "fastify";
import typia from "typia";

export function getAssertedUserIdFromRequest(request: FastifyRequest): string {
    const req = typia.assert<{userId: string}>(request)
    return req.userId
}