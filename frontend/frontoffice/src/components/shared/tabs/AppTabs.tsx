import { Tabs, type TabsListProps, type TabsProps } from '@mantine/core';
import { useState } from 'react';

interface Tab {
	value: string;
	label: string;
	element: React.ReactNode;
}
interface Props {
	TabsProps?: Omit<TabsProps, 'children'>;
	TabListProps?: Omit<TabsListProps, 'children'>;
	tabs: Tab[];
}
export function AppTabs({ tabs, TabsProps, TabListProps }: Props) {
	const [selected, setSelected] = useState<string | null>('info');

	return (
		<Tabs
			value={selected}
			onChange={setSelected}
			w={'inherit'}
			defaultValue={tabs[0].value}
			mx={'auto'}
			display={'flex'}
			style={{ alignItems: 'center', flexDirection: 'column' }}
			{...TabsProps}
		>
			<Tabs.List {...TabListProps}>
				{tabs.map(({ value, label }) => {
					return (
						<Tabs.Tab key={value} value={value}>
							{label}
						</Tabs.Tab>
					);
				})}
			</Tabs.List>

			{tabs
				.filter(({ value }) => selected === value)
				.map(({ value, element }) => (
					<Tabs.Panel mt={'lg'} w={'inherit'} key={value} value={value}>
						{element as React.ReactNode}
					</Tabs.Panel>
				))}
		</Tabs>
	);
}
