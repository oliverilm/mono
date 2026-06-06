import { AppCard } from '../../../components/shared/app-card/AppCard';
import { AppLogo } from '../../../components/shared/logo/AppLogo';
import { TOURNAMENT_APPS } from '../../../constants';
import { useAuthStore } from '../../../stores/auth';
import * as styles from './HomePageAuthenticated.css';

function formatDisplayName(
	firstName: string | null,
	lastName: string | null,
): string | null {
	const parts = [firstName, lastName].filter(Boolean);
	return parts.length > 0 ? parts.join(' ') : null;
}

export function HomePageAuthenticated() {
	const authStore = useAuthStore();
	const displayName = authStore.profile
		? formatDisplayName(
				authStore.profile.firstName,
				authStore.profile.lastName,
			)
		: null;

	return (
		<main className={styles.page}>
			<section className={styles.container} aria-labelledby="apps-title">
				<header className={styles.header}>
					<AppLogo size={72} />
					<div>
						<h1 id="apps-title" className={styles.title}>
							Choose an app
						</h1>
						<p className={styles.subtitle}>
							{displayName
								? `Welcome back, ${displayName}. Select a tournament tool to open on this device.`
								: 'Select a tournament tool to open on this device.'}
						</p>
					</div>
				</header>

				<div className={styles.appList}>
					{TOURNAMENT_APPS.map((app) => (
						<AppCard
							key={app.slug}
							slug={app.slug}
							name={app.name}
							description={app.description}
							icon={app.icon}
						/>
					))}
				</div>

				<footer className={styles.footer}>
					<button
						className={styles.logoutButton}
						type="button"
						onClick={() => authStore.logout()}
					>
						Log out
					</button>
				</footer>
			</section>
		</main>
	);
}
