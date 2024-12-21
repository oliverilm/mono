import { AppShell, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { useQueries } from 'react-query';
import { Outlet } from 'react-router-dom';
import { type Category, CommonAPI } from '../../api/common.ts';
import { HEADER_HEIGHT } from '../../constants.ts';
import { useAuthStore } from '../../stores/auth.ts';
import { useCommonStore } from '../../stores/common.ts';
import { LayoutHeader } from './header/LayoutHeader.tsx';
import { LayoutNavbar } from './navbar/LayoutNavbar.tsx';

export function Layout() {
	const { setColorScheme, colorScheme } = useMantineColorScheme();
	const [opened, { toggle }] = useDisclosure(false);

	const commonStore = useCommonStore();

	// todo: save competition categories to the store
	useQueries([
		{
			queryFn: CommonAPI.getCategories,
			queryKey: ['common-categories'],
			refetchOnWindowFocus: false,
			cacheTime: Number.POSITIVE_INFINITY,
			onSuccess: (data: { data: Category[] }) => {
				commonStore.setCategories(data.data);
			},
		},
	]);

	useEffect(() => {
		const scheme = localStorage.getItem('color-scheme');
		setColorScheme((scheme as typeof colorScheme) || 'light');
	}, [setColorScheme]);

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
		<AppShell header={{ height: HEADER_HEIGHT }} {...navbarProps}>
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
