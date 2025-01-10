import { Flex, Text, Title } from '@mantine/core';
import type { CompetitionListItem } from '../../../api/utils/common-types';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionImageOverlay({ competition }: Props) {
	return (
		<Flex justify={'space-between'} w={'100%'} pb={'lg'} align={'center'}>
			<Flex direction={'column'} gap={'xs'}>
				<Title>{competition?.name}</Title>
				<Text>{competition?.clubName}</Text>
			</Flex>
		</Flex>
	);
}
