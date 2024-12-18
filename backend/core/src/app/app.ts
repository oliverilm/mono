import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import publicRouter from './routes/public/publicRouter';
import userRouter from './routes/user/userRouter';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
	// Place here your custom code!

	// Do not touch the following lines

	// This loads all plugins defined in plugins
	// those should be support plugins that are reused
	// through your application
	fastify.register(sensible);
	fastify.register(cors, {
		origin: true,
		methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
		allowedHeaders: ['content-type', 'accept', 'content-type', 'authorization'],
	});

	// register routers
	fastify.register(publicRouter, { prefix: "/public" });
	fastify.register(userRouter, { prefix: "/user" });
}
