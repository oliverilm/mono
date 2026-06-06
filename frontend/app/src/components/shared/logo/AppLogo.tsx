import logo from '../../../assets/ippon-logo.png';
import * as styles from './AppLogo.css';

type AppLogoProps = {
	size?: number;
};

export function AppLogo({ size = 88 }: AppLogoProps) {
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
