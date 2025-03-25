import { Carousel } from '@mantine/carousel';
import { useMatches } from '@mantine/core';
import { useQuery } from 'react-query';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { CompetitionCarouselCard } from './card/CompetitionCarouselCard';
import { Api } from '../../../api';

export function CompetitionCarousel() {
	const { data: competitions } = useQuery({
		queryKey: [StaticQueryKey.HomeCompetitions],
		queryFn: () => Api.competition.getPublicCompetitions({ skip: 0, take: 25 }),
	});

	const slideSize = useMatches({
		lg: 3,
		md: 2,
		sm: 2,
		xs: 1,
		base: 1,
	});

	// TODO: instead of null, maybe return some sort of disclaimer
	if (competitions?.data.length === 0) return null;

	return (
		<Carousel
			slideSize={`${(1 / slideSize) * 100}%`}
			slideGap="md"
			includeGapInSize
			align="start"
			withIndicators
			slidesToScroll={slideSize}
		>
			{(competitions?.data ?? []).map((competition) => (
				<CompetitionCarouselCard
					key={competition.name}
					competition={competition}
				/>
			))}
		</Carousel>
	);
}
