import {
	ActionIcon,
	Badge,
	Box,
	Button,
	Divider,
	Flex,
	Group,
	Modal,
	Stack,
	Text,
	Title,
	useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconExternalLink, IconPlus, IconTrophy } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ThemePaper } from '../../../../shared/theme-paper/ThemePaper';

interface Competition {
	id: string;
	name: string;
	slug: string;
	isPublished: boolean;
	isArchived: boolean;
	startingAt?: string;
	location?: string;
}

interface Props {
	competitions?: Competition[];
	slug?: string;
}

export function ClubDetailAdminCompetitions({ competitions = [] }: Props) {
	const { colorScheme } = useMantineColorScheme();
	const navigate = useNavigate();
	const [opened, { toggle }] = useDisclosure();

	const activeCompetitions = competitions.filter((comp) => !comp.isArchived);
	const publishedCompetitions = activeCompetitions.filter(
		(comp) => comp.isPublished,
	);
	const draftCompetitions = activeCompetitions.filter(
		(comp) => !comp.isPublished,
	);

	return (
		<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
			<Flex justify="space-between" align="center" mb="md">
				<Group gap="xs">
					<IconTrophy size={24} />
					<Title order={3} size="h4">
						Competitions
					</Title>
				</Group>
				<Group gap="xs">
					<Button
						leftSection={<IconPlus size={16} />}
						size="xs"
						onClick={toggle}
						variant="light"
					>
						New Competition
					</Button>
				</Group>
			</Flex>
			<Divider mb="md" />

			{activeCompetitions.length > 0 ? (
				<Stack gap="md">
					{/* Published Competitions */}
					{publishedCompetitions.length > 0 && (
						<Box>
							<Text size="sm" fw={500} mb="xs" c="dimmed">
								Published ({publishedCompetitions.length})
							</Text>
							<Stack gap="xs">
								{publishedCompetitions.map((competition) => (
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
											transition: 'all 0.2s',
										}}
										onClick={() =>
											navigate(`/competitions/${competition.slug}`)
										}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'translateX(4px)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'translateX(0)';
										}}
									>
										<Flex justify="space-between" align="center">
											<Stack gap={4} style={{ flex: 1 }}>
												<Group gap="xs">
													<Text fw={500}>{competition.name}</Text>
													<Badge color="green" variant="light" size="sm">
														Published
													</Badge>
												</Group>
												<Group gap="xs">
													{competition.startingAt && (
														<Text size="xs" c="dimmed">
															{dayjs(competition.startingAt).format(
																'MMM D, YYYY',
															)}
														</Text>
													)}
													{competition.location && (
														<>
															<Text size="xs" c="dimmed">
																•
															</Text>
															<Text size="xs" c="dimmed">
																{competition.location}
															</Text>
														</>
													)}
												</Group>
											</Stack>
											<ActionIcon
												variant="transparent"
												onClick={(e) => {
													e.stopPropagation();
													navigate(`/competitions/${competition.slug}`);
												}}
											>
												<IconExternalLink size={16} />
											</ActionIcon>
										</Flex>
									</Box>
								))}
							</Stack>
						</Box>
					)}

					{/* Draft Competitions */}
					{draftCompetitions.length > 0 && (
						<Box>
							<Text size="sm" fw={500} mb="xs" c="dimmed">
								Drafts ({draftCompetitions.length})
							</Text>
							<Stack gap="xs">
								{draftCompetitions.map((competition) => (
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
											transition: 'all 0.2s',
										}}
										onClick={() =>
											navigate(`/competitions/${competition.slug}`)
										}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'translateX(4px)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'translateX(0)';
										}}
									>
										<Flex justify="space-between" align="center">
											<Stack gap={4} style={{ flex: 1 }}>
												<Group gap="xs">
													<Text fw={500}>{competition.name}</Text>
													<Badge color="yellow" variant="light" size="sm">
														Draft
													</Badge>
												</Group>
												<Group gap="xs">
													{competition.startingAt && (
														<Text size="xs" c="dimmed">
															{dayjs(competition.startingAt).format(
																'MMM D, YYYY',
															)}
														</Text>
													)}
													{competition.location && (
														<>
															<Text size="xs" c="dimmed">
																•
															</Text>
															<Text size="xs" c="dimmed">
																{competition.location}
															</Text>
														</>
													)}
												</Group>
											</Stack>
											<ActionIcon
												variant="transparent"
												onClick={(e) => {
													e.stopPropagation();
													navigate(`/competitions/${competition.slug}`);
												}}
											>
												<IconExternalLink size={16} />
											</ActionIcon>
										</Flex>
									</Box>
								))}
							</Stack>
						</Box>
					)}
				</Stack>
			) : (
				<Stack gap="md" align="center" py="xl">
					<IconTrophy size={48} style={{ opacity: 0.3 }} />
					<Text c="dimmed" ta="center">
						No competitions yet
					</Text>
					<Button
						leftSection={<IconPlus size={16} />}
						onClick={toggle}
						variant="light"
					>
						Create First Competition
					</Button>
				</Stack>
			)}

			<Modal
				opened={opened}
				onClose={toggle}
				title="Create Competition"
				size="lg"
			>
				<Text c="dimmed" size="sm">
					Competition creation form would go here.
				</Text>
			</Modal>
		</ThemePaper>
	);
}
