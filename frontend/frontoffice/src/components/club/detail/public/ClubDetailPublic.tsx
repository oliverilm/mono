import {
	Avatar,
	Badge,
	Box,
	Container,
	Divider,
	Flex,
	Grid,
	Group,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
} from '@mantine/core';
import { COUNTRIES } from '@monorepo/utils';
import { IconMapPin, IconTrophy, IconUsers } from '@tabler/icons-react';
import { useQueries, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Api } from '../../../../api';
import type { CompetitionListItem } from '../../../../api/utils/common-types';
import { getRandomTestClubImage } from '../../../../constants';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { RichTextRenderer } from '../../../competition/update/form/CompetitionUpdateForm';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';

export function ClubDetailPublic() {
	const { slug } = useParams<'slug'>();
	const { colorScheme } = useMantineColorScheme();
	const navigate = useNavigate();

	const [{ data: clubDetails }, { data: clubMetadata }] = useQueries([
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
	]);

	const { data: competitions } = useQuery({
		queryKey: ['club-competitions', slug, clubDetails?.data?.name],
		queryFn: async () => {
			if (!slug || !clubDetails?.data) return null;
			const allCompetitions =
				await Api.publicApi.competition.getPublicCompetitions({
					skip: 0,
					take: 100,
				});
			// Filter competitions by club name (we don't have clubId in the public API)
			return allCompetitions.data.filter(
				(comp: CompetitionListItem) => comp.clubName === clubDetails.data.name,
			);
		},
		enabled: Boolean(slug && clubDetails?.data),
	});

	const club = clubDetails?.data;
	const metadata = clubMetadata?.data;
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

	const upcomingCompetitions = (competitions?.filter(
		(comp: CompetitionListItem) =>
			!comp.isArchived &&
			comp.isPublished &&
			new Date(comp.startingAt) >= new Date(),
	) || []) as CompetitionListItem[];

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
								? 'linear-gradient(135deg, var(--mantine-color-gray-9) 0%, var(--mantine-color-gray-8) 100%)'
								: 'linear-gradient(135deg, var(--mantine-color-blue-1) 0%, var(--mantine-color-gray-0) 100%)',
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
							<Title order={1} size="h2">
								{club.name}
							</Title>
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

				<Grid>
					{/* Club Admins Section */}
					{metadata?.admins && metadata.admins.length > 0 && (
						<Grid.Col
							span={{
								base: 12,
								md: 6,
							}}
						>
							<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
								<Group gap="xs" mb="md">
									<IconUsers size={24} />
									<Title order={3} size="h4">
										Club Administrators
									</Title>
								</Group>
								<Divider mb="md" />
								<Stack gap="md">
									{metadata.admins.map((admin) => (
										<Box
											key={admin.userId}
											p="sm"
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
								</Stack>
							</ThemePaper>
						</Grid.Col>
					)}

					{/* Competitions Section */}
					<Grid.Col
						span={{
							base: 12,
							md: metadata?.admins && metadata.admins.length > 0 ? 6 : 12,
						}}
					>
						<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
							<Group gap="xs" mb="md">
								<IconTrophy size={24} />
								<Title order={3} size="h4">
									Upcoming Competitions
								</Title>
							</Group>
							<Divider mb="md" />
							{upcomingCompetitions.length > 0 ? (
								<Stack gap="md">
									{upcomingCompetitions
										.slice(0, 5)
										.map((competition: CompetitionListItem) => (
											<Box
												key={competition.id}
												p="sm"
												style={{
													backgroundColor:
														colorScheme === 'dark'
															? 'var(--mantine-color-gray-7)'
															: 'var(--mantine-color-gray-2)',
													borderRadius: 'var(--mantine-radius-sm)',
													cursor: 'pointer',
													transition: 'transform 0.2s',
												}}
												onClick={() => {
													navigate(`/competitions/${competition.slug}`);
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.transform = 'translateX(4px)';
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.transform = 'translateX(0)';
												}}
											>
												<Stack gap={4}>
													<Text fw={500}>{competition.name}</Text>
													<Group gap="xs">
														<Text size="sm" c="dimmed">
															{new Date(
																competition.startingAt,
															).toLocaleDateString()}
														</Text>
														{competition.location && (
															<>
																<Text size="sm" c="dimmed">
																	•
																</Text>
																<Text size="sm" c="dimmed">
																	{competition.location}
																</Text>
															</>
														)}
													</Group>
												</Stack>
											</Box>
										))}
								</Stack>
							) : (
								<Text c="dimmed" ta="center" py="md">
									No upcoming competitions at this time.
								</Text>
							)}
						</ThemePaper>
					</Grid.Col>
				</Grid>
			</Stack>
		</Container>
	);
}
