import { ActionIcon, Badge, Select, Table, Text, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCompetitor } from '@monorepo/utils';
import {
	IconDeviceFloppy,
	IconTrash,
	IconTrophy,
	IconWeight,
} from '@tabler/icons-react';
import type { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { Api } from '../../../../../api';
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
		mutationFn: (id: number) => Api.user.competition.deleteCompetitor({ id }),
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
				<Text fw={500}>
					{competitor.firstName} {competitor.lastName}
				</Text>
			</Table.Td>
			<Table.Td>
				<Badge
					color={
						competitor.sex === 'Male'
							? 'blue'
							: competitor.sex === 'Female'
								? 'pink'
								: 'gray'
					}
					variant="light"
					size="sm"
				>
					{competitor.sex}
				</Badge>
			</Table.Td>
			<Table.Td>
				<Text size="sm" c="dimmed">
					{dayjs(competitor.dateOfBirth).year()}
				</Text>
			</Table.Td>

			{!currentCategoryParticipation ? (
				<ParticipationFormForCategory
					category={category}
					competitor={competitor}
				/>
			) : (
				<>
					<Table.Td>
						<Badge
							variant="light"
							color="yellow"
							size="sm"
							leftSection={<IconTrophy size={12} />}
						>
							{currentCategoryParticipation.seed || 'N/A'}
						</Badge>
					</Table.Td>
					<Table.Td>
						<Badge
							variant="light"
							color="blue"
							size="sm"
							leftSection={<IconWeight size={12} />}
						>
							{currentCategoryParticipation.weight} kg
						</Badge>
					</Table.Td>
					<Table.Td align="right">
						<Tooltip label="Remove from category" withArrow>
							<ActionIcon
								variant="light"
								color="red"
								size="lg"
								onClick={() => mutate(currentCategoryParticipation.id)}
							>
								<IconTrash size={18} />
							</ActionIcon>
						</Tooltip>
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
			Api.user.competition.createCompetitor(data.slug, data.data),
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
					placeholder="Seed"
					leftSection={<IconTrophy size={14} />}
					{...form.getInputProps('seed')}
				/>
			</Table.Td>
			<Table.Td>
				<Select
					variant="filled"
					w={'6rem'}
					data={category.weights}
					placeholder="Weight"
					leftSection={<IconWeight size={14} />}
					{...form.getInputProps('weight')}
				/>
			</Table.Td>
			<Table.Td align="right">
				<Tooltip label="Register competitor" withArrow>
					<ActionIcon
						variant="light"
						color="green"
						size="lg"
						onClick={onSubmit}
					>
						<IconDeviceFloppy size={18} />
					</ActionIcon>
				</Tooltip>
			</Table.Td>
		</>
	);
}
