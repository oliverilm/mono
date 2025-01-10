import { Flex, Table, Text, TextInput, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { CompetitionAPI } from '../../../../api/competition-api';
import type {
	CompetitionCategory,
	CompetitionListItem,
} from '../../../../api/utils/common-types';
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

	return (
		<Flex direction={'column'} gap={'lg'}>
			<TextInput
				value={search}
				onChange={(e) => setSearch(e.currentTarget.value)}
				placeholder="Search for competitor"
			/>
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
							<Table.Tbody>{rows}</Table.Tbody>
						</Table>
					</Flex>
				);
			})}
		</Flex>
	);
}
