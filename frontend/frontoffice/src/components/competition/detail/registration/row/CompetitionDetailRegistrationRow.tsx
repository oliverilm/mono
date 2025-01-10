import { ActionIcon, Select, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCompetitor } from '@monorepo/utils';
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import type { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { CompetitionAPI } from '../../../../../api/competition-api';
import type {
	CompetitionCategory,
	PrivateCompetitor,
} from '../../../../../api/utils/common-types';

interface Props {
	category: CompetitionCategory;
	competitor: PrivateCompetitor;
}
export function CompetitionDetailRegistrationRow({
	category,
	competitor,
}: Props) {
	const currentCategoryParticipation = competitor.participations.filter(
		(participation) =>
			Number(participation.competitionCategory.id) === category.id,
	)?.[0];

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: (id: number) => CompetitionAPI.deleteCompetitor({ id }),
		onSuccess: (data) => {
			queryClient.setQueryData(
				['personal-competitors', category.competitionSlug],
				(oldData: unknown) => {
					const previousData = oldData as AxiosResponse<PrivateCompetitor[]>;
					return {
						...previousData,
						data: previousData.data.map((competitor) => {
							return {
								...competitor,
								participations: competitor.participations.filter(
									(participation) => participation.id !== data.data.id,
								),
							};
						}),
					};
				},
			);
		},
	});

	return (
		<Table.Tr key={competitor.firstName}>
			<Table.Td>
				{competitor.firstName} {competitor.lastName}
			</Table.Td>
			<Table.Td>{competitor.sex}</Table.Td>
			<Table.Td>{dayjs(competitor.dateOfBirth).year()}</Table.Td>

			{!currentCategoryParticipation ? (
				<ParticipationFormForCategory
					category={category}
					competitor={competitor}
				/>
			) : (
				<>
					<Table.Td>{currentCategoryParticipation.seed}</Table.Td>
					<Table.Td>{currentCategoryParticipation.weight}</Table.Td>
					<Table.Td align="right">
						<ActionIcon
							mx="md"
							variant="transparent"
							c={'orange'}
							onClick={() => mutate(currentCategoryParticipation.id)}
						>
							<IconTrash />
						</ActionIcon>
					</Table.Td>
				</>
			)}
		</Table.Tr>
	);
}

// TODO: separate this to a new file
export function ParticipationFormForCategory({
	category,
	competitor,
}: { category: CompetitionCategory; competitor: PrivateCompetitor }) {
	const queryClient = useQueryClient();
	const form = useForm<CreateCompetitor>({
		initialValues: {
			competitionCategoryId: category.id,
			competitionId: category.competitionId,
			competitorId: competitor.id,
			weight: category.weights[0],
			seed: '0' as unknown as number,
		},
	});

	const { mutate } = useMutation({
		mutationFn: (data: { data: CreateCompetitor; slug: string }) =>
			CompetitionAPI.createCompetitor(data.slug, data.data),
		onSuccess: (data) => {
			queryClient.setQueryData(
				['personal-competitors', category.competitionSlug],
				(oldData: unknown) => {
					const previousData = oldData as AxiosResponse<PrivateCompetitor[]>;
					return {
						...previousData,
						data: previousData.data.map((competitor) => {
							if (competitor.id === String(data.data.profileId)) {
								const participation: PrivateCompetitor['participations'][number] =
									{
										competitionCategory: {
											id: String(data.data.competitionCategoryId),
											competitionName: '',
										},
										seed: data.data.seed,
										weight: data.data.weight,
										id: data.data.id,
									};

								return {
									...competitor,
									participations: [...competitor.participations, participation],
								};
							}
							return competitor;
						}),
					};
				},
			);
		},
	});

	const onSubmit = () => {
		form.validate();
		const data = form.values;
		Object.assign(data, { seed: Number(data.seed) });

		console.log(data);
		mutate({ data, slug: category.competitionSlug });
	};

	return (
		<>
			<Table.Td>
				<Select
					data={Array.from({ length: 11 }, (_, i) => String(i))}
					w={'6rem'}
					{...form.getInputProps('seed')}
				/>
			</Table.Td>
			<Table.Td>
				<Select
					variant="filled"
					w={'6rem'}
					data={category.weights}
					{...form.getInputProps('weight')}
				/>
			</Table.Td>
			<Table.Td align="right">
				<ActionIcon
					mx="md"
					variant="transparent"
					c={'green'}
					onClick={onSubmit}
				>
					<IconDeviceFloppy />
				</ActionIcon>
			</Table.Td>
		</>
	);
}
