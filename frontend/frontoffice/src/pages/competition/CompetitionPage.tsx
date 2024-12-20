import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import { CompetitionAPI } from '../../api/common';
import { useAuthStore } from '../../stores/auth';
import { Box, Flex } from '@mantine/core';
import { getRandomTestCompetitionImage } from '../../constants';
import { AppTabs } from '../../components/shared/tabs/AppTabs';
import { ImageWithOverlay } from '../../components/shared/image-with-text/ImageWithText';
import { CompetitionImageOverlay } from '../../components/competition/image-overlay/CompetitionImageOverlay';
import { CompetitionDetailInfo } from '../../components/competition/detail/info/CompetitionDetailInfo';
import { CompetitionDetailRegistration } from '../../components/competition/detail/registration/CompetitionDetailRegistration';
import { LayoutPage } from '../layout/page/LayoutPage';
import { StaticQueryKey } from '../../providers/query-provider/keys';
import { CompetitionDetailAdmin } from '../../components/competition/detail/admin/CompetitionDetailAdmin';
import { CompetitionDetailCompetitors } from '../../components/competition/detail/competitors/CompetitionDetailCompetitors';

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
			queryFn: () => CompetitionAPI.getCompetition(slug!),
		},
		{
			queryKey: [
				StaticQueryKey.CompetitionMetadata,
				slug,
				authStore.isAuthenticated,
			],
			queryFn: () => CompetitionAPI.getCompetitionMetadata(slug!),
		},
		{
			queryKey: [StaticQueryKey.CompetitionCategories, slug],
			queryFn: () => CompetitionAPI.getCompetitionCategories(slug!),
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

	return (
		<LayoutPage width="full">
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
									/>
								),
							},

							{
								value: 'Competitors',
								label: 'Competitors',
								element: (
									<CompetitionDetailCompetitors
										competition={competition.data}
									/>
								),
							},
						]}
					/>
				</LayoutPage>
			</Flex>
		</LayoutPage>
	);
}
