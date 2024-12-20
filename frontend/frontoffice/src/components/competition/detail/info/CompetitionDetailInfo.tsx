import { Box, Flex, Paper, Text } from '@mantine/core';
import {
	CompetitionCategory,
	CompetitionListItem,
} from '../../../../api/common';
import { RichTextRenderer } from '../../update/form/CompetitionUpdateForm';
import { categoryIdentifier, categoryPaper } from './CompetitionDetailInfo.css';

interface Props {
	competition: CompetitionListItem;
	competitionCategories: CompetitionCategory[];
}

export function CompetitionDetailInfo({
	competition,
	competitionCategories,
}: Props) {
	const boxProps = {
		m: 'lg',
		maw: '500px',
	};

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

	return (
		<Flex gap={'md'} wrap={'wrap'} align={'start'} w={'100%'}>
			<Flex {...boxProps}>
				<RichTextRenderer value={competition.description ?? ''} />
			</Flex>
			<Flex {...boxProps} direction="column" gap="sm">
				{Object.entries(groupedCategoryData).map(([categoryId, categories]) => (
					<Paper bg={'gray.1'} key={categoryId} className={categoryPaper}>
						<Box bg={'blue.2'} p={'xs'} className={categoryIdentifier}>
							<Text fw={'bold'} ta={'center'}>
								{categories[0].categoryName.toUpperCase()}
							</Text>
						</Box>
						<Flex direction={'column'} gap={'xs'} p={'sm'}>
							{categories.map((category) => (
								<Flex
									direction={'column'}
									bg={'blue.2'}
									p={'xs'}
									className={categoryPaper}
								>
									<Flex justify={'space-between'}>
										<Text>{category.sex}</Text>
										<Text>
											{category.largestYearAllowed} -{' '}
											{category.smallestYearAllowed}
										</Text>
									</Flex>
									<Flex gap={'sm'}>
										{category.weights.map((weight) => (
											<Text>{weight}</Text>
										))}
									</Flex>
								</Flex>
							))}
						</Flex>
					</Paper>
				))}
			</Flex>
		</Flex>
	);
}
