import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { optionalSessionAuth } from '../../middleware/auth';

export default fastifyPlugin(async (fastify: FastifyInstance) => {
	fastify.addHook('onRequest', optionalSessionAuth);
});
