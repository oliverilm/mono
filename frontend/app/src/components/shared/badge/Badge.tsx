import type { ReactNode } from 'react';
import * as styles from './Badge.css';

export type BadgeVariant = 'role' | 'draft' | 'published' | 'archived';

type BadgeProps = {
	variant: BadgeVariant;
	children: ReactNode;
};

const variantClass: Record<BadgeVariant, string> = {
	role: styles.role,
	draft: styles.draft,
	published: styles.published,
	archived: styles.archived,
};

export function Badge({ variant, children }: BadgeProps) {
	return <span className={variantClass[variant]}>{children}</span>;
}

export function BadgeGroup({ children }: { children: ReactNode }) {
	return <div className={styles.group}>{children}</div>;
}
