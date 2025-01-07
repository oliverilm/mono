import { Box, Flex, Text } from '@mantine/core';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import { CompetitionAPI } from '../../api/common';
import { getCompetitionBannerColorAndStatus } from '../../components/competition/carousel/card/CompetitionCarouselCard.utils';
import { CompetitionDetailAdmin } from '../../components/competition/detail/admin/CompetitionDetailAdmin';
import { CompetitionDetailCompetitors } from '../../components/competition/detail/competitors/CompetitionDetailCompetitors';
import { CompetitionDetailInfo } from '../../components/competition/detail/info/CompetitionDetailInfo';
import { CompetitionDetailRegistration } from '../../components/competition/detail/registration/CompetitionDetailRegistration';
import { CompetitionImageOverlay } from '../../components/competition/image-overlay/CompetitionImageOverlay';
import { ImageWithOverlay } from '../../components/shared/image-with-text/ImageWithText';
import { AppTabs } from '../../components/shared/tabs/AppTabs';
import { HEADER_HEIGHT, getRandomTestCompetitionImage } from '../../constants';
import { StaticQueryKey } from '../../providers/query-provider/keys';
import { useAuthStore } from '../../stores/auth';
import { LayoutPage } from '../layout/page/LayoutPage';

export function CompetitionPage() {
	const { slug } = useParams<'slug'>();
	const authStore = useAuthStore();

	const [
		{ data: competition },
		{ data: competitionMetadata },
		{ data: competitionCategories },
	] = useQueries([
		{
			queryKey: [StaticQueryKey.CompetitionDetail, slug],
			queryFn: () => CompetitionAPI.getCompetition(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [
				StaticQueryKey.CompetitionMetadata,
				slug,
				authStore.isAuthenticated,
			],
			queryFn: () => CompetitionAPI.getCompetitionMetadata(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [StaticQueryKey.CompetitionCategories, slug],
			queryFn: () => CompetitionAPI.getCompetitionCategories(slug),

			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchInterval: false,
			enabled: Boolean(slug),
		},
	]);

	if (!slug || !competition?.data) {
		return <div>Competition not found</div>;
	}

	const { text, bg } = getCompetitionBannerColorAndStatus(competition.data);
	return (
		<LayoutPage width="full" pos={'relative'}>
			<Box
				bg={bg}
				pos="sticky"
				top={HEADER_HEIGHT}
				w={'100%'}
				p={'5px'}
				style={{ zIndex: 2 }}
			>
				<Text c={'white'} fw={'bold'}>
					{text}
				</Text>
			</Box>
			<Flex direction={'column'} p={0} w={'100%'}>
				<ImageWithOverlay
					src={getRandomTestCompetitionImage()}
					imageHeight={500}
					imageWidth={'100%'}
					overlay={<CompetitionImageOverlay competition={competition.data} />}
				/>

				<LayoutPage width="default">
					<CompetitionDetailAdmin
						competition={competition.data}
						metadata={competitionMetadata?.data}
					/>

					<AppTabs
						TabListProps={{
							pos: 'sticky',
							top: HEADER_HEIGHT + 35,
							w: '100%',
							style: {
								backdropFilter: 'blur(20px)',
							},
							grow: true,
							display: 'flex',
							justify: 'space-evenly',
						}}
						tabs={[
							{
								value: 'info',
								label: 'Info',
								element: (
									<CompetitionDetailInfo
										links={competitionMetadata?.data.competitionLinks}
										competition={competition.data}
										competitionCategories={competitionCategories?.data ?? []}
									/>
								),
							},
							{
								value: 'Registration',
								label: 'Registration',
								element: (
									<CompetitionDetailRegistration
										competition={competition.data}
										competitionCategories={competitionCategories?.data ?? []}
									/>
								),
							},

							{
								value: 'Competitors',
								label: 'Competitors',
								element: (
									<CompetitionDetailCompetitors
										competition={competition.data}
										competitionCategories={competitionCategories?.data ?? []}
									/>
								),
							},
						].filter((el) =>
							authStore.isAuthenticated ? true : el.value !== 'Registration',
						)}
					/>
				</LayoutPage>
			</Flex>
		</LayoutPage>
	);
}
