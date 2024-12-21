import { useQuery } from 'react-query';
import { CompetitionAPI, type CompetitionListItem } from '../../../../api/common';
import { Table } from '@mantine/core';

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
			<Table>
				
			</Table>
		</div>
	);
}
