import { LRUCache } from 'lru-cache';

// todo: simplify this for usage
export async function withCache<T extends {}>(
	cache: LRUCache<string, T>,
	key: string,
	value: T,
): Promise<T> {
	const cachedValue = cache.get(key);
	if (cachedValue) {
		console.log(`CACHED: ${key}`);
		return cachedValue;
	}

	const awaited = await value;
	console.log(`AWAITED: ${key}`);
	cache.set(key, awaited);
	return awaited;
}

export const createCache = <T extends {}>(
	opts: Partial<LRUCache.Options<string, T, unknown>> = {},
) => {
	const cache = new LRUCache<string, T>({
		max: 500,
		ttl: 1_000_000_000,
		...opts,
	});

	return {
		cache,
		withCache: async (key: string, getter: () => T | Promise<T>) => {
			let cachedValue = cache.get(key);

			if (!cachedValue) {
				cachedValue = await getter();
				cache.set(key, cachedValue);
				return cachedValue;
			}

			return cachedValue;
		},
	};
};
