import { CompetitionListItem } from '../../../../api/common';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionDetailInfo({ competition }: Props) {
	return (
		<div>
			<p>{competition.name}</p>
		</div>
	);
}
