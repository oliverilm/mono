export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	return Object.fromEntries(
		Object.entries(obj as Record<string, unknown>).filter(
			([key]) => !keys.includes(key as K),
		),
	) as Omit<T, K>;
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	return Object.fromEntries(
		Object.entries(obj as Record<string, unknown>).filter(([key]) =>
			keys.includes(key as K),
		),
	) as Pick<T, K>;
}
