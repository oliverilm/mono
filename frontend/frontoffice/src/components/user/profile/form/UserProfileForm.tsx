import { useForm } from '@mantine/form';
import { useAuthStore } from '../../../../stores/auth';
import { Button, Flex, Select, Stack, TextInput } from '@mantine/core';
import { updateUser } from '../../../../api/auth';
import { NationalId, UserPatch } from '@monorepo/utils';

export function UserProfileForm() {
	const authStore = useAuthStore();

	const form = useForm<UserPatch>({
		initialValues: {
			firstName: authStore.profile?.firstName ?? '',
			lastName: authStore.profile?.lastName ?? '',
			nationalId: authStore.profile?.nationalId ?? '',
			nationalIdType: authStore.profile?.nationalIdType || NationalId.Est,
			dateOfBirth: authStore.profile?.dateOfBirth ?? '',
		},
	});

	const onSubmit = async (data: typeof form.values) => {
		console.log(data);

		const response = await updateUser(data);

		authStore.setProfile(response.data);

		// TODO: implement
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<h1>Additional details</h1>
			<Stack gap={'md'}>
				<Stack>
					<TextInput label={'firstName'} {...form.getInputProps('firstName')} />
					<TextInput label={'lastName'} {...form.getInputProps('lastName')} />
					<Flex gap="sm">
						<Select
							data={Object.values(NationalId)}
							label={'nationalIdType'}
							{...form.getInputProps('nationalIdType')}
						/>
						<TextInput
							label={'nationalId'}
							{...form.getInputProps('nationalId')}
						/>
					</Flex>
					<TextInput
						type="date"
						label={'dateOfBirth'}
						{...form.getInputProps('dateOfBirth')}
					/>
				</Stack>

				<Button type="submit">Update</Button>
			</Stack>
		</form>
	);
}
