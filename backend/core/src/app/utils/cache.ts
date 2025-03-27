import type { LRUCache } from "lru-cache";

export async function getSetReturn<T extends {}>(
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