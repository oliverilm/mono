export const TATAMI_OPTIONS = Array.from({ length: 12 }, (_, index) => index + 1);

export const MATCH_DURATION_OPTIONS = [
	{ label: '3:00', seconds: 180 },
	{ label: '4:00', seconds: 240 },
	{ label: '5:00', seconds: 300 },
] as const;

export const OSAEKOMI_WAZA_ARI_AT = 10;
export const OSAEKOMI_IPPON_AT = 20;
export const SHIDO_HANSOKU_MAKE = 3;
export const WAZA_ARI_FOR_IPPON = 2;

export const COUNTRY_OPTIONS = [
	{ code: 'JP', name: 'Japan' },
	{ code: 'IT', name: 'Italy' },
	{ code: 'FR', name: 'France' },
	{ code: 'DE', name: 'Germany' },
	{ code: 'GB', name: 'Great Britain' },
	{ code: 'US', name: 'United States' },
	{ code: 'BR', name: 'Brazil' },
	{ code: 'KZ', name: 'Kazakhstan' },
	{ code: 'UZ', name: 'Uzbekistan' },
	{ code: 'GE', name: 'Georgia' },
	{ code: 'NL', name: 'Netherlands' },
	{ code: 'ES', name: 'Spain' },
	{ code: 'KR', name: 'South Korea' },
	{ code: 'MN', name: 'Mongolia' },
	{ code: 'IL', name: 'Israel' },
	{ code: 'CA', name: 'Canada' },
	{ code: 'AU', name: 'Australia' },
	{ code: 'CH', name: 'Switzerland' },
	{ code: 'AT', name: 'Austria' },
	{ code: 'BE', name: 'Belgium' },
	{ code: 'PL', name: 'Poland' },
	{ code: 'CZ', name: 'Czechia' },
	{ code: 'HU', name: 'Hungary' },
	{ code: 'RO', name: 'Romania' },
	{ code: 'PT', name: 'Portugal' },
	{ code: 'SE', name: 'Sweden' },
	{ code: 'NO', name: 'Norway' },
	{ code: 'DK', name: 'Denmark' },
	{ code: 'FI', name: 'Finland' },
	{ code: 'TR', name: 'Turkey' },
	{ code: 'AZ', name: 'Azerbaijan' },
	{ code: 'UA', name: 'Ukraine' },
	{ code: 'RU', name: 'Russia' },
	{ code: 'CN', name: 'China' },
	{ code: 'MX', name: 'Mexico' },
	{ code: 'AR', name: 'Argentina' },
] as const;

export const DEFAULT_WHITE_FIGHTER = {
	countryCode: 'JP',
	firstName: 'Yuki',
	lastName: 'Tanaka',
	clubName: 'Tokyo Judo Club',
} as const;

export const DEFAULT_BLUE_FIGHTER = {
	countryCode: 'IT',
	firstName: 'Marco',
	lastName: 'Rossi',
	clubName: 'Ippon Dojo',
} as const;

export function getTimerStorageKey(competitionSlug: string) {
	return `ippon-judo-timer-${competitionSlug}`;
}
