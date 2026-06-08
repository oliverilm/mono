import {
	SHIDO_HANSOKU_MAKE,
	WAZA_ARI_FOR_IPPON,
} from '../constants';
import type {
	CompetitorScore,
	CompetitorSide,
	JudoTimerState,
} from '../types';

export type MatchEndReason = 'ippon' | 'wazaAri' | 'hansokuMake' | 'time';

export type MatchResult = {
	winner: CompetitorSide | null;
	reason: MatchEndReason;
};

function compareByScore(
	white: CompetitorScore,
	blue: CompetitorScore,
): CompetitorSide | null {
	if (white.ippon !== blue.ippon) {
		return white.ippon > blue.ippon ? 'white' : 'blue';
	}
	if (white.wazaAri !== blue.wazaAri) {
		return white.wazaAri > blue.wazaAri ? 'white' : 'blue';
	}
	if (white.yuko !== blue.yuko) {
		return white.yuko > blue.yuko ? 'white' : 'blue';
	}
	if (white.shido !== blue.shido) {
		return white.shido < blue.shido ? 'white' : 'blue';
	}
	return null;
}

export function determineMatchResult(state: JudoTimerState): MatchResult {
	const { white, blue } = state;

	if (white.ippon >= 1) {
		return { winner: 'white', reason: 'ippon' };
	}
	if (blue.ippon >= 1) {
		return { winner: 'blue', reason: 'ippon' };
	}
	if (white.wazaAri >= WAZA_ARI_FOR_IPPON) {
		return { winner: 'white', reason: 'wazaAri' };
	}
	if (blue.wazaAri >= WAZA_ARI_FOR_IPPON) {
		return { winner: 'blue', reason: 'wazaAri' };
	}
	if (white.shido >= SHIDO_HANSOKU_MAKE) {
		return { winner: 'blue', reason: 'hansokuMake' };
	}
	if (blue.shido >= SHIDO_HANSOKU_MAKE) {
		return { winner: 'white', reason: 'hansokuMake' };
	}

	return { winner: compareByScore(white, blue), reason: 'time' };
}

export function matchResultLabel(result: MatchResult): string {
	switch (result.reason) {
		case 'ippon':
			return 'Ippon';
		case 'wazaAri':
			return 'Waza-ari';
		case 'hansokuMake':
			return 'Hansoku-make';
		case 'time':
			return result.winner ? 'Time — wins on score' : 'Time — draw';
	}
}
