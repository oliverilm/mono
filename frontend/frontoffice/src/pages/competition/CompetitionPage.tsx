import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCompetition, getCompetitionMetadata } from "../../api/common";
import { useAuthStore } from "../../stores/auth";

export function CompetitionPage() {
    const {slug} = useParams<"slug">()

    const authStore = useAuthStore()
    const { data: competition } = useQuery({
        queryKey: ["competition", slug],
        queryFn: () => getCompetition(slug)
    })

    const { data: competitionMetadata } = useQuery({
        queryKey: ["competition-metadata", slug, authStore.isAuthenticated],
        queryFn: () => getCompetitionMetadata(slug)
    })

    // TODO somehow handle error scenario


    if (!slug) {
        return <div>Competition not found</div>
    }

    return (
        <div>
            <pre>
                {JSON.stringify(competition?.data, null, 2)}
                {JSON.stringify(competitionMetadata?.data, null, 2)}
            </pre>
        </div>
    )
}