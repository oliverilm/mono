import { describe, expect, it, vi } from 'vitest';
import { testServer } from '../../../integration-init';
import { PublicClubHandlers } from '../../../../src/app/routes/public/club/_handlers';

vi.mock('../../../../src/app/routes/public/club/_handlers', async (importOriginal) => {
	const mod = await importOriginal<typeof import('../../../../src/app/routes/public/club/_handlers')>();
	return {
		PublicClubHandlers: {
			...mod.PublicClubHandlers,
			getPublicClubMetadata: vi.fn().mockResolvedValue({ isAdmin: false, admins: [] }),
		},
	};
});

describe('GET /public/club/metadata', () => {

	it('should receive the metadata request', async () => {
		const spy = vi.mocked(PublicClubHandlers.getPublicClubMetadata)
		
		const response = await testServer.inject({
			method: 'GET',
			url: '/public/club/metadata/test-slug',
		})

		expect(spy).toHaveBeenCalledTimes(1);
		expect(response.json()).toMatchObject({ isAdmin: false, admins: [] });
		expect(response.statusCode).toBe(200);
	});
});