import { useQuery } from 'react-query';
import { ClubAPI } from '../../../api/common';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { Flex, Grid, Image, Paper, Title } from '@mantine/core';
import { getRandomTestClubImage } from '../../../constants';
import { useNavigate } from 'react-router-dom';

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
		queryFn: () => ClubAPI.getPublicClubs({ skip: 0, take: 25 }),
	});

	const navigate = useNavigate();

	return (
		<Grid>
			{clubs?.data?.map((club) => (
				<Grid.Col span={span}>
					<Paper
						bg={'gray.2'}
						p="0"
						onClick={() => navigate(`/clubs/${club.slug}`)}
					>
						<Flex>
							<Image p={'xs'} w={100} h={100} src={getRandomTestClubImage()} />
							<Flex p={'sm'}>
								<Title size="h3">{club.name}</Title>
							</Flex>
						</Flex>
					</Paper>
				</Grid.Col>
			))}
		</Grid>
	);
}
