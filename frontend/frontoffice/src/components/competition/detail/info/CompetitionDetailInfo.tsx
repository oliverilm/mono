import { Box, Flex } from '@mantine/core';
import { CompetitionListItem } from '../../../../api/common';
import { RichTextRenderer } from '../../update/form/CompetitionUpdateForm';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionDetailInfo({ competition }: Props) {
	return (
		<Flex gap={'md'}>
			<Box miw={500}>
				<RichTextRenderer value={competition.description ?? ''} />
			</Box>
			<Box miw={500}>
				<RichTextRenderer value={competition.description ?? ''} />
			</Box>
		</Flex>
	);
}
