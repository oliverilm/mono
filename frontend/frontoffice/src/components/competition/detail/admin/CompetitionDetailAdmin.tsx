import { Button, Flex, Modal, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type {
	CompetitionListItem,
	CompetitionMetadata,
} from '../../../../api/common';
import { useAuthStore } from '../../../../stores/auth';
import { CompetitionCategoryForm } from '../../category/CompetitionCategoryForm';
import { CompetitionLinkFrom } from '../../links/form/CompetitionLinkForm';
import { CompetitionUpdateForm } from '../../update/form/CompetitionUpdateForm';
import { CompetitionDetailAdminForm } from './form/CompetitionDetailAdminForm';

interface Props {
	competition: CompetitionListItem;
	metadata?: CompetitionMetadata;
}

export function CompetitionDetailAdmin({ competition, metadata }: Props) {
	const { colorScheme } = useMantineColorScheme();
	const authStore = useAuthStore();

	const [opened, { toggle }] = useDisclosure();
	const [categoriesOpen, { toggle: toggleCategories }] = useDisclosure();
	const [linkOpen, { toggle: toggleLink }] = useDisclosure();
	const [adminOpen, { toggle: toggleAdmin }] = useDisclosure();

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
				<Flex gap={'sm'} wrap={'wrap'}>
					<Button size="xs" onClick={toggleCategories}>
						Add categories
					</Button>
					<Button size="xs" onClick={toggleLink}>
						Add link
					</Button>
					<Button size="xs" onClick={toggleAdmin}>
						Add admin
					</Button>

					<Button size="xs" onClick={() => alert('not implemented')}>
						Export
					</Button>
				</Flex>
				<Flex gap={'sm'}>
					<Button
						bg={'green'}
						size="xs"
						onClick={() => alert('not implemented')}
					>
						Publish
					</Button>
					<Button
						bg={'yellow'}
						size="xs"
						onClick={() => alert('not implemented')}
					>
						Unpublish
					</Button>
					<Button bg="red" size="xs" onClick={() => alert('not implemented')}>
						Archive
					</Button>
					<Button size="xs" onClick={toggle}>
						Edit
					</Button>
				</Flex>

				<Modal size={'lg'} opened={opened} onClose={toggle}>
					<CompetitionUpdateForm
						competition={competition}
						onSubmitSuccess={toggle}
					/>
				</Modal>

				<Modal size={'lg'} opened={adminOpen} onClose={toggleAdmin}>
					<CompetitionDetailAdminForm
						competition={competition}
						metadata={metadata}
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
