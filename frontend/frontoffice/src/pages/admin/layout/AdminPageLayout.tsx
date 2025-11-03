import { Button, Flex, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export function AdminPageLayout() {
	const navigate = useNavigate();
	const { model } = useParams<'model'>();
	return (
		<Flex direction="column" gap="md" m="md">
			<Flex
				direction="row"
				gap="md"
				justify="space-between"
				pb="sm"
				style={{ borderBottom: '1px solid #e0e0e0' }}
			>
				<Button
					variant="transparent"
					color="gray"
					leftSection={<IconArrowLeft />}
					onClick={() => navigate(-1)}
				>
					Back {!model ? 'to app' : 'to model list'}
				</Button>

				<Text fw="bold">{model}</Text>
				<div />
			</Flex>
			<Outlet />
		</Flex>
	);
}
