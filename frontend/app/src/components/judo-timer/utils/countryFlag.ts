export function countryCodeToFlag(code: string): string {
	const normalized = code.trim().toUpperCase();
	if (!/^[A-Z]{2}$/.test(normalized)) return '';

	return String.fromCodePoint(
		...normalized.split('').map((char) => 127397 + char.charCodeAt(0)),
	);
}

export function getCountryLabel(
	code: string,
	options: readonly { code: string; name: string }[],
): string {
	const match = options.find((option) => option.code === code.toUpperCase());
	return match?.name ?? code.toUpperCase();
}
