import {
	Avatar,
	Badge,
	Box,
	Card,
	Grid,
	Group,
	Image,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { COUNTRIES } from '@monorepo/utils';
import { IconMapPin, IconUsers } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Api } from '../../../api';
import type { Club } from '../../../api/utils/common-types';
import { getRandomTestClubImage } from '../../../constants';
import { useHoverEffect } from '../../../hooks/useHoverEffect';
import { useThemeStyles } from '../../../hooks/useThemeStyles';
import { StaticQueryKey } from '../../../providers/query-provider/keys';

const span = {
	xl: 4,
	lg: 4,
	md: 6,
	sm: 6,
	xs: 12,
};

interface ClubCardProps {
	club: Club;
}

function ClubCard({ club }: ClubCardProps) {
	const theme = useThemeStyles();
	const clubImage = getRandomTestClubImage();
	const liftHover = useHoverEffect({ type: 'lift' });

	// Get country name from country code
	const countryName = club?.country
		? COUNTRIES.find(
				(c) =>
					c.alpha2 === club.country ||
					c.alpha3 === club.country ||
					c.name === club.country,
			)?.name || club.country
		: null;

	return (
		<Link
			to={`/clubs/${club.slug}`}
			style={{ textDecoration: 'none', display: 'block', height: '100%' }}
		>
			<Card
				shadow="sm"
				padding="lg"
				radius="md"
				withBorder
				style={{
					height: '100%',
					cursor: 'pointer',
					transition: 'transform 0.2s ease, box-shadow 0.2s ease',
				}}
				{...liftHover}
			>
				<Stack gap="md">
					{/* Club Image/Avatar Section */}
					<Box
						style={{
							position: 'relative',
							width: '100%',
							height: 180,
							borderRadius: 'var(--mantine-radius-md)',
							overflow: 'hidden',
							background: theme.getColor(
								'var(--mantine-color-gray-2)',
								'var(--mantine-color-gray-8)',
							),
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Image
							src={clubImage}
							alt={club.name}
							height={180}
							fit="cover"
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
							onError={(e) => {
								// Replace image with avatar on error
								const target = e.target as HTMLImageElement;
								target.style.display = 'none';
								const avatar = target.parentElement?.querySelector(
									'.club-avatar-fallback',
								) as HTMLElement;
								if (avatar) {
									avatar.style.display = 'flex';
								}
							}}
						/>
						<Avatar
							className="club-avatar-fallback"
							color="blue"
							size={180}
							radius="md"
							style={{
								width: '100%',
								height: '100%',
								borderRadius: 'var(--mantine-radius-md)',
								display: 'none',
								position: 'absolute',
								top: 0,
								left: 0,
							}}
						>
							{club.name[0]?.toUpperCase() || 'C'}
						</Avatar>
					</Box>

					{/* Club Info Section */}
					<Stack gap="xs">
						<Group justify="space-between" align="start" wrap="nowrap">
							<Title order={3} size="h4" lineClamp={2} style={{ flex: 1 }}>
								{club.name}
							</Title>
						</Group>

						{countryName && (
							<Group gap={4}>
								<IconMapPin size={14} style={{ opacity: 0.7 }} />
								<Text size="sm" c="dimmed">
									{countryName}
								</Text>
							</Group>
						)}

						{club.description && (
							<Text size="sm" c="dimmed" lineClamp={3} mt="xs">
								{club.description}
							</Text>
						)}
					</Stack>

					{/* Footer Badge */}
					<Group justify="flex-end" mt="auto" pt="xs">
						<Badge
							variant="light"
							color="blue"
							leftSection={<IconUsers size={12} />}
							size="sm"
						>
							View Club
						</Badge>
					</Group>
				</Stack>
			</Card>
		</Link>
	);
}

export function ClubList() {
	const { data: clubs } = useQuery({
		queryKey: [StaticQueryKey.HomeClubs],
		queryFn: () => Api.publicApi.club.getPublicClubs({ skip: 0, take: 25 }),
	});

	if (!clubs?.data || clubs.data.length === 0) {
		return (
			<Box ta="center" py="xl">
				<Text c="dimmed">No clubs available at the moment.</Text>
			</Box>
		);
	}

	return (
		<Grid>
			{clubs.data.map((club) => (
				<Grid.Col key={club.id} span={span}>
					<ClubCard club={club} />
				</Grid.Col>
			))}
		</Grid>
	);
}
