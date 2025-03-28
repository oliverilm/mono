import { ActionIcon, Box, Indicator, Paper } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IconBell } from '@tabler/icons-react';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { InvitationApi } from '../../../../api/services/invitation';
import { useAuthStore } from '../../../../stores/auth';
import { InvitationNotification } from './notification-types/InvitationNotification';

export function LayoutHeaderNotifications() {
	const { isAuthenticated } = useAuthStore();

	const [opened, { toggle, close }] = useDisclosure();
	const clickOutsideRef = useClickOutside(close);
	const ref = useRef<HTMLDivElement | null>(null);

	const { data: invitations } = useQuery({
		queryKey: ['my-invitations'],
		queryFn: () => InvitationApi.getMyInvitations(),
		enabled: isAuthenticated,
	});

	const hasActionableNotifications =
		invitations?.data?.length && invitations?.data?.length > 0;

	if (!hasActionableNotifications) return null;

	// TODO page overflow positioning for the popup.
	return (
		<Box ref={ref} pos={'relative'}>
			<Indicator offset={5} color={'blue'}>
				<ActionIcon onClick={toggle} variant="transparent" size={'lg'}>
					<IconBell />
				</ActionIcon>
			</Indicator>

			{opened && (
				<Paper
					shadow="lg"
					p={'sm'}
					w={'400px'}
					maw={'100vw'}
					right={0}
					ref={clickOutsideRef}
					pos={'absolute'}
					top={ref?.current?.getBoundingClientRect?.()?.bottom ?? 0 - 10}
				>
					{invitations?.data?.map((invitation) => (
						<InvitationNotification
							invitation={invitation}
							key={invitation.id}
						/>
					))}
				</Paper>
			)}
		</Box>
	);
}
