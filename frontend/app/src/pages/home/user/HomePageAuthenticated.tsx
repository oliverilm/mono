import { CompetitionCard } from '../../../components/shared/competition-card/CompetitionCard';
import { DashboardShell } from '../../../components/layout/DashboardShell';
import { EmptyState } from '../../../components/shared/empty-state/EmptyState';
import { PageSection } from '../../../components/shared/page-section/PageSection';
import { useManagedCompetitions } from '../../../hooks/useManagedCompetitions';
import * as styles from '../../../components/layout/DashboardShell.css';

export function HomePageAuthenticated() {
	const { competitions } = useManagedCompetitions();

	return (
		<DashboardShell>
			<PageSection
				title="Your competitions"
				subtitle="Tournaments where you are an owner or admin"
				titleId="competitions-title"
				titleLevel="h1"
			>
				{competitions.length > 0 ? (
					<div className={styles.competitionGrid}>
						{competitions.map((competition) => (
							<CompetitionCard
								key={competition.id}
								competition={competition}
							/>
						))}
					</div>
				) : (
					<EmptyState
						title="No competitions yet"
						description="When you are added as an owner or admin, your tournaments will appear here."
					/>
				)}
			</PageSection>
		</DashboardShell>
	);
}
