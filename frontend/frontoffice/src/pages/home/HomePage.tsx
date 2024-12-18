import { ClubList } from '../../components/club/list/ClubList';
import { CompetitionCarousel } from '../../components/competition/carousel/CompetitionCarousel';
import { LayoutPage } from '../layout/page/LayoutPage';

export function HomePage() {
	return (
		<LayoutPage>
			<CompetitionCarousel />
			<ClubList />
		</LayoutPage>
	);
}
