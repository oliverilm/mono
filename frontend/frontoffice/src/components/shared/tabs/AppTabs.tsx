import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';

interface Tab {
  value: string;
  label: string;
  element: React.ReactNode
}
interface Props {
  tabs: Tab[]
}
export function AppTabs({tabs}: Props) {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={value} onChange={setValue}>
      <Tabs.List ref={setRootRef} >
        {tabs.map(({value, label}) => {
          return (
            <Tabs.Tab
              key={value}
              value={value}
              ref={setControlRef(value)}
            >
              {label}
            </Tabs.Tab>
          );
        })}
        

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
        />
      </Tabs.List>

      {tabs.map(({ value, element 
      }) => {
          return (
            <Tabs.Panel
              key={value}
              value={value}
            >
              {element as React.ReactNode}
            </Tabs.Panel>
          );
        })}
    </Tabs>
  );
}