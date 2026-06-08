import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { AppSlug } from '@/constants';

const loaders: Record<
	AppSlug,
	() => Promise<{ default: ComponentType }>
> = {
	'weigh-in': () => import('../weigh-in/weigh-in'),
	'judo-timer': () => import('../judo-timer/judo-timer'),
	'matches-board': () => import('../matches-board/matches-board'),
	'tournament-admin': () => import('../tournament-admin/tournament-admin'),
};

export const appComponents = Object.fromEntries(
	Object.entries(loaders).map(([slug, load]) => [slug, lazy(load)]),
) as Record<AppSlug, LazyExoticComponent<ComponentType>>;

export function isAppSlug(slug: string | undefined): slug is AppSlug {
	return slug !== undefined && slug in appComponents;
}
