import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export function ClubMemberForm() {
	const [searchBy, setSearchBy] = useState<'nationalId' | 'email'>(
		'nationalId',
	);

	const form = useForm({
		initialValues: {
			nationalIdType: '',
			nationalId: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			sex: '',
		},
	});

	const emailForm = useForm({
		initialValues: {
			email: '',
		},
	});

	// TODO enable searching by email
	// TODO enable searching by national id
	// TODO if national id has been inserted, generate a search for this profile

	const onSubmit = (values: typeof form.values) => {
		console.log(values);
	};

	const onEmailSubmit = (values: typeof emailForm.values) => {
		console.log(values);
	};

	if (searchBy === 'nationalId') {
		return (
			<form onSubmit={form.onSubmit(onSubmit)}>
				<TextInput
					type="text"
					placeholder="National ID"
					{...form.getInputProps('nationalId')}
				/>
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
				<TextInput
					type="text"
					placeholder="Sex"
					{...form.getInputProps('sex')}
				/>
				<Button type="submit">Submit</Button>
			</form>
		);
	}
	return (
		<form onSubmit={emailForm.onSubmit(onEmailSubmit)}>
			<TextInput
				type="text"
				placeholder="Email"
				{...form.getInputProps('email')}
			/>
			<Button type="submit">Submit</Button>
		</form>
	);
}
