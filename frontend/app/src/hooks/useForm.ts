import {
	useCallback,
	useState,
	type ChangeEvent,
	type FormEvent,
} from 'react';

function setIn<T extends object>(obj: T, path: string, value: unknown): T {
	const keys = path.split('.');
	if (keys.length === 1) {
		return { ...obj, [path]: value };
	}

	const [first, ...rest] = keys;
	const key = first as keyof T;
	const nested = obj[key];

	if (typeof nested !== 'object' || nested === null) {
		return obj;
	}

	return {
		...obj,
		[key]: setIn(nested as object, rest.join('.'), value),
	};
}

type UseFormOptions<T extends object> = {
	initialValues: T;
};

export function useForm<T extends object>({ initialValues }: UseFormOptions<T>) {
	const [values, setValues] = useState<T>(initialValues);

	const setField = useCallback((name: string, value: unknown) => {
		setValues((previous) => setIn(previous, name, value));
	}, []);

	const handleChange = useCallback(
		(name: string) =>
			(
				event: ChangeEvent<
					HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
				>,
			) => {
				const { value, type } = event.target;
				setField(name, type === 'number' ? Number(value) : value);
			},
		[setField],
	);

	const handleSubmit = useCallback(
		(onValid: (values: T) => void) => (event: FormEvent) => {
			event.preventDefault();
			onValid(values);
		},
		[values],
	);

	const reset = useCallback(() => {
		setValues(initialValues);
	}, [initialValues]);

	return {
		values,
		setValues,
		setField,
		handleChange,
		handleSubmit,
		reset,
	};
}
