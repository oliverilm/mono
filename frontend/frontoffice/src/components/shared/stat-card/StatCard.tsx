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
		<ThemePaper
			light="gray.1"
			dark="gray.8"
			p="lg"
			radius="md"
			style={{
				transition: 'all 0.2s ease',
				cursor: 'default',
			}}
		>
			<Group gap="md">
				<Avatar
					color={color}
					size={avatarSize}
					radius="md"
					style={{
						transition: 'transform 0.2s ease',
					}}
				>
					{icon}
				</Avatar>
				<Stack gap={2}>
					<Text size="xl" fw={700} lh={1.2}>
						{value}
					</Text>
					<Text size="sm" c="dimmed" fw={500}>
						{label}
					</Text>
				</Stack>
			</Group>
		</ThemePaper>
	);
}
