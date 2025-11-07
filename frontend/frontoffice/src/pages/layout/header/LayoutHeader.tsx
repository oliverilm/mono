import {
	ActionIcon,
	Anchor,
	Button,
	Flex,
	useMantineColorScheme,
} from '@mantine/core';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { JudoLogo } from '../../../components/shared/logo/JudoLogo';
import { ThemeToggle } from '../../../components/theme-toggle/ThemeToggle';
import { useAuthStore } from '../../../stores/auth';
import { header } from './LayoutHeader.css';
import { LayoutHeaderNotifications } from './notifications/LayoutHeaderNotifications';

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
	}, [setColorScheme]);

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

				<Button
					variant="transparent"
					color="gray"
					onClick={to('/')}
					style={{
						height: 'auto',
						padding: '6px 10px',
						display: 'flex',
						alignItems: 'center',
						gap: '0',
						transition: 'opacity 0.2s ease',
						borderRadius: 'var(--mantine-radius-md)',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.opacity = '0.85';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.opacity = '1';
					}}
				>
					<JudoLogo size={140} />
				</Button>
			</Flex>

			<Flex gap="sm" align={'center'}>
				{!isAuthenticated ? (
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
				) : (
					<LayoutHeaderNotifications />
				)}
				<ThemeToggle />
			</Flex>
		</Flex>
	);
}
