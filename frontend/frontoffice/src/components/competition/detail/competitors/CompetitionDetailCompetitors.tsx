import { Pagination, Stack, Table } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import { useQuery } from 'react-query';
import type {
	CompetitionCategory,
	CompetitionListItem,
} from '../../../../api/utils/common-types';
import { Api } from '../../../../api';

interface Props {
	competition: CompetitionListItem;
	competitionCategories: CompetitionCategory[];
}

const TAKE = 10;
export function CompetitionDetailCompetitors({
	competition,
	competitionCategories,
}: Props) {
	const pagination = usePagination({ total: TAKE, initialPage: 1 });

	const { data } = useQuery({
		queryKey: ['competitors', competition.slug, pagination.active],
		queryFn: () =>
			Api.public.competition.getCompetitors(competition.slug, {
				skip: (pagination.active - 1) * TAKE,
				take: TAKE,
			}),
	});

	const rows = data?.data.competitors.map((element) => (
		<Table.Tr key={element.id}>
			<Table.Td>{element.firstName}</Table.Td>
			<Table.Td>{element.lastName}</Table.Td>
			<Table.Td>
				{
					competitionCategories.find(
						(cat) => Number(cat.id) === Number(element.competitionCategoryId),
					)?.categoryName
				}
			</Table.Td>
			<Table.Td>{element.weight}</Table.Td>
			<Table.Td>{element.clubName}</Table.Td>
		</Table.Tr>
	));

	return (
		<Stack>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>First Name</Table.Th>
						<Table.Th>Last Name</Table.Th>
						<Table.Th>Category</Table.Th>
						<Table.Th>Weight</Table.Th>
						<Table.Th>Club</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
			<Pagination
				total={Math.ceil((data?.data.metadata.count ?? 1) / TAKE)}
				value={pagination.active}
				onChange={pagination.setPage}
				boundaries={1}
				defaultValue={1}
			/>
		</Stack>
	);
}
