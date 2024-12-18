import { FastifyInstance } from 'fastify';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.register(import("./autohooks"))
	fastify.register(import("./auth"))
	fastify.register(import("./club"))
	fastify.register(import("./competition"))
}
