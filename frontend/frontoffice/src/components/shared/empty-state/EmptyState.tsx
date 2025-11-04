import { Stack, Text, Title } from '@mantine/core';
import type { Icon } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { ThemePaper } from '../theme-paper/ThemePaper';

export interface EmptyStateProps {
	/** Main title/heading text */
	title: string;
	/** Optional description text shown below the title */
	description?: string;
	/** Optional icon component (from @tabler/icons-react) */
	icon?: Icon;
	/** Optional custom icon size (default: 48) */
	iconSize?: number;
	/** Optional icon color (default: gray-5) */
	iconColor?: string;
	/** Optional action button or element to display */
	action?: ReactNode;
	/** Optional padding size (default: 'xl') */
	p?: string | number;
}

export function EmptyState({
	title,
	description,
	icon: IconComponent,
	iconSize = 48,
	iconColor = 'var(--mantine-color-gray-5)',
	action,
	p = 'xl',
}: EmptyStateProps) {
	return (
		<ThemePaper light="gray.1" dark="gray.8" p={p} radius="md">
			<Stack gap="md" align="center">
				{IconComponent && <IconComponent size={iconSize} color={iconColor} />}
				<Title order={3} size="h4" c="dimmed" fw={500}>
					{title}
				</Title>
				{description && (
					<Text size="sm" c="dimmed" ta="center">
						{description}
					</Text>
				)}
				{action && action}
			</Stack>
		</ThemePaper>
	);
}
