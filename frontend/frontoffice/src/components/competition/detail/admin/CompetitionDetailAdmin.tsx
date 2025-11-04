import {
	Button,
	Divider,
	Group,
	Modal,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
	IconArchive,
	IconCategory,
	IconEdit,
	IconFileExport,
	IconLink,
	IconUserPlus,
	IconWorld,
	IconWorldOff,
} from '@tabler/icons-react';
import { useMutation } from 'react-query';
import { Api } from '../../../../api';
import type {
	CompetitionListItem,
	CompetitionMetadata,
} from '../../../../api/utils/common-types';
import { ThemePaper } from '../../../../components/shared/theme-paper/ThemePaper';
import { useAuthStore } from '../../../../stores/auth';
import { CompetitionCategoryForm } from '../../category/CompetitionCategoryForm';
import { CompetitionLinkFrom } from '../../links/form/CompetitionLinkForm';
import { CompetitionUpdateForm } from '../../update/form/CompetitionUpdateForm';
import { CompetitionDetailAdminForm } from './form/CompetitionDetailAdminForm';

interface Props {
	competition: CompetitionListItem;
	metadata?: CompetitionMetadata;
}

export function CompetitionDetailAdmin({ competition, metadata }: Props) {
	const authStore = useAuthStore();

	const [opened, { toggle }] = useDisclosure();
	const [categoriesOpen, { toggle: toggleCategories }] = useDisclosure();
	const [linkOpen, { toggle: toggleLink }] = useDisclosure();
	const [adminOpen, { toggle: toggleAdmin }] = useDisclosure();

	const { mutate: exportData, isLoading: isExporting } = useMutation({
		mutationFn: () =>
			Api.user.competition.getCompetitorExport(competition.slug),
		onSuccess: (data) => {
			// Create a blob and download the file
			const blob = new Blob([JSON.stringify(data.data)], {
				type: 'application/json',
			});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${competition.slug}.json`;
			a.click();
			window.URL.revokeObjectURL(url);
			notifications.show({
				title: 'Export Successful',
				message: 'Competition data has been exported successfully',
				color: 'green',
			});
		},
		onError: () => {
			notifications.show({
				title: 'Export Failed',
				message: 'Failed to export competition data',
				color: 'red',
			});
		},
	});

	const myRole = metadata?.competitionAdmins?.find(
		({ userId }) => authStore.profile?.userId === userId,
	);

	const isAdministrator = Boolean(myRole);
	if (!isAdministrator || !myRole) {
		return null;
	}

	const handlePublish = () => {
		notifications.show({
			title: 'Not Implemented',
			message: 'Publish functionality is coming soon',
			color: 'blue',
		});
	};

	const handleUnpublish = () => {
		notifications.show({
			title: 'Not Implemented',
			message: 'Unpublish functionality is coming soon',
			color: 'blue',
		});
	};

	const handleArchive = () => {
		notifications.show({
			title: 'Not Implemented',
			message: 'Archive functionality is coming soon',
			color: 'blue',
		});
	};

	return (
		<>
			<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md" my="md">
				<Stack gap="md">
					{/* Header */}
					<Group justify="space-between" align="center">
						<Stack gap={4}>
							<Title order={3} size="h4">
								Competition Management
							</Title>
							<Text size="sm" c="dimmed">
								Manage competition settings, content, and administrators
							</Text>
						</Stack>
					</Group>

					<Divider />

					{/* Action Buttons */}
					<Stack gap="sm">
						{/* Content Management */}
						<Stack gap={4}>
							<Text size="sm" fw={500} c="dimmed">
								Content Management
							</Text>
							<Group gap="sm">
								<Button
									variant="light"
									size="sm"
									leftSection={<IconCategory size={18} />}
									onClick={toggleCategories}
								>
									Add Categories
								</Button>
								<Button
									variant="light"
									size="sm"
									leftSection={<IconLink size={18} />}
									onClick={toggleLink}
								>
									Add Link
								</Button>
								<Button
									variant="light"
									size="sm"
									leftSection={<IconFileExport size={18} />}
									onClick={() => exportData()}
									loading={isExporting}
								>
									Export Data
								</Button>
							</Group>
						</Stack>

						<Divider variant="dashed" />

						{/* Administration */}
						<Stack gap={4}>
							<Text size="sm" fw={500} c="dimmed">
								Administration
							</Text>
							<Group gap="sm">
								<Button
									variant="light"
									size="sm"
									leftSection={<IconUserPlus size={18} />}
									onClick={toggleAdmin}
								>
									Add Admin
								</Button>
								<Button
									variant="light"
									size="sm"
									leftSection={<IconEdit size={18} />}
									onClick={toggle}
								>
									Edit Competition
								</Button>
							</Group>
						</Stack>

						<Divider variant="dashed" />

						{/* Status Actions */}
						<Stack gap={4}>
							<Text size="sm" fw={500} c="dimmed">
								Status Actions
							</Text>
							<Group gap="sm">
								<Button
									variant="light"
									color="green"
									size="sm"
									leftSection={<IconWorld size={18} />}
									onClick={handlePublish}
								>
									Publish
								</Button>
								<Button
									variant="light"
									color="yellow"
									size="sm"
									leftSection={<IconWorldOff size={18} />}
									onClick={handleUnpublish}
								>
									Unpublish
								</Button>
								<Button
									variant="light"
									color="red"
									size="sm"
									leftSection={<IconArchive size={18} />}
									onClick={handleArchive}
								>
									Archive
								</Button>
							</Group>
						</Stack>
					</Stack>
				</Stack>
			</ThemePaper>

			{/* Modals */}
			<Modal
				size="lg"
				opened={opened}
				onClose={toggle}
				title="Edit Competition"
			>
				<CompetitionUpdateForm
					competition={competition}
					onSubmitSuccess={toggle}
				/>
			</Modal>

			<Modal
				size="lg"
				opened={adminOpen}
				onClose={toggleAdmin}
				title="Add Competition Admin"
			>
				<CompetitionDetailAdminForm
					competition={competition}
					metadata={metadata}
				/>
			</Modal>

			<Modal
				size="md"
				opened={categoriesOpen}
				onClose={toggleCategories}
				title="Manage Categories"
			>
				<CompetitionCategoryForm
					competition={competition}
					onDone={toggleCategories}
				/>
			</Modal>

			<Modal size="lg" opened={linkOpen} onClose={toggleLink} title="Add Link">
				<CompetitionLinkFrom competition={competition} onDone={toggleLink} />
			</Modal>
		</>
	);
}
