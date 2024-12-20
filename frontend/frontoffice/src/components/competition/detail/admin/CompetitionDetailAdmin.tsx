import { Button, Flex, Modal, useMantineColorScheme } from '@mantine/core';
import {
	CompetitionListItem,
	CompetitionMetadata,
} from '../../../../api/common';
import { useAuthStore } from '../../../../stores/auth';
import { CompetitionUpdateForm } from '../../update/form/CompetitionUpdateForm';
import { CompetitionCategoryForm } from '../../category/CompetitionCategoryForm';
import { CompetitionLinkFrom } from '../../links/form/CompetitionLinkForm';
import { useDisclosure } from '@mantine/hooks';

interface Props {
	competition: CompetitionListItem;
	metadata?: CompetitionMetadata;
}

export function CompetitionDetailAdmin({ competition, metadata }: Props) {
	const { colorScheme } = useMantineColorScheme();
	const [opened, { toggle }] = useDisclosure();
	const [categoriesOpen, { toggle: toggleCategories }] = useDisclosure();
	const [linkOpen, { toggle: toggleLink }] = useDisclosure();
	const authStore = useAuthStore();
	const myRole = metadata?.competitionAdmins?.find(
		({ userId }) => authStore.profile?.userId === userId,
	);

	// TODO: use this later
	const isAdministrator = Boolean(myRole);
	if (isAdministrator && myRole) {
		return (
			<Flex
				align={'center'}
				bg={colorScheme === 'dark' ? 'gray.8' : 'gray.0'}
				p={'xs'}
				gap={'xs'}
				my={'sm'}
				wrap={'wrap'}
				justify={'space-between'}
			>
				<Flex gap={'sm'}>
					<Button size="xs" onClick={toggleCategories}>
						Add categories
					</Button>
					<Button size="xs" onClick={toggleLink}>
						Add link
					</Button>
				</Flex>
				<Button size="xs" onClick={toggle}>
					Edit
				</Button>

				<Modal size={'lg'} opened={opened} onClose={toggle}>
					<CompetitionUpdateForm
						competition={competition}
						onSubmitSuccess={toggle}
					/>
				</Modal>

				<Modal size={'md'} opened={categoriesOpen} onClose={toggleCategories}>
					<CompetitionCategoryForm
						competition={competition}
						onDone={toggleCategories}
					/>
				</Modal>

				<Modal size={'lg'} opened={linkOpen} onClose={toggleLink}>
					<CompetitionLinkFrom competition={competition} onDone={toggleLink} />
				</Modal>
			</Flex>
		);
	}
	return null;
}
