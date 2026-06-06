import { MOCK_MANAGED_COMPETITIONS } from '../mocks/managedCompetitions';

/** Placeholder until the managed-competitions API query exists. */
export function useManagedCompetitions() {
	return {
		competitions: MOCK_MANAGED_COMPETITIONS,
		isLoading: false,
	};
}

export function useManagedCompetition(slug: string | undefined) {
	const competition =
		MOCK_MANAGED_COMPETITIONS.find((item) => item.slug === slug) ?? null;

	return {
		competition,
		isLoading: false,
	};
}
