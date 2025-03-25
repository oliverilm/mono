import { Accordion, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthStore } from '../../stores/auth';

export function DevToolsButton() {
	const [opened, { toggle }] = useDisclosure();
	const authStore = useAuthStore();

	return (
		<>
			<Button onClick={toggle}>Open DevTools</Button>
			<Modal opened={opened} onClose={toggle}>
				<Accordion title="profile json">
					<pre>{JSON.stringify(authStore.profile, null, 2)}</pre>
				</Accordion>
			</Modal>
		</>
	);
}
