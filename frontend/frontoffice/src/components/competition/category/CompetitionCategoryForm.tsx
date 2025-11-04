import {
	Button,
	Group,
	NumberInput,
	Select,
	Stack,
	TagsInput,
	Text,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { CreateCompetitionCategory } from '@monorepo/utils';
import {
	IconCategory,
	IconGenderBigender,
	IconNumbers,
	IconPlus,
	IconWeight,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Api } from '../../../api';
import type { CompetitionListItem } from '../../../api/utils/common-types';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { useCommonStore } from '../../../stores/common';
import { ThemePaper } from '../../shared/theme-paper/ThemePaper';

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

	const { mutateAsync, isLoading } = useMutation(
		({ data }: { data: CreateCompetitionCategory }) =>
			Api.user.competition.createCompetitionCategory(data),
		{
			onSuccess: () => {
				form.reset();
				setTemporaryWeights({ men: [], women: [] });
			},
		},
	);

	const onSubmit = async (values: typeof form.values) => {
		try {
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

				await Promise.all([
					mutateAsync({ data: maleCategory }),
					mutateAsync({ data: femaleCategory }),
				]);

				notifications.show({
					title: 'Categories Created',
					message: 'Male and Female categories have been created successfully',
					color: 'green',
				});
			} else {
				const category: CreateCompetitionCategory = {
					...form.values,
					categoryId: Number(form.values.categoryId),
				} as CreateCompetitionCategory;

				await mutateAsync({ data: category });

				notifications.show({
					title: 'Category Created',
					message: 'Category has been created successfully',
					color: 'green',
				});
			}

			queryClient.invalidateQueries([
				StaticQueryKey.CompetitionCategories,
				competition.slug,
			]);

			onDone();
		} catch (error) {
			notifications.show({
				title: 'Creation Failed',
				message: 'Failed to create category. Please try again.',
				color: 'red',
			});
		}
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap="lg">
				{/* Category Selection */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Title order={4} size="h5">
							Category Selection
						</Title>
						<Group grow>
							<Select
								label="Gender"
								placeholder="Select gender"
								leftSection={<IconGenderBigender size={18} />}
								data={['Male & Female', 'Male', 'Female', 'Unisex']}
								required
								{...form.getInputProps('sex')}
							/>
							<Select
								label="Category Type"
								placeholder="Select category"
								leftSection={<IconCategory size={18} />}
								data={commonStore.categories.map(({ value, id }) => ({
									label: value,
									value: id.toString(),
								}))}
								required
								searchable
								{...form.getInputProps('categoryId')}
							/>
						</Group>
					</Stack>
				</ThemePaper>

				{/* Age Range */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Title order={4} size="h5">
							Age Range
						</Title>
						<Group grow>
							<NumberInput
								label="Smallest Year Allowed"
								placeholder="Enter minimum year"
								leftSection={<IconNumbers size={18} />}
								min={1900}
								max={new Date().getFullYear()}
								required
								{...form.getInputProps('smallestYearAllowed')}
							/>
							<NumberInput
								label="Largest Year Allowed"
								placeholder="Enter maximum year"
								leftSection={<IconNumbers size={18} />}
								min={1900}
								max={new Date().getFullYear()}
								required
								{...form.getInputProps('largestYearAllowed')}
							/>
						</Group>
						<Text size="sm" c="dimmed">
							Participants must be born between these years to be eligible
						</Text>
					</Stack>
				</ThemePaper>

				{/* Weight Classes */}
				<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
					<Stack gap="md">
						<Title order={4} size="h5">
							Weight Classes
						</Title>
						{form.values.sex === 'Male & Female' ? (
							<Stack gap="sm">
								<TagsInput
									label="Male Weight Classes"
									placeholder="Enter weight and press Enter"
									description="Press Enter to add each weight class"
									leftSection={<IconWeight size={18} />}
									value={temporaryWeights.men}
									onChange={(value) =>
										setTemporaryWeights((prev) => ({ ...prev, men: value }))
									}
								/>
								<TagsInput
									label="Female Weight Classes"
									placeholder="Enter weight and press Enter"
									description="Press Enter to add each weight class"
									leftSection={<IconWeight size={18} />}
									value={temporaryWeights.women}
									onChange={(value) =>
										setTemporaryWeights((prev) => ({ ...prev, women: value }))
									}
								/>
							</Stack>
						) : (
							<TagsInput
								label="Weight Classes"
								placeholder="Enter weight and press Enter"
								description="Press Enter to add each weight class"
								leftSection={<IconWeight size={18} />}
								{...form.getInputProps('weights')}
							/>
						)}
					</Stack>
				</ThemePaper>

				{/* Submit Button */}
				<Group justify="flex-end">
					<Button
						type="submit"
						size="md"
						leftSection={<IconPlus size={18} />}
						loading={isLoading}
					>
						{form.values.sex === 'Male & Female'
							? 'Add Categories'
							: 'Add Category'}
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
