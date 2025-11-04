import {
	Avatar,
	Badge,
	Button,
	Container,
	Divider,
	Grid,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
} from '@mantine/core';
import {
	IconCalendar,
	IconMail,
	IconTrophy,
	IconUsers,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Api } from '../../../api';
import { StatCard } from '../../../components/shared/stat-card/StatCard';
import { ThemePaper } from '../../../components/shared/theme-paper/ThemePaper';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { useAuthStore } from '../../../stores/auth';

export function HomePageAuthenticated() {
	const { colorScheme } = useMantineColorScheme();
	const authStore = useAuthStore();

	// Get user's club data
	const { data: userClubData } = useQuery({
		queryKey: ['user-club', authStore.profile?.clubId],
		queryFn: () => Api.publicApi.club.getClubById(authStore.profile?.clubId),
		enabled: !!authStore.profile?.clubId,
	});

	// Get user's private competitions
	const { data: privateCompetitions } = useQuery({
		queryKey: ['competitions-private', authStore.isAuthenticated],
		queryFn: () => Api.user.competition.getPrivateCompetitions(),
		enabled: authStore.isAuthenticated,
	});

	// Get club competitions if user has a club
	const { data: clubCompetitions } = useQuery({
		queryKey: ['club-competitions', userClubData?.data?.slug],
		queryFn: () => Api.user.club.getClubCompetitions(userClubData?.data?.slug),
		enabled: !!userClubData?.data?.slug,
	});

	// Get invitations
	const { data: invitations } = useQuery({
		queryKey: ['invitations-to'],
		queryFn: () => Api.user.invitation.getMyInvitations(),
		enabled: authStore.isAuthenticated,
	});

	// Get public competitions for upcoming events
	const { data: publicCompetitions } = useQuery({
		queryKey: [StaticQueryKey.HomeCompetitions],
		queryFn: () =>
			Api.publicApi.competition.getPublicCompetitions({ skip: 0, take: 10 }),
	});

	// Calculate upcoming competitions
	const upcomingPublicCompetitions =
		publicCompetitions?.data?.filter(
			(comp) =>
				!comp.isArchived &&
				comp.isPublished &&
				dayjs(comp.startingAt).isAfter(dayjs()),
		) || [];

	const sortedPublicCompetitions = [...upcomingPublicCompetitions].sort(
		(a, b) => dayjs(a.startingAt).diff(dayjs(b.startingAt)),
	);

	const pendingInvitations =
		invitations?.data?.filter((inv) => inv.isAccepted === null) || [];

	return (
		<Container size="lg" py="xl">
			<Stack gap="xl">
				{/* Welcome Section */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Group gap="md" align="center">
						<Avatar
							color="blue"
							size={64}
							radius="md"
							style={{
								background:
									colorScheme === 'dark'
										? 'var(--mantine-color-blue-9)'
										: 'var(--mantine-color-blue-2)',
							}}
						>
							{authStore.profile?.firstName?.[0] ||
								authStore.profile?.lastName?.[0] ||
								'U'}
						</Avatar>
						<Stack gap={4} style={{ flex: 1 }}>
							<Title order={2} size="h2">
								Welcome back,
								{authStore.profile?.firstName
									? ` ${authStore.profile.firstName}`
									: ' User'}
								!
							</Title>
							<Text c="dimmed" size="sm">
								Here's what's happening with your competitions and clubs
							</Text>
						</Stack>
					</Group>
				</ThemePaper>

				{/* Stats Section */}
				<SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
					<StatCard
						value={privateCompetitions?.data?.length || 0}
						label="My Competitions"
						icon={<IconTrophy size={24} />}
						color="blue"
					/>
					<StatCard
						value={clubCompetitions?.data?.length || 0}
						label="Club Competitions"
						icon={<IconUsers size={24} />}
						color="green"
					/>
					<StatCard
						value={sortedPublicCompetitions.length}
						label="Upcoming Public"
						icon={<IconCalendar size={24} />}
						color="orange"
					/>
					<StatCard
						value={pendingInvitations.length}
						label="Pending Invitations"
						icon={<IconMail size={24} />}
						color="yellow"
					/>
				</SimpleGrid>

				{/* Quick Overview Grid */}
				<Grid>
					{/* My Club Section */}
					{userClubData?.data && (
						<Grid.Col span={{ base: 12, md: 6 }}>
							<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
								<Stack gap="md">
									<Group justify="space-between" align="center">
										<Group gap="sm">
											<IconUsers size={24} />
											<Title order={3} size="h4">
												My Club
											</Title>
										</Group>
										<Button
											component={Link}
											to={`/clubs/${userClubData.data.slug}`}
											variant="light"
											size="xs"
										>
											View Details
										</Button>
									</Group>
									<Divider />
									<Stack gap="sm">
										<Text fw={600} size="lg">
											{userClubData.data.name}
										</Text>
										{userClubData.data.description && (
											<Text size="sm" c="dimmed" lineClamp={2}>
												{userClubData.data.description}
											</Text>
										)}
										{clubCompetitions?.data && (
											<Group gap="xs">
												<IconTrophy size={16} />
												<Text size="sm">
													{clubCompetitions.data.length} competition
													{clubCompetitions.data.length !== 1 ? 's' : ''}
												</Text>
											</Group>
										)}
									</Stack>
								</Stack>
							</ThemePaper>
						</Grid.Col>
					)}

					{/* Pending Invitations */}
					{pendingInvitations.length > 0 && (
						<Grid.Col span={{ base: 12, md: 6 }}>
							<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
								<Stack gap="md">
									<Group gap="sm">
										<IconMail size={24} />
										<Title order={3} size="h4">
											Pending Invitations
										</Title>
										<Badge color="yellow" variant="light" size="lg">
											{pendingInvitations.length}
										</Badge>
									</Group>
									<Divider />
									<Stack gap="sm">
										{pendingInvitations.slice(0, 3).map((inv) => (
											<Group key={inv.id} justify="space-between">
												<Stack gap={2}>
													<Text fw={500} size="sm">
														{inv.clubName}
													</Text>
													<Text size="xs" c="dimmed">
														Club invitation
													</Text>
												</Stack>
												<Button
													component={Link}
													to={`/clubs/${inv.clubId}`}
													variant="light"
													size="xs"
												>
													View
												</Button>
											</Group>
										))}
										{pendingInvitations.length > 3 && (
											<Text size="xs" c="dimmed" ta="center">
												+{pendingInvitations.length - 3} more
											</Text>
										)}
									</Stack>
								</Stack>
							</ThemePaper>
						</Grid.Col>
					)}
				</Grid>

				{/* My Competitions Section */}
				{privateCompetitions?.data && privateCompetitions.data.length > 0 && (
					<Stack gap="md">
						<Group justify="space-between" align="center">
							<Stack gap={4}>
								<Title order={2} size="h2">
									My Competitions
								</Title>
								<Text c="dimmed" size="sm">
									Competitions you're managing or participating in
								</Text>
							</Stack>
						</Group>
						<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
							{privateCompetitions.data.slice(0, 6).map((competition) => (
								<Link
									key={competition.id}
									to={`/competitions/${competition.slug}`}
									style={{ textDecoration: 'none' }}
								>
									<ThemePaper
										light="gray.1"
										dark="gray.8"
										p="md"
										radius="md"
										style={{ cursor: 'pointer' }}
									>
										<Stack gap="sm">
											<Group justify="space-between" align="start">
												<Stack gap={4} style={{ flex: 1 }}>
													<Text fw={600} size="md" lineClamp={2}>
														{competition.name}
													</Text>
													<Text size="xs" c="dimmed">
														{competition.clubName}
													</Text>
												</Stack>
												{!competition.isPublished && (
													<Badge color="orange" variant="light" size="sm">
														Draft
													</Badge>
												)}
											</Group>
											{competition.startingAt && (
												<Group gap="xs">
													<IconCalendar size={14} />
													<Text size="xs" c="dimmed">
														{dayjs(competition.startingAt).format(
															'MMM D, YYYY',
														)}
													</Text>
												</Group>
											)}
										</Stack>
									</ThemePaper>
								</Link>
							))}
						</SimpleGrid>
					</Stack>
				)}

				{/* Upcoming Public Competitions */}
				{sortedPublicCompetitions.length > 0 && (
					<Stack gap="md">
						<Stack gap={4}>
							<Title order={2} size="h2">
								Upcoming Competitions
							</Title>
							<Text c="dimmed" size="sm">
								Discover tournaments happening soon
							</Text>
						</Stack>
						<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
							{sortedPublicCompetitions.slice(0, 6).map((competition) => (
								<Link
									key={competition.id}
									to={`/competitions/${competition.slug}`}
									style={{ textDecoration: 'none' }}
								>
									<ThemePaper
										light="gray.1"
										dark="gray.8"
										p="md"
										radius="md"
										style={{ cursor: 'pointer' }}
									>
										<Stack gap="sm">
											<Stack gap={4}>
												<Text fw={600} size="md" lineClamp={2}>
													{competition.name}
												</Text>
												<Text size="xs" c="dimmed">
													{competition.clubName}
												</Text>
											</Stack>
											{competition.startingAt && (
												<Group gap="xs">
													<IconCalendar size={14} />
													<Text size="xs" c="dimmed">
														{dayjs(competition.startingAt).format(
															'MMM D, YYYY',
														)}
													</Text>
												</Group>
											)}
										</Stack>
									</ThemePaper>
								</Link>
							))}
						</SimpleGrid>
					</Stack>
				)}
			</Stack>
		</Container>
	);
}
