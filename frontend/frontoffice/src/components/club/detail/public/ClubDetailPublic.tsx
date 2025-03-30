import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import { StaticQueryKey } from '../../../../providers/query-provider/keys';
import { Api } from '../../../../api';

export function ClubDetailPublic() {
	const { slug } = useParams<'slug'>();

	const [{ data: clubDetails }, { data: clubMetadata }] = useQueries([
		{
			queryKey: [StaticQueryKey.ClubDetails, slug],
			queryFn: () => Api.public.club.getClub(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [StaticQueryKey.ClubMetadata, slug],
			queryFn: () => Api.public.club.getClubMetadata(slug),
			enabled: Boolean(slug),
		},
	]);

	return (
		<div>
			<pre>{JSON.stringify(clubDetails?.data, null, 2)}</pre>
			<pre>{JSON.stringify(clubMetadata?.data, null, 2)}</pre>
		</div>
	);
}
