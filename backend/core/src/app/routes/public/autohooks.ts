import { FastifyInstance } from 'fastify';
import { optionalSessionAuth } from '../../middleware/auth';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async function (fastify: FastifyInstance) {
	fastify.addHook('onRequest', optionalSessionAuth);
});
