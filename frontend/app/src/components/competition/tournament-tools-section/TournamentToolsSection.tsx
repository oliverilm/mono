import { TOURNAMENT_APPS } from '@/constants';
import { AppCard } from '@components/shared/app-card/AppCard';
import { PageSection } from '@components/shared/page-section/PageSection';
import * as styles from '@components/layout/dashboard-shell/DashboardShell.css';

type TournamentToolsSectionProps = {
	competitionSlug: string;
};

export function TournamentToolsSection({
	competitionSlug,
}: TournamentToolsSectionProps) {
	return (
		<PageSection
			title="Tournament tools"
			subtitle="Open a device app for this competition"
			titleId="tools-title"
		>
			<div className={styles.appGrid}>
				{TOURNAMENT_APPS.map((app) => (
					<AppCard
						key={app.slug}
						competitionSlug={competitionSlug}
						slug={app.slug}
						name={app.name}
						description={app.description}
						icon={app.icon}
						layout="tile"
					/>
				))}
			</div>
		</PageSection>
	);
}
