import {
	Anchor,
	Button,
	Container,
	Divider,
	Group,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { LoginCredentials } from '@monorepo/utils';
import { IconLock, IconMail, IconTrophy } from '@tabler/icons-react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { Api } from '../../api';
import { ThemeBox } from '../../components/shared/theme-box/ThemeBox';
import { ThemePaper } from '../../components/shared/theme-paper/ThemePaper';
import { LS_TOKEN_KEY } from '../../constants';
import { useAuthenticatedRedirectToHome } from '../../hooks/useAuthenticatedRedirectToHome';
import { useAuthStore } from '../../stores/auth';

export function LoginPage() {
	useAuthenticatedRedirectToHome();
	const authStore = useAuthStore();
	const form = useForm<LoginCredentials>({
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : 'Invalid email address',
			password: (value) =>
				value.length < 6 ? 'Password must be at least 6 characters' : null,
		},
	});

	const { mutate, isLoading } = useMutation(Api.publicApi.auth.login, {
		onSuccess: (data) => {
			authStore.setProfile(data.data.profile);
			localStorage.setItem(LS_TOKEN_KEY, data.data.token);
		},
		onError: (error) => {
			notifications.show({
				title: 'Login Failed',
				// @ts-expect-error -- test
				message: error?.response?.data?.message || 'Invalid email or password',
				color: 'red',
			});
		},
	});

	const onSubmit = async (data: typeof form.values) => {
		await mutate(data);
	};

	return (
		<ThemeBox variant="fullPage">
			<Container size="xs" w="100%">
				<ThemePaper light="white" dark="gray.9" p="xl" radius="md" shadow="lg">
					<Stack gap="xl">
						{/* Header Section */}
						<Stack gap="sm" align="center" ta="center">
							<ThemeBox variant="iconCircleBlue" style={{ margin: '0 auto' }}>
								<IconTrophy size={32} color="var(--mantine-color-blue-6)" />
							</ThemeBox>
							<Title order={1} size="h2" fw={700}>
								Welcome Back
							</Title>
							<Text c="dimmed" size="sm">
								Sign in to your account to continue
							</Text>
						</Stack>

						<Divider />

						{/* Form Section */}
						<form onSubmit={form.onSubmit(onSubmit)}>
							<Stack gap="md">
								<TextInput
									label="Email Address"
									placeholder="Enter your email"
									leftSection={<IconMail size={18} />}
									type="email"
									required
									{...form.getInputProps('email')}
								/>

								<TextInput
									label="Password"
									placeholder="Enter your password"
									leftSection={<IconLock size={18} />}
									type="password"
									required
									{...form.getInputProps('password')}
								/>

								<Button
									type="submit"
									fullWidth
									size="md"
									loading={isLoading}
									leftSection={<IconTrophy size={18} />}
								>
									Sign In
								</Button>
							</Stack>
						</form>

						{/* Footer Section */}
						<Stack gap="sm">
							<Divider label="OR" labelPosition="center" />
							<Group justify="center" gap="xs">
								<Text size="sm" c="dimmed">
									Don't have an account?
								</Text>
								<Anchor component={Link} to="/register" size="sm" fw={500}>
									Sign up
								</Anchor>
							</Group>
							<Group justify="center" gap="xs">
								<Text size="sm" c="dimmed">
									Forgot your password?
								</Text>
								<Anchor
									component={Link}
									to="/"
									size="sm"
									c="dimmed"
									style={{ textDecoration: 'underline' }}
								>
									Reset it
								</Anchor>
							</Group>
						</Stack>
					</Stack>
				</ThemePaper>
			</Container>
		</ThemeBox>
	);
}
