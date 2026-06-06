import { Link, useParams } from 'react-router-dom';
import { TOURNAMENT_APPS } from '../../constants';
import * as styles from './AppPage.css';

export function AppPage() {
	const { appSlug } = useParams<{ appSlug: string }>();
	const app = TOURNAMENT_APPS.find((item) => item.slug === appSlug);

	if (!app) {
		return (
			<main className={styles.page}>
				<section className={styles.container}>
					<h1 className={styles.title}>App not found</h1>
					<Link className={styles.backLink} to="/">
						Back to apps
					</Link>
				</section>
			</main>
		);
	}

	return (
		<main className={styles.page}>
			<section className={styles.container}>
				<Link className={styles.backLink} to="/">
					← Back to apps
				</Link>
				<h1 className={styles.title}>{app.name}</h1>
				<p className={styles.description}>{app.description}</p>
			</section>
		</main>
	);
}
