import { Flex, Text, Title } from "@mantine/core";
import { IconCalendar, IconPin } from "@tabler/icons-react";
import dayjs from "dayjs";
import { CompetitionListItem } from "../../../api/common";

export function CompetitionImageOverlay({ competition}: { competition: CompetitionListItem }) {
    return (
        <Flex justify={"space-between"} w={"100%"} align={"center"}>
            <Flex direction={"column"} gap={"xs"}>
                <Title>{competition?.name}</Title>
                <Text>{competition?.clubName}</Text>
            </Flex>
            <Flex direction={"column"} gap="sm">
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
    )
}