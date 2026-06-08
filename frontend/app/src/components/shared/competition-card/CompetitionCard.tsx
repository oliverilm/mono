import { Link } from 'react-router-dom';
import { formatDate } from '@utils/format';
import type { ManagedCompetition } from '@mocks/managedCompetitions';
import { CompetitionBadges } from '../competition-badges/CompetitionBadges';
import { interactivePanel } from '../content-panel/ContentPanel.css';
import { MetaRow } from '../meta-row/MetaRow';
import * as styles from './CompetitionCard.css';

type CompetitionCardProps = {
	competition: ManagedCompetition;
};

export function CompetitionCard({ competition }: CompetitionCardProps) {
	const dateLabel = formatDate(competition.startingAt);

	return (
		<Link
			className={`${interactivePanel} ${styles.card}`}
			to={`/competitions/${competition.slug}`}
		>
			<div className={styles.cardHeader}>
				<h3 className={styles.name}>{competition.name}</h3>
				<CompetitionBadges
					role={competition.role}
					isPublished={competition.isPublished}
					isArchived={competition.isArchived}
				/>
			</div>

			<div className={styles.meta}>
				{competition.clubName ? (
					<MetaRow icon="users">{competition.clubName}</MetaRow>
				) : null}
				{dateLabel ? (
					<MetaRow icon="calendar">{dateLabel}</MetaRow>
				) : null}
				{competition.location ? (
					<MetaRow icon="mapPin">{competition.location}</MetaRow>
				) : null}
			</div>
		</Link>
	);
}
