import { Flex, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo } from 'react';

export interface DatePickerProps {
	isWithTime?: boolean;
	onChange?: (date: Date) => void;
}

const allMonthNamesInAYear = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
] as const;

interface DatePickerFormValues {
	month: (typeof allMonthNamesInAYear)[number];
	day: number;
	year: number;
	hour: number;
	minute: number;
}

export function DatePicker({ isWithTime = false, onChange }: DatePickerProps) {
	const form = useForm<DatePickerFormValues>({
		initialValues: {
			month: 'January',
			day: 1,
			year: new Date().getFullYear(),
			hour: 12,
			minute: 0,
		},
		validate: {
			month: (value) =>
				allMonthNamesInAYear.includes(value) ? null : 'Invalid month',
			day: (value) => (value >= 1 && value <= 31 ? null : 'Invalid day'),
			year: (value) =>
				value < new Date().getFullYear() ? null : 'Invalid year',
			hour: (value) => (value >= 0 && value <= 23 ? null : 'Invalid hour'),
			minute: (value) => (value >= 0 && value <= 59 ? null : 'Invalid minute'),
		},
	});

	const tempDate = useMemo((): Date => {
		const { month, day, year, hour, minute } = form.values;
		return new Date(
			year,
			allMonthNamesInAYear.indexOf(month),
			day,
			hour,
			minute,
		);
	}, [form.values]);

	const getDaysInMonth = useCallback(() => {
		const daysInMonth = dayjs(tempDate).daysInMonth();
		if (daysInMonth < form.values.day) {
			form.getInputProps('day').onChange(daysInMonth);
		}

		return daysInMonth;
	}, [form.values.day, form.getInputProps, tempDate]);

	const currentYear = new Date().getFullYear();

	useEffect(() => {
		onChange?.(tempDate);
	}, [tempDate, onChange]);

	const dayArray = useMemo(() => {
		return Array.from({ length: getDaysInMonth() }, (_, i) => String(i + 1));
	}, [getDaysInMonth]);

	console.log({
		dayArray,
		daySelected: form.values.day,
		getDaysInMonth: getDaysInMonth(),
		monthSelected: form.values.month,
	});
	return (
		<Flex>
			<Select data={allMonthNamesInAYear} {...form.getInputProps('month')} />
			<Select data={dayArray} {...form.getInputProps('day')} />
			<Select
				data={[currentYear, currentYear + 1].map(String)}
				{...form.getInputProps('year')}
			/>
		</Flex>
	);
}
