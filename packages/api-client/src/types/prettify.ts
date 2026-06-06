/**
 * Expands type aliases in IntelliSense hovers so consumers see field shapes
 * instead of opaque alias names like `AuthenticationResponse`.
 */
export type PrettifyDeep<T> = T extends readonly (infer Item)[]
	? readonly PrettifyDeep<Item>[]
	: T extends object
		? { [K in keyof T]: PrettifyDeep<T[K]> } & {}
		: T;
