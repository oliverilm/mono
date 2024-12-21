import dayjs from "dayjs"
import type { CompetitionListItem } from "../../../../api/common"

export function getCompetitionBannerColorAndStatus(competition: CompetitionListItem) {
        if (dayjs(competition.startingAt).isBefore(dayjs())) {
            return { text: "Has ended", bg: "red" }
        }
        if (dayjs(competition.registrationEndAt).isAfter(dayjs())) {
            return { text: "Registration open", bg: "green" }
        } 
            return { text: "Registration closed", bg: "orange" }
    }