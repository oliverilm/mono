import { MantineProvider, createTheme, rem } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

interface Props {
	children: React.ReactNode;
}

const theme = createTheme({
	/** Primary color scheme - using blue as primary */
	primaryColor: 'blue',

	/** Professional color palette */
	colors: {
		// Enhanced blue palette for primary actions
		blue: [
			'#e7f5ff',
			'#d0ebff',
			'#a5d8ff',
			'#74c0fc',
			'#4dabf7',
			'#339af0',
			'#228be6',
			'#1c7ed6',
			'#1971c2',
			'#1864ab',
		],
		// Refined gray palette for neutral elements
		gray: [
			'#f8f9fa',
			'#f1f3f5',
			'#e9ecef',
			'#dee2e6',
			'#ced4da',
			'#adb5bd',
			'#868e96',
			'#495057',
			'#343a40',
			'#212529',
		],
		// Eye-friendly dark palette - warmer, softer tones
		// Using slightly blue-tinted grays instead of pure black for reduced eye strain
		dark: [
			'#e4e6e8', // Lightest - for text on dark backgrounds
			'#c8ccd0', // Lighter - for secondary text
			'#a8adb3', // Light - for muted text
			'#6b7280', // Medium - for borders and dividers
			'#4b5563', // Medium-dark - for subtle backgrounds
			'#374151', // Dark - for elevated surfaces
			'#1f2937', // Darker - for main backgrounds
			'#1a1f2e', // Very dark - for deep backgrounds (warm blue-gray)
			'#151922', // Darkest - for deepest backgrounds (warm blue-gray)
			'#0f1419', // Almost black - for maximum contrast (warm blue-gray)
		],
	},

	/** Typography settings */
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
	fontFamilyMonospace:
		'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

	headings: {
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
		fontWeight: '600',
		sizes: {
			h1: { fontSize: rem(36), lineHeight: '1.2' },
			h2: { fontSize: rem(30), lineHeight: '1.3' },
			h3: { fontSize: rem(24), lineHeight: '1.4' },
			h4: { fontSize: rem(20), lineHeight: '1.4' },
			h5: { fontSize: rem(18), lineHeight: '1.5' },
			h6: { fontSize: rem(16), lineHeight: '1.5' },
		},
	},

	fontSizes: {
		xs: rem(12),
		sm: rem(14),
		md: rem(16),
		lg: rem(18),
		xl: rem(20),
	},

	/** Spacing scale */
	spacing: {
		xs: rem(8),
		sm: rem(12),
		md: rem(16),
		lg: rem(24),
		xl: rem(32),
	},

	/** Border radius */
	radius: {
		xs: rem(4),
		sm: rem(6),
		md: rem(8),
		lg: rem(12),
		xl: rem(16),
	},

	/** Shadows for depth - softer for dark mode */
	shadows: {
		xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
		sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
	},

	/** Component defaults */
	components: {
		Button: {
			defaultProps: {
				radius: 'md',
			},
			styles: {
				root: {
					fontWeight: 500,
					transition: 'all 0.2s ease',
				},
			},
		},

		Card: {
			defaultProps: {
				shadow: 'sm',
				radius: 'md',
				withBorder: true,
			},
			styles: {
				root: {
					transition: 'box-shadow 0.2s ease, transform 0.2s ease',
				},
			},
		},

		Paper: {
			defaultProps: {
				radius: 'md',
			},
			styles: {
				root: {
					transition: 'background-color 0.2s ease',
				},
			},
		},

		Input: {
			defaultProps: {
				radius: 'md',
			},
			styles: {
				input: {
					transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
					'&:focus': {
						borderColor: 'var(--mantine-color-blue-6)',
					},
				},
			},
		},

		TextInput: {
			defaultProps: {
				radius: 'md',
			},
		},

		Textarea: {
			defaultProps: {
				radius: 'md',
			},
		},

		Select: {
			defaultProps: {
				radius: 'md',
			},
		},

		Badge: {
			defaultProps: {
				radius: 'md',
			},
			styles: {
				root: {
					fontWeight: 500,
				},
			},
		},

		Avatar: {
			defaultProps: {
				radius: 'md',
			},
		},

		Modal: {
			defaultProps: {
				radius: 'md',
				centered: true,
			},
			styles: {
				content: {
					boxShadow: 'var(--mantine-shadow-xl)',
				},
			},
		},

		Drawer: {
			defaultProps: {
				position: 'right',
			},
		},

		Notification: {
			defaultProps: {
				radius: 'lg',
				withCloseButton: true,
			},
			styles: {
				root: {
					boxShadow:
						'0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
					border: 'none',
					transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
					padding: 'var(--mantine-spacing-lg)',
					paddingRight: 'var(--mantine-spacing-xl)',
					backgroundColor: 'var(--mantine-color-body)',
					backdropFilter: 'blur(12px)',
					position: 'relative',
					overflow: 'hidden',
					'[data-mantine-color-scheme="dark"] &': {
						backgroundColor: 'var(--mantine-color-dark-7)',
						boxShadow:
							'0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
					},
					'&::before': {
						content: '""',
						position: 'absolute',
						left: 0,
						top: 0,
						bottom: 0,
						width: '4px',
						backgroundColor: 'var(--mantine-color-blue-6)',
						borderRadius:
							'var(--mantine-radius-lg) 0 0 var(--mantine-radius-lg)',
					},
					'[data-mantine-color-scheme="dark"] &::before': {
						backgroundColor: 'var(--mantine-color-blue-5)',
					},
					'&[data-mantine-color="green"]::before': {
						backgroundColor: 'var(--mantine-color-green-6)',
					},
					'&[data-mantine-color="red"]::before': {
						backgroundColor: 'var(--mantine-color-red-6)',
					},
					'&[data-mantine-color="yellow"]::before': {
						backgroundColor: 'var(--mantine-color-yellow-6)',
					},
					'&[data-mantine-color="orange"]::before': {
						backgroundColor: 'var(--mantine-color-orange-6)',
					},
					'&[data-mantine-color="blue"]::before': {
						backgroundColor: 'var(--mantine-color-blue-6)',
					},
					'&:hover': {
						transform: 'translateY(-2px)',
						boxShadow:
							'0 20px 30px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -3px rgba(0, 0, 0, 0.15)',
						'[data-mantine-color-scheme="dark"] &': {
							boxShadow:
								'0 20px 30px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -3px rgba(0, 0, 0, 0.4)',
						},
					},
					'&[data-with-icon]': {
						paddingLeft: 'var(--mantine-spacing-xl)',
					},
				},
				title: {
					fontWeight: 600,
					fontSize: 'var(--mantine-font-size-md)',
					lineHeight: 1.3,
					marginBottom: 'var(--mantine-spacing-xs)',
					color: 'var(--mantine-color-gray-9)',
					'[data-mantine-color-scheme="dark"] &': {
						color: '#ffffff !important',
					},
				},
				description: {
					fontSize: 'var(--mantine-font-size-sm)',
					lineHeight: 1.5,
					color: 'var(--mantine-color-gray-7)',
					marginTop: 'var(--mantine-spacing-xs)',
					'[data-mantine-color-scheme="dark"] &': {
						color: '#e4e6e8 !important',
					},
				},
				closeButton: {
					color: 'var(--mantine-color-gray-5)',
					transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
					width: '28px',
					height: '28px',
					borderRadius: 'var(--mantine-radius-sm)',
					'[data-mantine-color-scheme="dark"] &': {
						color: 'var(--mantine-color-dark-3)',
					},
					'&:hover': {
						backgroundColor: 'var(--mantine-color-gray-1)',
						color: 'var(--mantine-color-gray-9)',
						transform: 'scale(1.05) rotate(90deg)',
						'[data-mantine-color-scheme="dark"] &': {
							backgroundColor: 'var(--mantine-color-dark-5)',
							color: 'var(--mantine-color-dark-0)',
						},
					},
				},
				icon: {
					marginRight: 'var(--mantine-spacing-md)',
					width: '24px',
					height: '24px',
					flexShrink: 0,
				},
				loader: {
					marginRight: 'var(--mantine-spacing-md)',
				},
			},
		},

		Tooltip: {
			defaultProps: {
				radius: 'sm',
			},
		},

		Popover: {
			defaultProps: {
				radius: 'md',
			},
		},

		Menu: {
			defaultProps: {
				radius: 'md',
			},
		},

		NavLink: {
			styles: {
				root: {
					borderRadius: 'var(--mantine-radius-md)',
					transition: 'background-color 0.2s ease',
				},
			},
		},

		ActionIcon: {
			defaultProps: {
				radius: 'md',
			},
			styles: {
				root: {
					transition: 'background-color 0.2s ease, transform 0.2s ease',
					'&:hover': {
						transform: 'scale(1.05)',
					},
				},
			},
		},
	},

	/** Other theme properties */
	defaultRadius: 'md',
	cursorType: 'pointer',
	focusRing: 'auto',
	respectReducedMotion: true,
});

export function ThemeProvider({ children }: Props) {
	return (
		<MantineProvider theme={theme}>
			<ModalsProvider>{children}</ModalsProvider>
		</MantineProvider>
	);
}
