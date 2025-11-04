import { ActionIcon, NumberInput, Switch, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
	IconCalendar,
	IconCopy,
	IconHash,
	IconId,
	IconPassword,
	IconToggleLeft,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Api } from '../../../../api';
import type { AppError } from '../../../../api/utils/types';

export function useAdminPageModelDetail() {
	const { model } = useParams<'model'>();
	const { id } = useParams<'id'>();
	const { copied, copy } = useClipboard();

	const form = useForm<Record<string, string | number | boolean | Date>>({
		initialValues: {} as Record<string, string | number | boolean | Date>,
	});

	useEffect(() => {
		if (copied) {
			notifications.show({
				title: 'Copied to clipboard',
				message: 'The value has been copied to clipboard',
			});
		}
	}, [copied]);

	const { data: item, isLoading } = useQuery({
		queryKey: ['Admin model detail', model, id],
		queryFn: () => {
			if (!model || !id) return Promise.resolve(undefined);
			const item = Api.admin
				.getModelItem(model, id)
				.then((response) => response.data);

			return item;
		},
	});

	const { mutate: updateItem } = useMutation({
		mutationFn: (data: typeof form.values) => {
			if (!model || !id) return Promise.resolve(undefined);
			return Api.admin.updateModelItem(model, id, data);
		},
		onSuccess: () => {
			notifications.show({
				title: 'Item updated',
				message: 'The item has been updated',
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				message:
					(error as AppError)?.response?.data?.message ??
					'An error occurred while updating the item',
				color: 'red',
			});
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: form.setValues is not a dependency
	useEffect(() => {
		if (item) {
			form.setValues(item as unknown as typeof form.values);
		}
	}, [item]);

	const { data: types } = useQuery({
		queryKey: ['Admin model types', model],
		queryFn: () => {
			if (!model) return Promise.resolve(undefined);
			return Api.admin
				.getModelForm(model)
				.then((response) => response.data.form.columns);
		},
	});

	const onSubmit = async (data: typeof form.values) => {
		if (!model || !id) return;
		await updateItem(data);
	};

	// Format column name from camelCase to Title Case
	const formatColumnName = (column: string) => {
		return column
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (str) => str.toUpperCase())
			.trim();
	};

	const getInputByType = (column: string) => {
		const type = types?.find((type) => type.name === column)?.type;

		const disabledFields = ['id', 'password', 'createdat', 'updatedat'];
		const isDisabled = disabledFields
			.map((field) => field.toLowerCase())
			.includes(column.toLowerCase());

		const isPassword = column.toLowerCase().includes('password');
		const isId = column.toLowerCase() === 'id';
		const isForeignKey =
			column.endsWith('Id') && !column.startsWith('national');

		// Get icon based on field type
		const getIcon = () => {
			if (isPassword) return <IconPassword size={18} />;
			if (isId) return <IconId size={18} />;
			if (isForeignKey) return <IconHash size={18} />;
			switch (type) {
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

		const fieldValue = form.getInputProps(column).value;
		const hasValue =
			fieldValue !== null && fieldValue !== undefined && fieldValue !== '';

		const commonProps = {
			key: column,
			label: formatColumnName(column),
			...form.getInputProps(column),
			disabled: isDisabled,
			leftSection: getIcon(),
			rightSection:
				hasValue && !isPassword ? (
					<ActionIcon
						variant="transparent"
						onClick={() => {
							copy(String(fieldValue));
						}}
						aria-label="Copy to clipboard"
					>
						<IconCopy size={18} />
					</ActionIcon>
				) : null,
			description: isDisabled
				? 'This field cannot be edited'
				: isPassword
					? 'Password is hidden for security'
					: undefined,
		};

		// Handle password fields specially
		if (isPassword) {
			return (
				<TextInput
					{...commonProps}
					type="password"
					value="••••••••"
					readOnly
					rightSection={
						hasValue ? (
							<ActionIcon
								variant="transparent"
								onClick={() => {
									copy('Password field value copied');
								}}
								aria-label="Copy password indicator"
							>
								<IconCopy size={18} />
							</ActionIcon>
						) : null
					}
				/>
			);
		}

		switch (type) {
			case 'String':
				return <TextInput {...commonProps} />;
			case 'Number':
				return <NumberInput {...commonProps} />;
			case 'Boolean':
				return (
					<Switch
						{...commonProps}
						checked={Boolean(commonProps.value)}
						label={formatColumnName(column)}
					/>
				);
			case 'DateTime':
				return <DateTimePicker {...commonProps} />;
			default:
				return <TextInput {...commonProps} />;
		}
	};

	return {
		form,
		onSubmit,
		getInputByType,
		item,
		isLoading,
		types,
		formatColumnName,
		model,
	};
}
