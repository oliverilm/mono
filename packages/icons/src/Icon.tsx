import { iconSizes } from './sizes';
import { renderIconElements } from './renderIconElements';
import { iconRegistry } from './icons/registry';
import type { IconProps as BaseIconProps } from './types';

export type IconName = keyof typeof iconRegistry;

export type IconProps = BaseIconProps & { name: IconName };

export function Icon({
	name,
	size = 'md',
	color = 'currentColor',
	variant = 'outline',
	className,
	style,
	'aria-label': ariaLabel,
	...rest
}: IconProps) {
	const definition = iconRegistry[name];

	if (!definition) {
		return null;
	}

	const elements =
		variant === 'solid' ? definition.solid : definition.outline;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={iconSizes[size]}
			height={iconSizes[size]}
			fill="none"
			color={color}
			className={className}
			style={{ color, ...style }}
			role={ariaLabel ? 'img' : undefined}
			aria-label={ariaLabel}
			aria-hidden={ariaLabel ? undefined : true}
			{...rest}
		>
			{renderIconElements(elements, variant)}
		</svg>
	);
}
