import { Box, type BoxProps } from '@mantine/core';

interface Props extends BoxProps {
	children: React.ReactNode;
	width?: 'full' | 'default';
}
export function LayoutPage({ children, width = 'default', ...rest }: Props) {
	return (
		<Box
			{...rest}
			{...(width === 'default'
				? { p: 'xl', w: '100%', maw: 1200, mx: 'auto' }
				: {})}
		>
			{children}
		</Box>
	);
}
