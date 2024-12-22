import { useQuery } from 'react-query';
import {
	CompetitionAPI,
	type CompetitionListItem,
} from '../../../../api/common';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionDetailCompetitors({ competition }: Props) {
	useQuery({
		queryKey: ['competitors', competition.id],
		queryFn: () => CompetitionAPI.getCompetitors(competition.slug),
	});

	return <div>null</div>;
}
