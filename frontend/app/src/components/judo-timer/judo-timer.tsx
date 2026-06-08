import { useParams } from 'react-router-dom';
import {
	DEFAULT_BLUE_FIGHTER,
	DEFAULT_WHITE_FIGHTER,
	getTimerStorageKey,
} from './constants';
import { JudoTimerBoard } from './JudoTimerBoard';
import type { FighterConfig, TatamiConfig } from './types';

type LegacyStoredConfig = {
	tatami?: number;
	matchDurationSeconds?: number;
	whiteName?: string;
	blueName?: string;
	white?: Partial<FighterConfig>;
	blue?: Partial<FighterConfig>;
};

function parseLegacyName(fullName: string): Pick<FighterConfig, 'firstName' | 'lastName'> {
	const trimmed = fullName.trim();
	if (!trimmed) return { firstName: '', lastName: '' };
	const spaceIndex = trimmed.indexOf(' ');
	if (spaceIndex === -1) return { firstName: '', lastName: trimmed };
	return {
		firstName: trimmed.slice(0, spaceIndex),
		lastName: trimmed.slice(spaceIndex + 1),
	};
}

function normalizeFighter(
	partial: Partial<FighterConfig> | undefined,
	legacyName: string | undefined,
	defaults: FighterConfig,
): FighterConfig {
	if (partial?.firstName || partial?.lastName || partial?.clubName || partial?.countryCode) {
		return {
			countryCode: partial.countryCode ?? defaults.countryCode,
			firstName: partial.firstName ?? defaults.firstName,
			lastName: partial.lastName ?? defaults.lastName,
			clubName: partial.clubName ?? defaults.clubName,
		};
	}
	if (legacyName) {
		return {
			...parseLegacyName(legacyName),
			countryCode: defaults.countryCode,
			clubName: defaults.clubName,
		};
	}
	return defaults;
}

function normalizeStoredConfig(raw: LegacyStoredConfig): TatamiConfig | null {
	if (typeof raw.tatami !== 'number' || typeof raw.matchDurationSeconds !== 'number') {
		return null;
	}

	return {
		tatami: raw.tatami,
		matchDurationSeconds: raw.matchDurationSeconds,
		white: normalizeFighter(raw.white, raw.whiteName, DEFAULT_WHITE_FIGHTER),
		blue: normalizeFighter(raw.blue, raw.blueName, DEFAULT_BLUE_FIGHTER),
	};
}

function readStoredConfig(competitionSlug: string): TatamiConfig | null {
	try {
		const raw = localStorage.getItem(getTimerStorageKey(competitionSlug));
		if (!raw) return null;
		const parsed = JSON.parse(raw) as LegacyStoredConfig;
		return normalizeStoredConfig(parsed);
	} catch {
		return null;
	}
}

export default function JudoTimerApp() {
	const { competitionSlug } = useParams<{ competitionSlug: string }>();
	const storageKey = competitionSlug ?? 'default';
	const initialConfig = readStoredConfig(storageKey);

	const handleSaveConfig = (config: TatamiConfig) => {
		localStorage.setItem(getTimerStorageKey(storageKey), JSON.stringify(config));
	};

	return (
		<JudoTimerBoard
			key={storageKey}
			initialConfig={initialConfig}
			onSaveConfig={handleSaveConfig}
		/>
	);
}
