import { useMantineColorScheme } from '@mantine/core';
import type React from 'react';

export type HoverEffectType =
	| 'lift' // translateY(-4px) with shadow
	| 'slide' // translateX(4px) with background change
	| 'slide-simple'; // translateX(4px) without background change

interface UseHoverEffectOptions {
	type?: HoverEffectType;
	hoverBgLight?: string;
	hoverBgDark?: string;
	defaultBgLight?: string;
	defaultBgDark?: string;
}

export function useHoverEffect(options: UseHoverEffectOptions = {}) {
	const { colorScheme } = useMantineColorScheme();
	const {
		type = 'lift',
		hoverBgLight = 'var(--mantine-color-gray-3)',
		hoverBgDark = 'var(--mantine-color-gray-6)',
		defaultBgLight = 'var(--mantine-color-gray-2)',
		defaultBgDark = 'var(--mantine-color-gray-7)',
	} = options;

	const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
		const element = e.currentTarget;

		switch (type) {
			case 'lift':
				element.style.transform = 'translateY(-4px)';
				element.style.boxShadow =
					colorScheme === 'dark'
						? 'var(--mantine-shadow-md)'
						: 'var(--mantine-shadow-lg)';
				break;
			case 'slide':
				element.style.transform = 'translateX(4px)';
				element.style.backgroundColor =
					colorScheme === 'dark' ? hoverBgDark : hoverBgLight;
				break;
			case 'slide-simple':
				element.style.transform = 'translateX(4px)';
				break;
		}
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
		const element = e.currentTarget;

		switch (type) {
			case 'lift':
				element.style.transform = 'translateY(0)';
				element.style.boxShadow = 'none';
				break;
			case 'slide':
				element.style.transform = 'translateX(0)';
				element.style.backgroundColor =
					colorScheme === 'dark' ? defaultBgDark : defaultBgLight;
				break;
			case 'slide-simple':
				element.style.transform = 'translateX(0)';
				break;
		}
	};

	return {
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
	};
}
