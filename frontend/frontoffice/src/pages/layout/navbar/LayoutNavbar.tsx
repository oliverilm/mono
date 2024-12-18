import { AppShell, Modal, NavLink } from '@mantine/core';
import {
	IconChevronRight,
	IconCup,
	IconHome,
	IconLogout,
	IconPassword,
} from '@tabler/icons-react';
import { useAuthStore } from '../../../stores/auth';
import { useQuery } from 'react-query';
import { CompetitionAPI } from '../../../api/common';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { CompetitionFrom } from '../../../components/competition/create/form/CompetitionForm';
import { ClubForm } from '../../../components/club/form/ClubForm';

export function LayoutNavbar() {
	const [competitionFormOpened, { toggle: toggleCompetitionForm }] =
		useDisclosure();
	const [clubFormOpened, { toggle: toggleClubForm }] = useDisclosure();

	const authStore = useAuthStore();
	const navigate = useNavigate();

	const { data } = useQuery({
		queryKey: ['competitions-private', authStore.isAuthenticated],
		queryFn: () => CompetitionAPI.getPrivateCompetitions(),
	});

	const iconProps = { size: '1rem', stroke: 1.5 };
	const Chevron = () => (
		<IconChevronRight {...iconProps} className="mantine-rotate-rtl" />
	);

	return (
		<AppShell.Navbar>
			<AppShell.Section grow>
				<NavLink
					label="My club"
					leftSection={<IconHome {...iconProps} />}
					rightSection={<Chevron />}
					active
				/>

				{data && data?.data?.length > 0 && (
					<NavLink
						label="Unpublished events"
						leftSection={<IconCup {...iconProps} />}
					>
						{data?.data?.map((competition, index) => (
							<NavLink
								key={competition.id}
								label={competition.name}
								leftSection={index + 1}
								rightSection={<Chevron />}
								onClick={() => navigate(`/competitions/${competition.slug}`)}
							/>
						))}
					</NavLink>
				)}

				<NavLink
					label="admin actions"
					leftSection={<IconPassword {...iconProps} />}
				>
					<NavLink label="Create competition" onClick={toggleCompetitionForm} />
					<NavLink label="Create club" onClick={toggleClubForm} />
				</NavLink>

				<Modal
					opened={competitionFormOpened}
					onClose={toggleCompetitionForm}
					title={'Create competition'}
				>
					<CompetitionFrom />
				</Modal>

				<Modal
					opened={clubFormOpened}
					onClose={toggleClubForm}
					title={'Create club'}
				>
					<ClubForm onSubmit={toggleClubForm} />
				</Modal>
			</AppShell.Section>
			<AppShell.Section>
				<NavLink
					label="Log out"
					onClick={authStore.logout}
					rightSection={<IconLogout {...iconProps} />}
				/>
			</AppShell.Section>
		</AppShell.Navbar>
	);
}
