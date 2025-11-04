import { useAuthStore } from '../../stores/auth';
import { HomePagePublic } from './public/HomePagePublic';
import { HomePageAuthenticated } from './user/HomePageAuthenticated';

export function HomePage() {
	const authStore = useAuthStore();

	if (authStore.isAuthenticated) {
		return <HomePageAuthenticated />;
	}

	return <HomePagePublic />;
}
