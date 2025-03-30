import { clubCreateSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import { tryHandleKnownErrors } from 'src/app/utils/error';
import { requestUserId } from 'src/app/utils/request';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/create',
		withBody(clubCreateSchema, async (request) => {
			try {
				const response = await ClubService.create({
					...request.body,
					userId: requestUserId(request),
				});

				return response;
			} catch (error) {
				tryHandleKnownErrors(error as Error);

				throw error;
			}
		}),
	);
}
