import { useState } from 'react';
import { Tabs } from '@mantine/core';

interface Tab {
	value: string;
	label: string;
	element: React.ReactNode;
}
interface Props {
	tabs: Tab[];
}
export function AppTabs({ tabs }: Props) {
	const [value, setValue] = useState<string | null>('info');

	return (
		<Tabs
			variant="none"
			value={value}
			onChange={setValue}
			w={'100%'}
			mx={'auto'}
			display={'flex'}
			style={{ alignItems: 'center', flexDirection: 'column' }}
		>
			<Tabs.List>
				{tabs.map(({ value, label }) => {
					return (
						<Tabs.Tab key={value} value={value}>
							{label}
						</Tabs.Tab>
					);
				})}
			</Tabs.List>

			{tabs.map(({ value, element }) => {
				return (
					<Tabs.Panel key={value} value={value}>
						{element as React.ReactNode}
					</Tabs.Panel>
				);
			})}
		</Tabs>
	);
}
