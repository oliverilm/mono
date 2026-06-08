import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useKeyboardShortcut } from '@hooks/useKeyboardShortcut';
import { BackLink } from '@components/shared/back-link/BackLink';
import { CompetitorPanel } from '../competitor-panel/CompetitorPanel';
import { KeyboardShortcutsModal } from '../keyboard-shortcuts-modal/KeyboardShortcutsModal';
import { OsaekomiPanel } from '../osaekomi-panel/OsaekomiPanel';
import { TatamiSetup } from '../tatami-setup/TatamiSetup';
import { WinnerAnnouncement } from '../winner-announcement/WinnerAnnouncement';
import { useJudoTimer } from '../hooks/useJudoTimer';
import { useWinnerAnnouncement } from '../hooks/useWinnerAnnouncement';
import type { TatamiConfig } from '../types';
import { formatTime } from '../utils/formatTime';
import { hasIpponOnBoard } from '../utils/scoreLimits';
import * as styles from './JudoTimerBoard.css';

type JudoTimerBoardProps = {
	initialConfig: TatamiConfig | null;
	onSaveConfig: (config: TatamiConfig) => void;
};

function phaseLabel(phase: string): string {
	switch (phase) {
		case 'ready':
			return 'Ready';
		case 'running':
			return 'Fighting';
		case 'paused':
			return 'Mate';
		case 'ended':
			return 'Ended';
		default:
			return phase;
	}
}

function timerHint(phase: string): string | null {
	switch (phase) {
		case 'ready':
			return 'Tap or Space to start';
		case 'running':
			return 'Tap or Space for mate';
		case 'paused':
			return 'Tap or Space to resume';
		default:
			return null;
	}
}

function timerAriaLabel(phase: string, time: string): string {
	switch (phase) {
		case 'ready':
			return `Start match. ${time} on the clock`;
		case 'running':
			return `Pause match (mate). ${time} remaining`;
		case 'paused':
			return `Resume match. ${time} on the clock`;
		default:
			return `Match time: ${time}`;
	}
}
function phaseClass(phase: string): string {
	switch (phase) {
		case 'running':
			return styles.phaseRunning;
		case 'paused':
			return styles.phasePaused;
		case 'ended':
			return styles.phaseEnded;
		default:
			return styles.phaseReady;
	}
}

export function JudoTimerBoard({
	initialConfig,
	onSaveConfig,
}: JudoTimerBoardProps) {
	const { competitionSlug } = useParams<{ competitionSlug: string }>();
	const {
		state,
		loadConfig,
		openSetup,
		cancelSetup,
		start,
		pause,
		resetMatch,
		awardScoreTo,
		removeScoreFrom,
		startOsaekomi,
		stopOsaekomi,
	} = useJudoTimer(initialConfig);

	const winnerAnnouncement = useWinnerAnnouncement(state, resetMatch);
	const { result: winnerResult, dismiss: dismissWinner, pendingAnnouncement } =
		winnerAnnouncement;

	const [shortcutsOpen, setShortcutsOpen] = useState(false);

	const scoreDisabled =
		state.phase !== 'running' &&
		state.phase !== 'paused' &&
		state.phase !== 'ended';

	const handleSaveSetup = (config: TatamiConfig) => {
		onSaveConfig(config);
		loadConfig(config);
	};

	const mainTimerClass = [
		styles.mainTimerValue,
		state.mainTimeRemaining <= 30 && state.phase === 'running'
			? styles.mainTimerCritical
			: '',
		state.mainTimeRemaining <= 60 &&
		state.mainTimeRemaining > 30 &&
		state.phase === 'running'
			? styles.mainTimerWarning
			: '',
	]
		.filter(Boolean)
		.join(' ');

	const toggleOsaekomi = (side: 'white' | 'blue') => {
		if (state.osaekomiActive && state.osaekomiSide === side) {
			stopOsaekomi();
			return;
		}
		if (
			!state.osaekomiActive &&
			state.phase === 'running' &&
			!hasIpponOnBoard(state.white, state.blue)
		) {
			startOsaekomi(side);
		}
	};

	const formattedTime = formatTime(state.mainTimeRemaining);
	const timerInteractive =
		state.phase === 'ready' ||
		state.phase === 'running' ||
		state.phase === 'paused';

	const handleTimerClick = () => {
		if (state.phase === 'ready' || state.phase === 'paused') {
			start();
			return;
		}
		if (state.phase === 'running') {
			pause();
		}
	};

	useKeyboardShortcut([
		{
			code: 'Space',
			key: ' ',
			enabled: timerInteractive && !winnerResult && !shortcutsOpen,
			onPress: () => {
				if (state.phase === 'ready' || state.phase === 'paused') {
					start();
				} else if (state.phase === 'running') {
					pause();
				}
			},
		},
		{
			key: '?',
			enabled: !winnerResult && !shortcutsOpen,
			onPress: () => setShortcutsOpen(true),
		},
	]);

	const mainTimerButtonClass = [
		styles.mainTimer,
		timerInteractive ? styles.mainTimerInteractive : styles.mainTimerDisabled,
	]
		.filter(Boolean)
		.join(' ');

	const hint = pendingAnnouncement
		? 'Press Enter to announce winner'
		: timerHint(state.phase);

	return (
		<div className={styles.page}>
			{shortcutsOpen ? (
				<KeyboardShortcutsModal onClose={() => setShortcutsOpen(false)} />
			) : null}

			{winnerResult ? (
				<WinnerAnnouncement
					result={winnerResult}
					white={state.white}
					blue={state.blue}
					onDismiss={dismissWinner}
				/>
			) : null}

			{state.phase === 'setup' ? (
				<TatamiSetup
					competitionSlug={competitionSlug ?? 'unknown'}
					initialConfig={state.config ?? initialConfig}
					onSave={handleSaveSetup}
					onCancel={state.config ? cancelSetup : undefined}
				/>
			) : null}

			<header className={styles.topBar}>
				<div className={styles.topBarLeft}>
					{competitionSlug ? (
						<BackLink
							to={`/competitions/${competitionSlug}`}
							variant="dashboard"
						>
							← Back
						</BackLink>
					) : null}
					<span className={styles.tatamiBadge}>
						Tatami {state.config?.tatami ?? '—'}
					</span>
					<p className={styles.topBarTitle}>Judo Timer</p>
				</div>
				<div className={styles.topBarActions}>
					<button
						className={styles.iconButton}
						type="button"
						onClick={() => setShortcutsOpen(true)}
						aria-label="Keyboard shortcuts"
					>
						Shortcuts
					</button>
					<button
						className={styles.iconButton}
						type="button"
						onClick={openSetup}
					>
						Setup
					</button>
				</div>
			</header>

			<div className={styles.board}>
				<div className={styles.competitorsStack}>
					<CompetitorPanel
						side="white"
						competitor={state.white}
						white={state.white}
						blue={state.blue}
						isOsaekomiActive={
							state.osaekomiActive && state.osaekomiSide === 'white'
						}
						disabled={scoreDisabled}
						onAwardScore={(scoreType) => awardScoreTo('white', scoreType)}
						onRemoveScore={(scoreType) => removeScoreFrom('white', scoreType)}
						onOsaekomiToggle={() => toggleOsaekomi('white')}
					/>
					<CompetitorPanel
						side="blue"
						competitor={state.blue}
						white={state.white}
						blue={state.blue}
						isOsaekomiActive={
							state.osaekomiActive && state.osaekomiSide === 'blue'
						}
						disabled={scoreDisabled}
						onAwardScore={(scoreType) => awardScoreTo('blue', scoreType)}
						onRemoveScore={(scoreType) => removeScoreFrom('blue', scoreType)}
						onOsaekomiToggle={() => toggleOsaekomi('blue')}
					/>
				</div>

				<div className={styles.timersSection}>
					<div className={styles.timersRow}>
						<button
							type="button"
							className={mainTimerButtonClass}
							onClick={handleTimerClick}
							disabled={!timerInteractive}
							aria-label={timerAriaLabel(state.phase, formattedTime)}
						>
							<span className={styles.mainTimerLabel}>Match time</span>
							<span className={mainTimerClass}>{formattedTime}</span>
							<span
								className={`${styles.phaseBadge} ${phaseClass(state.phase)}`}
							>
								{phaseLabel(state.phase)}
							</span>
							{hint ? (
								<span className={styles.mainTimerHint}>{hint}</span>
							) : null}
						</button>

						<OsaekomiPanel
							active={state.osaekomiActive}
							side={state.osaekomiSide}
							elapsed={state.osaekomiElapsed}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
