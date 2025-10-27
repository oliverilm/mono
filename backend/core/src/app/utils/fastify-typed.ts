import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// Request with validated body
type RequestWithBody<T> = FastifyRequest & { body: T };

// Request with validated params
type RequestWithParams<T> = FastifyRequest & { params: T };

// Request with validated query
type RequestWithQuery<T> = FastifyRequest & { query: T };

// Request with multiple validations
type RequestWithValidations<
	B = unknown,
	P = unknown,
	Q = unknown,
> = FastifyRequest & {
	body: B;
	params: P;
	query: Q;
};

// Handler function types
type BodyHandler<T> = (
	request: RequestWithBody<T>,
	reply: FastifyReply,
) => Promise<unknown> | unknown;
type ParamsHandler<T> = (
	request: RequestWithParams<T>,
	reply: FastifyReply,
) => Promise<unknown> | unknown;
type QueryHandler<T> = (
	request: RequestWithQuery<T>,
	reply: FastifyReply,
) => Promise<unknown> | unknown;
type FullHandler<B, P, Q> = (
	request: RequestWithValidations<B, P, Q>,
	reply: FastifyReply,
) => Promise<unknown> | unknown;

// Create a typed fastify instance wrapper
export function createTypedFastify(fastify: FastifyInstance) {
	return {
		// Body validation only
		body: <T extends z.ZodType>(schema: T) => ({
			post: <B = z.infer<T>>(path: string, handler: BodyHandler<B>) => {
				registerTypedRoute(
					fastify,
					'post',
					path,
					schema,
					undefined,
					undefined,
					handler,
				);
			},
			put: <B = z.infer<T>>(path: string, handler: BodyHandler<B>) => {
				registerTypedRoute(
					fastify,
					'put',
					path,
					schema,
					undefined,
					undefined,
					handler,
				);
			},
			patch: <B = z.infer<T>>(path: string, handler: BodyHandler<B>) => {
				registerTypedRoute(
					fastify,
					'patch',
					path,
					schema,
					undefined,
					undefined,
					handler,
				);
			},
		}),

		// Params validation only
		params: <T extends z.ZodType>(schema: T) => ({
			get: <P = z.infer<T>>(path: string, handler: ParamsHandler<P>) => {
				registerTypedRoute(
					fastify,
					'get',
					path,
					undefined,
					schema,
					undefined,
					handler,
				);
			},
			put: <P = z.infer<T>>(path: string, handler: ParamsHandler<P>) => {
				registerTypedRoute(
					fastify,
					'put',
					path,
					undefined,
					schema,
					undefined,
					handler,
				);
			},
			delete: <P = z.infer<T>>(path: string, handler: ParamsHandler<P>) => {
				registerTypedRoute(
					fastify,
					'delete',
					path,
					undefined,
					schema,
					undefined,
					handler,
				);
			},
		}),

		// Query validation only
		query: <T extends z.ZodType>(schema: T) => ({
			get: <Q = z.infer<T>>(path: string, handler: QueryHandler<Q>) => {
				registerTypedRoute(
					fastify,
					'get',
					path,
					undefined,
					undefined,
					schema,
					handler,
				);
			},
		}),
	};
}

// Internal function to register typed routes
function registerTypedRoute<B, P, Q>(
	fastify: FastifyInstance,
	method: 'get' | 'post' | 'put' | 'patch' | 'delete',
	path: string,
	bodySchema?: z.ZodType,
	paramsSchema?: z.ZodType,
	querySchema?: z.ZodType,
	handler?:
		| FullHandler<B, P, Q>
		| BodyHandler<B>
		| ParamsHandler<P>
		| QueryHandler<Q>,
): void {
	const routeHandler = async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			// Validate and transform request data
			const validatedRequest = validateRequest(
				request,
				bodySchema,
				paramsSchema,
				querySchema,
			);

			// Call the handler with validated data
			return await (
				handler as (
					request: FastifyRequest,
					reply: FastifyReply,
				) => Promise<unknown> | unknown
			)(validatedRequest, reply);
		} catch (error) {
			// Handle Zod validation errors
			if (error instanceof z.ZodError) {
				reply.status(400).send({
					error: 'Validation Error',
					message: 'Invalid request data',
					details: error.errors.map((err) => ({
						field: err.path.join('.'),
						message: err.message,
						code: err.code,
					})),
				});
				return;
			}

			// Re-throw other errors to be handled by Fastify's error handler
			throw error;
		}
	};

	// Register the route with Fastify
	fastify[method](path, routeHandler);
}

// Internal function to validate request data
function validateRequest(
	request: FastifyRequest,
	bodySchema?: z.ZodType,
	paramsSchema?: z.ZodType,
	querySchema?: z.ZodType,
): RequestWithValidations {
	const validated: RequestWithValidations = {
		...request,
		body: request.body,
		params: request.params,
		query: request.query,
	};

	// Validate body if schema is provided
	if (bodySchema) {
		validated.body = bodySchema.parse(request.body);
	}

	// Validate params if schema is provided
	if (paramsSchema) {
		validated.params = paramsSchema.parse(request.params);
	}

	// Validate query if schema is provided
	if (querySchema) {
		validated.query = querySchema.parse(request.query);
	}

	return validated;
}

// Export types for external use
export type {
	BodyHandler,
	FullHandler,
	ParamsHandler,
	QueryHandler,
	RequestWithBody,
	RequestWithParams,
	RequestWithQuery,
	RequestWithValidations,
};
