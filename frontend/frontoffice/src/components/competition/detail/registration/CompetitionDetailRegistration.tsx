import {
	Badge,
	Divider,
	Group,
	Paper,
	Stack,
	Table,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { IconCategory, IconSearch, IconUsers } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Api } from '../../../../api';
import type {
	CompetitionCategory,
	CompetitionListItem,
} from '../../../../api/utils/common-types';
import { EmptyState } from '../../../shared/empty-state/EmptyState';
import { LoadingState } from '../../../shared/loading-state/LoadingState';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';
import { CompetitionDetailRegistrationRow } from './row/CompetitionDetailRegistrationRow';

interface Props {
	competition: CompetitionListItem;
	competitionCategories: CompetitionCategory[];
}
export function CompetitionDetailRegistration({
	competition,
	competitionCategories,
}: Props) {
	const { data: competitors } = useQuery({
		queryKey: ['personal-competitors', competition.slug],
		queryFn: () =>
			Api.user.competition.getPersonalCompetitors(competition.slug),
		enabled: Boolean(competition.slug),
	});

	const [search, setSearch] = useState('');

	const getRowsForCompetitionCategory = (category: CompetitionCategory) => {
		// get judokas suitable for this category
		const { smallestYearAllowed, sex, largestYearAllowed } = category;

		const selection = competitors?.data.filter(
			({ dateOfBirth, firstName, lastName, ...competitor }) => {
				if (sex !== 'Unisex' && sex !== competitor.sex) {
					return false;
				}

				const [smallest, largest] = [
					Number(smallestYearAllowed),
					Number(largestYearAllowed),
				].sort();

				const isValidYear =
					dayjs(dateOfBirth).year() >= smallest &&
					dayjs(dateOfBirth).year() <= largest;

				const isContainingSearchChars = `${firstName} ${lastName}`
					.toLowerCase()
					.includes(search.toLowerCase());
				return isValidYear && isContainingSearchChars;
			},
		);

		// todo: test the sorting order, may be backwards
		return selection
			?.sort((a, b) => (a.firstName.localeCompare(b.lastName) > 0 ? 1 : -1))
			?.map((element) => (
				<CompetitionDetailRegistrationRow
					key={element.id}
					competitor={element}
					category={category}
				/>
			));
	};

	const hasResults = competitionCategories.some((category) => {
		const rows = getRowsForCompetitionCategory(category);
		return rows && rows.length > 0;
	});

	return (
		<Stack gap="lg">
			{/* Search Section */}
			<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
				<Stack gap="md">
					<Group gap="xs" align="center">
						<IconSearch size={24} color="var(--mantine-color-blue-6)" />
						<Title order={3} size="h4">
							Search Competitors
						</Title>
					</Group>
					<Divider />
					<TextInput
						value={search}
						onChange={(e) => setSearch(e.currentTarget.value)}
						placeholder="Search by name..."
						leftSection={<IconSearch size={18} />}
						size="md"
					/>
					{search && (
						<Text size="sm" c="dimmed">
							{hasResults
								? `Showing results for "${search}"`
								: `No results found for "${search}"`}
						</Text>
					)}
				</Stack>
			</ThemePaper>

			{/* Loading State */}
			{!competitors && <LoadingState message="Loading competitors..." />}

			{/* Empty State */}
			{competitors && !hasResults && (
				<EmptyState
					title="No competitors found"
					description={
						search
							? 'Try adjusting your search criteria'
							: 'No competitors are registered for this competition yet'
					}
					icon={IconUsers}
				/>
			)}

			{/* Category Tables */}
			{competitionCategories.map((category) => {
				const rows = getRowsForCompetitionCategory(category);
				if (!rows?.length) return null;

				const [smallest, largest] = [
					Number(category.smallestYearAllowed),
					Number(category.largestYearAllowed),
				].sort();

				return (
					<ThemePaper
						key={category.categoryId}
						light="gray.1"
						dark="gray.8"
						p={0}
						radius="md"
						withBorder
					>
						{/* Category Header */}
						<Paper
							shadow="sm"
							p="md"
							radius="md"
							style={{
								borderRadius:
									'var(--mantine-radius-md) var(--mantine-radius-md) 0 0',
								background:
									'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-blue-8) 100%)',
							}}
						>
							<Stack gap="xs">
								<Group justify="space-between" align="center">
									<Group gap="xs" align="center">
										<IconCategory size={20} color="white" />
										<Title order={4} size="h5" c="white">
											{category.categoryName.toUpperCase()}
										</Title>
									</Group>
									<Badge variant="light" color="white" size="lg">
										{rows.length}{' '}
										{rows.length === 1 ? 'competitor' : 'competitors'}
									</Badge>
								</Group>
								<Group gap="xs">
									<Badge variant="filled" color="white" size="sm" c="blue">
										Age: {smallest} - {largest}
									</Badge>
									{category.sex && (
										<Badge
											variant="filled"
											color="white"
											size="sm"
											c={
												category.sex === 'Male'
													? 'blue'
													: category.sex === 'Female'
														? 'pink'
														: 'gray'
											}
										>
											{category.sex}
										</Badge>
									)}
								</Group>
							</Stack>
						</Paper>

						{/* Table */}
						<Table
							stickyHeader
							stickyHeaderOffset={60}
							highlightOnHover
							withTableBorder
							withColumnBorders
						>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Name</Table.Th>
									<Table.Th>Gender</Table.Th>
									<Table.Th>Birth Year</Table.Th>
									<Table.Th>Seed</Table.Th>
									<Table.Th>Weight</Table.Th>
									<Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{rows}</Table.Tbody>
						</Table>
					</ThemePaper>
				);
			})}
		</Stack>
	);
}
