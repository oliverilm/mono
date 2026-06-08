import { Icon, type IconName } from '@monorepo/icons';
import type { ReactNode } from 'react';
import { theme } from '@styles/theme';
import * as styles from './MetaRow.css';

type MetaRowProps = {
	icon: IconName;
	children: ReactNode;
};

export function MetaRow({ icon, children }: MetaRowProps) {
	return (
		<div className={styles.row}>
			<span className={styles.icon}>
				<Icon name={icon} size="s" color={theme.color.icon.muted} />
			</span>
			<span className={styles.value}>{children}</span>
		</div>
	);
}
