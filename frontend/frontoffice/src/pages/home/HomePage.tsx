import { CompetitionCarousel } from "../../components/competition/carousel/CompetitionCarousel";
import { UserProfileCard } from "../../components/user/profile/card/UserProfileCard";
import { useAuthStore } from "../../stores/auth";


export function HomePage() {

    const authStore = useAuthStore()

    return (
        <div>
            {authStore.isAuthenticated && <UserProfileCard />}
            <CompetitionCarousel />
        </div>
    )
}