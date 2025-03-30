import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { ClubCreate } from '@monorepo/utils';
import { useMutation, useQueryClient } from 'react-query';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { Api } from '../../../api';

interface Props {
	onSubmit: () => void;
}

export function ClubForm({ onSubmit: onDone }: Props) {
	const form = useForm<ClubCreate>({
		initialValues: {
			name: '',
			country: 'EE',
		},
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation(Api.user.club.createClub, {
		onSuccess: () => {
			queryClient.invalidateQueries([StaticQueryKey.HomeClubs]);
			onDone();
		},
	});

	const onSubmit = async (values: typeof form.values) => {
		mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput type="text" {...form.getInputProps('name')} />
			<TextInput type="text" {...form.getInputProps('country')} />
			<Button type="submit"> create</Button>
		</form>
	);
}
