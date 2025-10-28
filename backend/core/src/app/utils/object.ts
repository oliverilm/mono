import type { SkipTake } from '@monorepo/utils';

export function exclude<T extends Record<string, unknown>, Key extends keyof T>(
	user: T,
	keys: Key[],
): Omit<T, Key> {
	return Object.fromEntries(
		Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
	) as Omit<T, Key>;
}

export function convertSkipTake(skipTake: SkipTake): {
	skip: number;
	take: number;
} {
	return {
		skip: Number(skipTake?.skip ?? 0),
		take: Number(skipTake?.take ?? 10),
	};
}
