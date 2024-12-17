import { useSystemAuth } from '../hooks/useSystemAuth';

import { UserProfileForm } from '../components/user/profile/form/UserProfileForm';
import { useAuthStore } from '../stores/auth';
import { Modal } from '@mantine/core';

export function SystemAuth() {
	useSystemAuth();

	const authStore = useAuthStore();

	if (authStore.profile) {
		const { profile } = authStore;

		if (
			!(
				profile.lastName &&
				profile.lastName &&
				profile.nationalId &&
				profile.nationalIdType &&
				profile.sex &&
				profile.dateOfBirth
			)
		) {
			return (
				<Modal
					opened
					withCloseButton={false}
					onClose={() => {
						console.log('closing');
					}}
				>
					<UserProfileForm />
				</Modal>
			);
		}
	}

	return null;
}
