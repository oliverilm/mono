import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import {
	Badge,
	Button,
	Container,
	Group,
	Paper,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconDeviceFloppy, IconFileOff } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import { EmptyState } from '../../../../components/shared/empty-state/EmptyState';
import { LoadingState } from '../../../../components/shared/loading-state/LoadingState';
import { ThemePaper } from '../../../../components/shared/theme-paper/ThemePaper';
import { useAdminPageModelDetail } from './AdminPageModelDetail.hook';

export function AdminPageModelDetail() {
	const { model, id } = useParams<'model' | 'id'>();
	const { form, onSubmit, getInputByType, item, isLoading, formatColumnName } =
		useAdminPageModelDetail();

	if (isLoading) {
		return (
			<LoadingState
				message={`Loading ${formatColumnName(model || 'item')} details...`}
				size="lg"
				useThemePaper
				withContainer
			/>
		);
	}

	if (!item) {
		return (
			<Container size="lg" py="xl">
				<EmptyState
					title={`${formatColumnName(model || 'Item')} not found`}
					icon={IconFileOff}
				/>
			</Container>
		);
	}

	// Separate fields into groups
	const allFields = Object.keys(item);
	const disabledFields = allFields.filter(
		(field) =>
			['id', 'password', 'createdat', 'updatedat'].includes(
				field.toLowerCase(),
			) || field.endsWith('Id'),
	);
	const editableFields = allFields.filter(
		(field) => !disabledFields.includes(field),
	);

	return (
		<Container size="lg" py="xl" w={'100%'}>
			<Stack gap="xl">
				{/* Header Section */}
				<Group justify="space-between" align="center">
					<Stack gap={4}>
						<Title order={2} size="h2">
							{formatColumnName(model || 'Model')} Details
						</Title>
						<Text c="dimmed" size="sm">
							View and edit {formatColumnName(model || 'model')} information
						</Text>
					</Stack>
					<Group gap="sm">
						<Badge variant="light" color="blue" size="lg">
							ID: {String(id).slice(0, 8)}...
						</Badge>
					</Group>
				</Group>

				{/* Form Section */}
				<form onSubmit={form.onSubmit(onSubmit)}>
					<Stack gap="xl">
						{/* Editable Fields */}
						{editableFields.length > 0 && (
							<ThemePaper light="gray.1" dark="gray.8" p="xl" radius="md">
								<Stack gap="md">
									<Title order={3} size="h4">
										Editable Fields
									</Title>
									<Paper shadow="sm" p="md" radius="md" withBorder>
										<Stack gap="md">{editableFields.map(getInputByType)}</Stack>
									</Paper>
								</Stack>
							</ThemePaper>
						)}

						{/* Read-only Fields */}
						{disabledFields.length > 0 && (
							<ThemePaper light="gray.1" dark="gray.8" p="xl" radius="md">
								<Stack gap="md">
									<Title order={3} size="h4">
										Read-only Fields
									</Title>
									<Text size="sm" c="dimmed">
										These fields are system-generated and cannot be modified
									</Text>
									<Paper shadow="sm" p="md" radius="md" withBorder>
										<Stack gap="md">{disabledFields.map(getInputByType)}</Stack>
									</Paper>
								</Stack>
							</ThemePaper>
						)}

						{/* Action Buttons */}
						{editableFields.length > 0 && (
							<Group justify="flex-end">
								<Button
									type="submit"
									size="md"
									leftSection={<IconDeviceFloppy size={18} />}
								>
									Save Changes
								</Button>
							</Group>
						)}
					</Stack>
				</form>
			</Stack>
		</Container>
	);
}
