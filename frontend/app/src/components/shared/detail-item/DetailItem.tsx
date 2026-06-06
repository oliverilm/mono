import { Icon, type IconName } from '@monorepo/icons';
import { theme } from '../../../styles/theme';
import * as styles from './DetailItem.css';

type DetailItemProps = {
	icon: IconName;
	label: string;
	value: string;
};

export function DetailItem({ icon, label, value }: DetailItemProps) {
	return (
		<div className={styles.item}>
			<dt className={styles.label}>
				<Icon name={icon} size="s" color={theme.color.icon.muted} />
				{label}
			</dt>
			<dd className={styles.value}>{value}</dd>
		</div>
	);
}
