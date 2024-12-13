import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './routes/index.tsx'
import { createTheme, MantineProvider } from '@mantine/core';

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import { SystemAuth } from './system/SystemAuth.tsx';

const theme = createTheme({
  /* put your mantine theme override here */
}); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <AppRouter />
    </MantineProvider>
  </StrictMode>,
)

createRoot(document.getElementById('system')!).render(
  <StrictMode>
    <SystemAuth />
  </StrictMode>,
)