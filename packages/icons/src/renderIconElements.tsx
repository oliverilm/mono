import type { IconVariant, SvgElement } from './types';

function renderElement(element: SvgElement, variant: IconVariant, key: number) {
	const strokeProps =
		variant === 'outline'
			? {
					fill: 'none' as const,
					stroke: 'currentColor',
					strokeWidth: 2,
					strokeLinecap: 'round' as const,
					strokeLinejoin: 'round' as const,
				}
			: {
					fill: 'currentColor',
					stroke: 'none' as const,
				};

	switch (element.type) {
		case 'path':
			return <path key={key} d={element.d} {...strokeProps} />;
		case 'circle':
			return (
				<circle
					key={key}
					cx={element.cx}
					cy={element.cy}
					r={element.r}
					{...strokeProps}
				/>
			);
		case 'line':
			return (
				<line
					key={key}
					x1={element.x1}
					y1={element.y1}
					x2={element.x2}
					y2={element.y2}
					{...strokeProps}
				/>
			);
		case 'polyline':
			return <polyline key={key} points={element.points} {...strokeProps} />;
		case 'rect':
			return (
				<rect
					key={key}
					x={element.x}
					y={element.y}
					width={element.width}
					height={element.height}
					rx={element.rx}
					ry={element.ry}
					{...strokeProps}
				/>
			);
	}
}

export function renderIconElements(elements: SvgElement[], variant: IconVariant) {
	return elements.map((element, index) => renderElement(element, variant, index));
}
