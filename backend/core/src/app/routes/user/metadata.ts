import type { FastifyInstance } from 'fastify';
import { CompetitionDb } from '../../db/competition.db';
import { UserService } from '../../services/user';
import { createTypedFastify } from '../../utils/fastify-typed';
import { requestUserId } from '../../utils/request';

export default function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);

	tf.get('/metadata', async (request) => {
		const userId = requestUserId(request);

		// get aggregate data for user
		const profile = await UserService.getUserProfileByUserId(userId);

		if (!profile) {
			throw new Error('Profile not found');
		}

		const competitionCount = await CompetitionDb.getCountOfUserCompetitions(
			profile.id,
		);
		const upcomingCompetitionCount =
			await CompetitionDb.getCountOfUserUpcomingCompetitions(profile.id);

		return {
			competitionCount,
			upcomingCompetitionCount,
		};
	});
}
