import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCompetition, getCompetitionMetadata } from "../../api/common";
import { useAuthStore } from "../../stores/auth";
import { Flex, Image } from "@mantine/core";
import { getRandomTestCompetitionImage } from "../../constants";
import { AppTabs } from "../../components/shared/tabs/AppTabs";

export function CompetitionPage() {
    const {slug} = useParams<"slug">()

    const authStore = useAuthStore()
    const { data: competition } = useQuery({
        queryKey: ["competition", slug],
        queryFn: () => getCompetition(slug)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: competitionMetadata } = useQuery({
        queryKey: ["competition-metadata", slug, authStore.isAuthenticated],
        queryFn: () => getCompetitionMetadata(slug)
    })

    // TODO somehow handle error scenario


    if (!slug) {
        return <div>Competition not found</div>
    }

    return (
       <Flex direction={"column"}>
           <Image src={getRandomTestCompetitionImage()}  w={"100vw"}/>

            <AppTabs tabs={[
                {
                    value: "info",
                    label: "Info",
                    element: (
                        <div>
                            <h1>{competition?.data.name}</h1>
                            <p>{competition?.data.description}</p>
                        </div>
                    )
                },
                {
                    value: "Registration",
                    label: "Registration",
                    element: (
                        <div>
                            <h1>Registration</h1>
                            <p>{competition?.data.description}</p>
                        </div>
                    )
                }
            ]}/>
       </Flex>
    )
}