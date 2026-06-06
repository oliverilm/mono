import type { ReactNode } from 'react';
import * as styles from './PageSection.css';

type PageSectionProps = {
	title: string;
	subtitle?: string;
	titleId?: string;
	titleLevel?: 'h1' | 'h2';
	children: ReactNode;
};

export function PageSection({
	title,
	subtitle,
	titleId,
	titleLevel = 'h2',
	children,
}: PageSectionProps) {
	const TitleTag = titleLevel;

	return (
		<section className={styles.section} aria-labelledby={titleId}>
			<div className={styles.header}>
				<div>
					<TitleTag id={titleId} className={styles.title}>
						{title}
					</TitleTag>
					{subtitle ? (
						<p className={styles.subtitle}>{subtitle}</p>
					) : null}
				</div>
			</div>
			{children}
		</section>
	);
}
