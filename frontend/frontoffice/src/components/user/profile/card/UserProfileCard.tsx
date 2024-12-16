import { Avatar, Button, Flex, Modal, Paper, Text } from "@mantine/core";
import { useAuthStore } from "../../../../stores/auth";
import { useDisclosure } from "@mantine/hooks";
import { CompetitionFrom } from "../../../competition/form/CompetitionForm";
import { ClubForm } from "../../../club/form/ClubForm";

export function UserProfileCard() {
    const [competitionFormOpened, { toggle: toggleCompetitionForm }] = useDisclosure()
    const [clubFormOpened, { toggle: toggleClubForm }] = useDisclosure()

    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
        return null;
    }

    return (
        <Paper w={"100%"} p={"md"} my={"md"} bg={"blue.0"}>
            <Flex justify={"space-between"} gap={"sm"}>
                <Flex align={"center"} gap={"xl"}>
                    <Avatar src={"data:image/png;base64,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"} />

                    <Flex direction={"column"}>
                        <Flex gap={"md"}>
                            <Text size="sm">{authStore.profile?.firstName || "--"}</Text>
                            <Text size="sm">{authStore.profile?.lastName || "--"}</Text>
                        </Flex>
                    </Flex>

                </Flex>
                <Flex gap={"sm"}>
                    <Button onClick={toggleCompetitionForm}>Create competition</Button>
                    <Button onClick={toggleClubForm}>Create club</Button>
                </Flex>

                <Modal opened={competitionFormOpened} onClose={toggleCompetitionForm} title={"Create competition"}>
                    <CompetitionFrom />
                </Modal>


                <Modal opened={clubFormOpened} onClose={toggleClubForm} title={"Create club"}>
                    <ClubForm />
                </Modal>
            </Flex>
        </Paper>
    )
}