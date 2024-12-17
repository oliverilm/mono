import { ClubList } from '../../components/club/list/ClubList';
import { CompetitionCarousel } from '../../components/competition/carousel/CompetitionCarousel';
import { LayoutPage } from '../layout/page/LayoutPage';

export function HomePage() {
	// const {data: camps} = useQuery({
	//     queryKey: ["homepage-camps"],
	//     queryFn: () => getPublicCamps({skip: 0, take: 25})
	// })

	return (
		<LayoutPage>
			<CompetitionCarousel />
			<ClubList />
		</LayoutPage>
	);
}
