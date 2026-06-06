import { getErrorMessage } from '@monorepo/api-client';
import { type FormEvent, useState } from 'react';
import { api } from '../../../api/client';
import { Input } from '../../../components/shared/input/Input';
import { AppLogo } from '../../../components/shared/logo/AppLogo';
import { useAuthStore } from '../../../stores/auth';
import * as styles from './HomePagePublic.css';

export function HomePagePublic() {
	const authStore = useAuthStore();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const { data } = await api.public.auth.login({ email, password });

			if (!data) {
				setError('Login failed. Please try again.');
				return;
			}

			api.http.getTokenStorage().setToken(data.token);
			authStore.setProfile(data.profile);
		} catch (err) {
			setError(getErrorMessage(err) ?? 'Invalid email or password');
		} finally {
			setIsLoading(false);
		}
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
					<Input
						id="email"
						label="Email"
						icon="mail"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="you@dojo.com"
						autoComplete="email"
						required
						disabled={isLoading}
					/>

					<Input
						id="password"
						label="Password"
						icon="lock"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="Enter your password"
						autoComplete="current-password"
						required
						disabled={isLoading}
					/>

					{error ? (
						<p className={styles.error} role="alert">
							{error}
						</p>
					) : null}

					<button
						className={styles.submitButton}
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? 'Signing in…' : 'Sign in'}
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
