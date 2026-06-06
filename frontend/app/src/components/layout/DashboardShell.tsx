import type { ReactNode } from 'react';
import { AppLogo } from '../shared/logo/AppLogo';
import { formatDisplayName } from '../../utils/format';
import { useAuthStore } from '../../stores/auth';
import * as styles from './DashboardShell.css';

type DashboardShellProps = {
	title?: string;
	subtitle?: string;
	children: ReactNode;
};

export function DashboardShell({
	title = 'Ippon',
	subtitle = 'Tournament workspace',
	children,
}: DashboardShellProps) {
	const authStore = useAuthStore();
	const displayName = authStore.profile
		? formatDisplayName(
				authStore.profile.firstName,
				authStore.profile.lastName,
			)
		: null;

	return (
		<div className={styles.page}>
			<header className={styles.topBar}>
				<div className={styles.brand}>
					<AppLogo size={48} />
					<div>
						<p className={styles.brandLabel}>{title}</p>
						<p className={styles.brandSubtitle}>{subtitle}</p>
					</div>
				</div>

				<div className={styles.topBarActions}>
					{displayName ? (
						<p className={styles.userGreeting}>Welcome, {displayName}</p>
					) : null}
					<button
						className={styles.logoutButton}
						type="button"
						onClick={() => authStore.logout()}
					>
						Log out
					</button>
				</div>
			</header>

			<main className={styles.main}>{children}</main>
		</div>
	);
}
