import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routes/index.tsx';

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { SystemAuth } from './system/SystemAuth.tsx';

import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import { QueryProvider } from './providers/query-provider/QueryProvider.js';

const element = document.getElementById('root');

if (element) {
	createRoot(element).render(
		<StrictMode>
			<QueryProvider>
				<ThemeProvider>
					{/* TODO: investigate, if this is slower */}
					<SystemAuth />

					<AppRouter />
				</ThemeProvider>
			</QueryProvider>
		</StrictMode>,
	);
}
