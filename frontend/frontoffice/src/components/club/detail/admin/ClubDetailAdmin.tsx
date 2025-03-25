import {
	ActionIcon,
	Badge,
	Divider,
	Flex,
	Grid,
	Modal,
	Table,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDotsVertical, IconPlus, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import { ClubAPI } from '../../../../api/club-api';
import { InvitationApi } from '../../../../api/invitation-api';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';
import { ClubMemberForm } from '../../member/form/ClubMemberForm';

const span = {
	base: 12,
	xl: 6,
	lg: 6,
	md: 0,
	sm: 12,
	xs: 12,
};

export function ClubDetailAdmin() {
	const { slug } = useParams<'slug'>();

	const [opened, { toggle }] = useDisclosure();

	const [
		{ data: clubDetails },
		{ data: clubMetadata },
		{ data: clubMembers },
		{ data: invitations },
	] = useQueries([
		{
			queryKey: [StaticQueryKey.ClubDetails, slug],
			queryFn: () => ClubAPI.getClub(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [StaticQueryKey.ClubMetadata, slug],
			queryFn: () => ClubAPI.getClubMetadata(slug),
			enabled: Boolean(slug),
		},

		{
			queryKey: [StaticQueryKey.ClubMembers, slug],
			queryFn: () => ClubAPI.getClubMembers(slug),
			enabled: Boolean(slug),
		},

		{
			queryKey: ['club-invitations', slug],
			queryFn: () => InvitationApi.getCreatedInvitations(),
			enabled: Boolean(slug),
		},
	]);

	return (
		<div>
			<Flex justify={'center'} direction={'column'} align={'center'}>
				<Title>{clubDetails?.data?.name}</Title>
				<pre>{JSON.stringify(clubDetails?.data, null, 2)}</pre>
				<pre>{JSON.stringify(clubMetadata?.data, null, 2)}</pre>
				<pre>{JSON.stringify(invitations?.data, null, 2)}</pre>
			</Flex>

			<Grid>
				<Grid.Col span={span}>
					<ThemePaper light={'blue.1'} dark={'blue.9'} p={'sm'}>
						<Flex justify={'space-between'} my={'xs'}>
							<Title px="xs" size={'h3'}>
								Members
							</Title>
							<Flex gap={'sm'}>
								<ActionIcon variant="transparent">
									<IconDotsVertical />
								</ActionIcon>
								<ActionIcon onClick={toggle} variant="transparent">
									<IconPlus />
								</ActionIcon>
							</Flex>
						</Flex>
						<Divider my={'xs'} py={'1px'} bg={'gray.3'} />
						<Table>
							<Table.Tbody>
								{clubMembers?.data.map((member) => (
									<Table.Tr key={member.id}>
										<Table.Td>
											<Flex align={'center'} gap={'sm'}>
												<Text>
													{member.firstName} {member.lastName}
												</Text>
												{member.userId && (
													<ActionIcon size={'sm'} variant="transparent">
														<IconUser />
													</ActionIcon>
												)}

												{member.userId !== null &&
													clubMetadata?.data.admins
														.map((admin) => admin.userId)
														.includes(member.userId) && (
														<Badge variant="outline" color={'red'}>
															admin
														</Badge>
													)}
											</Flex>
										</Table.Td>
										<Table.Td>{member.belt}</Table.Td>
										<Table.Td>{dayjs(member.dateOfBirth).year()}</Table.Td>
										<Table.Td>{member.belt}</Table.Td>
										<Table.Td>{member.sex}</Table.Td>
										<Table.Td align="right">
											<ActionIcon size={'sm'} variant="transparent">
												<IconDotsVertical />
											</ActionIcon>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
					</ThemePaper>
				</Grid.Col>
				<Grid.Col span={span}>
					<ThemePaper light={'blue.1'} dark={'blue.9'} p={'sm'}>
						competitions
					</ThemePaper>
				</Grid.Col>
			</Grid>

			{clubMetadata?.data.isAdmin && (
				<Modal opened={opened} onClose={toggle}>
					<ClubMemberForm />
				</Modal>
			)}
		</div>
	);
}
