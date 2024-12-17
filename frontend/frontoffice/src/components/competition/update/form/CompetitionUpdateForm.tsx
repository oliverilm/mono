import { useForm } from '@mantine/form';
import { CompetitionAPI, CompetitionListItem } from '../../../../api/common';
import { UpdateCompetition } from '@monorepo/utils';
import { Button, Flex, Switch, TextInput } from '@mantine/core';
import { useQueryClient } from 'react-query';
import { useAuthStore } from '../../../../stores/auth';
import { useNavigate } from 'react-router-dom';
import { RichText } from '../../../shared/rich-text/RichText';

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
			startingAt:
				new Date(competition.startingAt).toISOString() ??
				new Date().toISOString(),
		},
	});

	const onSubmit = async (values: typeof form.values) => {
		const response = await CompetitionAPI.updateCompetition({
			...values,
			startingAt: new Date(values?.startingAt ?? new Date()).toISOString(),
		});

		if (response.data) {
			if (values.name !== competition.name) {
				navigate(`/competitions/${response.data.slug}`);
			}
			queryClient.invalidateQueries(['competition', competition.slug]);

			if (values.isPublished !== competition.isPublished) {
				queryClient.invalidateQueries([
					'competitions-private',
					authStore.isAuthenticated,
				]);
			}
			onSubmitSuccess();
		}
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
	return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
}
