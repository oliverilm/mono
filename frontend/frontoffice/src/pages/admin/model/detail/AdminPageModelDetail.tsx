import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { Button, Divider, Flex, Stack } from '@mantine/core';
import { useAdminPageModelDetail } from './AdminPageModelDetail.hook';

export function AdminPageModelDetail() {
	const { form, onSubmit, getInputByType, item, isLoading } =
		useAdminPageModelDetail();

	if (isLoading) return <div>Loading...</div>;
	if (!item) return <div>Item not found</div>;

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap={'md'}>
				<Flex direction={'column'} gap={'sm'}>
					{Object.keys(item)?.map(getInputByType)}
				</Flex>

				<Divider />
				<Button type="submit">Save</Button>
			</Stack>
		</form>
	);
}
