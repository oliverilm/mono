import {
	Button,
	Group,
	Paper,
	Stack,
	Switch,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import '@mantine/dates/styles.css';
import type { UpdateCompetition } from '@monorepo/utils';
import {
	IconCalendar,
	IconDeviceFloppy,
	IconEdit,
	IconMapPin,
	IconWorld,
	IconWorldOff,
} from '@tabler/icons-react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../../../api';
import type { CompetitionListItem } from '../../../../api/utils/common-types';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { useAuthStore } from '../../../../stores/auth';
import { RichText } from '../../../shared/rich-text/RichText';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';

interface Props {
	competition: CompetitionListItem;
	onSubmitSuccess: () => void;
}
export function CompetitionUpdateForm({ competition, onSubmitSuccess }: Props) {
	const queryClient = useQueryClient();
	const authStore = useAuthStore();
	const navigate = useNavigate();

	const form = useForm<UpdateCompetition>({
		initialValues: {
			id: competition.id,
			description: competition.description ?? '',
			isPublished: competition.isPublished || false,
			location: competition.location ?? '',
			name: competition.name ?? '',
			registrationEndAt:
				new Date(competition.registrationEndAt).toISOString() ??
				new Date().toISOString(),
			startingAt:
				new Date(competition.startingAt).toISOString() ??
				new Date().toISOString(),
		},
	});

	const { mutate, isLoading } = useMutation({
		mutationFn: Api.user.competition.updateCompetition,
		onSuccess: (data) => {
			if (data.data.isPublished !== competition.isPublished) {
				queryClient.invalidateQueries([
					'competitions-private',
					authStore.isAuthenticated,
				]);
			}
			if (data.data.slug !== competition.slug) {
				navigate(`/competitions/${data.data.slug}`);
			} else {
				queryClient.invalidateQueries([
					StaticQueryKey.CompetitionDetail,
					competition.slug,
				]);
			}
			notifications.show({
				title: 'Competition Updated',
				message: 'Competition has been updated successfully',
				color: 'green',
			});
			onSubmitSuccess();
		},
		onError: () => {
			notifications.show({
				title: 'Update Failed',
				message: 'Failed to update competition. Please try again.',
				color: 'red',
			});
		},
	});

	const onSubmit = async (values: typeof form.values) => {
		mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap="lg">
				{/* Basic Information */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Title order={4} size="h5">
							Basic Information
						</Title>
						<TextInput
							label="Competition Name"
							placeholder="Enter competition name"
							leftSection={<IconEdit size={18} />}
							required
							{...form.getInputProps('name')}
						/>
						<RichText
							onChange={form.getInputProps('description').onChange}
							value={form.getInputProps('description').value}
						/>
					</Stack>
				</ThemePaper>

				{/* Location & Dates */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Title order={4} size="h5">
							Location & Dates
						</Title>
						<TextInput
							label="Location"
							placeholder="Enter competition location"
							leftSection={<IconMapPin size={18} />}
							{...form.getInputProps('location')}
						/>
						<Group grow>
							<DateTimePicker
								label="Start Date & Time"
								placeholder="Select start date and time"
								leftSection={<IconCalendar size={18} />}
								value={
									form.values.startingAt
										? new Date(form.values.startingAt)
										: null
								}
								onChange={(value: string | null) => {
									if (value && typeof value === 'string') {
										const date = new Date(value);
										if (!Number.isNaN(date.getTime())) {
											form.setFieldValue('startingAt', date.toISOString());
										}
									} else if (value === null) {
										form.setFieldValue('startingAt', '');
									}
								}}
							/>
							<DateTimePicker
								label="Registration End Date & Time"
								placeholder="Select registration end date and time"
								leftSection={<IconCalendar size={18} />}
								value={
									form.values.registrationEndAt
										? new Date(form.values.registrationEndAt)
										: null
								}
								onChange={(value: string | null) => {
									if (value && typeof value === 'string') {
										const date = new Date(value);
										if (!Number.isNaN(date.getTime())) {
											form.setFieldValue(
												'registrationEndAt',
												date.toISOString(),
											);
										}
									} else if (value === null) {
										form.setFieldValue('registrationEndAt', '');
									}
								}}
							/>
						</Group>
					</Stack>
				</ThemePaper>

				{/* Publication Settings */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Title order={4} size="h5">
							Publication Settings
						</Title>
						<Paper shadow="sm" p="md" radius="md" withBorder>
							<Group justify="space-between" align="center">
								<Stack gap={2}>
									<Group gap="xs">
										{form.values.isPublished ? (
											<IconWorld
												size={20}
												color="var(--mantine-color-green-6)"
											/>
										) : (
											<IconWorldOff
												size={20}
												color="var(--mantine-color-gray-6)"
											/>
										)}
										<Text fw={500}>Published Status</Text>
									</Group>
									<Text size="sm" c="dimmed">
										{form.values.isPublished
											? 'This competition is visible to the public'
											: 'This competition is hidden from the public'}
									</Text>
								</Stack>
								<Switch
									checked={form.values.isPublished}
									{...form.getInputProps('isPublished')}
									size="lg"
								/>
							</Group>
						</Paper>
					</Stack>
				</ThemePaper>

				{/* Submit Button */}
				<Group justify="flex-end">
					<Button
						type="submit"
						size="md"
						leftSection={<IconDeviceFloppy size={18} />}
						loading={isLoading}
					>
						Save Changes
					</Button>
				</Group>
			</Stack>
		</form>
	);
}

interface RendererProps {
	value: string;
}

export function RichTextRenderer({ value }: RendererProps) {
	// biome-ignore lint/security/noDangerouslySetInnerHtml: i need this
	return <div dangerouslySetInnerHTML={{ __html: value }} />;
}
