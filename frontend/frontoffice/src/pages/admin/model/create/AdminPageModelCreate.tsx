import {
	ActionIcon,
	Button,
	Modal,
	NumberInput,
	Stack,
	Switch,
	TextInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../../../api';

interface Props {
	model: string;
}
export function AdminPageModelCreate({ model }: Props) {
	const navigate = useNavigate();

	const [opened, { toggle }] = useDisclosure(false);
	const { data: types } = useQuery({
		queryKey: ['Admin model types', model],
		queryFn: () => {
			if (!model) return Promise.resolve(undefined);
			return Api.admin
				.getModelForm(model)
				.then((response) => response.data.form.columns);
		},
	});

	const { mutate: createItem } = useMutation({
		mutationFn: (data: typeof form.values) => {
			if (!model) return Promise.resolve(undefined);
			return Api.admin.createModelItem(model, data);
		},
		onSuccess: (data) => {
			navigate(
				`/admin/crud/${model}/${(data as unknown as { data: { id: string } }).data.id}`,
			);
		},
	});

	const form = useForm({
		initialValues: {
			name: '',
		},
	});

	const generateFormInputsFromTypes = () => {
		return types?.map((type) => {
			// TODO: implement password hashing in the backend for this method to work
			const fieldsToExclude = ['id', 'createdat', 'updatedat'].map((field) =>
				field.toLowerCase(),
			);

			if (fieldsToExclude.includes(type.name.toLowerCase())) return null;

			switch (type.type) {
				case 'String':
					return (
						<TextInput
							key={type.name}
							label={type.name}
							{...form.getInputProps(type.name)}
						/>
					);
				case 'Number':
					return (
						<NumberInput
							key={type.name}
							label={type.name}
							{...form.getInputProps(type.name)}
						/>
					);
				case 'Boolean':
					return (
						<Switch
							key={type.name}
							label={type.name}
							{...form.getInputProps(type.name)}
						/>
					);
				case 'DateTime':
					return (
						<DateTimePicker
							key={type.name}
							label={type.name}
							{...form.getInputProps(type.name)}
						/>
					);
			}
		});
	};

	const onSubmit = (data: typeof form.values) => {
		if (!model) return;
		createItem(data);
	};

	return (
		<>
			<ActionIcon variant="transparent" onClick={toggle}>
				<IconPlus />
			</ActionIcon>
			<Modal onClose={toggle} opened={opened} title={`Create ${model}`}>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<Stack gap="md">
						{generateFormInputsFromTypes()}
						<Button type="submit">create</Button>
					</Stack>
				</form>
			</Modal>
		</>
	);
}
