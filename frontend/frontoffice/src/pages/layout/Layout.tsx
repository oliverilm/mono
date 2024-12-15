import { AppShell, Button, Flex, useMantineColorScheme } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'
import { Notifications } from '@mantine/notifications';
import { header } from './Layout.css.ts';
import { useAuthStore } from '../../stores/auth.ts';
import { ThemeToggle } from '../../components/theme-toggle/ThemeToggle.tsx';
import { useEffect } from 'react';

export function Layout() {
    const navigate = useNavigate()
    const {setColorScheme, colorScheme, } = useMantineColorScheme()
    const { isAuthenticated, logout } = useAuthStore()
    
    useEffect(() => {
        const scheme = localStorage.getItem("color-scheme")
        setColorScheme(scheme as typeof colorScheme || "light")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem("color-scheme", colorScheme)
    }, [colorScheme])

    const to = (path: string) => () => {
        navigate(path)
    }

    return (
        <AppShell header={{ height: 50 }} >
            <AppShell.Header w={"100%"} >
                <Flex maw={1520} className={header} px={"xl"}>
                    <Button variant='transparent' color='gray' onClick={to("/")}>Logo</Button>

                    <Flex gap="sm">
                    {isAuthenticated ? (
                        <Button variant='transparent' onClick={logout}>Logout</Button>
                    ) : (
                        <>
                            <Button variant='transparent' onClick={to("/login")}>Login</Button>
                            <Button  onClick={to("/register")}>Sign up</Button>
                        </>
                    )}
                        <ThemeToggle />
                    </Flex>
                </Flex>
            </AppShell.Header>

        <AppShell.Main  maw={1260} m={"lg"} mx="auto" p={"xl"}>
            <Outlet />
            <Notifications />
        </AppShell.Main>

        </AppShell>
    )
}

