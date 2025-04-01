import {
    Table,
    Text,
    Flex,
    ActionIcon,
    Badge,
    Divider,
    Title,
    Modal,
} from '@mantine/core';
import { IconUser, IconDotsVertical, IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { ClubMetadata, Profile } from '../../../../../api/utils/common-types';
import { ThemePaper } from '../../../../shared/theme-paper/ThemePaper';
import { useDisclosure } from '@mantine/hooks';
import { ClubMemberForm } from '../../../member/form/ClubMemberForm';

interface Props {
	clubMembers?: Profile[];
	clubMetadata?: ClubMetadata;
}
export function ClubDetailAdminMembers({ clubMembers, clubMetadata }: Props) {
	const [opened, { toggle }] = useDisclosure();

	return (
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
					{clubMembers?.map((member) => (
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
										clubMetadata?.admins
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
			{clubMetadata?.isAdmin && (
				<Modal opened={opened} onClose={toggle}>
					<ClubMemberForm />
				</Modal>
			)}
		</ThemePaper>
	);
}
