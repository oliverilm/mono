import { useQuery } from 'react-query';
import { ClubAPI } from '../../../api/common';
import { StaticQueryKey } from '../../../providers/query-provider/keys';
import { Card, Flex, Image } from '@mantine/core';
import { getRandomTestClubImage, TEST_CLUB_IMAGES } from '../../../constants';

export function ClubList() {
	const { data: clubs } = useQuery({
		queryKey: [StaticQueryKey.HomeClubs],
		queryFn: () => ClubAPI.getPublicClubs({ skip: 0, take: 25 }),
	});

	return (
		<div>
			{clubs?.data?.map((club) => {
				return (
					<Card withBorder w={'auto'}>
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
