import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CompetitionListItem, getCompetition, getCompetitionMetadata } from "../../api/common";
import { useAuthStore } from "../../stores/auth";
import { Flex, Text, Title } from "@mantine/core";
import { getRandomTestCompetitionImage } from "../../constants";
import { AppTabs } from "../../components/shared/tabs/AppTabs";
import { ImageWithOverlay } from "../../components/shared/image-with-text/ImageWithText";
import { IconCalendar, IconPin } from "@tabler/icons-react";
import dayjs from "dayjs"
import { CompetitionImageOverlay } from "../../components/competition/image-overlay/CompetitionImageOverlay";


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

    const myRole = competitionMetadata?.data.competitionAdmins.some(({ userId }) => authStore.profile?.userId === userId)

    // TODO: use this later
    const isMember = myRole !== undefined

    // TODO somehow handle error scenario


    if (!slug || !competition?.data) {
        return <div>Competition not found</div>
    }

    return (
       <Flex direction={"column"}>
           <ImageWithOverlay 
                src={getRandomTestCompetitionImage()} 
                imageHeight={500} 
                imageWidth={"100vw"} 
                overlay={
                    <CompetitionImageOverlay competition={competition.data} />
                }
           />

            <Flex justify={"center"}>
                <AppTabs tabs={[
                    {
                        value: "info",
                        label: "Info",
                        element: (
                            <div>
                                <h1>{competition?.data.name}</h1>
                                <p>{JSON.stringify(competition?.data, null, 2)}</p>
                                <p>{JSON.stringify(competitionMetadata?.data)}</p>
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
       </Flex>
    )
}

