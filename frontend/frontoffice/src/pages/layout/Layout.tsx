import { AppShell, Box, useMantineColorScheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { LayoutHeader } from './header/LayoutHeader.tsx';
import { useAuthStore } from '../../stores/auth.ts';
import { useDisclosure } from '@mantine/hooks';
import { LayoutNavbar } from './navbar/LayoutNavbar.tsx';

export function Layout() {
	const { setColorScheme, colorScheme } = useMantineColorScheme();
	const [opened, { toggle }] = useDisclosure(false);

	useEffect(() => {
		const scheme = localStorage.getItem('color-scheme');
		setColorScheme((scheme as typeof colorScheme) || 'light');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		localStorage.setItem('color-scheme', colorScheme);
	}, [colorScheme]);

	const authStore = useAuthStore();

	const navbarProps = authStore.isAuthenticated
		? {
				navbar: {
					width: 220,
					breakpoint: 'sm',
					collapsed: { mobile: !opened, desktop: opened },
				},
			}
		: {};
	return (
		<AppShell header={{ height: 60 }} {...navbarProps}>
			<AppShell.Header w={'100%'}>
				<LayoutHeader onNavbarToggle={toggle} isNavMenuOpen={opened} />
			</AppShell.Header>

			{authStore.isAuthenticated && <LayoutNavbar />}

			<AppShell.Main>
				<Outlet />
				<Notifications />
			</AppShell.Main>
		</AppShell>
	);
}
