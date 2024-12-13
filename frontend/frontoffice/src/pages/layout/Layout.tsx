import { AppShell, Button, Flex } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'
import { Notifications } from '@mantine/notifications';
import { header } from './Layout.css.ts';
import { useAuthStore } from '../../stores/auth.ts';

export function Layout() {
    const navigate = useNavigate()

    const to = (path: string) => () => {
        navigate(path)
    }
    const { isAuthenticated } = useAuthStore()

    return (
        <AppShell header={{ height: 50 }}>
        <AppShell.Header w={"100%"} className={header}>
            <Button variant='transparent' color='gray' >Logo</Button>
            <Flex>
            <Button variant='transparent' onClick={to("/login")}>Login</Button>
            <Button variant='transparent' onClick={to("/register")}>Sign up</Button>
            </Flex>
        </AppShell.Header>

        {isAuthenticated && (
            <AppShell.Navbar >
                <div>sidebar</div>
            </AppShell.Navbar>
        )}

        <AppShell.Main maw={1260} m={"auto"} p={"lg"} pt={"xl"}>
            <Outlet />
        <Notifications />

        </AppShell.Main>

        </AppShell>
    )
}

