import { Divider, Flex, Text, Title } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import type { CompetitionMetadata } from '../../../../api/utils/common-types';
import { linkCardPaper } from '../../../../pages/competition/styles.css';

interface Props {
	links?: CompetitionMetadata['competitionLinks'];
}

export function CompetitionDetailLinks({ links }: Props) {
	if (!links || links.length === 0) {
		return null;
	}
	return (
		<Flex direction={'column'}>
			<Title size={'h3'}>Important links</Title>
			<Divider my={'xs'} />
			{links.map(({ url, label }) => {
				return (
					<Flex
						key={url}
						p={'sm'}
						className={linkCardPaper}
						onClick={() => window.open(url, '__blank')}
						align={'center'}
						justify={'space-between'}
						gap={'sm'}
					>
						<Text size="h4" c={'gray'} m={0} p={0}>
							{label}
						</Text>
						<IconLink color="gray" size={'1rem'} />
					</Flex>
				);
			})}
		</Flex>
	);
}
