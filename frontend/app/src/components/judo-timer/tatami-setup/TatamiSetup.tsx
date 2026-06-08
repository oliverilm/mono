import { useForm } from '@hooks/useForm';
import { Modal } from '@components/shared/modal/Modal';
import {
	COUNTRY_OPTIONS,
	DEFAULT_BLUE_FIGHTER,
	DEFAULT_WHITE_FIGHTER,
	MATCH_DURATION_OPTIONS,
	TATAMI_OPTIONS,
} from '../constants';
import type { TatamiConfig } from '../types';
import { countryCodeToFlag } from '../utils/countryFlag';
import * as styles from './TatamiSetup.css';

type TatamiSetupFormValues = {
	tatami: number;
	matchDurationSeconds: number;
	white: TatamiConfig['white'];
	blue: TatamiConfig['blue'];
};

type TatamiSetupProps = {
	competitionSlug: string;
	initialConfig: TatamiConfig | null;
	onSave: (config: TatamiConfig) => void;
	onCancel?: () => void;
};

function createInitialValues(config: TatamiConfig | null): TatamiSetupFormValues {
	return {
		tatami: config?.tatami ?? 1,
		matchDurationSeconds:
			config?.matchDurationSeconds ?? MATCH_DURATION_OPTIONS[1].seconds,
		white: {
			countryCode: config?.white.countryCode ?? DEFAULT_WHITE_FIGHTER.countryCode,
			firstName: config?.white.firstName ?? DEFAULT_WHITE_FIGHTER.firstName,
			lastName: config?.white.lastName ?? DEFAULT_WHITE_FIGHTER.lastName,
			clubName: config?.white.clubName ?? DEFAULT_WHITE_FIGHTER.clubName,
		},
		blue: {
			countryCode: config?.blue.countryCode ?? DEFAULT_BLUE_FIGHTER.countryCode,
			firstName: config?.blue.firstName ?? DEFAULT_BLUE_FIGHTER.firstName,
			lastName: config?.blue.lastName ?? DEFAULT_BLUE_FIGHTER.lastName,
			clubName: config?.blue.clubName ?? DEFAULT_BLUE_FIGHTER.clubName,
		},
	};
}

export function TatamiSetup({
	competitionSlug,
	initialConfig,
	onSave,
	onCancel,
}: TatamiSetupProps) {
	const { values, setField, handleChange, handleSubmit } = useForm({
		initialValues: createInitialValues(initialConfig),
	});

	const channelId = `${competitionSlug}:tatami:${values.tatami}`;

	return (
		<Modal titleId="setup-title" size="lg" zIndex={50}>
			<h2 id="setup-title" className={styles.title}>
				Tatami setup
			</h2>
			<p className={styles.subtitle}>
				Assign this device to a tatami. Match routing will use this channel
				when socket connections are enabled.
			</p>

			<form className={styles.form} onSubmit={handleSubmit(onSave)}>
				<div className={styles.field}>
					<span className={styles.label}>Tatami</span>
					<div className={styles.tatamiGrid}>
						{TATAMI_OPTIONS.map((option) => (
							<button
								key={option}
								type="button"
								className={
									values.tatami === option
										? styles.tatamiOptionSelected
										: styles.tatamiOption
								}
								onClick={() => setField('tatami', option)}
							>
								{option}
							</button>
						))}
					</div>
				</div>

				<div className={styles.field}>
					<span className={styles.label}>Match duration</span>
					<div className={styles.durationGrid}>
						{MATCH_DURATION_OPTIONS.map((option) => (
							<button
								key={option.seconds}
								type="button"
								className={
									values.matchDurationSeconds === option.seconds
										? styles.durationOptionSelected
										: styles.durationOption
								}
								onClick={() => setField('matchDurationSeconds', option.seconds)}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>

				<fieldset className={styles.fighterFieldset}>
					<legend className={styles.legend}>White competitor</legend>
					<div className={styles.fighterGrid}>
						<select
							className={styles.inputFull}
							value={values.white.countryCode}
							onChange={handleChange('white.countryCode')}
							aria-label="White country"
						>
							{COUNTRY_OPTIONS.map((country) => (
								<option key={country.code} value={country.code}>
									{countryCodeToFlag(country.code)} {country.name}
								</option>
							))}
						</select>
						<input
							className={styles.input}
							value={values.white.firstName}
							onChange={handleChange('white.firstName')}
							placeholder="First name"
							aria-label="White first name"
						/>
						<input
							className={styles.input}
							value={values.white.lastName}
							onChange={handleChange('white.lastName')}
							placeholder="Last name"
							aria-label="White last name"
						/>
						<input
							className={styles.inputFull}
							value={values.white.clubName}
							onChange={handleChange('white.clubName')}
							placeholder="Club name"
							aria-label="White club"
						/>
					</div>
				</fieldset>

				<fieldset className={styles.fighterFieldset}>
					<legend className={styles.legend}>Blue competitor</legend>
					<div className={styles.fighterGrid}>
						<select
							className={styles.inputFull}
							value={values.blue.countryCode}
							onChange={handleChange('blue.countryCode')}
							aria-label="Blue country"
						>
							{COUNTRY_OPTIONS.map((country) => (
								<option key={country.code} value={country.code}>
									{countryCodeToFlag(country.code)} {country.name}
								</option>
							))}
						</select>
						<input
							className={styles.input}
							value={values.blue.firstName}
							onChange={handleChange('blue.firstName')}
							placeholder="First name"
							aria-label="Blue first name"
						/>
						<input
							className={styles.input}
							value={values.blue.lastName}
							onChange={handleChange('blue.lastName')}
							placeholder="Last name"
							aria-label="Blue last name"
						/>
						<input
							className={styles.inputFull}
							value={values.blue.clubName}
							onChange={handleChange('blue.clubName')}
							placeholder="Club name"
							aria-label="Blue club"
						/>
					</div>
				</fieldset>

				<p className={styles.channelHint}>
					Socket channel preview:{' '}
					<code className={styles.channelCode}>{channelId}</code>
				</p>

				<div className={styles.actions}>
					{onCancel ? (
						<button
							className={styles.cancelButton}
							type="button"
							onClick={onCancel}
						>
							Cancel
						</button>
					) : null}
					<button className={styles.submitButton} type="submit">
						Save &amp; continue
					</button>
				</div>
			</form>
		</Modal>
	);
}
