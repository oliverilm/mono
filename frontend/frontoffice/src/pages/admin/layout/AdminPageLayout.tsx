import {
	Badge,
	Button,
	Container,
	Divider,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconArrowLeft, IconSettings } from '@tabler/icons-react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ThemePaper } from '../../../components/shared/theme-paper/ThemePaper';

// Format column name from camelCase to Title Case
const formatColumnName = (column: string) => {
	return column
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, (str) => str.toUpperCase())
		.trim();
};

export function AdminPageLayout() {
	const navigate = useNavigate();
	const { model } = useParams<'model'>();

	const handleBack = () => {
		if (model) {
			navigate('/admin/crud');
		} else {
			navigate(-1);
		}
	};

	return (
		<Container size="xl" py="xl">
			<Stack gap="xl">
				{/* Header Section */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Group justify="space-between" align="center">
						<Group gap="md">
							<Button
								variant="light"
								leftSection={<IconArrowLeft size={18} />}
								onClick={handleBack}
							>
								{model ? 'Back to Models' : 'Back to App'}
							</Button>
							{model && (
								<>
									<Divider orientation="vertical" />
									<Group gap="sm">
										<IconSettings size={24} />
										<Stack gap={0}>
											<Title order={3} size="h4">
												{formatColumnName(model)}
											</Title>
											<Text size="sm" c="dimmed">
												Admin Panel
											</Text>
										</Stack>
									</Group>
								</>
							)}
						</Group>
						{model && (
							<Badge variant="light" color="blue" size="lg">
								{formatColumnName(model)}
							</Badge>
						)}
					</Group>
				</ThemePaper>

				{/* Content Section */}
				<Outlet />
			</Stack>
		</Container>
	);
}
