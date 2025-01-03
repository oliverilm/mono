import { Button, Flex, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCompetitionAdmin } from '@monorepo/utils';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserByEmail } from '../../../../../api/auth';
import type { CompetitionListItem } from '../../../../../api/common';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionDetailAdminForm({ competition }: Props) {
	const form = useForm<CreateCompetitionAdmin>({
		initialValues: {
			competitionId: competition.id,
			userId: '',
		},
	});

	const [search, setSearch] = useState('');

	const { data: matchingUsers } = useQuery({
		queryKey: ['users-search', search],
		queryFn: () => getUserByEmail(search),
		enabled: search.length > 5,
		select: (data) => {
			if (data.data) {
				return {
					id: data.data.id,
					email: data.data.email,
				};
			}
			return [];
		},
	});

	const onSubmit = (values: typeof form.values) => {
		console.log(values);
	};
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Flex direction={'column'}>
				<Select
					description={
						'Please type the accurate email address of the user you want to assign as admin'
					}
					nothingFoundMessage={
						search.length < 5 ? 'Insert an email address.' : 'Nothing found...'
					}
					data={
						[matchingUsers ?? []] as unknown as {
							label: string;
							value: string;
						}[]
					}
					searchable
					onSearchChange={(e) => setSearch(e)}
					searchValue={search}
				/>

				<pre>{JSON.stringify(matchingUsers, null, 2)}</pre>

				<Button type="submit">Add</Button>
			</Flex>
		</form>
	);
}
