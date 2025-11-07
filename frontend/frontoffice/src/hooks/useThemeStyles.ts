import { useMantineColorScheme } from '@mantine/core';

export interface ThemeStyles {
	// Backgrounds
	gradientBlue: string;
	gradientGreen: string;
	gradientOrange: string;

	// Solid backgrounds
	bgBlue: string;
	bgGreen: string;
	bgOrange: string;
	bgYellow: string;

	// Text colors
	textPrimary: string;
	textSecondary: string;
	textOnGradient: string;

	// Border colors
	borderOutline: string;

	// Box backgrounds (for icon circles, etc.)
	iconBgBlue: string;
	iconBgGreen: string;
	iconBgOrange: string;

	// Utility function
	getColor: (light: string, dark: string) => string;
}

export function useThemeStyles(): ThemeStyles {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	const getColor = (light: string, dark: string) => (isDark ? dark : light);

	return {
		// Gradient backgrounds
		gradientBlue: isDark
			? 'linear-gradient(135deg, var(--mantine-color-blue-9) 0%, var(--mantine-color-blue-8) 100%)'
			: 'linear-gradient(135deg, var(--mantine-color-blue-2) 0%, var(--mantine-color-blue-1) 100%)',

		gradientGreen: isDark
			? 'linear-gradient(135deg, var(--mantine-color-green-9) 0%, var(--mantine-color-green-8) 100%)'
			: 'linear-gradient(135deg, var(--mantine-color-green-2) 0%, var(--mantine-color-green-1) 100%)',

		gradientOrange: isDark
			? 'linear-gradient(135deg, var(--mantine-color-orange-9) 0%, var(--mantine-color-orange-8) 100%)'
			: 'linear-gradient(135deg, var(--mantine-color-orange-2) 0%, var(--mantine-color-orange-1) 100%)',

		// Solid backgrounds
		bgBlue: getColor(
			'var(--mantine-color-blue-1)',
			'var(--mantine-color-blue-9)',
		),
		bgGreen: getColor(
			'var(--mantine-color-green-1)',
			'var(--mantine-color-green-9)',
		),
		bgOrange: getColor(
			'var(--mantine-color-orange-1)',
			'var(--mantine-color-orange-9)',
		),
		bgYellow: getColor(
			'var(--mantine-color-yellow-1)',
			'var(--mantine-color-yellow-9)',
		),

		// Text colors - softer for dark mode to reduce eye strain
		textPrimary: getColor(
			'var(--mantine-color-dark-9)',
			'var(--mantine-color-dark-0)', // Softer off-white instead of pure white
		),
		textSecondary: getColor(
			'var(--mantine-color-dark-7)',
			'var(--mantine-color-dark-2)', // Softer gray for secondary text
		),
		textOnGradient: getColor(
			'var(--mantine-color-dark-9)',
			'var(--mantine-color-dark-0)', // Softer off-white
		),

		// Border colors - softer for dark mode
		borderOutline: getColor(
			'var(--mantine-color-blue-9)',
			'var(--mantine-color-dark-3)', // Softer border color in dark mode
		),

		// Icon backgrounds
		iconBgBlue: getColor(
			'var(--mantine-color-blue-1)',
			'var(--mantine-color-blue-9)',
		),
		iconBgGreen: getColor(
			'var(--mantine-color-green-1)',
			'var(--mantine-color-green-9)',
		),
		iconBgOrange: getColor(
			'var(--mantine-color-orange-1)',
			'var(--mantine-color-orange-9)',
		),

		// Utility function
		getColor,
	};
}
