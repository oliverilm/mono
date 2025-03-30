import { Button, Flex, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { UpdateCompetition } from '@monorepo/utils';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import type { CompetitionListItem } from '../../../../api/utils/common-types';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { useAuthStore } from '../../../../stores/auth';
import { RichText } from '../../../shared/rich-text/RichText';
import { Api } from '../../../../api';

interface Props {
	competition: CompetitionListItem;
	onSubmitSuccess: () => void;
}
export function CompetitionUpdateForm({ competition, onSubmitSuccess }: Props) {
	const queryClient = useQueryClient();
	const authStore = useAuthStore();
	const navigate = useNavigate();

	const form = useForm<UpdateCompetition>({
		initialValues: {
			id: competition.id,
			description: competition.description ?? '',
			isPublished: competition.isPublished || false,
			location: competition.location ?? '',
			name: competition.name ?? '',
			registrationEndAt:
				new Date(competition.registrationEndAt).toISOString() ??
				new Date().toISOString(),
			startingAt:
				new Date(competition.startingAt).toISOString() ??
				new Date().toISOString(),
		},
	});

	const { mutate } = useMutation({
		mutationFn: Api.user.competition.updateCompetition,
		onSuccess: (data) => {
			if (data.data.isPublished !== competition.isPublished) {
				queryClient.invalidateQueries([
					'competitions-private',
					authStore.isAuthenticated,
				]);
			}
			if (data.data.slug !== competition.slug) {
				navigate(`/competitions/${data.data.slug}`);
			} else {
				queryClient.invalidateQueries([
					StaticQueryKey.CompetitionDetail,
					competition.slug,
				]);
			}
			onSubmitSuccess();
		},
	});

	const onSubmit = async (values: typeof form.values) => {
		mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Flex direction={'column'} gap={'sm'}>
				<TextInput
					variant="filled"
					label="name"
					{...form.getInputProps('name')}
				/>
				<RichText
					onChange={form.getInputProps('description').onChange}
					value={form.getInputProps('description').value}
				/>

				<TextInput label="location" {...form.getInputProps('location')} />
				<TextInput
					type="date"
					label="startingAt"
					{...form.getInputProps('startingAt')}
				/>
				<TextInput
					type="date"
					label="Registration End"
					{...form.getInputProps('registrationEndAt')}
				/>

				<Switch
					label="is published"
					checked={form.values.isPublished}
					{...form.getInputProps('isPublished')}
				/>
				<Button type="submit">submit</Button>
			</Flex>
		</form>
	);
}

interface RendererProps {
	value: string;
}

export function RichTextRenderer({ value }: RendererProps) {
	// biome-ignore lint/security/noDangerouslySetInnerHtml: i need this
	return <div dangerouslySetInnerHTML={{ __html: value }} />;
}
