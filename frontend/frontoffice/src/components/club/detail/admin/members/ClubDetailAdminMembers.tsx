import {
	Avatar,
	Badge,
	Button,
	Divider,
	Flex,
	Group,
	Modal,
	Stack,
	Table,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import type {
	ClubMetadata,
	Profile,
} from '../../../../../api/utils/common-types';
import { ThemePaper } from '../../../../shared/theme-paper/ThemePaper';
import { ClubMemberForm } from '../../../member/form/ClubMemberForm';

interface Props {
	clubMembers?: Profile[];
	clubMetadata?: ClubMetadata;
}

export function ClubDetailAdminMembers({
	clubMembers = [],
	clubMetadata,
}: Props) {
	const [opened, { toggle }] = useDisclosure();

	const isAdmin = clubMetadata?.isAdmin || false;

	return (
		<ThemePaper light="gray.1" dark="gray.8" p="lg" radius="md">
			<Flex justify="space-between" align="center" mb="md">
				<Group gap="xs">
					<IconUser size={24} />
					<Title order={3} size="h4">
						Members
					</Title>
					{clubMembers.length > 0 && (
						<Badge variant="light" color="blue" size="lg">
							{clubMembers.length}
						</Badge>
					)}
				</Group>
				{isAdmin && (
					<Button
						leftSection={<IconPlus size={16} />}
						size="xs"
						onClick={toggle}
						variant="light"
					>
						Add Member
					</Button>
				)}
			</Flex>
			<Divider mb="md" />

			{clubMembers.length > 0 ? (
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Name</Table.Th>
							<Table.Th>Belt</Table.Th>
							<Table.Th>Year</Table.Th>
							<Table.Th>Sex</Table.Th>
							<Table.Th>Status</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{clubMembers.map((member) => {
							const isMemberAdmin =
								member.userId !== null &&
								clubMetadata?.admins
									.map((admin) => admin.userId)
									.includes(member.userId);

							return (
								<Table.Tr key={member.id}>
									<Table.Td>
										<Group gap="sm">
											<Avatar
												color={isMemberAdmin ? 'blue' : 'gray'}
												size="sm"
												radius="xl"
											>
												{member.firstName?.[0] || member.lastName?.[0] || '?'}
											</Avatar>
											<Stack gap={2}>
												<Text fw={500}>
													{member.firstName} {member.lastName}
												</Text>
												{member.userId && (
													<Group gap={4}>
														<IconUser size={12} />
														<Text size="xs" c="dimmed">
															Registered User
														</Text>
													</Group>
												)}
											</Stack>
										</Group>
									</Table.Td>
									<Table.Td>
										{member.belt ? (
											<Badge variant="light" color="orange" size="sm">
												{member.belt}
											</Badge>
										) : (
											<Text size="sm" c="dimmed">
												—
											</Text>
										)}
									</Table.Td>
									<Table.Td>
										{member.dateOfBirth ? (
											<Text size="sm">
												{dayjs(member.dateOfBirth).format('YYYY')}
											</Text>
										) : (
											<Text size="sm" c="dimmed">
												—
											</Text>
										)}
									</Table.Td>
									<Table.Td>
										<Badge
											variant="light"
											color={member.sex === 'Male' ? 'blue' : 'pink'}
											size="sm"
										>
											{member.sex}
										</Badge>
									</Table.Td>
									<Table.Td>
										{isMemberAdmin && (
											<Badge variant="outline" color="red" size="sm">
												Admin
											</Badge>
										)}
									</Table.Td>
								</Table.Tr>
							);
						})}
					</Table.Tbody>
				</Table>
			) : (
				<Stack gap="md" align="center" py="xl">
					<IconUser size={48} style={{ opacity: 0.3 }} />
					<Text c="dimmed" ta="center">
						No members yet
					</Text>
					{isAdmin && (
						<Button
							leftSection={<IconPlus size={16} />}
							onClick={toggle}
							variant="light"
						>
							Add First Member
						</Button>
					)}
				</Stack>
			)}

			{isAdmin && (
				<Modal opened={opened} onClose={toggle} title="Add Member" size="lg">
					<ClubMemberForm />
				</Modal>
			)}
		</ThemePaper>
	);
}
