import { Stack } from '@mantine/core';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import { ClubAPI } from '../../../api/common';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { ClubMemberForm } from '../member/form/ClubMemberForm';

export function ClubDetail() {
	const { slug } = useParams<'slug'>();

	const [{ data: clubDetails }, { data: clubMetadata }] = useQueries([
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
	]);

	return (
		<Stack>
			<h1>Club Page</h1>

			<pre>{JSON.stringify(clubDetails?.data, null, 2)}</pre>
			<pre>{JSON.stringify(clubMetadata?.data, null, 2)}</pre>

			{clubMetadata?.data.isAdmin && <ClubMemberForm />}
		</Stack>
	);
}
