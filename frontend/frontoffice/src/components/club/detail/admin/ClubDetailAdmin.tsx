import { Flex, Grid, Title } from '@mantine/core';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import { Api } from '../../../../api';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { ClubDetailAdminCompetitions } from './competitions/ClubDetailAdminCompetitions';
import { ClubDetailAdminMembers } from './members/ClubDetailAdminMembers';

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

	// TODO: maybe these should be joined in the backend. Collect all the data and present as a single response.
	// should be much faster in this case.
	const [
		{ data: clubDetails },
		{ data: clubMetadata },
		{ data: clubMembers },
		{ data: invitations },
	] = useQueries([
		{
			queryKey: [StaticQueryKey.ClubDetails, slug],
			queryFn: () => Api.publicApi.club.getClub(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [StaticQueryKey.ClubMetadata, slug],
			queryFn: () => Api.publicApi.club.getClubMetadata(slug),
			enabled: Boolean(slug),
		},

		{
			queryKey: [StaticQueryKey.ClubMembers, slug],
			queryFn: () => Api.user.club.getClubMembers(slug),
			enabled: Boolean(slug),
		},

		{
			queryKey: ['club-invitations', slug],
			queryFn: () => Api.user.invitation.getCreatedInvitations(),
			enabled: Boolean(slug),
		},
	]);

	return (
		<div>
			<Flex justify={'center'} direction={'column'} align={'center'}>
				<Title>{clubDetails?.data?.name}</Title>
				<pre>
					{JSON.stringify(
						{
							clubDetails: clubDetails?.data,
							clubMetadata: clubMetadata?.data,
							invitations: invitations?.data,
						},
						null,
						2,
					)}
				</pre>
			</Flex>

			<Grid>
				<Grid.Col span={span}>
					<ClubDetailAdminMembers
						clubMembers={clubMembers?.data}
						clubMetadata={clubMetadata?.data}
					/>
				</Grid.Col>
				<Grid.Col span={span}>
					<ClubDetailAdminCompetitions />
				</Grid.Col>
			</Grid>
		</div>
	);
}
