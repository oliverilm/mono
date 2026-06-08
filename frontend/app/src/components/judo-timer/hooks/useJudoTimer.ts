import { useCallback, useEffect, useReducer, useRef } from 'react';
import {
	DEFAULT_BLUE_FIGHTER,
	DEFAULT_WHITE_FIGHTER,
	MATCH_DURATION_OPTIONS,
	OSAEKOMI_IPPON_AT,
	OSAEKOMI_WAZA_ARI_AT,
	SHIDO_HANSOKU_MAKE,
	WAZA_ARI_FOR_IPPON,
} from '../constants';
import {
	type CompetitorScore,
	type CompetitorSide,
	type FighterConfig,
	type JudoTimerState,
	ScoreType,
	type TatamiConfig,
} from '../types';
import { MAX_IPPON, canAwardScore, hasIpponOnBoard } from '../utils/scoreLimits';

type Action =
	| { type: 'LOAD_CONFIG'; config: TatamiConfig }
	| { type: 'OPEN_SETUP' }
	| { type: 'CANCEL_SETUP' }
	| { type: 'TICK_MAIN' }
	| { type: 'TICK_OSAEKOMI' }
	| { type: 'START' }
	| { type: 'PAUSE' }
	| { type: 'RESET_MATCH' }
	| { type: 'AWARD_SCORE'; side: CompetitorSide; scoreType: ScoreType }
	| { type: 'REMOVE_SCORE'; side: CompetitorSide; scoreType: ScoreType }
	| { type: 'START_OSAEKOMI'; side: CompetitorSide }
	| { type: 'STOP_OSAEKOMI' };

const defaultDuration = MATCH_DURATION_OPTIONS[1].seconds;

function createCompetitor(fighter: FighterConfig): CompetitorScore {
	return {
		...fighter,
		ippon: 0,
		wazaAri: 0,
		yuko: 0,
		shido: 0,
	};
}

function initialState(config: TatamiConfig | null): JudoTimerState {
	const duration = config?.matchDurationSeconds ?? defaultDuration;
	return {
		config,
		phase: config ? 'ready' : 'setup',
		mainTimeRemaining: duration,
		osaekomiActive: false,
		osaekomiSide: null,
		osaekomiElapsed: 0,
		white: createCompetitor(config?.white ?? DEFAULT_WHITE_FIGHTER),
		blue: createCompetitor(config?.blue ?? DEFAULT_BLUE_FIGHTER),
	};
}

function isScoreDecidedEnd(state: JudoTimerState): boolean {
	const whiteWins =
		state.white.ippon >= 1 || state.white.wazaAri >= WAZA_ARI_FOR_IPPON;
	const blueWins =
		state.blue.ippon >= 1 || state.blue.wazaAri >= WAZA_ARI_FOR_IPPON;
	const whiteHansoku = state.white.shido >= SHIDO_HANSOKU_MAKE;
	const blueHansoku = state.blue.shido >= SHIDO_HANSOKU_MAKE;
	return whiteWins || blueWins || whiteHansoku || blueHansoku;
}

function applyScoreEnd(state: JudoTimerState): JudoTimerState {
	if (isScoreDecidedEnd(state)) {
		return {
			...state,
			phase: 'ended',
			osaekomiActive: false,
			osaekomiSide: null,
			osaekomiElapsed: 0,
		};
	}
	return state;
}

function reconcileAfterScoreRemoval(state: JudoTimerState): JudoTimerState {
	if (state.phase !== 'ended') return state;
	if (state.mainTimeRemaining === 0) return state;
	if (isScoreDecidedEnd(state)) return state;
	return clearOsaekomi({ ...state, phase: 'paused' });
}

function applyWazaAriConversion(competitor: CompetitorScore): CompetitorScore {
	if (competitor.wazaAri >= WAZA_ARI_FOR_IPPON) {
		return { ...competitor, wazaAri: 0, ippon: MAX_IPPON };
	}
	return competitor;
}

function awardScore(
	state: JudoTimerState,
	side: CompetitorSide,
	scoreType: ScoreType,
): CompetitorScore | null {
	const competitor = side === 'white' ? state.white : state.blue;
	if (!canAwardScore(state.white, state.blue, competitor, scoreType)) {
		return null;
	}

	let updated: CompetitorScore = {
		...competitor,
		[scoreType]: competitor[scoreType] + 1,
	};

	if (scoreType === 'wazaAri') {
		updated = applyWazaAriConversion(updated);
	}

	return updated;
}

function clearOsaekomi(state: JudoTimerState): JudoTimerState {
	return {
		...state,
		osaekomiActive: false,
		osaekomiSide: null,
		osaekomiElapsed: 0,
	};
}

function applyOsaekomiTick(state: JudoTimerState): JudoTimerState {
	if (!state.osaekomiActive || !state.osaekomiSide) return state;

	const side = state.osaekomiSide;
	const previous = state.osaekomiElapsed;
	const elapsed = previous + 0.1;

	if (elapsed >= OSAEKOMI_IPPON_AT) {
		return updateSideScore({ ...state, osaekomiElapsed: elapsed }, side, ScoreType.Ippon);
	}

	const crossedWazaAri =
		previous < OSAEKOMI_WAZA_ARI_AT && elapsed >= OSAEKOMI_WAZA_ARI_AT;

	if (crossedWazaAri) {
		const next = updateSideScore({ ...state, osaekomiElapsed: elapsed }, side, ScoreType.WazaAri as ScoreType);
		if (next.phase === 'ended') {
			return clearOsaekomi(next);
		}
		return next;
	}

	return { ...state, osaekomiElapsed: elapsed };
}

function removeScore(
	competitor: CompetitorScore,
	scoreType: ScoreType,
): CompetitorScore {
	return {
		...competitor,
		[scoreType]: Math.max(0, competitor[scoreType] - 1),
	};
}

function updateSideScoreRemove(
	state: JudoTimerState,
	side: CompetitorSide,
	scoreType: ScoreType,
): JudoTimerState {
	if (side === 'white') {
		if (state.white[scoreType] <= 0) return state;
		return reconcileAfterScoreRemoval({
			...state,
			white: removeScore(state.white, scoreType),
		});
	}
	if (state.blue[scoreType] <= 0) return state;
	return reconcileAfterScoreRemoval({
		...state,
		blue: removeScore(state.blue, scoreType),
	});
}

function updateSideScore(
	state: JudoTimerState,
	side: CompetitorSide,
	scoreType: ScoreType,
): JudoTimerState {
	const updated = awardScore(state, side, scoreType);
	if (!updated) return state;

	const next =
		side === 'white'
			? { ...state, white: updated }
			: { ...state, blue: updated };
	return applyScoreEnd(next);
}

function reducer(state: JudoTimerState, action: Action): JudoTimerState {
	switch (action.type) {
		case 'LOAD_CONFIG':
			return initialState(action.config);
		case 'OPEN_SETUP':
			return { ...state, phase: 'setup' };
		case 'CANCEL_SETUP':
			return state.config ? { ...state, phase: 'ready' } : state;
		case 'TICK_MAIN': {
			if (state.phase !== 'running') return state;
			const next = Math.max(0, state.mainTimeRemaining - 1);
			if (next === 0) {
				return {
					...state,
					mainTimeRemaining: 0,
					phase: 'ended',
					osaekomiActive: false,
					osaekomiSide: null,
					osaekomiElapsed: 0,
				};
			}
			return { ...state, mainTimeRemaining: next };
		}
		case 'TICK_OSAEKOMI':
			return applyOsaekomiTick(state);
		case 'START':
			return { ...state, phase: 'running' };
		case 'PAUSE':
			return clearOsaekomi({ ...state, phase: 'paused' });
		case 'RESET_MATCH': {
			const duration = state.config?.matchDurationSeconds ?? defaultDuration;
			return {
				...state,
				phase: 'ready',
				mainTimeRemaining: duration,
				osaekomiActive: false,
				osaekomiSide: null,
				osaekomiElapsed: 0,
				white: createCompetitor(state.config?.white ?? DEFAULT_WHITE_FIGHTER),
				blue: createCompetitor(state.config?.blue ?? DEFAULT_BLUE_FIGHTER),
			};
		}
		case 'AWARD_SCORE':
			return updateSideScore(state, action.side, action.scoreType);
		case 'REMOVE_SCORE':
			return updateSideScoreRemove(state, action.side, action.scoreType);
		case 'START_OSAEKOMI':
			if (state.phase !== 'running') return state;
			if (hasIpponOnBoard(state.white, state.blue)) return state;
			return {
				...state,
				osaekomiActive: true,
				osaekomiSide: action.side,
				osaekomiElapsed: 0,
			};
		case 'STOP_OSAEKOMI':
			return clearOsaekomi(state);
		default:
			return state;
	}
}

export function useJudoTimer(initialConfig: TatamiConfig | null) {
	const [state, dispatch] = useReducer(reducer, initialConfig, initialState);
	const mainIntervalRef = useRef<number | null>(null);
	const osaekomiIntervalRef = useRef<number | null>(null);

	const loadConfig = useCallback((config: TatamiConfig) => {
		dispatch({ type: 'LOAD_CONFIG', config });
	}, []);

	const openSetup = useCallback(() => dispatch({ type: 'OPEN_SETUP' }), []);
	const cancelSetup = useCallback(() => dispatch({ type: 'CANCEL_SETUP' }), []);
	const start = useCallback(() => dispatch({ type: 'START' }), []);
	const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
	const resetMatch = useCallback(() => dispatch({ type: 'RESET_MATCH' }), []);
	const awardScoreTo = useCallback(
		(side: CompetitorSide, scoreType: ScoreType) =>
			dispatch({ type: 'AWARD_SCORE', side, scoreType }),
		[],
	);
	const removeScoreFrom = useCallback(
		(side: CompetitorSide, scoreType: ScoreType) =>
			dispatch({ type: 'REMOVE_SCORE', side, scoreType }),
		[],
	);
	const startOsaekomi = useCallback(
		(side: CompetitorSide) => dispatch({ type: 'START_OSAEKOMI', side }),
		[],
	);
	const stopOsaekomi = useCallback(() => dispatch({ type: 'STOP_OSAEKOMI' }), []);

	useEffect(() => {
		if (state.phase === 'running') {
			mainIntervalRef.current = window.setInterval(() => {
				dispatch({ type: 'TICK_MAIN' });
			}, 1000);
		} else if (mainIntervalRef.current !== null) {
			window.clearInterval(mainIntervalRef.current);
			mainIntervalRef.current = null;
		}

		return () => {
			if (mainIntervalRef.current !== null) {
				window.clearInterval(mainIntervalRef.current);
			}
		};
	}, [state.phase]);

	useEffect(() => {
		if (state.osaekomiActive) {
			osaekomiIntervalRef.current = window.setInterval(() => {
				dispatch({ type: 'TICK_OSAEKOMI' });
			}, 100);
		} else if (osaekomiIntervalRef.current !== null) {
			window.clearInterval(osaekomiIntervalRef.current);
			osaekomiIntervalRef.current = null;
		}

		return () => {
			if (osaekomiIntervalRef.current !== null) {
				window.clearInterval(osaekomiIntervalRef.current);
			}
		};
	}, [state.osaekomiActive]);

	return {
		state,
		loadConfig,
		openSetup,
		cancelSetup,
		start,
		pause,
		resetMatch,
		awardScoreTo,
		removeScoreFrom,
		startOsaekomi,
		stopOsaekomi,
	};
}
