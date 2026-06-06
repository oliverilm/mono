import * as styles from '../../../components/layout/DashboardShell.css';

type EmptyStateProps = {
	title: string;
	description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
	return (
		<div className={styles.emptyState}>
			<p className={styles.emptyStateTitle}>{title}</p>
			<p className={styles.emptyStateText}>{description}</p>
		</div>
	);
}
