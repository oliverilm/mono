import { ClubList } from '../../components/club/list/ClubList';
import { CompetitionCarousel } from '../../components/competition/carousel/CompetitionCarousel';
import { UserProfileCard } from '../../components/user/profile/card/UserProfileCard';

export function HomePage() {
	// const {data: camps} = useQuery({
	//     queryKey: ["homepage-camps"],
	//     queryFn: () => getPublicCamps({skip: 0, take: 25})
	// })

	return (
		<div>
			<UserProfileCard />
			<CompetitionCarousel />
			<ClubList />
		</div>
	);
}
