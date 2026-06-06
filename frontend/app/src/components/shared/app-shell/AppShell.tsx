import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { BackLink } from '../back-link/BackLink';
import * as styles from './AppShell.css';

type AppShellProps = {
	title: string;
	description?: string;
	children?: ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
	const { competitionSlug } = useParams<{ competitionSlug: string }>();
	const backTo = competitionSlug
		? `/competitions/${competitionSlug}`
		: '/';
	const backLabel = competitionSlug ? 'Back to competition' : 'Back to apps';

	return (
		<main className={styles.page}>
			<section className={styles.container}>
				<BackLink to={backTo} variant="light">
					← {backLabel}
				</BackLink>
				<h1 className={styles.title}>{title}</h1>
				{description ? (
					<p className={styles.description}>{description}</p>
				) : null}
				{children ?? (
					<div className={styles.placeholder}>Coming soon</div>
				)}
			</section>
		</main>
	);
}
