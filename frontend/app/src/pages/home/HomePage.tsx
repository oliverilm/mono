import { useAuthStore } from '@stores/auth';
import { HomePagePublic } from './public/HomePagePublic';
import { HomePageAuthenticated } from './user/HomePageAuthenticated';
import * as styles from './HomePage.css';

export function HomePage() {
	const authStore = useAuthStore();

	if (!authStore.isReady) {
		return (
			<main className={styles.loadingPage}>
				<p className={styles.loadingText}>Loading…</p>
			</main>
		);
	}

	if (authStore.isAuthenticated) {
		return <HomePageAuthenticated />;
	}

	return <HomePagePublic />;
}
