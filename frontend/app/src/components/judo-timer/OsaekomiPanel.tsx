import {
	OSAEKOMI_IPPON_AT,
	OSAEKOMI_WAZA_ARI_AT,
} from './constants';
import type { CompetitorSide } from './types';
import { formatOsaekomi } from './utils/formatTime';
import * as styles from './OsaekomiPanel.css';

type OsaekomiPanelProps = {
	active: boolean;
	side: CompetitorSide | null;
	elapsed: number;
};

export function OsaekomiPanel({ active, side, elapsed }: OsaekomiPanelProps) {
	if (!active || !side) {
		return (
			<div className={styles.panel}>
				<p className={styles.idleHint}>
					Osaekomi timer — start from a competitor panel during the match
				</p>
			</div>
		);
	}

	const timerClass = [
		styles.timer,
		elapsed >= OSAEKOMI_IPPON_AT ? styles.timerIppon : '',
		elapsed >= OSAEKOMI_WAZA_ARI_AT && elapsed < OSAEKOMI_IPPON_AT
			? styles.timerWazaAri
			: '',
	]
		.filter(Boolean)
		.join(' ');

	let hint = 'Hold — waza-ari at 10s, ippon at 20s';
	if (elapsed >= OSAEKOMI_WAZA_ARI_AT && elapsed < OSAEKOMI_IPPON_AT) {
		hint = 'Waza-ari awarded — hold for ippon';
	}

	return (
		<div className={`${styles.panel} ${styles.panelActive}`}>
			<p className={styles.label}>Osaekomi</p>
			<p className={styles.side}>{side === 'white' ? 'White' : 'Blue'} holding</p>
			<p className={timerClass}>{formatOsaekomi(elapsed)}</p>
			<p className={styles.hint}>{hint}</p>
		</div>
	);
}
