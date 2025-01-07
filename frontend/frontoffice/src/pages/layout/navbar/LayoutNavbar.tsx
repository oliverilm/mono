import { AppShell, Modal, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconChevronRight,
	IconCup,
	IconHome,
	IconLogout,
	IconPassword,
} from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ClubAPI, CompetitionAPI } from '../../../api/common';
import { ClubForm } from '../../../components/club/form/ClubForm';
import { CompetitionFrom } from '../../../components/competition/create/form/CompetitionForm';
import { useAuthStore } from '../../../stores/auth';

export function LayoutNavbar() {
	const [competitionFormOpened, { toggle: toggleCompetitionForm }] =
		useDisclosure();
	const [clubFormOpened, { toggle: toggleClubForm }] = useDisclosure();

	const authStore = useAuthStore();
	const navigate = useNavigate();

	const userClub = authStore.profile?.clubId;
	// TODO: this might be slowing things down, one request too many,
	// figure out how to do it better, maybe select the user club slub with the profile  request
	const { data: userClubData } = useQuery({
		queryKey: ['user-club', userClub],
		queryFn: () => ClubAPI.getClubById(userClub),
		enabled: !!userClub,
	});

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
				{userClubData && (
					<NavLink
						label="My club"
						leftSection={<IconHome {...iconProps} />}
						rightSection={<Chevron />}
						component={Link}
						to={`/clubs/${userClubData.data.slug}`}
						active
					/>
				)}
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
					<CompetitionFrom onSubmit={toggleCompetitionForm} />
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
