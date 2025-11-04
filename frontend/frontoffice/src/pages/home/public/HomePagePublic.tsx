import {
	Box,
	Button,
	Container,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
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
import { ClubList } from '../../../components/club/list/ClubList';
import { CompetitionCarousel } from '../../../components/competition/carousel/CompetitionCarousel';
import { StatCard } from '../../../components/shared/stat-card/StatCard';
import { ThemePaper } from '../../../components/shared/theme-paper/ThemePaper';
import { StaticQueryKey } from '../../../providers/query-provider/keys';

export function HomePagePublic() {
	const { colorScheme } = useMantineColorScheme();

	const { data: competitions } = useQuery({
		queryKey: [StaticQueryKey.HomeCompetitions],
		queryFn: () =>
			Api.publicApi.competition.getPublicCompetitions({ skip: 0, take: 25 }),
	});

	const { data: clubs } = useQuery({
		queryKey: [StaticQueryKey.HomeClubs],
		queryFn: () => Api.publicApi.club.getPublicClubs({ skip: 0, take: 25 }),
	});

	// Calculate upcoming competitions
	const upcomingCompetitions =
		competitions?.data?.filter(
			(comp) =>
				!comp.isArchived &&
				comp.isPublished &&
				dayjs(comp.startingAt).isAfter(dayjs()),
		) || [];

	// Sort by starting date (soonest first)
	const sortedCompetitions = [...upcomingCompetitions].sort((a, b) =>
		dayjs(a.startingAt).diff(dayjs(b.startingAt)),
	);

	return (
		<>
			{/* Hero Section */}
			<Box
				style={{
					position: 'relative',
					background:
						colorScheme === 'dark'
							? 'linear-gradient(135deg, var(--mantine-color-blue-9) 0%, var(--mantine-color-blue-8) 100%)'
							: 'linear-gradient(135deg, var(--mantine-color-blue-2) 0%, var(--mantine-color-blue-1) 100%)',
					paddingTop: '80px',
					paddingBottom: '80px',
				}}
			>
				<Container size="lg">
					<Stack gap="xl" align="center" ta="center">
						<Title
							order={1}
							size="3rem"
							fw={800}
							c={colorScheme === 'dark' ? 'white' : 'dark.9'}
						>
							Welcome to the Competition Platform
						</Title>
						<Text
							size="xl"
							c={colorScheme === 'dark' ? 'gray.2' : 'dark.7'}
							maw={600}
						>
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
									borderColor:
										colorScheme === 'dark'
											? 'white'
											: 'var(--mantine-color-blue-9)',
									color:
										colorScheme === 'dark'
											? 'white'
											: 'var(--mantine-color-blue-9)',
								}}
							>
								Sign In
							</Button>
						</Group>
					</Stack>
				</Container>
			</Box>

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
									<Box
										style={{
											width: 64,
											height: 64,
											borderRadius: '50%',
											background:
												colorScheme === 'dark'
													? 'var(--mantine-color-blue-9)'
													: 'var(--mantine-color-blue-1)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<IconTrophy size={32} color="var(--mantine-color-blue-6)" />
									</Box>
									<Title order={4} size="h5">
										Competition Management
									</Title>
									<Text size="sm" c="dimmed">
										Create and manage competitions with ease. Track
										participants, categories, and results all in one place.
									</Text>
								</Stack>
								<Stack gap="sm" align="center" ta="center">
									<Box
										style={{
											width: 64,
											height: 64,
											borderRadius: '50%',
											background:
												colorScheme === 'dark'
													? 'var(--mantine-color-green-9)'
													: 'var(--mantine-color-green-1)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<IconUsers size={32} color="var(--mantine-color-green-6)" />
									</Box>
									<Title order={4} size="h5">
										Club Networking
									</Title>
									<Text size="sm" c="dimmed">
										Connect with martial arts clubs, share resources, and build
										a stronger community together.
									</Text>
								</Stack>
								<Stack gap="sm" align="center" ta="center">
									<Box
										style={{
											width: 64,
											height: 64,
											borderRadius: '50%',
											background:
												colorScheme === 'dark'
													? 'var(--mantine-color-orange-9)'
													: 'var(--mantine-color-orange-1)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<IconCalendar
											size={32}
											color="var(--mantine-color-orange-6)"
										/>
									</Box>
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
							background:
								colorScheme === 'dark'
									? 'linear-gradient(135deg, var(--mantine-color-blue-9) 0%, var(--mantine-color-blue-8) 100%)'
									: 'linear-gradient(135deg, var(--mantine-color-blue-2) 0%, var(--mantine-color-blue-1) 100%)',
						}}
					>
						<Stack gap="md" align="center" ta="center">
							<Title
								order={2}
								size="h2"
								c={colorScheme === 'dark' ? 'white' : 'dark.9'}
							>
								Ready to Get Started?
							</Title>
							<Text
								size="lg"
								c={colorScheme === 'dark' ? 'gray.2' : 'dark.7'}
								maw={600}
							>
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
										backgroundColor:
											colorScheme === 'dark'
												? 'white'
												: 'var(--mantine-color-blue-9)',
										color:
											colorScheme === 'dark'
												? 'var(--mantine-color-blue-9)'
												: 'white',
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
										borderColor:
											colorScheme === 'dark'
												? 'white'
												: 'var(--mantine-color-blue-9)',
										color:
											colorScheme === 'dark'
												? 'white'
												: 'var(--mantine-color-blue-9)',
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
