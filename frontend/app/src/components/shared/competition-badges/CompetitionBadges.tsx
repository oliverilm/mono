import type { ManagedCompetition } from '@mocks/managedCompetitions';
import { formatCompetitionRole } from '@utils/format';
import { Badge, BadgeGroup } from '../badge/Badge';

type CompetitionBadgesProps = {
	role: ManagedCompetition['role'];
	isPublished: boolean;
	isArchived: boolean;
	showPublished?: boolean;
};

export function CompetitionBadges({
	role,
	isPublished,
	isArchived,
	showPublished = false,
}: CompetitionBadgesProps) {
	return (
		<BadgeGroup>
			<Badge variant="role">{formatCompetitionRole(role)}</Badge>
			{!isPublished ? (
				<Badge variant="draft">Draft</Badge>
			) : showPublished ? (
				<Badge variant="published">Published</Badge>
			) : null}
			{isArchived ? <Badge variant="archived">Archived</Badge> : null}
		</BadgeGroup>
	);
}
