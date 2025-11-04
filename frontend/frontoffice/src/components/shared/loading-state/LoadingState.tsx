import { Container, Group, Loader, Paper, Stack, Text } from '@mantine/core';
import { ThemePaper } from '../theme-paper/ThemePaper';

export interface LoadingStateProps {
	/** Loading message text */
	message?: string;
	/** Loader size (default: 'md') */
	size?: string | number;
	/** Optional padding size (default: 'xl') */
	p?: string | number;
	/** Whether to use ThemePaper instead of Paper (default: false) */
	useThemePaper?: boolean;
	/** Whether to wrap in Container (default: false) */
	withContainer?: boolean;
	/** Container size (default: 'lg') */
	containerSize?: string;
}

export function LoadingState({
	message = 'Loading...',
	size = 'md',
	p = 'xl',
	useThemePaper = false,
	withContainer = false,
	containerSize = 'lg',
}: LoadingStateProps) {
	const content = (
		<Stack align="center" py={p}>
			<Loader size={size} />
			{message && <Text c="dimmed">{message}</Text>}
		</Stack>
	);

	const paperContent = useThemePaper ? (
		<ThemePaper light="gray.1" dark="gray.8" p={p} radius="md">
			{content}
		</ThemePaper>
	) : (
		<Paper shadow="sm" p={p} radius="md" withBorder>
			<Group justify="center">
				<Loader size={size} />
				{message && (
					<Text size="sm" c="dimmed">
						{message}
					</Text>
				)}
			</Group>
		</Paper>
	);

	if (withContainer) {
		return (
			<Container
				size={containerSize as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
				py="xl"
			>
				{paperContent}
			</Container>
		);
	}

	return paperContent;
}
