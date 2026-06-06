type DateFormat = 'short' | 'long';

export function formatDisplayName(
	firstName: string | null,
	lastName: string | null,
): string | null {
	const parts = [firstName, lastName].filter(Boolean);
	return parts.length > 0 ? parts.join(' ') : null;
}

export function formatDate(
	iso: string | null,
	format: DateFormat = 'short',
): string | null {
	if (!iso) return null;

	const options: Intl.DateTimeFormatOptions =
		format === 'long'
			? {
					weekday: 'short',
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				}
			: {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				};

	return new Intl.DateTimeFormat(undefined, options).format(new Date(iso));
}

export function formatCompetitionRole(role: 'OWNER' | 'MANAGER'): string {
	return role === 'OWNER' ? 'Owner' : 'Admin';
}
