import { Box, Flex, Text } from '@mantine/core';
import { CompetitionListItem } from '../../../../api/common';
import { RichTextRenderer } from '../../update/form/CompetitionUpdateForm';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionDetailInfo({ competition }: Props) {
	const boxProps = {
		maw: 500,
		miw: 300,
		m: 'auto',
	};
	return (
		<Flex gap={'md'} mx={'lg'} wrap={'wrap'}>
			<Box {...boxProps}>
				<RichTextRenderer value={competition.description ?? ''} />
			</Box>
			<Box {...boxProps}>
				<Text>Show competition categories and associated weights</Text>
			</Box>
		</Flex>
	);
}
