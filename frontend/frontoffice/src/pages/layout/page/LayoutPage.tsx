import { Box } from '@mantine/core';

interface Props {
	children: React.ReactNode;
	width?: 'full' | 'default';
}
export function LayoutPage({ children, width = 'default' }: Props) {
	return <Box {...(width === 'default' ? { p: 'md' } : {})}>{children}</Box>;
}
