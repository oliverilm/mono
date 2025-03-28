import { FastifyRequest } from 'fastify';
import { z } from 'zod';

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
