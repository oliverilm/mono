import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import cors from "@fastify/cors"
import sensible from '@fastify/sensible';

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
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: [
      'content-type',
      'accept',
      'content-type',
      'authorization'
    ],
  })
  
  // register public routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: true,
    options: { ...opts },
    autoHooks: true,

  });


}
