import { useQuery } from "react-query";
import { ClubAPI } from "../../../api/common";
import { StaticQueryKey } from "../../../providers/query-provider/keys";


export function ClubList() {
	const {data: clubs} = useQuery({
	    queryKey: [StaticQueryKey.HomeClubs],
	    queryFn: () => ClubAPI.getPublicClubs({skip: 0, take: 25})
	})

	return (
		<div>
			{clubs?.data?.map((club) => {
				return (
					<div key={club.id}>
						<h1>{club.name}</h1>
					</div>
				)
			})}
		</div>
	)
}
