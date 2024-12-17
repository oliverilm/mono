import { CompetitionListItem } from '../../../../api/common';
import { RichTextRenderer } from '../../update/form/CompetitionUpdateForm';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionDetailInfo({ competition }: Props) {
	return (
		<div>
			<RichTextRenderer value={competition.description ?? ''} />
		</div>
	);
}
