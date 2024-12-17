export function slugifyString(str: string): string {
	return (
		str
			.toLowerCase()
			.match(/[a-zA-Z0-9 ]/g)
			?.join('')
			.split(' ')
			.join('-') ?? ''
	);
}

export function capitalizeFirstLetter(str: string) {
	if (str.length === 0) return str; // Check if the string is empty
	return str.charAt(0).toUpperCase() + str.slice(1);
}
