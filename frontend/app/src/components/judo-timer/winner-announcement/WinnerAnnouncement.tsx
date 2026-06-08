import { Modal } from '@components/shared/modal/Modal';
import { COUNTRY_OPTIONS } from '../constants';
import type { CompetitorScore, CompetitorSide } from '../types';
import { formatFighterName } from '../types';
import { countryCodeToFlag, getCountryLabel } from '../utils/countryFlag';
import { matchResultLabel, type MatchResult } from '../utils/matchResult';
import * as styles from './WinnerAnnouncement.css';

type WinnerAnnouncementProps = {
	result: MatchResult;
	white: CompetitorScore;
	blue: CompetitorScore;
	onDismiss: () => void;
};

function fighterForSide(
	side: CompetitorSide,
	white: CompetitorScore,
	blue: CompetitorScore,
): CompetitorScore {
	return side === 'white' ? white : blue;
}

function WinnerHeader({ title }: { title: string }) {
	return (
		<div className={styles.header}>
			<span className={styles.headerLine} aria-hidden="true" />
			<p id="winner-title" className={styles.kicker}>
				{title}
			</p>
			<span className={styles.headerLine} aria-hidden="true" />
		</div>
	);
}

export function WinnerAnnouncement({
	result,
	white,
	blue,
	onDismiss,
}: WinnerAnnouncementProps) {
	const reason = matchResultLabel(result);

	const cardClass = !result.winner
		? styles.card
		: result.winner === 'white'
			? styles.cardWhite
			: styles.cardBlue;

	return (
		<Modal
			titleId="winner-title"
			describedBy="winner-reason winner-dismiss-hint"
			onClose={onDismiss}
			panelClassName={cardClass}
			zIndex={40}
		>
			{!result.winner ? (
				<>
					<WinnerHeader title="Match result" />
					<div className={styles.body}>
						<h2 className={styles.drawTitle}>Draw</h2>
					</div>
				</>
			) : (
				<>
					<WinnerHeader title="Winner" />
					<WinnerBody
						fighter={fighterForSide(result.winner, white, blue)}
						side={result.winner}
					/>
				</>
			)}
			<p id="winner-reason" className={styles.reasonBadge}>
				{reason}
			</p>
			<p id="winner-dismiss-hint" className={styles.dismissHint}>
				Click outside to prepare the next match
			</p>
		</Modal>
	);
}

function WinnerBody({
	fighter,
	side,
}: {
	fighter: CompetitorScore;
	side: CompetitorSide;
}) {
	const name = formatFighterName(fighter);
	const flag = countryCodeToFlag(fighter.countryCode);
	const country = getCountryLabel(fighter.countryCode, COUNTRY_OPTIONS);
	const sideLabel = side === 'white' ? 'White' : 'Blue';

	return (
		<div className={styles.body}>
			{flag ? (
				<span className={styles.flag} role="img" aria-label={country}>
					{flag}
				</span>
			) : null}
			<div className={styles.nameBlock}>
				<span className={styles.side}>{sideLabel}</span>
				<h2 className={styles.name}>{name || '—'}</h2>
				{fighter.clubName ? (
					<p className={styles.club}>{fighter.clubName}</p>
				) : null}
			</div>
		</div>
	);
}
