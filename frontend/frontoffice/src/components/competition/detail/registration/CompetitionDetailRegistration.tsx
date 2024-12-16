import { CompetitionListItem } from "../../../../api/common";

interface Props {
    competition: CompetitionListItem
}
export function CompetitionDetailRegistration({
    competition
}: Props) {


    return (
        <div>
            <p>Registration</p>
            <p>{competition.name}</p>
        </div>
    )
}