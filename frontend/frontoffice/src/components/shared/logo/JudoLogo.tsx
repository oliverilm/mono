import { useMantineColorScheme } from '@mantine/core';

interface JudoLogoProps {
	size?: number;
}

export function JudoLogo({ size = 40 }: JudoLogoProps) {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	// Professional color scheme - refined colors
	const primaryColor = isDark ? '#4dabf7' : '#228be6'; // Blue
	const textColor = isDark ? '#e4e6e8' : '#212529'; // Text color
	const accentColor = isDark ? '#74c0fc' : '#339af0'; // Lighter blue for accents

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 180 44"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Ippon Judo Competitions Logo"
		>
			<title>Ippon Judo Competitions Logo</title>

			{/* Stylized "I" - clean, modern design */}
			{/* Main vertical bar */}
			<rect x="12" y="12" width="4" height="20" rx="2" fill={primaryColor} />

			{/* Top horizontal bar */}
			<rect x="9" y="12" width="10" height="4" rx="2" fill={primaryColor} />

			{/* Bottom horizontal bar */}
			<rect x="9" y="28" width="10" height="4" rx="2" fill={primaryColor} />

			{/* Judo belt accent - subtle detail */}
			<rect x="12" y="20" width="4" height="2" rx="1" fill={accentColor} />

			{/* "ippon" text - refined typography */}
			<text
				x="30"
				y="32"
				fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
				fontSize="28"
				fontWeight="600"
				fill={textColor}
				letterSpacing="-0.6"
			>
				ippon
			</text>
		</svg>
	);
}
