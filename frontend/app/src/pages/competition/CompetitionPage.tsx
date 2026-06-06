import { useParams } from 'react-router-dom';
import { CompetitionDetails } from '../../components/competition/CompetitionDetails';
import { TournamentToolsSection } from '../../components/competition/TournamentToolsSection';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { BackLink } from '../../components/shared/back-link/BackLink';
import { PageSection } from '../../components/shared/page-section/PageSection';
import { useManagedCompetition } from '../../hooks/useManagedCompetitions';

export function CompetitionPage() {
	const { competitionSlug } = useParams<{ competitionSlug: string }>();
	const { competition } = useManagedCompetition(competitionSlug);

	if (!competition) {
		return (
			<DashboardShell>
				<PageSection
					title="Competition not found"
					subtitle="This tournament does not exist or you do not have access to it."
					titleLevel="h1"
				>
					<BackLink to="/">← Back to competitions</BackLink>
				</PageSection>
			</DashboardShell>
		);
	}

	return (
		<DashboardShell subtitle={competition.name}>
			<BackLink to="/">← Back to competitions</BackLink>
			<CompetitionDetails competition={competition} />
			<TournamentToolsSection competitionSlug={competition.slug} />
		</DashboardShell>
	);
}
