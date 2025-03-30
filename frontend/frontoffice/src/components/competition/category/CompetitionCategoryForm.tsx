import { Button, Flex, NumberInput, Select, TagsInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCompetitionCategory } from '@monorepo/utils';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import type { CompetitionListItem } from '../../../api/utils/common-types';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { useCommonStore } from '../../../stores/common';
import { Api } from '../../../api';

interface Props {
	competition: CompetitionListItem;
	onDone: () => void;
}

export function CompetitionCategoryForm({ competition, onDone }: Props) {
	const commonStore = useCommonStore();
	const queryClient = useQueryClient();
	const [temporaryWeights, setTemporaryWeights] = useState<
		Record<'men' | 'women', string[]>
	>({
		men: [],
		women: [],
	});

	const form = useForm<
		Omit<CreateCompetitionCategory, 'sex'> & {
			sex: CreateCompetitionCategory['sex'] | 'Male & Female';
		}
	>({
		initialValues: {
			categoryId: 0,
			competitionId: competition.id,
			largestYearAllowed: 1990,
			smallestYearAllowed: 2000,
			sex: 'Male & Female',
			weights: [],
		},
	});

	const { mutateAsync } = useMutation(
		({ slug, data }: { slug: string; data: CreateCompetitionCategory }) =>
			Api.user.competition.createCompetitionCategory(slug, data),
		{
			onSuccess: () => {
				form.reset();
			},
		},
	);

	const onSubmit = async (values: typeof form.values) => {
		if (values.sex === 'Male & Female') {
			const maleCategory: CreateCompetitionCategory = {
				...form.values,
				categoryId: Number(form.values.categoryId),
				sex: 'Male',
				weights: temporaryWeights.men,
			};

			const femaleCategory: CreateCompetitionCategory = {
				...form.values,
				categoryId: Number(form.values.categoryId),
				sex: 'Female',
				weights: temporaryWeights.women,
			};

			const responses = await Promise.all([
				mutateAsync({ slug: competition.slug, data: maleCategory }),
				mutateAsync({ slug: competition.slug, data: femaleCategory }),
			]);

			if (responses) {
				onDone();
			}

			// generate two categories
		} else {
			const category: CreateCompetitionCategory = {
				...form.values,
				categoryId: Number(form.values.categoryId),
			} as CreateCompetitionCategory;

			await mutateAsync({ slug: competition.slug, data: category });
		}

		queryClient.invalidateQueries([
			StaticQueryKey.CompetitionCategories,
			competition.slug,
		]);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Flex gap={'sm'}>
				<Select
					w={'30%'}
					label="Sex"
					data={['Male & Female', 'Male', 'Female', 'Unisex']}
					{...form.getInputProps('sex')}
				/>
				<Select
					w={'70%'}
					label="Category"
					data={commonStore.categories.map(({ value, id }) => ({
						label: value,
						value: id.toString(),
					}))}
					{...form.getInputProps('categoryId')}
				/>
			</Flex>

			<Flex gap={'sm'}>
				<NumberInput
					label="Largest Year Allowed"
					{...form.getInputProps('largestYearAllowed')}
				/>
				<NumberInput
					label="Smallest year allowed"
					{...form.getInputProps('smallestYearAllowed')}
				/>
			</Flex>

			{form.values.sex === 'Male & Female' ? (
				<Flex direction={'column'} gap={'sm'}>
					<TagsInput
						description="Press enter to add"
						label="Male Weights"
						value={temporaryWeights.men}
						onChange={(value) =>
							setTemporaryWeights((prev) => ({ ...prev, men: value }))
						}
					/>
					<TagsInput
						description="Press enter to add"
						label="Female Weights"
						value={temporaryWeights.women}
						onChange={(value) =>
							setTemporaryWeights((prev) => ({ ...prev, women: value }))
						}
					/>
				</Flex>
			) : (
				<TagsInput
					description="Press enter to add"
					label="Weights"
					{...form.getInputProps('weights')}
				/>
			)}

			<Button type="submit">add category</Button>
		</form>
	);
}
