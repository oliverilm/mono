import { getPublicCompetitions, getPublicClubs } from "../../api/common";
import { ClubList } from "../../components/club/list/ClubList";
import { CompetitionCarousel } from "../../components/competition/carousel/CompetitionCarousel";
import { UserProfileCard } from "../../components/user/profile/card/UserProfileCard";
import { useQuery } from "react-query"
export function HomePage() {

    const {data: competitions} = useQuery({
        queryKey: ["homepage-competitions"],
        queryFn: () => getPublicCompetitions({skip: 0, take: 25})
    })

    // const {data: camps} = useQuery({
    //     queryKey: ["homepage-camps"],
    //     queryFn: () => getPublicCamps({skip: 0, take: 25})
    // })


    const {data: clubs} = useQuery({
        queryKey: ["homepage-clubs"],
        queryFn: () => getPublicClubs({skip: 0, take: 25})
    })

    console.log({ clubs, competitions})
    return (
        <div>
            <UserProfileCard />
            <CompetitionCarousel/>
            <ClubList />
        </div>
    )
}