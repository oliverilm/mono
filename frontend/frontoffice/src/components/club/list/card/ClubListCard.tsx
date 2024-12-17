interface Props {
	club: {
		name: string;
	};
}

export function ClubListCard({ club }: Props) {
	return club.name;
}
