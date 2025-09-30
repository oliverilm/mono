import { LRUCache } from 'lru-cache';
import { hours } from './time';

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
	opts?: Partial<LRUCache.Options<string, T, unknown>>,
) => {
	const cache = new LRUCache<string, T>({
		max: 500,
		ttl: hours(24),
		...opts,
	});

	return {
		set: cache.set,
		get: cache.get,
		withCache: async (key: string, value: T | Promise<T>) => {
			const cachedValue = cache.get(key);
			if (cachedValue) {
				console.log(`CACHED: ${key}`);
				return cachedValue;
			}

			const awaited = await value;
			console.log(`AWAITED: ${key}`);
			cache.set(key, awaited);
			return awaited;
		},
	};
};
