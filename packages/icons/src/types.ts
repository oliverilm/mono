import type { SVGProps } from 'react';

export type IconSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'xxl';

export type IconVariant = 'outline' | 'solid';

export type SvgElement =
	| { type: 'path'; d: string }
	| { type: 'circle'; cx: number; cy: number; r: number }
	| { type: 'line'; x1: number; y1: number; x2: number; y2: number }
	| { type: 'polyline'; points: string }
	| { type: 'rect'; x: number; y: number; width: number; height: number; rx?: number; ry?: number };

export type IconDefinition = {
	outline: SvgElement[];
	solid: SvgElement[];
};

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'color' | 'width' | 'height'> & {
	size?: IconSize;
	color?: string;
	variant?: IconVariant;
	'aria-label'?: string;
};
