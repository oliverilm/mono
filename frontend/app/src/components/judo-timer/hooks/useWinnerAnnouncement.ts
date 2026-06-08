import { useCallback, useEffect, useState } from 'react';
import { useKeyboardShortcut } from '@hooks/useKeyboardShortcut';
import type { JudoTimerState } from '../types';
import { type MatchResult, determineMatchResult } from '../utils/matchResult';

export function useWinnerAnnouncement(
	state: JudoTimerState,
	onPrepareNextMatch: () => void,
) {
	const [result, setResult] = useState<MatchResult | null>(null);

	useEffect(() => {
		if (state.phase !== 'ended') {
			setResult(null);
		}
	}, [state.phase]);

	useKeyboardShortcut({
		key: 'Enter',
		enabled: state.phase === 'ended' && result === null,
		ignoreTypingTargets: false,
		onPress: () => setResult(determineMatchResult(state)),
	});

	const dismiss = useCallback(() => {
		setResult(null);
		onPrepareNextMatch();
	}, [onPrepareNextMatch]);

	const pendingAnnouncement = state.phase === 'ended' && result === null;

	return { result, dismiss, pendingAnnouncement };
}
