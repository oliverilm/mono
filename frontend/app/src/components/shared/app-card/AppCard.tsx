import { Icon, type IconName } from '@monorepo/icons';
import { Link } from 'react-router-dom';
import * as styles from './AppCard.css';

type AppCardProps = {
	slug: string;
	name: string;
	description: string;
	icon: IconName;
};

export function AppCard({ slug, name, description, icon }: AppCardProps) {
	return (
		<Link className={styles.card} to={`/apps/${slug}`}>
			<span className={styles.iconWrap}>
				<Icon name={icon} size="lg" color="#2563eb" variant="solid" />
			</span>
			<span className={styles.content}>
				<span className={styles.name}>{name}</span>
				<span className={styles.description}>{description}</span>
			</span>
			<Icon
				className={styles.chevron}
				name="chevronRight"
				size="s"
				color="#94a3b8"
			/>
		</Link>
	);
}
