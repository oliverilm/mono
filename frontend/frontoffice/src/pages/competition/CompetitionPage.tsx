import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCompetition, getCompetitionMetadata } from "../../api/common";
import { useAuthStore } from "../../stores/auth";
import { Flex, Text, Title } from "@mantine/core";
import { getRandomTestCompetitionImage } from "../../constants";
import { AppTabs } from "../../components/shared/tabs/AppTabs";
import { ImageWithOverlay } from "../../components/shared/image-with-text/ImageWithText";
import { IconCalendar, IconPin } from "@tabler/icons-react";
import dayjs from "dayjs"
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
           <ImageWithOverlay src={getRandomTestCompetitionImage()} imageHeight={500} imageWidth={"100vw"} overlay={
                <Flex justify={"space-between"} w={"100%"} align={"center"}>
                    <Flex direction={"column"} gap={"xs"}>
                        <Title>{competition?.data.name}</Title>
                        <Text>{competition?.data.clubName}</Text>
                    </Flex>
                    <Flex display={{
                        xl: "flex",
                        lg: "flex",
                        md: "flex",
                        sm: "none",
                        xs: "none",
                        xxs: "none"
                    }} direction={"column"} gap="sm">
                        <Flex align={"center"} gap={"sm"}>
                           <IconCalendar /> 
                           <Text>{dayjs().add(2, "day").format("DD.MM YYYY")}</Text>
                        </Flex>
                        <Flex align={"center"} gap={"sm"}>
                            <IconPin />
                            <Text>example location</Text>
                        </Flex>
                    </Flex>
                </Flex>
           }
           gradientTo="bottom"
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