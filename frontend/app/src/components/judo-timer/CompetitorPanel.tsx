import type { MouseEvent } from 'react';
import { COUNTRY_OPTIONS, SHIDO_HANSOKU_MAKE } from './constants';
import type { CompetitorScore, CompetitorSide } from './types';
import { ScoreType } from './types';
import { formatFighterName } from './types';
import { countryCodeToFlag, getCountryLabel } from './utils/countryFlag';
import { canAwardScore, hasIpponOnBoard, isScoreAtLimit } from './utils/scoreLimits';
import * as styles from './CompetitorPanel.css';

const SCORE_COLUMNS: { type: Exclude<ScoreType, ScoreType.Shido>; label: string }[] = [
	{ type: ScoreType.Ippon, label: 'Ippon' },
	{ type: ScoreType.WazaAri, label: 'Waza-ari' },
	{ type: ScoreType.Yuko, label: 'Yuko' },
];

type CompetitorPanelProps = {
	side: CompetitorSide;
	competitor: CompetitorScore;
	white: CompetitorScore;
	blue: CompetitorScore;
	isOsaekomiActive: boolean;
	disabled: boolean;
	onAwardScore: (scoreType: ScoreType) => void;
	onRemoveScore: (scoreType: ScoreType) => void;
	onOsaekomiToggle: () => void;
};

function handleScoreContextMenu(
	event: MouseEvent<HTMLButtonElement>,
	onRemove: () => void,
) {
	event.preventDefault();
	onRemove();
}

export function CompetitorPanel({
	side,
	competitor,
	white,
	blue,
	isOsaekomiActive,
	disabled,
	onAwardScore,
	onRemoveScore,
	onOsaekomiToggle,
}: CompetitorPanelProps) {
	const isWhite = side === 'white';
	const panelClass = [
		isWhite ? styles.whitePanel : styles.bluePanel,
		isOsaekomiActive ? styles.activePanel : '',
	]
		.filter(Boolean)
		.join(' ');

	const scoreCellClass = isWhite ? styles.scoreCellWhite : styles.scoreCellBlue;
	const shidoClass = [
		isWhite ? styles.shidoControlWhite : styles.shidoControlBlue,
		competitor.shido >= 1 ? styles.shidoControlActive : '',
		competitor.shido >= SHIDO_HANSOKU_MAKE ? styles.shidoControlFull : '',
	]
		.filter(Boolean)
		.join(' ');

	const osaekomiClass = [
		isWhite ? styles.osaekomiButton : styles.osaekomiButtonBlue,
		isOsaekomiActive ? styles.osaekomiButtonActive : '',
	]
		.filter(Boolean)
		.join(' ');

	const fullName = formatFighterName(competitor);
	const flag = countryCodeToFlag(competitor.countryCode);
	const countryLabel = getCountryLabel(competitor.countryCode, COUNTRY_OPTIONS);
	const additionsLocked = hasIpponOnBoard(white, blue);

	return (
		<section className={panelClass} aria-label={`${side} competitor`}>
			<div className={styles.identity}>
				{flag ? (
					<span
						className={styles.countryFlag}
						role="img"
						aria-label={countryLabel}
					>
						{flag}
					</span>
				) : null}
				<div className={styles.identityText}>
					<span className={styles.sideLabel}>{isWhite ? 'White' : 'Blue'}</span>
					{competitor.clubName ? (
						<p className={styles.clubName}>{competitor.clubName}</p>
					) : null}
					<h2 className={styles.fullName}>{fullName || '—'}</h2>
				</div>
			</div>

			<div className={styles.controlsColumn}>
				<div className={styles.scoreGrid} role="group" aria-label="Score counters">
					{SCORE_COLUMNS.map(({ type, label }) => {
						const value = competitor[type];
						const atLimit =
							additionsLocked || isScoreAtLimit(white, blue, competitor, type);
						const highlightClass =
							type === ScoreType.Ippon && value >= 1
								? styles.scoreCellIppon
								: type === ScoreType.WazaAri && value >= 1
									? styles.scoreCellWazaAri
									: '';

						return (
							<button
								key={type}
								type="button"
								className={[
									scoreCellClass,
									highlightClass,
									atLimit ? styles.scoreCellAtMax : '',
								]
									.filter(Boolean)
									.join(' ')}
								disabled={disabled}
								onClick={() => {
									if (
										disabled ||
										!canAwardScore(white, blue, competitor, type)
									) {
										return;
									}
									onAwardScore(type);
								}}
								onContextMenu={(event) => {
									if (disabled || value <= 0) return;
									handleScoreContextMenu(event, () => onRemoveScore(type));
								}}
								aria-label={`Award ${label} to ${fullName || side}. Current: ${value}. Right-click to remove.${atLimit ? ' Cannot add more.' : ''}`}
							>
								<span className={styles.scoreCellLabel}>
									{type === ScoreType.WazaAri ? 'Waza' : label}
								</span>
								<span className={styles.scoreCellValue}>{value}</span>
							</button>
						);
					})}

					<button
						type="button"
						className={[
							shidoClass,
							additionsLocked ? styles.scoreCellAtMax : '',
						]
							.filter(Boolean)
							.join(' ')}
						disabled={disabled}
						onClick={() => {
							if (disabled || additionsLocked) return;
							onAwardScore(ScoreType.Shido);
						}}
						onContextMenu={(event) => {
							if (disabled || competitor.shido <= 0) return;
							handleScoreContextMenu(event, () =>
								onRemoveScore(ScoreType.Shido),
							);
						}}
						aria-label={`Award shido to ${fullName || side}. Current: ${competitor.shido} of ${SHIDO_HANSOKU_MAKE}. Right-click to remove.`}
					>
						<span className={styles.shidoLabel}>Shido</span>
						<span className={styles.shidoCount}>{competitor.shido}</span>
						<span className={styles.shidoDots} aria-hidden="true">
							{Array.from({ length: SHIDO_HANSOKU_MAKE }, (_, index) => (
								<span
									key={index}
									className={
										index < competitor.shido
											? styles.shidoDotFilled
											: styles.shidoDotEmpty
									}
								/>
							))}
						</span>
					</button>

					<button
						className={osaekomiClass}
						type="button"
						disabled={disabled}
						onClick={onOsaekomiToggle}
					>
						<span className={styles.osaekomiLabel}>Osaekomi</span>
						<span className={styles.osaekomiValue}>
							{isOsaekomiActive ? 'Toketa' : '—'}
						</span>
					</button>
				</div>
			</div>
		</section>
	);
}
