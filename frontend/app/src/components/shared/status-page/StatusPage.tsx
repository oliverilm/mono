import type { ReactNode } from 'react';
import { BackLink } from '../back-link/BackLink';
import * as styles from './StatusPage.css';

type StatusPageProps = {
	title: string;
	backTo: string;
	backLabel: string;
	children?: ReactNode;
	centered?: boolean;
};

export function StatusPage({
	title,
	backTo,
	backLabel,
	children,
	centered = true,
}: StatusPageProps) {
	return (
		<main className={centered ? styles.pageCentered : styles.page}>
			<section className={styles.container}>
				<BackLink to={backTo} variant="light">
					← {backLabel}
				</BackLink>
				<h1 className={styles.title}>{title}</h1>
				{children}
			</section>
		</main>
	);
}

export function StatusMessage({ children }: { children: ReactNode }) {
	return <p className={styles.message}>{children}</p>;
}
