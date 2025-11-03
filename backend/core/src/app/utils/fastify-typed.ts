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

// Builder class for chaining validators with type inference
class TypedFastifyBuilder<
	B extends z.ZodType | undefined = undefined,
	P extends z.ZodType | undefined = undefined,
	Q extends z.ZodType | undefined = undefined,
> {
	constructor(
		private fastify: FastifyInstance,
		private bodySchema?: B,
		private paramsSchema?: P,
		private querySchema?: Q,
	) {}

	// Chainable validator methods
	params<T extends z.ZodType>(schema: T): TypedFastifyBuilder<B, T, Q> {
		return new TypedFastifyBuilder(
			this.fastify,
			this.bodySchema,
			schema,
			this.querySchema,
		);
	}

	query<T extends z.ZodType>(schema: T): TypedFastifyBuilder<B, P, T> {
		return new TypedFastifyBuilder(
			this.fastify,
			this.bodySchema,
			this.paramsSchema,
			schema,
		);
	}

	body<T extends z.ZodType>(schema: T): TypedFastifyBuilder<T, P, Q> {
		return new TypedFastifyBuilder(
			this.fastify,
			schema,
			this.paramsSchema,
			this.querySchema,
		);
	}

	// HTTP method handlers with proper type inference
	get(
		path: string,
		handler: FullHandler<
			B extends z.ZodType ? z.infer<B> : unknown,
			P extends z.ZodType ? z.infer<P> : unknown,
			Q extends z.ZodType ? z.infer<Q> : unknown
		>,
	): void {
		this.registerRoute('get', path, handler);
	}

	post(
		path: string,
		handler: FullHandler<
			B extends z.ZodType ? z.infer<B> : unknown,
			P extends z.ZodType ? z.infer<P> : unknown,
			Q extends z.ZodType ? z.infer<Q> : unknown
		>,
	): void {
		this.registerRoute('post', path, handler);
	}

	put(
		path: string,
		handler: FullHandler<
			B extends z.ZodType ? z.infer<B> : unknown,
			P extends z.ZodType ? z.infer<P> : unknown,
			Q extends z.ZodType ? z.infer<Q> : unknown
		>,
	): void {
		this.registerRoute('put', path, handler);
	}

	patch(
		path: string,
		handler: FullHandler<
			B extends z.ZodType ? z.infer<B> : unknown,
			P extends z.ZodType ? z.infer<P> : unknown,
			Q extends z.ZodType ? z.infer<Q> : unknown
		>,
	): void {
		this.registerRoute('patch', path, handler);
	}

	delete(
		path: string,
		handler: FullHandler<
			B extends z.ZodType ? z.infer<B> : unknown,
			P extends z.ZodType ? z.infer<P> : unknown,
			Q extends z.ZodType ? z.infer<Q> : unknown
		>,
	): void {
		this.registerRoute('delete', path, handler);
	}

	private registerRoute(
		method: 'get' | 'post' | 'put' | 'patch' | 'delete',
		path: string,
		handler: FullHandler<
			B extends z.ZodType ? z.infer<B> : unknown,
			P extends z.ZodType ? z.infer<P> : unknown,
			Q extends z.ZodType ? z.infer<Q> : unknown
		>,
	): void {
		registerTypedRoute(
			this.fastify,
			method,
			path,
			this.bodySchema,
			this.paramsSchema,
			this.querySchema,
			handler as FullHandler<unknown, unknown, unknown>,
		);
	}
}

// Create a typed fastify instance wrapper
export function createTypedFastify(fastify: FastifyInstance) {
	const builder = new TypedFastifyBuilder(fastify);

	return {
		// Start with any validator or chain multiple
		params: <T extends z.ZodType>(schema: T) => builder.params(schema),
		query: <T extends z.ZodType>(schema: T) => builder.query(schema),
		body: <T extends z.ZodType>(schema: T) => builder.body(schema),

		// Direct HTTP methods without validation (for backwards compatibility if needed)
		get: (path: string, handler: FullHandler<unknown, unknown, unknown>) =>
			builder.get(path, handler),
		post: (path: string, handler: FullHandler<unknown, unknown, unknown>) =>
			builder.post(path, handler),
		put: (path: string, handler: FullHandler<unknown, unknown, unknown>) =>
			builder.put(path, handler),
		patch: (path: string, handler: FullHandler<unknown, unknown, unknown>) =>
			builder.patch(path, handler),
		delete: (path: string, handler: FullHandler<unknown, unknown, unknown>) =>
			builder.delete(path, handler),
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
			const validatedRequest = await validateRequest(
				request,
				bodySchema,
				paramsSchema,
				querySchema,
			);

			// Call the handler with validated data
			const response = await (
				handler as (
					request: FastifyRequest,
					reply: FastifyReply,
				) => Promise<unknown> | unknown
			)(validatedRequest, reply);

			return response;
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
async function validateRequest(
	request: FastifyRequest,
	bodySchema?: z.ZodType,
	paramsSchema?: z.ZodType,
	querySchema?: z.ZodType,
): Promise<RequestWithValidations> {
	const validated: RequestWithValidations = {
		...request,
		body: request.body,
		params: request.params,
		query: request.query,
	};

	// Validate body if schema is provided
	if (bodySchema) {
		validated.body = await bodySchema.parseAsync(request.body);
	}

	// Validate params if schema is provided
	if (paramsSchema) {
		validated.params = await paramsSchema.parseAsync(request.params);

		console.log({
			validatedParams: validated.params,
			requestParams: request.params,
		});
	}

	// Validate query if schema is provided
	if (querySchema) {
		// if not validated throw error
		validated.query = await querySchema.parseAsync(request.query);
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
