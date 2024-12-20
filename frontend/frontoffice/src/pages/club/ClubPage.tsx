import { useQueries, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { StaticQueryKey } from '../../providers/query-provider/keys';
import { ClubAPI } from '../../api/common';
import { LayoutPage } from '../layout/page/LayoutPage';

export function ClubPage() {
	const { slug } = useParams<'slug'>();

	const [{ data: clubDetails }] = useQueries([
		{
			queryKey: [StaticQueryKey.ClubDetails, slug],
			queryFn: () => ClubAPI.getClub(slug!),
		},
	]);

	return (
		<LayoutPage>
			<h1>Club Page</h1>

			<pre>{JSON.stringify(clubDetails, null, 2)}</pre>
		</LayoutPage>
	);
}
