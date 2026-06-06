import { Icon, type IconName } from '@monorepo/icons';
import { Link } from 'react-router-dom';
import { theme } from '../../../styles/theme';
import * as styles from './AppCard.css';

type AppCardProps = {
	competitionSlug: string;
	slug: string;
	name: string;
	description: string;
	icon: IconName;
	layout?: 'row' | 'tile';
};

export function AppCard({
	competitionSlug,
	slug,
	name,
	description,
	icon,
	layout = 'tile',
}: AppCardProps) {
	return (
		<Link
			className={layout === 'tile' ? styles.tile : styles.card}
			to={`/competitions/${competitionSlug}/apps/${slug}`}
		>
			<span className={styles.iconWrap}>
				<Icon
					name={icon}
					size="lg"
					color={theme.color.icon.accent}
					variant="solid"
				/>
			</span>
			<span className={styles.content}>
				<span className={styles.name}>{name}</span>
				<span className={styles.description}>{description}</span>
			</span>
			<Icon
				className={styles.chevron}
				name="chevronRight"
				size="s"
				color={theme.color.icon.muted}
			/>
		</Link>
	);
}
