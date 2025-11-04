import {
	Badge,
	Group,
	Pagination,
	Stack,
	Table,
	Text,
	Title,
} from '@mantine/core';
import {
	IconBuilding,
	IconCategory,
	IconTrophy,
	IconUsers,
	IconWeight,
} from '@tabler/icons-react';
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

interface Props {
	competition: CompetitionListItem;
	competitionCategories: CompetitionCategory[];
}

const TAKE = 10;
export function CompetitionDetailCompetitors({
	competition,
	competitionCategories,
}: Props) {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading } = useQuery({
		queryKey: ['competitors', competition.slug, currentPage],
		queryFn: () =>
			Api.publicApi.competition.getCompetitors(competition.slug, {
				skip: (currentPage - 1) * TAKE,
				take: TAKE,
			}),
	});

	const totalCompetitors = data?.data.metadata.count ?? 0;
	const totalPages = Math.ceil(totalCompetitors / TAKE);

	const rows = data?.data.competitors.map((element) => {
		const category = competitionCategories.find(
			(cat) => Number(cat.id) === Number(element.competitionCategoryId),
		);

		return (
			<Table.Tr key={element.id}>
				<Table.Td>
					<Text fw={500}>
						{element.firstName} {element.lastName}
					</Text>
				</Table.Td>
				<Table.Td>
					{category ? (
						<Badge
							variant="light"
							color="blue"
							size="sm"
							leftSection={<IconCategory size={12} />}
						>
							{category.categoryName}
						</Badge>
					) : (
						<Text size="sm" c="dimmed">
							N/A
						</Text>
					)}
				</Table.Td>
				<Table.Td>
					{element.seed !== null && element.seed !== undefined ? (
						<Badge
							variant="light"
							color="yellow"
							size="sm"
							leftSection={<IconTrophy size={12} />}
						>
							{element.seed}
						</Badge>
					) : (
						<Text size="sm" c="dimmed">
							—
						</Text>
					)}
				</Table.Td>
				<Table.Td>
					{element.weight ? (
						<Badge
							variant="light"
							color="blue"
							size="sm"
							leftSection={<IconWeight size={12} />}
						>
							{element.weight} kg
						</Badge>
					) : (
						<Text size="sm" c="dimmed">
							—
						</Text>
					)}
				</Table.Td>
				<Table.Td>
					{element.clubName ? (
						<Group gap="xs" align="center">
							<IconBuilding size={14} color="var(--mantine-color-gray-6)" />
							<Text size="sm">{element.clubName}</Text>
						</Group>
					) : (
						<Text size="sm" c="dimmed">
							—
						</Text>
					)}
				</Table.Td>
			</Table.Tr>
		);
	});

	const startItem = (currentPage - 1) * TAKE + 1;
	const endItem = Math.min(currentPage * TAKE, totalCompetitors);

	return (
		<Stack gap="lg" w={'100%'}>
			{/* Header */}
			<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
				<Stack gap="md">
					<Group gap="xs" align="center" justify="space-between">
						<Group gap="xs" align="center">
							<IconUsers size={24} color="var(--mantine-color-blue-6)" />
							<Title order={3} size="h4">
								Registered Competitors
							</Title>
						</Group>
						{totalCompetitors > 0 && (
							<Badge variant="light" color="blue" size="lg">
								{totalCompetitors}{' '}
								{totalCompetitors === 1 ? 'competitor' : 'competitors'}
							</Badge>
						)}
					</Group>
					{totalCompetitors > 0 && (
						<Text size="sm" c="dimmed">
							Showing {startItem}–{endItem} of {totalCompetitors} competitors
						</Text>
					)}
				</Stack>
			</ThemePaper>

			{/* Loading State */}
			{isLoading && <LoadingState message="Loading competitors..." />}

			{/* Empty State */}
			{!isLoading && (!data || totalCompetitors === 0) && (
				<EmptyState
					title="No competitors registered yet"
					description="Competitors will appear here once they register for this competition."
					icon={IconUsers}
				/>
			)}

			{/* Table */}
			{!isLoading && data && totalCompetitors > 0 && (
				<ThemePaper light="gray.1" dark="gray.8" p={0} radius="md" withBorder>
					<Table highlightOnHover withTableBorder withColumnBorders striped>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Name</Table.Th>
								<Table.Th>Category</Table.Th>
								<Table.Th>Seed</Table.Th>
								<Table.Th>Weight</Table.Th>
								<Table.Th>Club</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</ThemePaper>
			)}

			{/* Pagination */}
			{!isLoading && data && totalCompetitors > 0 && totalPages > 1 && (
				<Group justify="center">
					<Pagination
						total={totalPages}
						value={currentPage}
						onChange={setCurrentPage}
						boundaries={1}
						siblings={1}
					/>
				</Group>
			)}
		</Stack>
	);
}
