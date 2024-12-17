import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CompetitionAPI } from '../../api/common';
import { useAuthStore } from '../../stores/auth';
import { Button, Flex, Modal, Text } from '@mantine/core';
import { getRandomTestCompetitionImage } from '../../constants';
import { AppTabs } from '../../components/shared/tabs/AppTabs';
import { ImageWithOverlay } from '../../components/shared/image-with-text/ImageWithText';
import { CompetitionImageOverlay } from '../../components/competition/image-overlay/CompetitionImageOverlay';
import { CompetitionDetailInfo } from '../../components/competition/detail/info/CompetitionDetailInfo';
import { CompetitionDetailRegistration } from '../../components/competition/detail/registration/CompetitionDetailRegistration';
import { useDisclosure } from '@mantine/hooks';
import { CompetitionUpdateForm } from '../../components/competition/update/form/CompetitionUpdateForm';

export function CompetitionPage() {
	const { slug } = useParams<'slug'>();
	const authStore = useAuthStore();

	const [opened, { toggle }] = useDisclosure();
	const { data: competition } = useQuery({
		queryKey: ['competition', slug],
		queryFn: () => CompetitionAPI.getCompetition(slug),
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data: competitionMetadata } = useQuery({
		queryKey: ['competition-metadata', slug, authStore.isAuthenticated],
		queryFn: () => CompetitionAPI.getCompetitionMetadata(slug),
	});

	const myRole = competitionMetadata?.data?.competitionAdmins?.find(
		({ userId }) => authStore.profile?.userId === userId,
	);

	// TODO: use this later
	const isAdministrator = Boolean(myRole);

	if (!slug || !competition?.data) {
		return <div>Competition not found</div>;
	}

	return (
		<Flex direction={'column'} p={0} w={'100%'}>
			<ImageWithOverlay
				src={getRandomTestCompetitionImage()}
				imageHeight={500}
				imageWidth={'100%'}
				overlay={<CompetitionImageOverlay competition={competition.data} />}
			/>
			{isAdministrator && myRole && (
				<Flex>
					<Text>{myRole?.role}</Text>

					<Button onClick={toggle}>edit</Button>

					<Modal opened={opened} onClose={toggle}>
						<CompetitionUpdateForm
							competition={competition.data}
							onSubmitSuccess={toggle}
						/>
					</Modal>
				</Flex>
			)}

			<Flex justify={'center'}>
				<AppTabs
					tabs={[
						{
							value: 'info',
							label: 'Info',
							element: <CompetitionDetailInfo competition={competition.data} />,
						},
						{
							value: 'Registration',
							label: 'Registration',
							element: (
								<CompetitionDetailRegistration competition={competition.data} />
							),
						},
					]}
				/>
			</Flex>
		</Flex>
	);
}
