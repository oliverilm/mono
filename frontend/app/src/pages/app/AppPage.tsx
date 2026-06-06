import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { appComponents, isAppSlug } from '../../components/apps/appComponents';
import { StatusPage } from '../../components/shared/status-page/StatusPage';
import { useManagedCompetition } from '../../hooks/useManagedCompetitions';
import { TOURNAMENT_APPS } from '../../constants';

export function AppPage() {
	const { competitionSlug, appSlug } = useParams<{
		competitionSlug: string;
		appSlug: string;
	}>();
	const { competition } = useManagedCompetition(competitionSlug);
	const app = TOURNAMENT_APPS.find((item) => item.slug === appSlug);

	if (!competition) {
		return (
			<StatusPage
				title="Competition not found"
				backTo="/"
				backLabel="Back to competitions"
			/>
		);
	}

	if (!app || !isAppSlug(appSlug)) {
		return (
			<StatusPage
				title="App not found"
				backTo={`/competitions/${competition.slug}`}
				backLabel="Back to competition"
			/>
		);
	}

	const AppComponent = appComponents[appSlug];

	return (
		<Suspense
			fallback={
				<StatusPage
					title="Loading…"
					backTo={`/competitions/${competition.slug}`}
					backLabel="Back to competition"
					centered={false}
				/>
			}
		>
			<AppComponent />
		</Suspense>
	);
}
