import { WAZA_ARI_FOR_IPPON } from '../constants';
import type { CompetitorScore, ScoreType } from '../types';

export const MAX_IPPON = 1;

export function hasIpponOnBoard(
	white: CompetitorScore,
	blue: CompetitorScore,
): boolean {
	return white.ippon >= 1 || blue.ippon >= 1;
}

export function getScoreMax(scoreType: ScoreType): number | null {
	switch (scoreType) {
		case 'ippon':
			return MAX_IPPON;
		case 'wazaAri':
			return WAZA_ARI_FOR_IPPON;
		default:
			return null;
	}
}

export function canAwardScore(
	white: CompetitorScore,
	blue: CompetitorScore,
	competitor: CompetitorScore,
	scoreType: ScoreType,
): boolean {
	if (hasIpponOnBoard(white, blue)) return false;
	const max = getScoreMax(scoreType);
	if (max === null) return true;
	return competitor[scoreType] < max;
}

export function isScoreAtLimit(
	white: CompetitorScore,
	blue: CompetitorScore,
	competitor: CompetitorScore,
	scoreType: ScoreType,
): boolean {
	return !canAwardScore(white, blue, competitor, scoreType);
}
