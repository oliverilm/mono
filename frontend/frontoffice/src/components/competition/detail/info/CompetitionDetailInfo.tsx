import {
	Badge,
	Box,
	Divider,
	Grid,
	Group,
	Paper,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import {
	IconCalendar,
	IconCategory,
	IconInfoCircle,
	IconLink,
	IconMapPin,
	IconWeight,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import type {
	CompetitionCategory,
	CompetitionListItem,
	CompetitionMetadata,
} from '../../../../api/utils/common-types';
import { useThemeStyles } from '../../../../hooks/useThemeStyles';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';
import { RichTextRenderer } from '../../update/form/CompetitionUpdateForm';
import { CompetitionDetailLinks } from '../links/CompetitionDetailLinks';

interface Props {
	competition: CompetitionListItem;
	competitionCategories: CompetitionCategory[];
	links?: CompetitionMetadata['competitionLinks'];
}

export function CompetitionDetailInfo({
	competition,
	competitionCategories,
	links,
}: Props) {
	const theme = useThemeStyles();

	const groupedCategoryData = competitionCategories.reduce<
		Record<string, CompetitionCategory[]>
	>((acc, category) => {
		if (acc[category.categoryId]) {
			acc[category.categoryId] = [...acc[category.categoryId], category];
		} else {
			acc[category.categoryId] = [category];
		}

		return acc;
	}, {});

	const hasDescription =
		competition.description && competition.description.trim().length > 0;
	const hasLinks = links && links.length > 0;
	const hasCategories = competitionCategories.length > 0;

	return (
		<Grid>
			{/* Left Column - Description & Links */}
			<Grid.Col
				span={{
					base: 12,
					md: 6,
				}}
			>
				<Stack gap="lg">
					{/* Competition Details */}
					<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
						<Stack gap="md">
							<Group gap="xs" align="center">
								<IconInfoCircle size={24} color="var(--mantine-color-blue-6)" />
								<Title order={3} size="h4">
									Competition Details
								</Title>
							</Group>
							<Divider />
							<Stack gap="md">
								{competition.location && (
									<Group gap="sm">
										<IconMapPin size={18} color="var(--mantine-color-gray-6)" />
										<Text size="sm" c="dimmed">
											Location:
										</Text>
										<Text fw={500}>{competition.location}</Text>
									</Group>
								)}
								{competition.startingAt && (
									<Group gap="sm">
										<IconCalendar
											size={18}
											color="var(--mantine-color-gray-6)"
										/>
										<Text size="sm" c="dimmed">
											Start Date:
										</Text>
										<Text fw={500}>
											{dayjs(competition.startingAt).format(
												'MMMM D, YYYY [at] h:mm A',
											)}
										</Text>
									</Group>
								)}
								{competition.registrationEndAt && (
									<Group gap="sm">
										<IconCalendar
											size={18}
											color="var(--mantine-color-gray-6)"
										/>
										<Text size="sm" c="dimmed">
											Registration Ends:
										</Text>
										<Text fw={500}>
											{dayjs(competition.registrationEndAt).format(
												'MMMM D, YYYY [at] h:mm A',
											)}
										</Text>
									</Group>
								)}
							</Stack>
						</Stack>
					</ThemePaper>

					{/* Description */}
					{hasDescription && (
						<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
							<Stack gap="md">
								<Title order={3} size="h4">
									About This Competition
								</Title>
								<Divider />
								<RichTextRenderer value={competition.description} />
							</Stack>
						</ThemePaper>
					)}

					{/* Links */}
					{hasLinks && (
						<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
							<Stack gap="md">
								<Group gap="xs" align="center">
									<IconLink size={24} color="var(--mantine-color-blue-6)" />
									<Title order={3} size="h4">
										Important Links
									</Title>
								</Group>
								<Divider />
								<CompetitionDetailLinks links={links} />
							</Stack>
						</ThemePaper>
					)}
				</Stack>
			</Grid.Col>

			{/* Right Column - Categories */}
			{hasCategories && (
				<Grid.Col
					span={{
						base: 12,
						md: 6,
					}}
				>
					<Stack gap="lg">
						<Group gap="xs" align="center">
							<IconCategory size={24} color="var(--mantine-color-blue-6)" />
							<Title order={3} size="h4">
								Competition Categories
							</Title>
						</Group>

						{Object.entries(groupedCategoryData).map(
							([categoryId, categories]) => (
								<ThemePaper
									light="gray.1"
									dark="gray.8"
									key={categoryId}
									p={0}
									radius="md"
									withBorder
								>
									{/* Category Header */}
									<Box
										style={{
											background: theme.gradientBlue,
											borderRadius:
												'var(--mantine-radius-md) var(--mantine-radius-md) 0 0',
											padding: 'var(--mantine-spacing-md)',
										}}
									>
										<Group justify="center" align="center">
											<IconCategory size={20} color="white" />
											<Title order={4} size="h5" c="white">
												{categories[0].categoryName.toUpperCase()}
											</Title>
										</Group>
									</Box>

									{/* Category Items */}
									<Stack gap="sm" p="md">
										{categories.map((category) => {
											const [smallest, largest] = [
												Number(category.smallestYearAllowed),
												Number(category.largestYearAllowed),
											].sort((a, b) => a - b);

											return (
												<Paper
													key={`${category.categoryId}-${category.sex}`}
													shadow="sm"
													p="md"
													radius="md"
													withBorder
													style={{
														backgroundColor: theme.getColor(
															'var(--mantine-color-gray-2)',
															'var(--mantine-color-gray-7)',
														),
													}}
												>
													<Stack gap="sm">
														{/* Gender and Age Range */}
														<Group justify="space-between" align="center">
															<Badge
																color={
																	category.sex === 'Male'
																		? 'blue'
																		: category.sex === 'Female'
																			? 'pink'
																			: 'gray'
																}
																variant="light"
																size="lg"
															>
																{category.sex}
															</Badge>
															<Group gap="xs">
																<Text size="sm" c="dimmed">
																	Age Range:
																</Text>
																<Badge variant="outline" size="sm">
																	{smallest} - {largest}
																</Badge>
															</Group>
														</Group>

														{/* Weight Classes */}
														{category.weights &&
															category.weights.length > 0 && (
																<>
																	<Divider variant="dashed" />
																	<Stack gap="xs">
																		<Group gap="xs" align="center">
																			<IconWeight
																				size={16}
																				color="var(--mantine-color-gray-6)"
																			/>
																			<Text size="sm" fw={500} c="dimmed">
																				Weight Classes
																			</Text>
																		</Group>
																		<Group gap="xs">
																			{category.weights.map((weight) => (
																				<Badge
																					key={weight}
																					variant="light"
																					color="gray"
																					size="sm"
																				>
																					{weight}
																				</Badge>
																			))}
																		</Group>
																	</Stack>
																</>
															)}
													</Stack>
												</Paper>
											);
										})}
									</Stack>
								</ThemePaper>
							),
						)}
					</Stack>
				</Grid.Col>
			)}
		</Grid>
	);
}
