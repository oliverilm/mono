import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './routes/index.tsx'

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import { SystemAuth } from './system/SystemAuth.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      {/* TODO: investigate, if this is slower */}
      <SystemAuth /> 

      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
)