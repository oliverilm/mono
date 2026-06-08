import type { ReactNode } from 'react';
import { useAuthStore } from '@stores/auth';
import { formatDisplayName } from '@utils/format';
import { AppLogo } from '@components/shared/logo/AppLogo';
import * as styles from './DashboardShell.css';

type DashboardShellProps = {
	title?: string;
	subtitle?: string;
	children: ReactNode;
};

export function DashboardShell({
	title = 'Ippon',
	subtitle,
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
					<AppLogo variant="mark" size={28} />
					<p className={styles.brandText}>
						<span className={styles.brandLabel}>{title}</span>
						{subtitle ? (
							<span className={styles.brandSubtitle}>{subtitle}</span>
						) : null}
					</p>
				</div>

				<div className={styles.topBarActions}>
					{displayName ? (
						<p className={styles.userGreeting}>{displayName}</p>
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
