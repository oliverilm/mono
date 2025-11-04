import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { CreateCompetition } from '@monorepo/utils';
import { IconEdit, IconPlus, IconTrophy } from '@tabler/icons-react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../../../api';
import { useAuthStore } from '../../../../stores/auth';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';

interface Props {
	onSubmit: () => void;
}

export function CompetitionFrom({ onSubmit: onDone }: Props) {
	const navigate = useNavigate();
	const authStore = useAuthStore();
	const queryClient = useQueryClient();

	const form = useForm<CreateCompetition>({
		initialValues: {
			name: '',
		},
		validate: {
			name: (value) =>
				value.trim().length < 3
					? 'Competition name must be at least 3 characters'
					: null,
		},
	});

	const { mutate, isLoading } = useMutation(
		Api.user.competition.createCompetition,
		{
			onSuccess: (data) => {
				notifications.show({
					title: 'Competition Created',
					message: 'Your competition has been created successfully!',
					color: 'green',
				});
				navigate(`/competitions/${data.data.slug}`);
				queryClient.invalidateQueries([
					'competitions-private',
					authStore.isAuthenticated,
				]);
				onDone();
			},
			onError: () => {
				notifications.show({
					title: 'Creation Failed',
					message: 'Failed to create competition. Please try again.',
					color: 'red',
				});
			},
		},
	);

	const onSubmit = async (values: typeof form.values) => {
		mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap="lg">
				{/* Header */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Group gap="xs" align="center">
							<IconTrophy size={24} color="var(--mantine-color-blue-6)" />
							<Title order={3} size="h4">
								Create New Competition
							</Title>
						</Group>
					</Stack>
				</ThemePaper>

				{/* Form Fields */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Title order={4} size="h5">
							Competition Details
						</Title>
						<TextInput
							label="Competition Name"
							placeholder="Enter competition name"
							description="Choose a descriptive name for your competition"
							leftSection={<IconEdit size={18} />}
							required
							size="md"
							{...form.getInputProps('name')}
						/>
					</Stack>
				</ThemePaper>

				{/* Submit Button */}
				<Group justify="flex-end">
					<Button
						type="submit"
						size="md"
						leftSection={<IconPlus size={18} />}
						loading={isLoading}
					>
						Create Competition
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
