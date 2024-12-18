import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CompetitionAPI } from '../../api/common';
import { useAuthStore } from '../../stores/auth';
import { Box, Button, Flex, Modal, Text } from '@mantine/core';
import { getRandomTestCompetitionImage } from '../../constants';
import { AppTabs } from '../../components/shared/tabs/AppTabs';
import { ImageWithOverlay } from '../../components/shared/image-with-text/ImageWithText';
import { CompetitionImageOverlay } from '../../components/competition/image-overlay/CompetitionImageOverlay';
import { CompetitionDetailInfo } from '../../components/competition/detail/info/CompetitionDetailInfo';
import { CompetitionDetailRegistration } from '../../components/competition/detail/registration/CompetitionDetailRegistration';
import { useDisclosure } from '@mantine/hooks';
import { CompetitionUpdateForm } from '../../components/competition/update/form/CompetitionUpdateForm';
import { LayoutPage } from '../layout/page/LayoutPage';
import { StaticQueryKey } from '../../providers/query-provider/keys';

export function CompetitionPage() {
	const { slug } = useParams<'slug'>();
	const authStore = useAuthStore();

	const [opened, { toggle }] = useDisclosure();
	const [categoriesOpen, { toggle: toggleCategories }] = useDisclosure();
	
	const { data: competition } = useQuery({
		queryKey: [StaticQueryKey.CompetitionDetail, slug],
		queryFn: () => CompetitionAPI.getCompetition(slug),
	});

	const { data: competitionMetadata } = useQuery({
		queryKey: [StaticQueryKey.CompetitionMetadata, slug, authStore.isAuthenticated],
		queryFn: () => CompetitionAPI.getCompetitionMetadata(slug),
	});

	const { data: competitionCategories } = useQuery({
		queryKey: [StaticQueryKey.CompetitionCategories, slug],
		queryFn: () => CompetitionAPI.getCompetitionCategories(slug!),
		enabled: Boolean(slug)
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
		<LayoutPage width="full">
			<Flex direction={'column'} p={0} w={'100%'}>
				<ImageWithOverlay
					src={getRandomTestCompetitionImage()}
					imageHeight={500}
					imageWidth={'100%'}
					overlay={<CompetitionImageOverlay competition={competition.data} />}
				/>

				<Box maw={1200} m={'auto'}>
					{isAdministrator && myRole && (
						<Flex align={'center'} bg={'gray.0'} gap={'md'} p={'sm'} my={'sm'}>
							<Text>{myRole?.role}</Text>

							<Button onClick={toggle}>edit info</Button>
							<Button onClick={toggleCategories}>add categories</Button>

							<Modal size={'lg'} opened={opened} onClose={toggle}>
								<CompetitionUpdateForm
									competition={competition.data}
									onSubmitSuccess={toggle}
								/>
							</Modal>

							<Modal size={'lg'} opened={categoriesOpen} onClose={toggleCategories}>
								<CompetitionUpdateForm
									competition={competition.data}
									onSubmitSuccess={toggleCategories}
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
									element: (
										<CompetitionDetailInfo competition={competition.data} />
									),
								},
								{
									value: 'Registration',
									label: 'Registration',
									element: (
										<CompetitionDetailRegistration
											competition={competition.data}
										/>
									),
								},
							]}
						/>
					</Flex>
				</Box>
			</Flex>
		</LayoutPage>
	);
}
