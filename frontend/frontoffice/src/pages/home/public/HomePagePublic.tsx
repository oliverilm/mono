import {
	Badge,
	Button,
	Container,
	Divider,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import {
	IconCalendar,
	IconMapPin,
	IconTrophy,
	IconUsers,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Api } from '../../../api';
import cover from '../../../assets/cover.webp';
import { ClubList } from '../../../components/club/list/ClubList';
import { CompetitionCarousel } from '../../../components/competition/carousel/CompetitionCarousel';
import { StatCard } from '../../../components/shared/stat-card/StatCard';
import { ThemeBox } from '../../../components/shared/theme-box/ThemeBox';
import { ThemePaper } from '../../../components/shared/theme-paper/ThemePaper';
import { useHoverEffect } from '../../../hooks/useHoverEffect';
import { useThemeStyles } from '../../../hooks/useThemeStyles';
import { StaticQueryKey } from '../../../providers/query-provider/keys';

export function HomePagePublic() {
	const theme = useThemeStyles();
	const slideHover = useHoverEffect({ type: 'slide' });

	const { data: competitions } = useQuery({
		queryKey: [StaticQueryKey.HomeCompetitions],
		queryFn: () =>
			Api.publicApi.competition.getPublicCompetitions({ skip: 0, take: 25 }),
	});

	const { data: clubs } = useQuery({
		queryKey: [StaticQueryKey.HomeClubs],
		queryFn: () => Api.publicApi.club.getPublicClubs({ skip: 0, take: 25 }),
	});

	// Calculate upcoming and ongoing competitions
	const now = dayjs();
	const upcomingAndOngoingCompetitions =
		competitions?.data?.filter(
			(comp) =>
				!comp.isArchived &&
				comp.isPublished &&
				(dayjs(comp.startingAt).isBefore(now.add(7, 'days')) ||
					dayjs(comp.startingAt).isSame(now.add(7, 'days'))),
		) || [];

	// Separate upcoming and ongoing
	const upcomingCompetitions = upcomingAndOngoingCompetitions.filter((comp) =>
		dayjs(comp.startingAt).isAfter(now),
	);
	const ongoingCompetitions = upcomingAndOngoingCompetitions.filter(
		(comp) =>
			(dayjs(comp.startingAt).isBefore(now) ||
				dayjs(comp.startingAt).isSame(now)) &&
			dayjs(comp.startingAt).isAfter(now.subtract(30, 'days')),
	);

	// Sort by starting date (soonest first)
	const sortedCompetitions = [...upcomingCompetitions].sort((a, b) =>
		dayjs(a.startingAt).diff(dayjs(b.startingAt)),
	);
	const sortedOngoingCompetitions = [...ongoingCompetitions].sort((a, b) =>
		dayjs(a.startingAt).diff(dayjs(b.startingAt)),
	);

	// Combine for the list (ongoing first, then upcoming)
	const combinedCompetitions = [
		...sortedOngoingCompetitions.map((comp) => ({
			...comp,
			status: 'ongoing',
		})),
		...sortedCompetitions.map((comp) => ({ ...comp, status: 'upcoming' })),
	].slice(0, 5); // Limit to 5 items

	return (
		<>
			{/* Hero Section */}
			<ThemeBox variant="hero" style={{ backgroundImage: `url(${cover})` }}>
				<Container size="lg">
					<Stack gap="xl" align="center" ta="center" bg={'red'} p={'xl'}>
						<Title order={1} size="3rem" fw={800} c={theme.textOnGradient}>
							Welcome to the Competition Platform
						</Title>
						<Text size="xl" c={theme.textSecondary} maw={600}>
							Discover upcoming competitions, connect with clubs, and manage
							your martial arts journey all in one place.
						</Text>
						<Group gap="md" justify="center">
							<Button
								component={Link}
								to="/register"
								size="lg"
								variant="filled"
								leftSection={<IconUsers size={20} />}
							>
								Get Started
							</Button>
							<Button
								component={Link}
								to="/login"
								size="lg"
								variant="outline"
								style={{
									borderColor: theme.borderOutline,
									color: theme.borderOutline,
								}}
							>
								Sign In
							</Button>
						</Group>
					</Stack>
				</Container>
			</ThemeBox>

			<Container size="lg" py="xl">
				<Stack gap="xl">
					{/* Stats Section */}
					<SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
						<StatCard
							value={sortedCompetitions.length}
							label="Upcoming Competitions"
							icon={<IconCalendar size={24} />}
							color="blue"
						/>
						<StatCard
							value={clubs?.data?.length || 0}
							label="Registered Clubs"
							icon={<IconUsers size={24} />}
							color="green"
						/>
						<StatCard
							value={competitions?.data?.length || 0}
							label="Total Competitions"
							icon={<IconTrophy size={24} />}
							color="orange"
						/>
						<StatCard
							value={
								sortedCompetitions.filter((comp) =>
									dayjs(comp.startingAt).isBefore(dayjs().add(30, 'days')),
								).length
							}
							label="This Month"
							icon={<IconMapPin size={24} />}
							color="yellow"
						/>
					</SimpleGrid>

					{/* Quick List: Upcoming & Ongoing Competitions */}
					{combinedCompetitions.length > 0 && (
						<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
							<Stack gap="md">
								<Group justify="space-between" align="center">
									<Group gap="sm">
										<IconTrophy size={24} />
										<Title order={3} size="h4">
											Upcoming & Ongoing Competitions
										</Title>
									</Group>
									<Button
										component={Link}
										to="/competitions"
										variant="light"
										size="xs"
									>
										View All
									</Button>
								</Group>
								<Divider />
								<Stack gap="sm">
									{combinedCompetitions.map((competition) => (
										<ThemeBox
											key={competition.id}
											variant="clickableListItem"
											to={`/competitions/${competition.slug}`}
											p="sm"
											style={{ textDecoration: 'none' }}
											{...slideHover}
										>
											<Group justify="space-between" align="start">
												<Stack gap={4} style={{ flex: 1 }}>
													<Group gap="xs" align="center">
														<Text fw={600} size="sm">
															{competition.name}
														</Text>
														{competition.status === 'ongoing' && (
															<Badge color="green" variant="light" size="xs">
																Ongoing
															</Badge>
														)}
														{competition.status === 'upcoming' && (
															<Badge color="blue" variant="light" size="xs">
																Upcoming
															</Badge>
														)}
													</Group>
													<Group gap="md">
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
														{competition.location && (
															<Group gap="xs">
																<IconMapPin size={14} />
																<Text size="xs" c="dimmed">
																	{competition.location}
																</Text>
															</Group>
														)}
													</Group>
												</Stack>
											</Group>
										</ThemeBox>
									))}
								</Stack>
							</Stack>
						</ThemePaper>
					)}

					{/* Upcoming Competitions Section */}
					{sortedCompetitions.length > 0 && (
						<Stack gap="md">
							<Group justify="space-between" align="center">
								<Stack gap={4}>
									<Title order={2} size="h2">
										Upcoming Competitions
									</Title>
									<Text c="dimmed" size="sm">
										Discover tournaments happening soon
									</Text>
								</Stack>
								<Button
									component={Link}
									to="/register"
									variant="light"
									rightSection={<IconTrophy size={16} />}
								>
									Join to Compete
								</Button>
							</Group>
							<CompetitionCarousel />
						</Stack>
					)}

					{/* Registered Clubs Section */}
					{clubs?.data && clubs.data.length > 0 && (
						<Stack gap="md">
							<Stack gap={4}>
								<Title order={2} size="h2">
									Registered Clubs
								</Title>
								<Text c="dimmed" size="sm">
									Connect with martial arts clubs in your area
								</Text>
							</Stack>
							<ClubList />
						</Stack>
					)}

					{/* Features Section */}
					<ThemePaper light="gray.1" dark="gray.8" p="xl" radius="md">
						<Stack gap="xl">
							<Stack gap={4} align="center" ta="center">
								<Title order={2} size="h2">
									Why Choose Our Platform?
								</Title>
								<Text c="dimmed" size="sm" maw={600}>
									Everything you need to manage competitions, track results, and
									connect with the martial arts community
								</Text>
							</Stack>
							<SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
								<Stack gap="sm" align="center" ta="center">
									<ThemeBox variant="iconCircleBlue">
										<IconTrophy size={32} color="var(--mantine-color-blue-6)" />
									</ThemeBox>
									<Title order={4} size="h5">
										Competition Management
									</Title>
									<Text size="sm" c="dimmed">
										Create and manage competitions with ease. Track
										participants, categories, and results all in one place.
									</Text>
								</Stack>
								<Stack gap="sm" align="center" ta="center">
									<ThemeBox variant="iconCircleGreen">
										<IconUsers size={32} color="var(--mantine-color-green-6)" />
									</ThemeBox>
									<Title order={4} size="h5">
										Club Networking
									</Title>
									<Text size="sm" c="dimmed">
										Connect with martial arts clubs, share resources, and build
										a stronger community together.
									</Text>
								</Stack>
								<Stack gap="sm" align="center" ta="center">
									<ThemeBox variant="iconCircleOrange">
										<IconCalendar
											size={32}
											color="var(--mantine-color-orange-6)"
										/>
									</ThemeBox>
									<Title order={4} size="h5">
										Easy Registration
									</Title>
									<Text size="sm" c="dimmed">
										Simple and streamlined registration process. Get notified
										about upcoming competitions and never miss an event.
									</Text>
								</Stack>
							</SimpleGrid>
						</Stack>
					</ThemePaper>

					{/* Final CTA Section */}
					<ThemePaper
						light="blue.1"
						dark="blue.9"
						p="xl"
						radius="md"
						style={{
							background: theme.gradientBlue,
						}}
					>
						<Stack gap="md" align="center" ta="center">
							<Title order={2} size="h2" c={theme.textOnGradient}>
								Ready to Get Started?
							</Title>
							<Text size="lg" c={theme.textSecondary} maw={600}>
								Join thousands of martial artists and clubs already using our
								platform to manage competitions and connect with the community.
							</Text>
							<Group gap="md" justify="center">
								<Button
									component={Link}
									to="/register"
									size="lg"
									variant="filled"
									leftSection={<IconUsers size={20} />}
									style={{
										backgroundColor: theme.getColor(
											'var(--mantine-color-blue-9)',
											'white',
										),
										color: theme.getColor(
											'white',
											'var(--mantine-color-blue-9)',
										),
									}}
								>
									Create Account
								</Button>
								<Button
									component={Link}
									to="/login"
									size="lg"
									variant="outline"
									style={{
										borderColor: theme.borderOutline,
										color: theme.borderOutline,
									}}
								>
									Sign In
								</Button>
							</Group>
						</Stack>
					</ThemePaper>
				</Stack>
			</Container>
		</>
	);
}
