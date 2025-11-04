import {
	Box,
	Button,
	Container,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconDatabase, IconSettings } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';
import { EmptyState } from '../../components/shared/empty-state/EmptyState';
import { LoadingState } from '../../components/shared/loading-state/LoadingState';
import { ThemePaper } from '../../components/shared/theme-paper/ThemePaper';
import { useHoverEffect } from '../../hooks/useHoverEffect';

// Format column name from camelCase to Title Case
const formatColumnName = (column: string) => {
	return column
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, (str) => str.toUpperCase())
		.trim();
};

export function AdminPage() {
	const navigate = useNavigate();
	const liftHover = useHoverEffect({ type: 'lift' });

	const { data: models, isLoading } = useQuery({
		queryKey: ['Admin models'],
		queryFn: () => {
			return Api.admin.getModels().then((response) => response.data.models);
		},
	});

	if (isLoading) {
		return (
			<LoadingState
				message="Loading admin models..."
				size="lg"
				useThemePaper
				withContainer
			/>
		);
	}

	if (!models || models.length === 0) {
		return (
			<Container size="lg" py="xl">
				<EmptyState title="No admin models available" icon={IconDatabase} />
			</Container>
		);
	}

	return (
		<Container size="lg" py="xl" w={'100%'}>
			<Stack gap="xl">
				{/* Header Section */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Group gap="md">
						<IconSettings size={32} />
						<Stack gap={0}>
							<Title order={2} size="h2">
								Admin Panel
							</Title>
							<Text c="dimmed" size="sm">
								Manage your database models and records
							</Text>
						</Stack>
					</Group>
				</ThemePaper>

				{/* Models Grid */}
				<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
					{models.map((model) => (
						<Box
							key={model}
							style={{
								cursor: 'pointer',
								transition: 'transform 0.2s, box-shadow 0.2s',
							}}
							{...liftHover}
							onClick={() => navigate(`/admin/crud/${model}/list`)}
						>
							<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
								<Stack gap="md">
									<Group justify="space-between" align="start">
										<Group gap="sm">
											<IconDatabase size={24} />
											<Stack gap={0}>
												<Title order={4} size="h5">
													{formatColumnName(model)}
												</Title>
												<Text size="xs" c="dimmed">
													Database Model
												</Text>
											</Stack>
										</Group>
									</Group>
									<Group justify="space-between" align="center">
										<Button
											variant="light"
											size="sm"
											onClick={(e) => {
												e.stopPropagation();
												navigate(`/admin/crud/${model}/list`);
											}}
										>
											View List
										</Button>
									</Group>
								</Stack>
							</ThemePaper>
						</Box>
					))}
				</SimpleGrid>
			</Stack>
		</Container>
	);
}
