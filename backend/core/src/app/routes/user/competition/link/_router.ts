import { FastifyInstance } from "fastify";

export default function (fastify: FastifyInstance) {
    fastify.register(import('./create'));
}