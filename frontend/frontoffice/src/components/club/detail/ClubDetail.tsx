import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ClubAPI } from '../../../api/club-api';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { useAuthStore } from '../../../stores/auth';
import { ClubDetailAdmin } from './admin/ClubDetailAdmin';
import { ClubDetailPublic } from './public/ClubDetailPublic';

export function ClubDetail() {
	const { slug } = useParams<'slug'>();
	const userAuthStore = useAuthStore();

	const { data: clubMetadata } = useQuery({
		queryKey: [StaticQueryKey.ClubMetadata, slug, userAuthStore.profile?.id],
		queryFn: () => ClubAPI.getClubMetadata(slug),
		enabled: Boolean(slug),
	});

	if (clubMetadata?.data.isAdmin) return <ClubDetailAdmin />;

	return <ClubDetailPublic />;
}
