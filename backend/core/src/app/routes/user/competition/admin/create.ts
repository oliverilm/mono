import { createCompetitionAdminSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { requestUserId } from 'src/app/utils/request';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/',
		withBody(createCompetitionAdminSchema, (request) =>  CompetitionService.createCompetitionAdmin(request.body, requestUserId(request))),
	);
}


