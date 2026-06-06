import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routes/index.tsx';
import './styles/global.css';

const element = document.getElementById('root');

if (element) {
	createRoot(element).render(
		<StrictMode>
			<AppRouter />
		</StrictMode>,
	);
}
