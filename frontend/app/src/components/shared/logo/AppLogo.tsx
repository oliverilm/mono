import logo from '../../../assets/ippon-logo.png';
import * as styles from './AppLogo.css';

type AppLogoProps = {
	size?: number;
	/** Full logo with wordmark for marketing surfaces; mark is icon-only for compact headers. */
	variant?: 'full' | 'mark';
};

export function AppLogo({ size = 88, variant = 'full' }: AppLogoProps) {
	if (variant === 'mark') {
		return (
			<img
				className={styles.mark}
				src={logo}
				alt="Ippon"
				width={size}
				height={size}
			/>
		);
	}

	return (
		<div className={styles.root}>
			<img
				className={styles.logo}
				src={logo}
				alt="Ippon judo tournament logo"
				width={size}
				height={size}
			/>
			<div className={styles.wordmark}>
				<span className={styles.brand}>Ippon</span>
				<span className={styles.tagline}>Tournament Runner</span>
			</div>
		</div>
	);
}
