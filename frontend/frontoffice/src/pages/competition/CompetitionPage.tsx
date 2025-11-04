import { Badge, Box, Container, Group, Stack, Text } from '@mantine/core';
import { IconFileOff, IconTrophy } from '@tabler/icons-react';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import { Api } from '../../api';
import { getCompetitionBannerColorAndStatus } from '../../components/competition/carousel/card/CompetitionCarouselCard.utils';
import { CompetitionDetailAdmin } from '../../components/competition/detail/admin/CompetitionDetailAdmin';
import { CompetitionDetailCompetitors } from '../../components/competition/detail/competitors/CompetitionDetailCompetitors';
import { CompetitionDetailInfo } from '../../components/competition/detail/info/CompetitionDetailInfo';
import { CompetitionDetailRegistration } from '../../components/competition/detail/registration/CompetitionDetailRegistration';
import { CompetitionImageOverlay } from '../../components/competition/image-overlay/CompetitionImageOverlay';
import { EmptyState } from '../../components/shared/empty-state/EmptyState';
import { ImageWithOverlay } from '../../components/shared/image-with-text/ImageWithText';
import { LoadingState } from '../../components/shared/loading-state/LoadingState';
import { AppTabs } from '../../components/shared/tabs/AppTabs';
import { HEADER_HEIGHT, getRandomTestCompetitionImage } from '../../constants';
import { StaticQueryKey } from '../../providers/query-provider/keys';
import { useAuthStore } from '../../stores/auth';
import { LayoutPage } from '../layout/page/LayoutPage';

export function CompetitionPage() {
	const { slug } = useParams<'slug'>();
	const authStore = useAuthStore();

	const [
		{ data: competition, isLoading: isLoadingCompetition },
		{ data: competitionMetadata, isLoading: isLoadingMetadata },
		{ data: competitionCategories, isLoading: isLoadingCategories },
	] = useQueries([
		{
			queryKey: [StaticQueryKey.CompetitionDetail, slug],
			queryFn: () => Api.publicApi.competition.getCompetition(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [
				StaticQueryKey.CompetitionMetadata,
				slug,
				authStore.isAuthenticated,
			],
			queryFn: () => Api.publicApi.competition.getCompetitionMetadata(slug),
			enabled: Boolean(slug),
		},
		{
			queryKey: [StaticQueryKey.CompetitionCategories, slug],
			queryFn: () => Api.publicApi.competition.getCompetitionCategories(slug),
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchInterval: false,
			enabled: Boolean(slug),
		},
	]);

	const isLoading =
		isLoadingCompetition || isLoadingMetadata || isLoadingCategories;

	if (isLoading) {
		return (
			<LoadingState
				message="Loading competition details..."
				size="lg"
				useThemePaper
				withContainer
			/>
		);
	}

	if (!slug || !competition?.data) {
		return (
			<Container size="lg" py="xl">
				<EmptyState
					title="Competition Not Found"
					description="The competition you're looking for doesn't exist or has been removed."
					icon={IconFileOff}
					iconSize={64}
				/>
			</Container>
		);
	}

	const { text, bg } = getCompetitionBannerColorAndStatus(competition.data);
	const statusColor = competition.data.isPublished ? 'green' : 'gray';

	return (
		<LayoutPage width="full" pos="relative">
			{/* Status Banner */}
			<Box
				bg={bg}
				pos="sticky"
				top={HEADER_HEIGHT}
				w="100%"
				p="xs"
				style={{ zIndex: 2 }}
			>
				<Container size="lg">
					<Stack gap={4} align="center">
						<Group gap="xs" align="center">
							<IconTrophy size={18} color="white" />
							<Text c="white" fw={600} size="sm">
								{text}
							</Text>
							<Badge color={statusColor} variant="filled" size="sm" radius="md">
								{competition.data.isPublished ? 'Published' : 'Draft'}
							</Badge>
						</Group>
					</Stack>
				</Container>
			</Box>

			{/* Hero Image */}
			<Box pos="relative" w="100%">
				<ImageWithOverlay
					src={getRandomTestCompetitionImage()}
					imageHeight={500}
					imageWidth="100%"
					overlay={<CompetitionImageOverlay competition={competition.data} />}
				/>
			</Box>

			{/* Content */}
			<LayoutPage width="default">
				<Stack gap="xl">
					{/* Admin Panel */}
					<CompetitionDetailAdmin
						competition={competition.data}
						metadata={competitionMetadata?.data}
					/>

					{/* Tabs */}
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
				</Stack>
			</LayoutPage>
		</LayoutPage>
	);
}
