import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './BackLink.css';

type BackLinkProps = {
	to: string;
	children: ReactNode;
	variant?: 'dashboard' | 'light';
};

export function BackLink({
	to,
	children,
	variant = 'dashboard',
}: BackLinkProps) {
	return (
		<Link
			className={variant === 'dashboard' ? styles.dashboard : styles.light}
			to={to}
		>
			{children}
		</Link>
	);
}
