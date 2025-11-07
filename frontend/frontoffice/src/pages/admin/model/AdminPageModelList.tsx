import {
	Badge,
	Container,
	Group,
	Pagination,
	Paper,
	Select,
	Stack,
	Table,
	Text,
	Title,
	Tooltip,
	useMantineColorScheme,
} from '@mantine/core';
import { IconCheck, IconDatabase, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Api } from '../../../api';
import { EmptyState } from '../../../components/shared/empty-state/EmptyState';
import { LoadingState } from '../../../components/shared/loading-state/LoadingState';
import { ThemePaper } from '../../../components/shared/theme-paper/ThemePaper';
import { AdminPageModelCreate } from './create/AdminPageModelCreate';

const ITEMS_PER_PAGE_OPTIONS = [
	{ value: '1', label: '1 per page' },
	{ value: '10', label: '10 per page' },
	{ value: '20', label: '20 per page' },
	{ value: '50', label: '50 per page' },
	{ value: '100', label: '100 per page' },
];

export function AdminPageModelList() {
	const { model } = useParams<'model'>();
	const navigate = useNavigate();
	const { colorScheme } = useMantineColorScheme();
	const [itemsPerPage, setItemsPerPage] = useState(
		Number(ITEMS_PER_PAGE_OPTIONS[1].value),
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const { data: items, isLoading } = useQuery({
		queryKey: ['Admin model list', model, currentPage, itemsPerPage],
		queryFn: () => {
			if (!model) return Promise.resolve(undefined);
			const skip = (currentPage - 1) * itemsPerPage;
			const take = itemsPerPage;
			return Api.admin.getModelList(model, { skip, take });
		},
		keepPreviousData: true,
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

	const rows = items?.data as
		| Array<Record<string, string | number | boolean | null>>
		| undefined;

	// TODO: implement in backend aswell to get the total count of items
	// Calculate total pages based on returned items
	// If we got exactly `itemsPerPage` items, there might be more pages
	// If we got fewer, we're on the last page
	const hasMorePages = rows && rows.length === itemsPerPage;
	const estimatedTotalPages = hasMorePages
		? Math.max(currentPage + 10, totalPages) // Estimate more pages exist
		: currentPage; // Current page is the last

	// Update total pages when we know more accurately
	// biome-ignore lint/correctness/useExhaustiveDependencies: setTotalPages is not a dependency
	useEffect(() => {
		if (rows && !hasMorePages) {
			setTotalPages(currentPage);
		} else if (hasMorePages) {
			// Set a reasonable high number if there might be more pages
			setTotalPages(Math.max(currentPage + 10, totalPages, 100));
		}
	}, [rows, hasMorePages, currentPage]);

	// Format column name from camelCase to Title Case
	const formatColumnName = (column: string) => {
		return column
			.replace(/([A-Z])/g, ' $1')
			.replace(/^./, (str) => str.toUpperCase())
			.trim();
	};

	const parseColumnWithType = (
		column: string,
		value: string | number | boolean | null | undefined,
	) => {
		if (value === null || value === undefined) {
			return (
				<Text size="sm" c="dimmed" fs="italic">
					—
				</Text>
			);
		}

		const type = types?.find((type) => type.name === column)?.type;

		if (column.toLowerCase() === 'id') {
			return (
				<Badge
					styles={{
						root: { cursor: 'pointer', textDecoration: 'none', zIndex: 2 },
					}}
					component={Link}
					to={`/admin/crud/${model}/${value}`}
					variant="light"
					color="blue"
					style={{ cursor: 'pointer', textDecoration: 'none' }}
				>
					{String(value).slice(0, 8)}...
				</Badge>
			);
		}

		switch (type) {
			case 'String': {
				const isForeignKey =
					column?.endsWith('Id') && !column.startsWith('national');

				if (isForeignKey && value) {
					return (
						<Badge
							component={Link}
							to={`/admin/crud/${column.slice(0, -2)}/${value}`}
							variant="light"
							color="orange"
							style={{ cursor: 'pointer', textDecoration: 'none', zIndex: 2 }}
						>
							{String(value).slice(0, 8)}...
						</Badge>
					);
				}
				// Truncate long strings
				const stringValue = String(value);
				if (stringValue.length > 50) {
					return (
						<Tooltip label={stringValue} withArrow>
							<Text size="sm" style={{ cursor: 'help' }}>
								{stringValue.slice(0, 50)}...
							</Text>
						</Tooltip>
					);
				}
				return <Text size="sm">{stringValue}</Text>;
			}
			case 'Number':
				return (
					<Text size="sm" fw={500}>
						{String(value)}
					</Text>
				);
			case 'Boolean':
				return (
					<Group gap={4}>
						{value ? (
							<IconCheck size={18} color="var(--mantine-color-green-6)" />
						) : (
							<IconX size={18} color="var(--mantine-color-red-6)" />
						)}
						<Text size="sm" c="dimmed">
							{value ? 'Yes' : 'No'}
						</Text>
					</Group>
				);
			case 'DateTime':
				return (
					<Text size="sm" c="dimmed">
						{dayjs(String(value)).format('MMM D, YYYY HH:mm')}
					</Text>
				);
			default:
				return <Text size="sm">{String(value)}</Text>;
		}
	};

	if (isLoading) {
		return (
			<LoadingState
				message={`Loading ${model}...`}
				size="lg"
				useThemePaper
				withContainer
			/>
		);
	}

	if (!rows || rows.length === 0) {
		return (
			<Container size="lg" py="xl">
				<EmptyState
					title={`No ${model} items found`}
					description={`Create your first ${model} item to get started`}
					icon={IconDatabase}
					action={model ? <AdminPageModelCreate model={model} /> : undefined}
				/>
			</Container>
		);
	}

	const columns = Object.keys(rows[0] as object);

	// Filter out common internal columns or limit visible columns
	const visibleColumns = columns.filter(
		(col) =>
			!col.toLowerCase().includes('password') &&
			col.toLowerCase() !== 'token' &&
			col.toLowerCase() !== 'hash',
	);

	return (
		<Container size="lg" py="xl" w={'100%'}>
			<Stack gap="lg">
				{/* Header Section */}
				<ThemePaper light="gray.1" dark="gray.8" p="md" radius="md">
					<Group justify="space-between" align="center">
						<Stack gap={4}>
							<Title order={2} size="h2">
								{formatColumnName(model || 'Model')} List
							</Title>
							<Group gap="md">
								<Text size="sm" c="dimmed">
									{rows?.length || 0} item{(rows?.length || 0) !== 1 ? 's' : ''}{' '}
									on this page
									{hasMorePages && ' (showing more)'}
								</Text>
								<Select
									value={String(itemsPerPage)}
									onChange={(value) => {
										if (value) {
											setItemsPerPage(Number(value));
											setTotalPages(1);
											setCurrentPage(1);
										}
									}}
									data={ITEMS_PER_PAGE_OPTIONS}
									size="xs"
									style={{ width: 140 }}
								/>
							</Group>
						</Stack>
						{model && <AdminPageModelCreate model={model} />}
					</Group>
				</ThemePaper>

				{/* Table Section */}
				<ThemePaper light="gray.1" dark="gray.8" p="md" radius="md">
					<Paper
						withBorder
						radius="md"
						style={{
							overflow: 'hidden',
							background:
								colorScheme === 'dark'
									? 'var(--mantine-color-dark-7)'
									: 'var(--mantine-color-gray-0)',
						}}
					>
						<Table
							striped
							highlightOnHover
							verticalSpacing="sm"
							horizontalSpacing="md"
							style={{ tableLayout: 'auto' }}
						>
							<Table.Thead>
								<Table.Tr
									style={{
										background:
											colorScheme === 'dark'
												? 'var(--mantine-color-dark-6)'
												: 'var(--mantine-color-gray-1)',
									}}
								>
									{visibleColumns.map((column) => (
										<Table.Th key={column} fw={600}>
											{formatColumnName(column)}
										</Table.Th>
									))}
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{rows?.map((row) => (
									<Table.Tr
										key={String(row.id)}
										style={{
											cursor: 'pointer',
										}}
									>
										{visibleColumns.map((column) => (
											<Table.Td key={column}>
												{parseColumnWithType(column, row[column])}
											</Table.Td>
										))}
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
					</Paper>
				</ThemePaper>

				{/* Pagination Section */}
				{rows && rows.length > 0 && (
					<ThemePaper light="gray.1" dark="gray.8" p="md" radius="md">
						<Group justify="space-between" align="center">
							<Text size="sm" c="dimmed">
								Page {currentPage} of {estimatedTotalPages}
							</Text>
							<Pagination
								total={estimatedTotalPages}
								value={currentPage}
								onChange={setCurrentPage}
								boundaries={1}
								siblings={1}
								size="sm"
								withEdges
							/>
						</Group>
					</ThemePaper>
				)}
			</Stack>
		</Container>
	);
}
