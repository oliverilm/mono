import { Flex, Text, Title } from '@mantine/core';
import { IconCalendar, IconPin } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { CompetitionListItem } from '../../../api/common';

interface Props { 
    competition: CompetitionListItem
}

export function CompetitionImageOverlay({
	competition,
}: Props) {
	return (
		<Flex justify={'space-between'} w={'100%'} align={'center'}>
			<Flex direction={'column'} gap={'xs'}>
				<Title>{competition?.name}</Title>
				<Text>{competition?.clubName}</Text>
			</Flex>
			<Flex direction={'column'} gap="sm">
				<Flex align={'center'} gap={'sm'}>
					<IconCalendar />
					<Text>{dayjs(competition.startingAt).format('DD.MM YYYY')}</Text>
				</Flex>
				<Flex align={'center'} gap={'sm'}>
					<IconPin />
					<Text>{competition.location ?? 'unset'}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}
