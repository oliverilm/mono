export interface IdObject {
	id: string;
}

export interface SlugObject {
	slug: string;
}

export type SlugOrId = SlugObject | IdObject;
