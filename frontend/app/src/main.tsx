import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from '@routes/index';
import { SystemAuth } from '@/system/SystemAuth';
import '@styles/global.css';

const element = document.getElementById('root');

if (element) {
	createRoot(element).render(
		<StrictMode>
			<SystemAuth />
			<AppRouter />
		</StrictMode>,
	);
}
