export type CompetitorSide = 'white' | 'blue';

// export type ScoreType = 'ippon' | 'wazaAri' | 'yuko' | 'shido';
export enum ScoreType {
	Ippon = 'ippon',
	WazaAri = 'wazaAri',
	Yuko = 'yuko',
	Shido = 'shido',
}

export type FighterConfig = {
	countryCode: string;
	firstName: string;
	lastName: string;
	clubName: string;
};

export type CompetitorScore = FighterConfig & {
	ippon: number;
	wazaAri: number;
	yuko: number;
	shido: number;
};

export type TatamiConfig = {
	tatami: number;
	matchDurationSeconds: number;
	white: FighterConfig;
	blue: FighterConfig;
};

export type JudoTimerPhase = 'setup' | 'ready' | 'running' | 'paused' | 'ended';

export type JudoTimerState = {
	config: TatamiConfig | null;
	phase: JudoTimerPhase;
	mainTimeRemaining: number;
	osaekomiActive: boolean;
	osaekomiSide: CompetitorSide | null;
	osaekomiElapsed: number;
	white: CompetitorScore;
	blue: CompetitorScore;
};

export function formatFighterName(fighter: FighterConfig): string {
	return [fighter.firstName, fighter.lastName].filter(Boolean).join(' ');
}
