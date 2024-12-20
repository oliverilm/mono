import {
	Box,
	Flex,
	Grid,
	Paper,
	Text,
	useMantineColorScheme,
} from '@mantine/core';
import {
	CompetitionCategory,
	CompetitionListItem,
	CompetitionMetadata,
} from '../../../../api/common';
import { RichTextRenderer } from '../../update/form/CompetitionUpdateForm';
import { categoryIdentifier, categoryPaper } from './CompetitionDetailInfo.css';
import { CompetitionDetailLinks } from '../links/CompetitionDetailLinks';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';

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
	const { colorScheme } = useMantineColorScheme();
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
		<Grid>
			<Grid.Col
				span={{
					base: 12,
					md: 6,
				}}
			>
				<Flex direction={'column'} gap={'lg'}>
					<Paper p={'md'} bg={colorScheme === 'dark' ? 'gray.8' : 'gray.1'}>
						<RichTextRenderer value={competition.description ?? ''} />
					</Paper>
					<Paper p={'md'} bg={colorScheme === 'dark' ? 'gray.8' : 'gray.1'}>
						<CompetitionDetailLinks links={links} />
					</Paper>
				</Flex>
			</Grid.Col>
			<Grid.Col
				span={{
					base: 12,
					md: 6,
				}}
			>
				{Object.entries(groupedCategoryData).map(([categoryId, categories]) => (
					<ThemePaper
						light={'gray.1'}
						dark={'gray.8'}
						key={categoryId}
						className={categoryPaper}
					>
						<ThemePaper
							light={'blue.2'}
							dark={'blue.9'}
							p={'xs'}
							className={categoryIdentifier}
						>
							<Text fw={'bold'} ta={'center'}>
								{categories[0].categoryName.toUpperCase()}
							</Text>
						</ThemePaper>
						<Flex direction={'column'} gap={'xs'} p={'sm'}>
							{categories.map((category) => (
								<Flex
									direction={'column'}
									bg={colorScheme === 'dark' ? 'gray.7' : 'gray.3'}
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
					</ThemePaper>
				))}
			</Grid.Col>
		</Grid>
	);
}
