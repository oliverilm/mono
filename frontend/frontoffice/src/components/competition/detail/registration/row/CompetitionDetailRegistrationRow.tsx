import { Button, Select, Table } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCompetitor } from '@monorepo/utils';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';
import {
	CompetitionAPI,
	type CompetitionCategory,
	type PrivateCompetitor,
} from '../../../../../api/common';

interface Props {
	category: CompetitionCategory;
	competitor: PrivateCompetitor;
}
export function CompetitionDetailRegistrationRow({
	category,
	competitor,
}: Props) {
	return (
		<Table.Tr key={competitor.firstName}>
			<Table.Td>
				{competitor.firstName} {competitor.lastName}
			</Table.Td>
			<Table.Td>{competitor.sex}</Table.Td>
			<Table.Td>{dayjs(competitor.dateOfBirth).year()}</Table.Td>

			{competitor.participations.length === 0 ? (
				<ParticipationFormForCategory
					category={category}
					competitor={competitor}
				/>
			) : null}
		</Table.Tr>
	);
}

export function ParticipationFormForCategory({
	category,
	competitor,
}: { category: CompetitionCategory; competitor: PrivateCompetitor }) {
	const form = useForm<CreateCompetitor>({
		initialValues: {
			competitionCategoryId: category.categoryId,
			competitionId: category.competitionId,
			competitorId: competitor.id,
			weight: category.weights[0],
			seed: '0' as unknown as number,
		},
	});

	const { mutate } = useMutation({
		mutationFn: (data: { data: CreateCompetitor; slug: string }) =>
			CompetitionAPI.createCompetitor(data.slug, data.data),
		onSuccess: () => {},
	});

	const onSubmit = () => {
		form.validate();
		mutate({ data: form.values, slug: category.competitionSlug });
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
			<Table.Td>
				<Button onClick={onSubmit}> submit</Button>
			</Table.Td>
		</>
	);
}
