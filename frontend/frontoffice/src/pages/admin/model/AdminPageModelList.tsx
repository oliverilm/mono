import { Table } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Api } from '../../../api';

export function AdminPageModelList() {
	const { model } = useParams<'model'>();
	const { data: items, isLoading } = useQuery({
		queryKey: ['Admin model list', model],
		queryFn: () => {
			if (!model) return Promise.resolve(undefined);
			return Api.admin.getModelList(model, { skip: 0, take: 10 });
		},
	});

	const { data: types } = useQuery({
		queryKey: ['Admin model types', model],
		queryFn: () => {
			if (!model) return Promise.resolve(undefined);
			return Api.admin
				.getModelForm(model)
				.then((response) => response.data.form.columns);
		},
	});

	const rows = items?.data;

	if (isLoading) return <div>Loading...</div>;

	if (!rows || rows.length === 0) return <div>No items found</div>;
	const columns = Object.keys(rows?.[0] as object);

	const parseColumnWithType = (column: string, value: string) => {
		const type = types?.find((type) => type.name === column)?.type;

		if (column.toLowerCase() === 'id') {
			return <Link to={`/admin/crud/${model}/${value}`}>{value}</Link>;
		}

		switch (type) {
			case 'String': {
				const isForeignKey =
					column?.endsWith('Id') && !column.startsWith('national');

				if (isForeignKey && value) {
					return (
						<Link
							color="red"
							to={`/admin/crud/${column.slice(0, -2)}/${value}`}
						>
							{value}
						</Link>
					);
				}
				return value;
			}
			case 'Number':
				return String(value);
			case 'Boolean':
				return value ? <IconCheck color="green" /> : <IconX color="red" />;
			case 'DateTime':
				return dayjs(value).format('DD/MM/YYYY HH:mm');
		}
	};

	return (
		<Table>
			<Table.Thead>
				<Table.Tr>
					{columns.map((column) => (
						<Table.Th key={column}>{column}</Table.Th>
					))}
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
				{rows?.map((row: any) => (
					<Table.Tr key={row.id}>
						{columns.map((column) => (
							<Table.Td key={column}>
								{parseColumnWithType(column, row[column])}
							</Table.Td>
						))}
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	);
}
