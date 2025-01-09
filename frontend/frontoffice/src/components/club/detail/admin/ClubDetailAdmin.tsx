import { ActionIcon, Divider, Flex, Grid, Table, Title } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import { ClubAPI } from '../../../../api/common';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { ThemePaper } from '../../../shared/theme-paper/ThemePaper';
import { ClubMemberForm } from '../../member/form/ClubMemberForm';

export function ClubDetailAdmin() {
	const { slug } = useParams<'slug'>();

	const [{ data: clubDetails }, { data: clubMetadata }, { data: clubMembers }] =
		useQueries([
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
		]);

	return (
		<div>
			<pre>{JSON.stringify(clubDetails?.data, null, 2)}</pre>
			<pre>{JSON.stringify(clubMetadata?.data, null, 2)}</pre>

			<Grid>
				<Grid.Col span={6}>
					<ThemePaper light={'blue.1'} dark={'blue.9'} p={'sm'}>
						<Flex justify={'space-between'}>
							<Title px="xs" size={'h3'}>
								Members
							</Title>
							<ActionIcon>
								<IconDotsVertical />
							</ActionIcon>
						</Flex>
						<Divider py={'1px'} bg={'gray.3'} />
						<Table>
							<Table.Tbody>
								{clubMembers?.data.map((member) => (
									<Table.Tr key={member.id}>
										<Table.Td>
											{member.firstName} {member.lastName}
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
				<Grid.Col span={6}>
					<ThemePaper light={'blue.1'} dark={'blue.9'} p={'sm'}>
						competitions
					</ThemePaper>
				</Grid.Col>
			</Grid>
			{clubMetadata?.data.isAdmin && <ClubMemberForm />}
		</div>
	);
}
