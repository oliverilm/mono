import {
	ActionIcon,
	Anchor,
	Button,
	Flex,
	useMantineColorScheme,
} from '@mantine/core';
import { ThemeToggle } from '../../../components/theme-toggle/ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/auth';
import { useEffect } from 'react';
import { header } from './LayoutHeader.css';
import { IconMenu2, IconX } from '@tabler/icons-react';

interface Props {
	onNavbarToggle: () => void;
	isNavMenuOpen: boolean;
}
export function LayoutHeader({ onNavbarToggle, isNavMenuOpen }: Props) {
	const navigate = useNavigate();
	const { setColorScheme, colorScheme } = useMantineColorScheme();
	const { isAuthenticated } = useAuthStore();

	useEffect(() => {
		const scheme = localStorage.getItem('color-scheme');
		setColorScheme((scheme as typeof colorScheme) || 'light');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		localStorage.setItem('color-scheme', colorScheme);
	}, [colorScheme]);

	const to = (path: string) => () => {
		navigate(path);
	};

	return (
		<Flex maw={1520} className={header} px={'xl'} align={'center'}>
			<Flex align={'center'} gap={'xl'}>
				{isAuthenticated && (
					<ActionIcon
						variant="transparent"
						onClick={onNavbarToggle}
						color="dark"
					>
						{!isNavMenuOpen ? <IconX /> : <IconMenu2 />}
					</ActionIcon>
				)}

				<Button variant="transparent" color="gray" onClick={to('/')}>
					Logo
				</Button>
			</Flex>

			<Flex gap="sm" align={'center'}>
				{!isAuthenticated && (
					<>
						<Anchor component={Link} to="/login" underline="never">
							Sign in
						</Anchor>

						<Anchor
							component={Link}
							to="/register"
							variant="gradient"
							underline="never"
							gradient={{
								from: 'red',
								to: 'yellow',
							}}
						>
							Sign up
						</Anchor>
					</>
				)}
				<ThemeToggle />
			</Flex>
		</Flex>
	);
}
