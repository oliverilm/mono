import { Flex, Grid, Image, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Api } from '../../../api';
import { getRandomTestClubImage } from '../../../constants';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { ThemePaper } from '../../shared/theme-paper/ThemePaper';

const span = {
	xl: 4,
	lg: 4,
	md: 6,
	sm: 6,
	xs: 12,
};

export function ClubList() {
	const { data: clubs } = useQuery({
		queryKey: [StaticQueryKey.HomeClubs],
		queryFn: () => Api.publicApi.club.getPublicClubs({ skip: 0, take: 25 }),
	});

	return (
		<Grid>
			{clubs?.data?.map((club) => (
				<Grid.Col key={club.id} span={span}>
					<Link to={`/clubs/${club.slug}`}>
						<ThemePaper light={'gray.2'} dark={'dark.4'} p="0">
							<Flex>
								<Flex w={100} h={100} justify={'center'} align={'center'}>
									<Image
										p={'xs'}
										w={100}
										h={100}
										src={getRandomTestClubImage()}
									/>
								</Flex>
								<Flex p={'sm'}>
									<Title size="h3">{club.name}</Title>
								</Flex>
							</Flex>
						</ThemePaper>
					</Link>
				</Grid.Col>
			))}
		</Grid>
	);
}
