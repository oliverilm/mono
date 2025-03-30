import { Button, Flex, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCompetitionAdmin } from '@monorepo/utils';
import { useState } from 'react';
import { useQuery } from 'react-query';
import type {
	CompetitionListItem,
	CompetitionMetadata,
} from '../../../../../api/utils/common-types';
import { Api } from '../../../../../api';

interface Props {
	competition: CompetitionListItem;
	metadata?: CompetitionMetadata;
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
		queryFn: () => Api.user.auth.getUserByEmail(search),
		enabled: search.length > 5,
		select: (data) => {
			if (data.data) {
				return [
					{
						value: data?.data?.id,
						label: data?.data?.email,
					},
				];
			}
			return [];
		},
	});

	const onSubmit = (values: typeof form.values) => {
		console.log(values);
		// TODO
	};

	// TODO: also show and allow to remove existing admins, if the current user is an owner

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Flex direction={'column'} gap={'md'}>
				<Select
					description={
						'Please type the accurate email address of the user you want to assign as admin'
					}
					nothingFoundMessage={
						search.length < 5 ? 'Insert an email address.' : 'Nothing found...'
					}
					data={
						(matchingUsers || []) as unknown as {
							label: string;
							value: string;
						}[]
					}
					searchable
					onSearchChange={(e) => setSearch(e)}
					searchValue={search}
				/>

				<Button type="submit">Add</Button>
			</Flex>
		</form>
	);
}
