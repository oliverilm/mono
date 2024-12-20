import { useQuery } from 'react-query';
import { CompetitionAPI, CompetitionListItem } from '../../../../api/common';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionDetailCompetitors({ competition }: Props) {
	const { data: competitors } = useQuery({
		queryKey: ['competitors', competition.id],
		queryFn: () => CompetitionAPI.getCompetitors(competition.slug),
	});

	return (
		<div>
			<h1>Competitors</h1>
		</div>
	);
}
