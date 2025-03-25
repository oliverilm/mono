import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCompetition } from '@monorepo/utils';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../stores/auth';
import { Api } from '../../../../api';
interface Props {
	onSubmit: () => void;
}
export function CompetitionFrom({ onSubmit: onDone }: Props) {
	const navigate = useNavigate();
	const authStore = useAuthStore();
	const queryClient = useQueryClient();
	const form = useForm<CreateCompetition>({
		initialValues: {
			name: '',
		},
	});

	const { mutate } = useMutation(Api.competition.createCompetition, {
		onSuccess: (data) => {
			navigate(`/competitions/${data.data.slug}`);
			queryClient.invalidateQueries([
				'competitions-private',
				authStore.isAuthenticated,
			]);
			onDone();
		},
	});

	const onSubmit = async (values: typeof form.values) => {
		mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput type="text" {...form.getInputProps('name')} />

			<Button type="submit">create</Button>
		</form>
	);
}
