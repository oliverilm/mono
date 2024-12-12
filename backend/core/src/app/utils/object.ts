import { SkipTake } from "./types";

export function exclude<T extends Record<string, unknown>, Key extends keyof T>(
    user: T,
    keys: Key[]
  ): Omit<T, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key ]) => !keys.includes(key as Key))
    ) as Omit<T, Key>
  }
  
export function convertSkipTake({skip, take}: SkipTake): {skip: number, take: number} {
  return {
    skip: Number(skip),
    take: Number(take)
  }
}