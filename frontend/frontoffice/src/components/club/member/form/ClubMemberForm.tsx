import { Button, Flex, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	type CreateMember,
	NationalIDUtils,
	NationalId,
} from '@monorepo/utils';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUserByNationalId } from '../../../../api/auth';
import { ClubAPI } from '../../../../api/club-api';
import { InvitationApi } from '../../../../api/invitation-api';
import type { AppError } from '../../../../api/utils/types';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { useAuthStore } from '../../../../stores/auth';

export function ClubMemberForm() {
	const { slug } = useParams<'slug'>();
	const queryClient = useQueryClient();
	const authStore = useAuthStore();

	const isValidNationalId = (type: NationalId, code: string) => {
		try {
			const details = NationalIDUtils.parse(type, code);
			return Boolean(details);
		} catch {
			return false;
		}
	};

	const form = useForm<CreateMember>({
		initialValues: {
			nationalIdType: NationalId.Est,
			nationalId: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
		},
		validateInputOnBlur: true,
		validate: {
			nationalId: (value, values) =>
				!isValidNationalId(values.nationalIdType as NationalId, value)
					? 'Invalid national id'
					: undefined,
		},
	});

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

	const { data: result } = useQuery({
		queryKey: ['national-id-user-search', form.values.nationalId],
		queryFn: () => getUserByNationalId(form.values.nationalId),
		enabled: isValidNationalId(
			form.values.nationalIdType as NationalId,
			form.values.nationalId,
		),
	});

	const onSubmit = (values: typeof form.values) => {
		if (result?.data) return;
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
						data={Object.values(NationalId)}
						{...form.getInputProps('nationalIdType')}
					/>
					<TextInput
						w={'100%'}
						type="text"
						placeholder="National ID"
						{...form.getInputProps('nationalId')}
					/>
				</Flex>
				{!result?.data ? (
					<>
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
					</>
				) : (
					<>
						{result?.data.club &&
						result?.data.club?.id === authStore.profile?.clubId ? (
							<Text>this user is already in your club</Text>
						) : (
							<Flex direction={'column'} gap={'sm'} justify={'center'}>
								<Text ta={'center'}>
									{result?.data.firstName} {result?.data.lastName}
								</Text>
								<Text>{result?.data.club?.name}</Text>
								{result.data && result.data.userId === null ? (
									<Button type="submit">Send club change request</Button>
								) : (
									<Button
										onClick={() =>
											InvitationApi.createInvitation({
												profileId: result.data?.id ?? '',
											})
										}
									>
										Send an invite
									</Button>
								)}
							</Flex>
						)}
					</>
				)}
			</Stack>
		</form>
	);
}
