import { Box } from '@mantine/core';

interface Props {
	children: React.ReactNode;
	width?: 'full' | 'default';
}
export function LayoutPage({ children, width = 'default' }: Props) {
	return (
		<Box
			{...(width === 'default'
				? { p: 'xl', w: '100%', maw: 1200, mx: 'auto' }
				: {})}
		>
			{children}
		</Box>
	);
}
