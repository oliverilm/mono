import { Box, type BoxProps } from '@mantine/core';
import type React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStyles } from '../../../hooks/useThemeStyles';

export type ThemeBoxVariant =
	| 'iconCircle'
	| 'iconCircleBlue'
	| 'iconCircleGreen'
	| 'iconCircleOrange'
	| 'clickable'
	| 'clickableListItem'
	| 'hero'
	| 'fullPage'
	| 'default';

export interface ThemeBoxProps
	extends Omit<BoxProps, 'style' | 'component' | 'to'> {
	variant?: ThemeBoxVariant;
	iconColor?: 'blue' | 'green' | 'orange';
	style?: React.CSSProperties;
	children?: React.ReactNode;
	to?: string;
}

export function ThemeBox({
	variant = 'default',
	iconColor,
	style,
	children,
	to,
	...rest
}: ThemeBoxProps) {
	const theme = useThemeStyles();

	const getIconCircleBackgroundColor = (): string => {
		// Check variant first
		if (variant === 'iconCircleBlue') return theme.iconBgBlue;
		if (variant === 'iconCircleGreen') return theme.iconBgGreen;
		if (variant === 'iconCircleOrange') return theme.iconBgOrange;

		// Fall back to iconColor prop
		if (iconColor === 'blue') return theme.iconBgBlue;
		if (iconColor === 'green') return theme.iconBgGreen;
		if (iconColor === 'orange') return theme.iconBgOrange;

		// Default to blue
		return theme.iconBgBlue;
	};

	const getVariantStyles = (): React.CSSProperties => {
		switch (variant) {
			case 'iconCircle':
			case 'iconCircleBlue':
			case 'iconCircleGreen':
			case 'iconCircleOrange': {
				return {
					width: 64,
					height: 64,
					borderRadius: '50%',
					background: getIconCircleBackgroundColor(),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				};
			}

			case 'hero':
				return {
					position: 'relative',
					background: theme.gradientBlue,
					paddingTop: '80px',
					paddingBottom: '80px',
				};

			case 'fullPage':
				return {
					minHeight: 'calc(100vh - var(--header-height, 60px))',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: theme.gradientBlue,
					padding: '2rem 1rem',
				};

			default:
				return {};
		}
	};

	const getSxStyles = () => {
		switch (variant) {
			case 'clickable':
				return {
					cursor: 'pointer',
					transition: 'transform 0.2s ease, box-shadow 0.2s ease',
					'&:hover': {
						transform: 'translateY(-2px)',
						boxShadow: 'var(--mantine-shadow-md)',
					},
				};

			case 'clickableListItem':
				return {
					backgroundColor: theme.getColor(
						'var(--mantine-color-gray-1)',
						'var(--mantine-color-dark-6)',
					),
					borderRadius: 'var(--mantine-radius-md)',
					cursor: 'pointer',
					transition: 'all 0.2s ease',
					border: `1px solid ${theme.getColor(
						'var(--mantine-color-gray-3)',
						'var(--mantine-color-dark-5)',
					)}`,
					'&:hover': {
						backgroundColor: theme.getColor(
							'var(--mantine-color-gray-2)',
							'var(--mantine-color-dark-5)',
						),
						transform: 'translateX(4px)',
						borderColor: theme.getColor(
							'var(--mantine-color-blue-3)',
							'var(--mantine-color-blue-7)',
						),
						boxShadow: 'var(--mantine-shadow-sm)',
					},
				};

			default:
				return undefined;
		}
	};

	const styleProps = {
		style: {
			...getVariantStyles(),
			...style,
		},
		sx: getSxStyles(),
	};

	if (to) {
		return (
			<Box {...rest} component={Link} to={to} {...styleProps}>
				{children}
			</Box>
		);
	}

	return (
		<Box {...rest} {...styleProps}>
			{children}
		</Box>
	);
}
