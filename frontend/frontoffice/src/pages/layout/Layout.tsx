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
    
    useEffect(() => {
        const scheme = localStorage.getItem("color-scheme")
        setColorScheme(scheme as typeof colorScheme || "light")
    }, [])

    useEffect(() => {
        localStorage.setItem("color-scheme", colorScheme)
    }, [colorScheme])

    const to = (path: string) => () => {
        navigate(path)
    }
    const { isAuthenticated, logout } = useAuthStore()

    return (
        <AppShell header={{ height: 50 }} navbar={{ width:  isAuthenticated ? 120 : 0, breakpoint: "md"}}>
        <AppShell.Header w={"100%"} >
            <Flex maw={1520} className={header} px={"xl"}>
                <Button variant='transparent' color='gray' >Logo</Button>
                
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

        {isAuthenticated && (
            <AppShell.Navbar w={120} >
                <div>sidebar</div>
            </AppShell.Navbar>
        )}

        <AppShell.Main ml={isAuthenticated ? 120 : 0} maw={1260} m={"auto"} p={"lg"} pt={"xl"}>
            <Outlet />
        <Notifications />

        </AppShell.Main>

        </AppShell>
    )
}

