import { Avatar, Group, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import { ThemePaper } from '../theme-paper/ThemePaper';

export interface StatCardProps {
	value: string | number;
	label: string;
	icon: ReactNode;
	color?: string;
	avatarSize?: number;
	iconSize?: number;
}

export function StatCard({
	value,
	label,
	icon,
	color = 'blue',
	avatarSize = 48,
	iconSize = 24,
}: StatCardProps) {
	return (
		<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
			<Group gap="md">
				<Avatar color={color} size={avatarSize} radius="md">
					{icon}
				</Avatar>
				<Stack gap={0}>
					<Text size="xl" fw={700}>
						{value}
					</Text>
					<Text size="sm" c="dimmed">
						{label}
					</Text>
				</Stack>
			</Group>
		</ThemePaper>
	);
}
