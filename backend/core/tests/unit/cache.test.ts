import { describe, it, expect, vi } from "vitest"
import { createCache } from "../../src/app/utils/cache"

const TEST_KEY = "test"

describe("utils/cache.ts", () => {
    it("must save to cache", () => {
        const { cache } = createCache<string>()

        cache.set(TEST_KEY, "value")
        expect(cache.get(TEST_KEY)).toBe("value")
    })


    it("must fetch from cache, instead of getter function", async () => {
        const mock = vi.fn(() => "test")

        const { withCache } = createCache<string>()
        await withCache(TEST_KEY, mock)
        await withCache(TEST_KEY, mock)

        expect(mock).toBeCalledTimes(1)

    })
})