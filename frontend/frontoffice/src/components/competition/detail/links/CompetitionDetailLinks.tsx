import { Badge, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { IconExternalLink, IconLink, IconWorld } from '@tabler/icons-react';
import type { CompetitionMetadata } from '../../../../api/utils/common-types';
import { useHoverEffect } from '../../../../hooks/useHoverEffect';
import { useThemeStyles } from '../../../../hooks/useThemeStyles';

interface Props {
	links?: CompetitionMetadata['competitionLinks'];
}

export function CompetitionDetailLinks({ links }: Props) {
	const theme = useThemeStyles();
	const hoverEffect = useHoverEffect({ type: 'lift' });

	if (!links || links.length === 0) {
		return null;
	}

	const getDomain = (url: string): string => {
		try {
			const domain = new URL(url).hostname;
			return domain.replace('www.', '');
		} catch {
			return url;
		}
	};

	return (
		<Stack gap="md">
			{links.map(({ url, label }) => {
				const domain = getDomain(url);
				const isExternal = url.startsWith('http');

				return (
					<Paper
						key={url}
						shadow="sm"
						p="md"
						radius="md"
						withBorder
						component="a"
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						style={{
							cursor: 'pointer',
							textDecoration: 'none',
							color: 'inherit',
							backgroundColor: theme.getColor(
								'var(--mantine-color-gray-0)',
								'var(--mantine-color-gray-8)',
							),
						}}
						{...hoverEffect}
						aria-label={`Open ${label} in new tab`}
					>
						<Group justify="space-between" align="center" wrap="nowrap">
							<Group gap="md" align="center" style={{ flex: 1, minWidth: 0 }}>
								<Paper
									radius="md"
									p="xs"
									style={{
										background: theme.iconBgBlue,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<IconLink size={18} color="var(--mantine-color-blue-6)" />
								</Paper>
								<Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
									<Group gap="xs" align="center" wrap="nowrap">
										<Text fw={500} size="sm" style={{ lineHeight: 1.2 }}>
											{label}
										</Text>
										{isExternal && (
											<Tooltip label="External link" withArrow>
												<IconExternalLink
													size={14}
													color="var(--mantine-color-gray-6)"
												/>
											</Tooltip>
										)}
									</Group>
									<Group gap="xs" align="center" wrap="nowrap">
										<IconWorld size={12} color="var(--mantine-color-gray-5)" />
										<Text size="xs" c="dimmed" style={{ lineHeight: 1.2 }}>
											{domain}
										</Text>
									</Group>
								</Stack>
							</Group>
							<Badge
								variant="light"
								color="blue"
								size="sm"
								rightSection={
									<IconExternalLink size={12} style={{ marginLeft: 4 }} />
								}
							>
								Visit
							</Badge>
						</Group>
					</Paper>
				);
			})}
		</Stack>
	);
}
