import { Icon, type IconName } from '@monorepo/icons';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { theme } from '@styles/theme';
import * as styles from './Input.css';

type FormFieldShellProps = {
	label: string;
	icon: IconName;
	iconColor?: string;
	id?: string;
	children: ReactNode;
};

function FormFieldShell({
	label,
	icon,
	iconColor = theme.color.icon.muted,
	id,
	children,
}: FormFieldShellProps) {
	return (
		<div className={styles.field}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<div className={styles.inputWrapper}>
				<span className={styles.inputIcon}>
					<Icon name={icon} size="s" color={iconColor} />
				</span>
				{children}
			</div>
		</div>
	);
}

type InputProps = {
	label: string;
	icon: IconName;
	iconColor?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
	label,
	icon,
	iconColor,
	id,
	...inputProps
}: InputProps) {
	return (
		<FormFieldShell label={label} icon={icon} iconColor={iconColor} id={id}>
			<input id={id} className={styles.input} {...inputProps} />
		</FormFieldShell>
	);
}

type NumberInputProps = {
	label: string;
	icon?: IconName;
	iconColor?: string;
	value: number | '';
	onChange: (value: number | '') => void;
	min?: number;
	max?: number;
	step?: number;
} & Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type' | 'value' | 'onChange' | 'min' | 'max' | 'step'
>;

export function NumberInput({
	label,
	icon = 'sortAsc',
	iconColor,
	id,
	value,
	onChange,
	min,
	max,
	step = 1,
	...inputProps
}: NumberInputProps) {
	return (
		<FormFieldShell label={label} icon={icon} iconColor={iconColor} id={id}>
			<input
				id={id}
				className={styles.numberInput}
				type="number"
				value={value}
				min={min}
				max={max}
				step={step}
				onChange={(event) => {
					const nextValue = event.target.value;
					onChange(nextValue === '' ? '' : Number(nextValue));
				}}
				{...inputProps}
			/>
		</FormFieldShell>
	);
}
