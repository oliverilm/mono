import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ThemeToggle() {
	const { setColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<ActionIcon
			size={'lg'}
			variant="transparent"
			color={colorScheme === 'dark' ? 'white' : 'dark'}
			onClick={() => {
				setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
			}}
		>
			{colorScheme === 'light' ? <IconMoon /> : <IconSun />}
		</ActionIcon>
	);
}
