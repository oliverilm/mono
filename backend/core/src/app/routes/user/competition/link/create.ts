import { createCompetitionLinkSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { requestUserId } from 'src/app/utils/request';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/create',
		withBody(createCompetitionLinkSchema, (request) => {
			return CompetitionService.createCompetitionLink(
				request.body,
				requestUserId(request),
			);
		}),
	);
}
