import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './routes/index.tsx'
import { createTheme, MantineProvider } from '@mantine/core';

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';

const theme = createTheme({
  /* put your mantine theme override here */
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <AppRouter />
    </MantineProvider>
  </StrictMode>,
)
