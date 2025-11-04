import {
	Alert,
	Avatar,
	Button,
	Divider,
	Flex,
	Group,
	Loader,
	Select,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	type CreateMember,
	NationalIDUtils,
	NationalId,
} from '@monorepo/utils';
import {
	IconAlertCircle,
	IconId,
	IconMail,
	IconUser,
	IconUserPlus,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Api } from '../../../../api';
import type { AppError } from '../../../../api/utils/types';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { useAuthStore } from '../../../../stores/auth';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';

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

	const { mutate, isLoading: isSubmitting } = useMutation({
		mutationFn: (data: CreateMember) => Api.user.club.createMember(data, slug),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [StaticQueryKey.ClubMembers] });
			form.reset();
			console.log(data);
		},
		onError: (error: AppError) => {
			console.log(error);
			form.setFieldError('nationalId', error?.response?.data?.message);
		},
	});

	const { data: result, isLoading: isSearching } = useQuery({
		queryKey: ['national-id-user-search', form.values.nationalId],
		queryFn: () => Api.user.auth.getUserByNationalId(form.values.nationalId),
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
			<Stack gap="lg">
				{/* National ID Section */}
				<Stack gap="sm">
					<Title order={4} size="h5">
						Search by National ID
					</Title>
					<Flex gap="sm">
						<Select
							w="30%"
							label="ID Type"
							leftSection={<IconId size={18} />}
							data={Object.values(NationalId)}
							{...form.getInputProps('nationalIdType')}
						/>
						<TextInput
							w="100%"
							label="National ID"
							leftSection={<IconId size={18} />}
							placeholder="Enter national ID"
							rightSection={isSearching ? <Loader size="xs" /> : null}
							{...form.getInputProps('nationalId')}
						/>
					</Flex>
				</Stack>

				{/* User Search Results */}
				{result?.data && (
					<ThemePaper light="gray.1" dark="gray.8" p="md" radius="md">
						{result.data.club &&
						result.data.club?.id === authStore.profile?.clubId ? (
							<Alert
								icon={<IconAlertCircle size={20} />}
								title="User Already in Club"
								color="orange"
								variant="light"
							>
								This user is already a member of your club.
							</Alert>
						) : (
							<Stack gap="md">
								<Group gap="md">
									<Avatar color="blue" size={48} radius="md">
										{result.data.firstName?.[0] ||
											result.data.lastName?.[0] ||
											'?'}
									</Avatar>
									<Stack gap={2} style={{ flex: 1 }}>
										<Group gap="xs">
											<IconUser size={16} />
											<Text fw={600} size="lg">
												{result.data.firstName} {result.data.lastName}
											</Text>
										</Group>
										{result.data.club && (
											<Group gap="xs">
												<IconMail size={14} />
												<Text size="sm" c="dimmed">
													Current club: {result.data.club.name}
												</Text>
											</Group>
										)}
									</Stack>
								</Group>
								<Divider />
								{result.data.userId === null ? (
									<Button
										type="submit"
										leftSection={<IconUserPlus size={16} />}
										fullWidth
										loading={isSubmitting}
									>
										Send Club Change Request
									</Button>
								) : (
									<Button
										leftSection={<IconMail size={16} />}
										onClick={() =>
											Api.user.invitation.createInvitation({
												profileId: result.data?.id ?? '',
											})
										}
										fullWidth
									>
										Send Invitation
									</Button>
								)}
							</Stack>
						)}
					</ThemePaper>
				)}

				{/* Manual Entry Form */}
				{!result?.data && (
					<>
						<Divider label="OR" labelPosition="center" />
						<Stack gap="sm">
							<Title order={4} size="h5">
								Add Member Manually
							</Title>
							<Flex gap="sm">
								<TextInput
									w="100%"
									label="First Name"
									leftSection={<IconUser size={18} />}
									placeholder="Enter first name"
									{...form.getInputProps('firstName')}
								/>
								<TextInput
									w="100%"
									label="Last Name"
									leftSection={<IconUser size={18} />}
									placeholder="Enter last name"
									{...form.getInputProps('lastName')}
								/>
							</Flex>
							<TextInput
								label="Date of Birth"
								type="date"
								placeholder="Select date of birth"
								{...form.getInputProps('dateOfBirth')}
							/>
						</Stack>
					</>
				)}

				{/* Submit Button */}
				{!result?.data && (
					<Button
						type="submit"
						leftSection={<IconUserPlus size={18} />}
						fullWidth
						size="md"
						loading={isSubmitting}
					>
						Add Member
					</Button>
				)}
			</Stack>
		</form>
	);
}
