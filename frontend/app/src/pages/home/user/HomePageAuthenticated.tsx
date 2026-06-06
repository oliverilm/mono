import { Link } from 'react-router-dom';
import { ELEMENTS } from '../../../constants';
import { useAuthStore } from '../../../stores/auth';

export function HomePageAuthenticated() {
	const authStore = useAuthStore();

	return (
		<main>
			<h1>Elements</h1>
			<ul>
				{ELEMENTS.map((element) => (
					<li key={element.slug}>
						<Link to={`/${element.slug}`}>{element.name}</Link>
					</li>
				))}
			</ul>
			<button type="button" onClick={() => authStore.logout()}>
				Log out
			</button>
		</main>
	);
}
