import { useQuery } from 'react-query';
import { ClubAPI } from '../../../api/common';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { Card, Flex, Image } from '@mantine/core';
import { getRandomTestClubImage } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export function ClubList() {
	const { data: clubs } = useQuery({
		queryKey: [StaticQueryKey.HomeClubs],
		queryFn: () => ClubAPI.getPublicClubs({ skip: 0, take: 25 }),
	});

	const navigate = useNavigate();

	return (
		<div>
			{clubs?.data?.map((club) => {
				return (
					<Card
						withBorder
						w={'auto'}
						onClick={() => navigate(`/clubs/${club.slug}`)}
					>
						<Flex>
							<Image w={100} h={100} src={getRandomTestClubImage()} />
							<Card.Section>{club.name}</Card.Section>
						</Flex>
					</Card>
				);
			})}
		</div>
	);
}
