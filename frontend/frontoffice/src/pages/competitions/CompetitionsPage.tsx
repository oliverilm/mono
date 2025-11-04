import {
	Badge,
	Container,
	Grid,
	Group,
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
import { Api } from '../../api';
import { EmptyState } from '../../components/shared/empty-state/EmptyState';
import { LoadingState } from '../../components/shared/loading-state/LoadingState';
import { ThemeBox } from '../../components/shared/theme-box/ThemeBox';
import { ThemePaper } from '../../components/shared/theme-paper/ThemePaper';
import { useHoverEffect } from '../../hooks/useHoverEffect';

export function CompetitionsPage() {
	const hoverEffect = useHoverEffect({ type: 'lift' });

	const { data, isLoading } = useQuery({
		queryKey: ['competitions-public'],
		queryFn: () =>
			Api.publicApi.competition.getPublicCompetitions({
				skip: 0,
				take: 100,
			}),
	});

	const competitions = data?.data ?? [];

	const getCompetitionStatus = (competition: (typeof competitions)[0]) => {
		const now = dayjs();
		const startDate = dayjs(competition.startingAt);
		const regEndDate = dayjs(competition.registrationEndAt);

		if (now.isAfter(startDate)) {
			return { label: 'Completed', color: 'gray' };
		}
		if (now.isAfter(regEndDate)) {
			return { label: 'Registration Closed', color: 'red' };
		}
		if (now.isBefore(startDate) && now.isBefore(regEndDate)) {
			return { label: 'Upcoming', color: 'blue' };
		}
		return { label: 'Ongoing', color: 'green' };
	};

	return (
		<Container size="xl" py="xl">
			<Stack gap="lg">
				{/* Header */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Group gap="xs" align="center" justify="space-between">
							<Group gap="xs" align="center">
								<IconTrophy size={32} color="var(--mantine-color-blue-6)" />
								<Title order={1} size="h2">
									All Competitions
								</Title>
							</Group>
							{competitions.length > 0 && (
								<Badge variant="light" color="blue" size="lg">
									{competitions.length}{' '}
									{competitions.length === 1 ? 'competition' : 'competitions'}
								</Badge>
							)}
						</Group>
						<Text size="sm" c="dimmed">
							Browse through all available competitions and find the perfect
							event for you
						</Text>
					</Stack>
				</ThemePaper>

				{/* Loading State */}
				{isLoading && <LoadingState message="Loading competitions..." />}

				{/* Empty State */}
				{!isLoading && competitions.length === 0 && (
					<EmptyState
						title="No competitions found"
						description="No competitions are available at the moment"
						icon={IconTrophy}
					/>
				)}

				{/* Competitions Grid */}
				{!isLoading && competitions.length > 0 && (
					<Grid>
						{competitions.map((competition) => {
							const status = getCompetitionStatus(competition);
							const startDate = dayjs(competition.startingAt);
							const regEndDate = dayjs(competition.registrationEndAt);

							return (
								<Grid.Col
									key={competition.id}
									span={{ base: 12, sm: 6, md: 4 }}
								>
									<ThemeBox
										to={`/competitions/${competition.slug}`}
										variant="clickable"
									>
										<ThemePaper
											light="gray.1"
											dark="gray.8"
											p="lg"
											radius="md"
											withBorder
											style={{ height: '100%' }}
											{...hoverEffect}
										>
											<Stack gap="md" style={{ height: '100%' }}>
												{/* Header */}
												<Group justify="space-between" align="flex-start">
													<Title order={3} size="h5" style={{ flex: 1 }}>
														{competition.name}
													</Title>
													<Badge variant="light" color={status.color} size="sm">
														{status.label}
													</Badge>
												</Group>

												{/* Club Name */}
												{competition.clubName && (
													<Group gap="xs" align="center">
														<IconUsers
															size={16}
															color="var(--mantine-color-gray-6)"
														/>
														<Text size="sm" c="dimmed">
															{competition.clubName}
														</Text>
													</Group>
												)}

												{/* Location */}
												{competition.location && (
													<Group gap="xs" align="center">
														<IconMapPin
															size={16}
															color="var(--mantine-color-gray-6)"
														/>
														<Text size="sm" c="dimmed">
															{competition.location}
														</Text>
													</Group>
												)}

												{/* Dates */}
												<Stack gap="xs">
													<Group gap="xs" align="center">
														<IconCalendar
															size={16}
															color="var(--mantine-color-gray-6)"
														/>
														<Text size="sm" fw={500}>
															Starts:{' '}
														</Text>
														<Text size="sm">
															{startDate.format('MMMM D, YYYY [at] h:mm A')}
														</Text>
													</Group>
													<Group gap="xs" align="center">
														<IconCalendar
															size={16}
															color="var(--mantine-color-gray-6)"
														/>
														<Text size="sm" fw={500}>
															Registration ends:{' '}
														</Text>
														<Text size="sm">
															{regEndDate.format('MMMM D, YYYY [at] h:mm A')}
														</Text>
													</Group>
												</Stack>

												{/* Published Status */}
												<Group justify="flex-end">
													<Badge
														variant="dot"
														color={competition.isPublished ? 'green' : 'gray'}
														size="sm"
													>
														{competition.isPublished ? 'Published' : 'Draft'}
													</Badge>
												</Group>
											</Stack>
										</ThemePaper>
									</ThemeBox>
								</Grid.Col>
							);
						})}
					</Grid>
				)}
			</Stack>
		</Container>
	);
}
