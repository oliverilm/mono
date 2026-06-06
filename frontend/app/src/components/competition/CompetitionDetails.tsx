import type { ManagedCompetition } from '../../mocks/managedCompetitions';
import { formatDate } from '../../utils/format';
import { CompetitionBadges } from '../shared/competition-badges/CompetitionBadges';
import { DetailItem } from '../shared/detail-item/DetailItem';
import { panel } from '../shared/content-panel/ContentPanel.css';
import * as styles from './CompetitionDetails.css';

type CompetitionDetailsProps = {
	competition: ManagedCompetition;
};

export function CompetitionDetails({ competition }: CompetitionDetailsProps) {
	const startDate = formatDate(competition.startingAt, 'long');
	const registrationEnd = formatDate(competition.registrationEndAt, 'long');

	return (
		<section
			className={`${panel} ${styles.panel}`}
			aria-labelledby="competition-name"
		>
			<div className={styles.header}>
				<div>
					<h1 id="competition-name" className={styles.name}>
						{competition.name}
					</h1>
					<div className={styles.badges}>
						<CompetitionBadges
							role={competition.role}
							isPublished={competition.isPublished}
							isArchived={competition.isArchived}
							showPublished
						/>
					</div>
				</div>
			</div>

			{competition.description ? (
				<p className={styles.description}>{competition.description}</p>
			) : null}

			<dl className={styles.grid}>
				{competition.clubName ? (
					<DetailItem
						icon="users"
						label="Club"
						value={competition.clubName}
					/>
				) : null}
				{startDate ? (
					<DetailItem
						icon="calendar"
						label="Start date"
						value={startDate}
					/>
				) : null}
				{registrationEnd ? (
					<DetailItem
						icon="clock"
						label="Registration closes"
						value={registrationEnd}
					/>
				) : null}
				{competition.location ? (
					<DetailItem
						icon="mapPin"
						label="Location"
						value={competition.location}
					/>
				) : null}
			</dl>
		</section>
	);
}
