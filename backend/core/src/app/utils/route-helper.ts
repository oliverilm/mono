import type { FastifyRequest } from 'fastify';
import type { z } from 'zod';

type RequestHandler<T> = (
	request: FastifyRequest & { body: T },
) => Promise<any>;

export function withBody<T extends z.ZodType>(
	schema: T,
	callback: RequestHandler<z.infer<T>>,
) {
	return (request: FastifyRequest) => {
		const validatedBody = schema.parse(request.body);
		return callback({
			...request,
			body: validatedBody,
		});
	};
}
// For params validation
export function withParams<T extends z.ZodType>(
	schema: T,
	callback: RequestHandler<z.infer<T>>,
) {
	return (request: FastifyRequest) => {
		const validatedParams = schema.parse(request.params);
		return callback({
			...request,
			params: validatedParams,
		});
	};
}

export function withQuery<T extends z.ZodType>(
	schema: T,
	callback: RequestHandler<z.infer<T>>,
) {
	return (request: FastifyRequest) => {
		const validatedQuery = schema.parse(request.query);
		return callback({
			...request,
			query: validatedQuery as z.infer<T>,
		});
	};
}
