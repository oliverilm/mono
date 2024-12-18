import { useForm } from '@mantine/form';
import { login } from '../../api/auth';
import { useAuthStore } from '../../stores/auth';
import { Button, TextInput } from '@mantine/core';
import { useAuthenticatedRedirectToHome } from '../../hooks/useAuthenticatedRedirectToHome';
import { LS_TOKEN_KEY } from '../../constants';
import { LoginCredentials } from '@monorepo/utils';
import { LayoutPage } from '../layout/page/LayoutPage';
import { useMutation } from 'react-query';
import { notifications } from '@mantine/notifications';

export function LoginPage() {
	useAuthenticatedRedirectToHome();
	const authStore = useAuthStore();
	const form = useForm<LoginCredentials>({
		initialValues: {
			email: '',
			password: '',
		},
	});

	const { mutate } = useMutation(login, {
		onSuccess: (data) => {
			authStore.setProfile(data.data.profile);
			localStorage.setItem(LS_TOKEN_KEY, data.data.token);
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				// @ts-expect-error
				message: error?.response?.data?.message,
				color: 'red',
			});
		},
	});

	const onSubmit = async (data: typeof form.values) => {
		await mutate(data);
	};
	return (
		<LayoutPage>
			<form onSubmit={form.onSubmit(onSubmit)}>
				<h1>Login Page</h1>
				<TextInput {...form.getInputProps('email')} label="email" />
				<TextInput
					{...form.getInputProps('password')}
					label="password"
					type="password"
				/>

				<Button type="submit">Log in</Button>
			</form>
		</LayoutPage>
	);
}
