import { Paper, PaperProps, useMantineColorScheme } from '@mantine/core';
import React from 'react';

export interface Props extends PaperProps {
	light: PaperProps['bg'];
	dark: PaperProps['bg'];
	children: React.ReactNode;
}

export function ThemePaper({ light, dark, children }: Props) {
	const { colorScheme } = useMantineColorScheme();
	return <Paper bg={colorScheme === 'dark' ? dark : light}>{children}</Paper>;
}
