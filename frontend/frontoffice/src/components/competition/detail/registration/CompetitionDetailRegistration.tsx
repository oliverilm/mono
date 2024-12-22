import { Flex, Table, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import {
	CompetitionAPI,
	type CompetitionCategory,
	type CompetitionListItem,
} from '../../../../api/common';
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
		queryFn: () => CompetitionAPI.getPersonalCompetitors(competition.slug),
		enabled: Boolean(competition.slug),
	});

	const getRowsForCompetitionCategory = (category: CompetitionCategory) => {
		// get judokas suitable for this category
		const { smallestYearAllowed, sex, largestYearAllowed } = category;

		const selection = competitors?.data.filter((competitor) => {
			if (sex !== 'Unisex' && sex !== competitor.sex) {
				return false;
			}

			const [smallest, largest] = [
				Number(smallestYearAllowed),
				Number(largestYearAllowed),
			].sort();

			const isValidYear =
				dayjs(competitor.dateOfBirth).year() >= smallest &&
				dayjs(competitor.dateOfBirth).year() <= largest;
			return isValidYear;
		});

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

	return (
		<Flex direction={'column'}>
			{competitionCategories.map((category) => {
				const rows = getRowsForCompetitionCategory(category);
				if (!rows?.length) return null;

				const [smallest, largest] = [
					Number(category.smallestYearAllowed),
					Number(category.largestYearAllowed),
				].sort();
				return (
					<Flex direction={'column'} gap={'md'} key={category.categoryId}>
						<Flex gap={'md'} align={'baseline'}>
							<Title>{category.categoryName.toUpperCase()}</Title>
							<Text>
								{smallest} - {largest}
							</Text>
						</Flex>
						<Table stickyHeader stickyHeaderOffset={60}>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Name</Table.Th>
									<Table.Th>Sex</Table.Th>
									<Table.Th>year</Table.Th>
									<Table.Th>Seed</Table.Th>
									<Table.Th>Weight</Table.Th>
									<Table.Th>action</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{rows}</Table.Tbody>
							<Table.Caption>Scroll page to see sticky thead</Table.Caption>
						</Table>
					</Flex>
				);
			})}
		</Flex>
	);
}
