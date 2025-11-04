import {
	Avatar,
	Badge,
	Box,
	Container,
	Divider,
	Flex,
	Grid,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
} from '@mantine/core';
import { COUNTRIES } from '@monorepo/utils';
import {
	IconMail,
	IconMapPin,
	IconTrophy,
	IconUsers,
} from '@tabler/icons-react';
import { useQueries, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Api } from '../../../../api';
import { getRandomTestClubImage } from '../../../../constants';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { RichTextRenderer } from '../../../competition/update/form/CompetitionUpdateForm';
import { StatCard } from '../../../shared/stat-card/StatCard';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';
import { ClubDetailAdminCompetitions } from './competitions/ClubDetailAdminCompetitions';
import { ClubDetailAdminMembers } from './members/ClubDetailAdminMembers';

export function ClubDetailAdmin() {
	const { slug } = useParams<'slug'>();
	const { colorScheme } = useMantineColorScheme();

	const [
		{ data: clubDetails },
		{ data: clubMetadata },
		{ data: clubMembers },
		{ data: invitations },
	] = useQueries([
		{
			queryKey: [StaticQueryKey.ClubDetails, slug],
			queryFn: () => Api.publicApi.club.getClub(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [StaticQueryKey.ClubMetadata, slug],
			queryFn: () => Api.publicApi.club.getClubMetadata(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [StaticQueryKey.ClubMembers, slug],
			queryFn: () => Api.user.club.getClubMembers(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: ['club-invitations', slug],
			queryFn: () => Api.user.invitation.getCreatedInvitations(),
			enabled: Boolean(slug),
		},
	]);

	const { data: clubCompetitionsData } = useQuery({
		queryKey: ['club-competitions-admin', slug],
		queryFn: () => Api.user.club.getClubCompetitions(slug),
		enabled: Boolean(slug),
	});

	const clubCompetitions = clubCompetitionsData?.data || [];

	const club = clubDetails?.data;
	const metadata = clubMetadata?.data;
	const members = clubMembers?.data || [];
	const competitions = clubCompetitions || [];
	const invitationsList = invitations?.data || [];
	const pendingInvitations = Array.isArray(invitationsList)
		? invitationsList.filter(
				(inv: { isAccepted: boolean | null }) => inv.isAccepted === null,
			)
		: [];

	const clubImage = getRandomTestClubImage();

	// Get country name from country code
	const countryName = club?.country
		? COUNTRIES.find(
				(c) =>
					c.alpha2 === club.country ||
					c.alpha3 === club.country ||
					c.name === club.country,
			)?.name || club.country
		: null;

	if (!club) {
		return (
			<Container size="lg" py="xl">
				<Text>Loading club information...</Text>
			</Container>
		);
	}

	// Stats calculations
	const totalMembers = members.length;
	const activeCompetitions = competitions.filter(
		(comp: { isArchived: boolean }) => !comp.isArchived,
	).length;
	const adminsCount = metadata?.admins?.length || 0;

	return (
		<Container size="lg" py="xl">
			<Stack gap="xl">
				{/* Hero Section */}
				<Box
					style={{
						position: 'relative',
						borderRadius: 'var(--mantine-radius-md)',
						overflow: 'hidden',
						background:
							colorScheme === 'dark'
								? 'linear-gradient(135deg, var(--mantine-color-blue-9) 0%, var(--mantine-color-blue-8) 100%)'
								: 'linear-gradient(135deg, var(--mantine-color-blue-2) 0%, var(--mantine-color-blue-1) 100%)',
					}}
					p="xl"
				>
					<Flex
						direction={{ base: 'column', sm: 'row' }}
						gap="xl"
						align="center"
					>
						<Avatar
							src={clubImage}
							size={120}
							radius="md"
							style={{
								border: `3px solid ${
									colorScheme === 'dark'
										? 'var(--mantine-color-blue-6)'
										: 'var(--mantine-color-blue-4)'
								}`,
							}}
						/>
						<Stack gap="xs" style={{ flex: 1 }}>
							<Group gap="xs" align="center">
								<Title order={1} size="h2">
									{club.name}
								</Title>
								<Badge color="blue" variant="light" size="lg">
									Admin View
								</Badge>
							</Group>
							{countryName && (
								<Group gap="xs">
									<IconMapPin size={18} />
									<Text size="lg" c="dimmed">
										{countryName}
									</Text>
								</Group>
							)}
						</Stack>
					</Flex>
				</Box>

				{/* Stats Cards */}
				<SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
					<StatCard
						value={totalMembers}
						label="Total Members"
						icon={<IconUsers size={24} />}
						color="blue"
					/>

					<StatCard
						value={activeCompetitions}
						label="Active Competitions"
						icon={<IconTrophy size={24} />}
						color="green"
					/>

					<StatCard
						value={adminsCount}
						label="Administrators"
						icon={<IconUsers size={24} />}
						color="orange"
					/>

					<StatCard
						value={pendingInvitations.length}
						label="Pending Invitations"
						icon={<IconMail size={24} />}
						color="yellow"
					/>
				</SimpleGrid>

				{/* Description Section */}
				{club.description && (
					<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
						<Title order={2} size="h3" mb="md">
							About Us
						</Title>
						<Divider mb="md" />
						<RichTextRenderer value={club.description} />
					</ThemePaper>
				)}

				{/* Administrators Section */}
				{metadata?.admins && metadata.admins.length > 0 && (
					<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
						<Group gap="xs" mb="md">
							<IconUsers size={24} />
							<Title order={3} size="h4">
								Club Administrators
							</Title>
						</Group>
						<Divider mb="md" />
						<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
							{metadata.admins.map((admin) => (
								<Box
									key={admin.userId}
									p="md"
									style={{
										backgroundColor:
											colorScheme === 'dark'
												? 'var(--mantine-color-gray-7)'
												: 'var(--mantine-color-gray-2)',
										borderRadius: 'var(--mantine-radius-sm)',
									}}
								>
									<Group gap="md">
										<Avatar
											color={admin.role === 'OWNER' ? 'blue' : 'gray'}
											size="md"
											radius="xl"
										>
											{admin.firstName?.[0] || admin.email[0].toUpperCase()}
										</Avatar>
										<Stack gap={2} style={{ flex: 1 }}>
											<Text fw={500}>
												{admin.firstName && admin.lastName
													? `${admin.firstName} ${admin.lastName}`
													: admin.email}
											</Text>
											<Group gap="xs">
												<Badge
													color={admin.role === 'OWNER' ? 'blue' : 'gray'}
													variant="light"
													size="sm"
												>
													{admin.role}
												</Badge>
											</Group>
										</Stack>
									</Group>
								</Box>
							))}
						</SimpleGrid>
					</ThemePaper>
				)}

				{/* Main Content Grid */}
				<Grid>
					<Grid.Col
						span={{
							base: 12,
							md: 6,
						}}
					>
						<ClubDetailAdminMembers
							clubMembers={members}
							clubMetadata={metadata}
						/>
					</Grid.Col>
					<Grid.Col
						span={{
							base: 12,
							md: 6,
						}}
					>
						<ClubDetailAdminCompetitions
							competitions={competitions}
							slug={slug}
						/>
					</Grid.Col>
				</Grid>
			</Stack>
		</Container>
	);
}
