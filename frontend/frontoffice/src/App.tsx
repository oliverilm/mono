import './App.css'
import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <div>Header</div>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      
      <Notifications />

    </AppShell>
  )
}

export default App
