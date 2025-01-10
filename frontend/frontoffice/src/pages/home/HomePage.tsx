import { useQuery } from 'react-query';
import { InvitationApi } from '../../api/invitation-api';
import { ClubList } from '../../components/club/list/ClubList';
import { CompetitionCarousel } from '../../components/competition/carousel/CompetitionCarousel';
import { LayoutPage } from '../layout/page/LayoutPage';

export function HomePage() {
	const { data } = useQuery({
		queryKey: ['my-invitations'],
		queryFn: () => InvitationApi.getMyInvitations(),
	});
	return (
		<LayoutPage>
			<CompetitionCarousel />
			<ClubList />
			<pre>{JSON.stringify(data?.data, null, 2)}</pre>
		</LayoutPage>
	);
}
