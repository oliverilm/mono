import { Button, Flex, Select, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { CreateMember } from '@monorepo/utils';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { ClubAPI } from '../../../../api/common';
import type { AppError } from '../../../../api/utils/types';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';

export function ClubMemberForm() {
	const { slug } = useParams<'slug'>();
	const queryClient = useQueryClient();
	const form = useForm<CreateMember>({
		initialValues: {
			nationalIdType: 'estid',
			nationalId: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
		},
	});

	// TODO enable searching by national id
	// TODO if national id has been inserted, generate a search for this profile

	const { mutate } = useMutation({
		mutationFn: (data: CreateMember) => ClubAPI.createMember(data, slug),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [StaticQueryKey.ClubMembers] });
			console.log(data);
		},
		onError: (error: AppError) => {
			console.log(error);
			form.setFieldError('nationalId', error?.response?.data?.message);
		},
	});

	const onSubmit = (values: typeof form.values) => {
		Object.assign(values, { dateOfBirth: new Date(values.dateOfBirth) });
		mutate(values);
	};

	// TODO: replace national id type values with correctly formatted values
	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap={'sm'}>
				<Flex gap={'sm'}>
					<Select
						w={'30%'}
						data={['estid', 'finid']}
						{...form.getInputProps('nationalIdType')}
					/>
					<TextInput
						w={'100%'}
						type="text"
						placeholder="National ID"
						{...form.getInputProps('nationalId')}
					/>
				</Flex>
				<TextInput
					type="text"
					placeholder="First Name"
					{...form.getInputProps('firstName')}
				/>
				<TextInput
					type="text"
					placeholder="Last Name"
					{...form.getInputProps('lastName')}
				/>
				<TextInput
					type="date"
					placeholder="Date of Birth"
					{...form.getInputProps('dateOfBirth')}
				/>
				<Button type="submit">Submit</Button>
				{JSON.stringify(form.errors)}
			</Stack>
		</form>
	);
}
