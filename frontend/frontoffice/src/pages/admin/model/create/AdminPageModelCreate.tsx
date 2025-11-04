import {
	Button,
	Group,
	Loader,
	Modal,
	NumberInput,
	Paper,
	Stack,
	Switch,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
	IconCalendar,
	IconHash,
	IconPlus,
	IconToggleLeft,
	IconUserPlus,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../../../api';
import type { AppError } from '../../../../api/utils/types';

interface Props {
	model: string;
}

// Format column name from camelCase to Title Case
const formatColumnName = (column: string) => {
	return column
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, (str) => str.toUpperCase())
		.trim();
};

export function AdminPageModelCreate({ model }: Props) {
	const navigate = useNavigate();

	const [opened, { toggle, close }] = useDisclosure(false);
	const { data: types, isLoading: isLoadingTypes } = useQuery({
		queryKey: ['Admin model types', model],
		queryFn: () => {
			if (!model) return Promise.resolve(undefined);
			return Api.admin
				.getModelForm(model)
				.then((response) => response.data.form.columns);
		},
	});

	// Initialize form with empty values for all fields
	const getInitialValues = () => {
		const initialValues: Record<
			string,
			string | number | boolean | Date | null
		> = {};
		if (types) {
			const fieldsToExclude = ['id', 'createdat', 'updatedat'].map((field) =>
				field.toLowerCase(),
			);
			for (const type of types) {
				if (!fieldsToExclude.includes(type.name.toLowerCase())) {
					switch (type.type) {
						case 'String':
							initialValues[type.name] = '';
							break;
						case 'Number':
							initialValues[type.name] = 0;
							break;
						case 'Boolean':
							initialValues[type.name] = false;
							break;
						case 'DateTime':
							initialValues[type.name] = null;
							break;
					}
				}
			}
		}
		return initialValues;
	};

	const form = useForm({
		initialValues: getInitialValues(),
	});

	// Reset form when modal opens/closes or types change
	// biome-ignore lint/correctness/useExhaustiveDependencies: form.reset is not a dependency
	useEffect(() => {
		if (opened && types) {
			form.setValues(getInitialValues());
		}
	}, [opened, types]);

	const { mutate: createItem, isLoading: isSubmitting } = useMutation({
		mutationFn: (data: typeof form.values) => {
			if (!model) return Promise.resolve(undefined);
			return Api.admin.createModelItem(model, data);
		},
		onSuccess: (data) => {
			notifications.show({
				title: 'Item created',
				message: `Successfully created ${formatColumnName(model)}`,
				color: 'green',
			});
			close();
			navigate(
				`/admin/crud/${model}/${(data as unknown as { data: { id: string } }).data.id}`,
			);
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				message:
					(error as AppError)?.response?.data?.message ??
					'An error occurred while creating the item',
				color: 'red',
			});
		},
	});

	const getInputByType = (type: { name: string; type: string }) => {
		// Get icon based on field type
		const getIcon = () => {
			switch (type.type) {
				case 'Number':
					return <IconHash size={18} />;
				case 'Boolean':
					return <IconToggleLeft size={18} />;
				case 'DateTime':
					return <IconCalendar size={18} />;
				default:
					return null;
			}
		};

		const commonProps = {
			key: type.name,
			label: formatColumnName(type.name),
			leftSection: getIcon(),
			...form.getInputProps(type.name),
		};

		switch (type.type) {
			case 'String':
				return <TextInput {...commonProps} />;
			case 'Number':
				return <NumberInput {...commonProps} />;
			case 'Boolean':
				return (
					<Switch
						{...commonProps}
						checked={Boolean(commonProps.value)}
						label={formatColumnName(type.name)}
					/>
				);
			case 'DateTime':
				return <DateTimePicker {...commonProps} />;
			default:
				return <TextInput {...commonProps} />;
		}
	};

	const generateFormInputsFromTypes = () => {
		if (!types) return null;

		const fieldsToExclude = ['id', 'createdat', 'updatedat'].map((field) =>
			field.toLowerCase(),
		);

		return types
			.filter((type) => !fieldsToExclude.includes(type.name.toLowerCase()))
			.map((type) => getInputByType(type));
	};

	const onSubmit = (data: typeof form.values) => {
		if (!model) return;
		createItem(data);
	};

	return (
		<>
			<Button
				variant="light"
				leftSection={<IconPlus size={18} />}
				onClick={toggle}
			>
				Create {formatColumnName(model)}
			</Button>
			<Modal
				onClose={close}
				opened={opened}
				title={
					<Group gap="sm">
						<IconUserPlus size={24} />
						<Title order={3} size="h4">
							Create {formatColumnName(model)}
						</Title>
					</Group>
				}
				size="lg"
			>
				{isLoadingTypes ? (
					<Stack align="center" py="xl">
						<Loader size="lg" />
						<Text c="dimmed">Loading form fields...</Text>
					</Stack>
				) : (
					<form onSubmit={form.onSubmit(onSubmit)}>
						<Stack gap="xl">
							<Paper shadow="sm" p="md" radius="md" withBorder>
								<Stack gap="md">{generateFormInputsFromTypes()}</Stack>
							</Paper>

							<Group justify="flex-end">
								<Button variant="light" onClick={close}>
									Cancel
								</Button>
								<Button
									type="submit"
									leftSection={<IconUserPlus size={18} />}
									loading={isSubmitting}
								>
									Create {formatColumnName(model)}
								</Button>
							</Group>
						</Stack>
					</form>
				)}
			</Modal>
		</>
	);
}
