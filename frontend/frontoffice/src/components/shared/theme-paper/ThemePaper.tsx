import { Paper, type PaperProps, useMantineColorScheme } from '@mantine/core';
import type React from 'react';

export interface Props extends PaperProps {
	light: PaperProps['bg'];
	dark: PaperProps['bg'];
	children: React.ReactNode;
}

export function ThemePaper({ light, dark, children, ...rest }: Props) {
	const { colorScheme } = useMantineColorScheme();
	return (
		<Paper {...rest} bg={colorScheme === 'dark' ? dark : light}>
			{children}
		</Paper>
	);
}
