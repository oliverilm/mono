import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateCompetitionLink } from '@monorepo/utils';
import { useMutation, useQueryClient } from 'react-query';
import { CompetitionAPI, type CompetitionListItem } from '../../../../api/common';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { useAuthStore } from '../../../../stores/auth';

export interface Props {
	competition: CompetitionListItem;
	onDone: () => void;
}
export function CompetitionLinkFrom({ competition, onDone }: Props) {
	const queryClient = useQueryClient();
	const authStore = useAuthStore();

	const form = useForm<CreateCompetitionLink>({
		initialValues: {
			label: '',
			url: '',
		},
	});

	const { mutate } = useMutation(
		(data: CreateCompetitionLink) =>
			CompetitionAPI.createCompetitionLink(competition.slug, data),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([
					StaticQueryKey.CompetitionMetadata,
					competition.slug,
					authStore.isAuthenticated,
				]);
				onDone();
			},
		},
	);

	const onSubmit = (values: typeof form.values) => {
		mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Flex direction="column" gap={"md"}>
				<TextInput label="label" {...form.getInputProps('label')} />
				<TextInput label="url" {...form.getInputProps('url')} />
				<Button type="submit">Submit</Button>
			</Flex>
		</form>
	);
}
