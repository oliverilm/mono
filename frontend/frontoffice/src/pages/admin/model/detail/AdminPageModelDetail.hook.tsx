import { ActionIcon, NumberInput, Switch, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCopy } from '@tabler/icons-react';
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

	const getInputByType = (column: string) => {
		const type = types?.find((type) => type.name === column)?.type;

		const disabled = ['id', 'password', 'createdat', 'updatedat']
			.map((column) => column.toLowerCase())
			.includes(column.toLowerCase());

		const commonProps = {
			key: column,
			label: column,
			...form.getInputProps(column),
			disabled,
			rightSection: (
				<ActionIcon
					variant="transparent"
					onClick={() => {
						copy(form.getInputProps(column).value as string);
					}}
				>
					<IconCopy />
				</ActionIcon>
			),
		};

		switch (type) {
			case 'String':
				return <TextInput {...commonProps} />;
			case 'Number':
				return <NumberInput {...commonProps} />;
			case 'Boolean':
				return <Switch {...commonProps} checked={commonProps.value} />;
			case 'DateTime':
				return <DateTimePicker {...commonProps} />;
		}
	};

	return {
		form,
		onSubmit,
		getInputByType,
		item,
		isLoading,
		types,
	};
}
