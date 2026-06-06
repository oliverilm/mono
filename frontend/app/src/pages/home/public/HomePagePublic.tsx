import { Icon } from '@monorepo/icons';
import { type FormEvent, useState } from 'react';
import { AppLogo } from '../../../components/shared/logo/AppLogo';
import { useAuthStore } from '../../../stores/auth';
import * as styles from './HomePagePublic.css';

export function HomePagePublic() {
	const authStore = useAuthStore();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		authStore.login();
	};

	return (
		<main className={styles.page}>
			<section className={styles.modal} aria-labelledby="login-title">
				<header className={styles.header}>
					<AppLogo />
					<div>
						<h1 id="login-title" className={styles.title}>
							Welcome back
						</h1>
						<p className={styles.subtitle}>
							Sign in to manage brackets, registrations, and live tatami
							schedules.
						</p>
					</div>
				</header>

				<form className={styles.form} onSubmit={onSubmit}>
					<div className={styles.field}>
						<label className={styles.label} htmlFor="email">
							Email
						</label>
						<div className={styles.inputWrapper}>
							<span className={styles.inputIcon}>
								<Icon name="mail" size="s" color="#94a3b8" />
							</span>
							<input
								id="email"
								className={styles.input}
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="you@dojo.com"
								autoComplete="email"
								required
							/>
						</div>
					</div>

					<div className={styles.field}>
						<label className={styles.label} htmlFor="password">
							Password
						</label>
						<div className={styles.inputWrapper}>
							<span className={styles.inputIcon}>
								<Icon name="lock" size="s" color="#94a3b8" />
							</span>
							<input
								id="password"
								className={styles.input}
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								placeholder="Enter your password"
								autoComplete="current-password"
								required
							/>
						</div>
					</div>

					<button className={styles.submitButton} type="submit">
						Sign in
					</button>
				</form>

				<p className={styles.footer}>
					Ippon helps clubs run judo tournaments from weigh-in to medal
					ceremony.
				</p>
			</section>
		</main>
	);
}
