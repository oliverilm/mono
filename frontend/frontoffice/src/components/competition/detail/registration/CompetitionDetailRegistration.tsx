import { Flex } from '@mantine/core';
import type { CompetitionListItem } from '../../../../api/common';

interface Props {
	competition: CompetitionListItem;
}
export function CompetitionDetailRegistration({ competition }: Props) {
	return (
		<Flex direction={"column"}>
			<p>
				todo: query all profiles from the club who belong into the age groups that are present in the competition
			</p>
		</Flex>
	);
}
