import { useParams } from 'react-router-dom';

export function ElementPage() {
	const { elementName } = useParams<{ elementName: string }>();

	return (
		<main>
			<h1>{elementName}</h1>
		</main>
	);
}
