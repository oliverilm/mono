import { Stack } from '@mantine/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { ClubDetailAdmin } from './admin/ClubDetailAdmin';
import { ClubDetailPublic } from './public/ClubDetailPublic';
import { ClubAPI } from '../../../api/club-api';

export function ClubDetail() {
	const { slug } = useParams<'slug'>();

	const { data: clubMetadata } = useQuery({
		queryKey: [StaticQueryKey.ClubMetadata, slug],
		queryFn: () => ClubAPI.getClubMetadata(slug),
		enabled: Boolean(slug),
	});

	return (
		<Stack>
			<h1>Club Page</h1>

			{clubMetadata?.data.isAdmin ? <ClubDetailAdmin /> : <ClubDetailPublic />}
		</Stack>
	);
}
