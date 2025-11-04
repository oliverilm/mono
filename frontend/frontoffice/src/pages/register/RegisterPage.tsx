import {
	ActionIcon,
	Anchor,
	Box,
	Button,
	Container,
	Divider,
	Group,
	Stack,
	Text,
	TextInput,
	Title,
	useMantineColorScheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { LoginCredentials } from '@monorepo/utils';
import {
	IconEye,
	IconEyeOff,
	IconLock,
	IconMail,
	IconUserPlus,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { Api } from '../../api';
import { ThemePaper } from '../../components/shared/theme-paper/ThemePaper';
import { LS_TOKEN_KEY } from '../../constants';
import { useAuthenticatedRedirectToHome } from '../../hooks/useAuthenticatedRedirectToHome';
import { useAuthStore } from '../../stores/auth';

interface RegisterFormValues extends LoginCredentials {
	confirmPassword: string;
}

export function RegisterPage() {
	useAuthenticatedRedirectToHome();
	const { colorScheme } = useMantineColorScheme();
	const authStore = useAuthStore();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const form = useForm<RegisterFormValues>({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : 'Invalid email address',
			password: (value) =>
				value.length < 6 ? 'Password must be at least 6 characters' : null,
			confirmPassword: (value, values) =>
				value !== values.password ? 'Passwords do not match' : null,
		},
	});

	const { mutate, isLoading } = useMutation(Api.publicApi.auth.createUser, {
		onSuccess: (data) => {
			authStore.setProfile(data.data.profile);
			localStorage.setItem(LS_TOKEN_KEY, data.data.token);
		},
		onError: (error) => {
			notifications.show({
				title: 'Registration Failed',
				// @ts-expect-error -- test
				message: error?.response?.data?.message || 'Unable to create account',
				color: 'red',
			});
		},
	});

	const onSubmit = async (data: typeof form.values) => {
		// Only send email and password to the API, not confirmPassword
		const { confirmPassword, ...submitData } = data;
		mutate(submitData);
	};

	return (
		<Box
			style={{
				minHeight: 'calc(100vh - var(--header-height, 60px))',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background:
					colorScheme === 'dark'
						? 'linear-gradient(135deg, var(--mantine-color-blue-9) 0%, var(--mantine-color-blue-8) 100%)'
						: 'linear-gradient(135deg, var(--mantine-color-blue-2) 0%, var(--mantine-color-blue-1) 100%)',
				padding: '2rem 1rem',
			}}
		>
			<Container size="xs" w="100%">
				<ThemePaper light="white" dark="gray.9" p="xl" radius="md" shadow="lg">
					<Stack gap="xl">
						{/* Header Section */}
						<Stack gap="sm" align="center" ta="center">
							<Box
								style={{
									width: 64,
									height: 64,
									borderRadius: '50%',
									background:
										colorScheme === 'dark'
											? 'var(--mantine-color-blue-9)'
											: 'var(--mantine-color-blue-1)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									margin: '0 auto',
								}}
							>
								<IconUserPlus size={32} color="var(--mantine-color-blue-6)" />
							</Box>
							<Title order={1} size="h2" fw={700}>
								Create Account
							</Title>
							<Text c="dimmed" size="sm">
								Join us to start managing your competitions
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
									placeholder="Create a password"
									leftSection={<IconLock size={18} />}
									type={passwordVisible ? 'text' : 'password'}
									required
									description="Must be at least 6 characters"
									rightSection={
										<ActionIcon
											variant="transparent"
											onClick={() => setPasswordVisible(!passwordVisible)}
											aria-label={
												passwordVisible ? 'Hide password' : 'Show password'
											}
										>
											{passwordVisible ? (
												<IconEyeOff size={18} />
											) : (
												<IconEye size={18} />
											)}
										</ActionIcon>
									}
									{...form.getInputProps('password')}
								/>

								<TextInput
									label="Confirm Password"
									placeholder="Confirm your password"
									leftSection={<IconLock size={18} />}
									type={confirmPasswordVisible ? 'text' : 'password'}
									required
									rightSection={
										<ActionIcon
											variant="transparent"
											onClick={() =>
												setConfirmPasswordVisible(!confirmPasswordVisible)
											}
											aria-label={
												confirmPasswordVisible
													? 'Hide confirm password'
													: 'Show confirm password'
											}
										>
											{confirmPasswordVisible ? (
												<IconEyeOff size={18} />
											) : (
												<IconEye size={18} />
											)}
										</ActionIcon>
									}
									{...form.getInputProps('confirmPassword')}
								/>

								<Button
									type="submit"
									fullWidth
									size="md"
									loading={isLoading}
									leftSection={<IconUserPlus size={18} />}
								>
									Create Account
								</Button>
							</Stack>
						</form>

						{/* Footer Section */}
						<Stack gap="sm">
							<Divider label="OR" labelPosition="center" />
							<Group justify="center" gap="xs">
								<Text size="sm" c="dimmed">
									Already have an account?
								</Text>
								<Anchor component={Link} to="/login" size="sm" fw={500}>
									Sign in
								</Anchor>
							</Group>
						</Stack>
					</Stack>
				</ThemePaper>
			</Container>
		</Box>
	);
}
