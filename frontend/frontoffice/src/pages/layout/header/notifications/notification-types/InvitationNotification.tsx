import { Button, Flex, Text, Title } from '@mantine/core';
import { useMutation, useQueryClient } from 'react-query';
import { InvitationApi } from '../../../../../api/services/user/invitation';
import type { Invitation } from '../../../../../api/utils/common-types';

interface Props {
	invitation: Invitation;
}
export function InvitationNotification({ invitation }: Props) {
	const queryClient = useQueryClient();

	const { mutate: decide } = useMutation({
		mutationFn: InvitationApi.decideInvitation,
		onSuccess: invalidateQueries,
	});

	function invalidateQueries() {
		// TODO: add more invalidations
		queryClient.invalidateQueries(['my-invitations']);
	}

	return (
		<Flex key={invitation.id} justify={'space-between'} gap={'lg'}>
			<Flex direction={'column'} gap={'xs'}>
				<Title size={'h5'}>Club invitation</Title>

				<Text>
					You have been invited to join the club {invitation.clubName}
				</Text>
			</Flex>
			<Flex direction={'column'} gap={'xs'}>
				<Button
					onClick={() => {
						decide({
							id: String(invitation.id),
							isAccepted: true,
						});
					}}
				>
					Accept
				</Button>
				<Button
					bg={'red'}
					onClick={() => {
						decide({
							id: String(invitation.id),
							isAccepted: false,
						});
					}}
				>
					Decline
				</Button>
			</Flex>
		</Flex>
	);
}
